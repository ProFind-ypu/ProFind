package com.profind.profind_backend.worker;


import org.springframework.stereotype.Component;
// If imports are missing for OutboxEvent:
import com.profind.profind_backend.domain.OutboxEvent;

@Component
public class LoggingEventSender implements EventSenderClient {
    @Override
    public void send(OutboxEvent event) throws Exception {
        // For development, just log to console — replace with HTTP client to n8n or email in prod
        System.out.println("Outbox send: type=" + event.getEventType() + " payload=" + event.getPayloadJson());
        // simulate success
    }
}
