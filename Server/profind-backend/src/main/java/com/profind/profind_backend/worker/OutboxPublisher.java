package com.profind.profind_backend.worker;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.profind.profind_backend.repository.OutboxEventRepository;
import com.profind.profind_backend.domain.OutboxEvent;
import com.profind.profind_backend.domain.EventStatus;
import com.profind.profind_backend.service.NotificationService;
import com.profind.profind_backend.repository.OutboxEventRepository;

import java.util.List;

@Component
public class OutboxPublisher {

    private final OutboxEventRepository outboxRepo;
    private final EventSenderClient sender;
    private final NotificationService notificationService;

    public OutboxPublisher(OutboxEventRepository outboxRepo,
                           EventSenderClient sender,
                           NotificationService notificationService) {
        this.outboxRepo = outboxRepo;
        this.sender = sender;
        this.notificationService = notificationService;
    }

    @Scheduled(fixedDelayString = "${outbox.poll.ms:5000}")
    @Transactional
    public void publishPending() {
        List<OutboxEvent> pending = outboxRepo.findByStatus(EventStatus.PENDING);
        for (OutboxEvent ev : pending) {
            try {
                sender.send(ev); // may throw
                ev.setStatus(EventStatus.SENT);
                ev.setProcessedAt(java.time.Instant.now());
                outboxRepo.save(ev);

                // Optional: create in-app notification(s)
                // Decide which user(s) should get notified from event payload (simple rule example)
                // If payload contains studentId/professorId, you can parse it and notify them.
                // Here we attempt to notify the student if payload contains "studentId"
                try {
                    String payload = ev.getPayloadJson();
                    if (payload != null && payload.contains("studentId")) {
                        // crude parse to extract number - for production use JSON parser
                        java.util.regex.Matcher m = java.util.regex.Pattern.compile("\"studentId\"\\s*:\\s*(\\d+)").matcher(payload);
                        if (m.find()) {
                            Long studentId = Long.parseLong(m.group(1));
                            notificationService.create(studentId, ev.getEventType(), payload);
                        }
                    }
                } catch (Exception ex) {
                    // swallow notification errors — outbox already marked SENT
                }

            } catch (Exception ex) {
                ev.setRetries(ev.getRetries() + 1);
                ev.setLastError(ex.getMessage());
                if (ev.getRetries() >= 5) {
                    ev.setStatus(EventStatus.FAILED);
                }
                outboxRepo.save(ev);
            }
        }
    }
}

