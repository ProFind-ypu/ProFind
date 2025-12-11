package com.profind.profind_backend.worker;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.util.List;
import com.profind.profind_backend.repository.OutboxEventRepository;
import com.profind.profind_backend.domain.EventStatus;
import com.profind.profind_backend.domain.OutboxEvent;

@Component
public class OutboxPublisher {
    private final OutboxEventRepository outboxRepo;
    private final EventSenderClient sender; // an adapter to call n8n / email / webhook

    public OutboxPublisher(OutboxEventRepository outboxRepo, EventSenderClient sender) {
        this.outboxRepo = outboxRepo;
        this.sender = sender;
    }

    @Scheduled(fixedDelayString = "${outbox.poll.ms:5000}")
    public void publishPending() {
        List<com.profind.profind_backend.domain.OutboxEvent> pending = outboxRepo.findByStatus(EventStatus.PENDING);
        for (var ev : pending) {
            try {
                sender.send(ev); // implement retry / circuit breaker inside send
                ev.setStatus(EventStatus.PROCESSED);
                ev.setProcessedAt(java.time.Instant.now());
                outboxRepo.save(ev);
            } catch (Exception ex) {
                // Default retries to 0 if null to avoid NPE on first failure
                Integer retries = ev.getRetries();
                ev.setRetries((retries == null ? 0 : retries) + 1);
                ev.setLastError(ex.getMessage());
                if (ev.getRetries() > 5) ev.setStatus(EventStatus.FAILED);
                outboxRepo.save(ev);
            }
        }
    }
    @Scheduled(fixedDelayString = "${outbox.poll.ms:5000}")
    public void pollAndPublish() {
        List<OutboxEvent> pending = outboxRepo.findByStatus(EventStatus.PENDING);
        for (OutboxEvent ev : pending) {
            try {
                sender.send(ev); // implement retries/circuit-breaker inside
                ev.setStatus(EventStatus.PROCESSED);
                ev.setProcessedAt(java.time.Instant.now());
                outboxRepo.save(ev);
            } catch (Exception ex) {
                // Default retries to 0 if null to avoid NPE on first failure
                Integer retries = ev.getRetries();
                ev.setRetries((retries == null ? 0 : retries) + 1);
                ev.setLastError(ex.getMessage());
                if (ev.getRetries() >= 5) {
                    ev.setStatus(EventStatus.FAILED);
                }
                outboxRepo.save(ev);
            }
        }
    }
}

