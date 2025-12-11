package com.profind.profind_backend.worker;

// If you prefer imports over FQCN:
// import com.profind.profind_backend.domain.OutboxEvent;

public interface EventSenderClient {
    void send(com.profind.profind_backend.domain.OutboxEvent event) throws Exception;
}
