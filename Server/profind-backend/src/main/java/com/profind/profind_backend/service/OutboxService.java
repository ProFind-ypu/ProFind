package com.profind.profind_backend.service;

import org.springframework.stereotype.Service;
import com.profind.profind_backend.domain.OutboxEvent;
import com.profind.profind_backend.domain.EventStatus;
import com.profind.profind_backend.repository.OutboxEventRepository;

import java.time.Instant;

@Service
public class OutboxService {
    private final OutboxEventRepository outboxRepo;

    public OutboxService(OutboxEventRepository outboxRepo) {
        this.outboxRepo = outboxRepo;
    }

    public OutboxEvent enqueue(String eventType, String payloadJson) {
        OutboxEvent ev = new OutboxEvent();
        ev.setEventType(eventType);
        ev.setPayloadJson(payloadJson);
        ev.setStatus(EventStatus.PENDING);
        ev.setRetries(0);
        ev.setCreatedAt(Instant.now());
        return outboxRepo.save(ev);
    }
}

