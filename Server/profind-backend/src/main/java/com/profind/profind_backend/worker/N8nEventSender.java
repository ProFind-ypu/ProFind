package com.profind.profind_backend.worker;


import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.beans.factory.annotation.Value;
import com.profind.profind_backend.domain.OutboxEvent;

@Component
public class N8nEventSender implements EventSenderClient {

    private final RestTemplate rest;
    private final String webhookUrl;
    private final String apiKeyHeader; // optional, if you protect n8n with API key
    private final String basicAuthUsername;
    private final String basicAuthPassword;

    public N8nEventSender(RestTemplate rest,
                         @Value("${n8n.webhook.url:}") String webhookUrl,
                         @Value("${n8n.api.key:}") String apiKeyHeader,
                         @Value("${n8n.basic.username:}") String basicAuthUsername,
                         @Value("${n8n.basic.password:}") String basicAuthPassword) {
        this.rest = rest;
        this.webhookUrl = webhookUrl;
        this.apiKeyHeader = apiKeyHeader;
        this.basicAuthUsername = basicAuthUsername;
        this.basicAuthPassword = basicAuthPassword;
    }

    @Override
    public void send(OutboxEvent event) throws Exception {
        if (webhookUrl == null || webhookUrl.isBlank()) {
            throw new IllegalStateException("n8n webhook URL not configured (n8n.webhook.url)");
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (apiKeyHeader != null && !apiKeyHeader.isBlank()) {
            headers.set("X-Api-Key", apiKeyHeader);
        }
        if (basicAuthUsername != null && !basicAuthUsername.isBlank()) {
            headers.setBasicAuth(basicAuthUsername, basicAuthPassword == null ? "" : basicAuthPassword);
        }

        // payload: send eventType + payloadJson + metadata
        String body = String.format("{\"eventType\":\"%s\",\"payload\":%s,\"eventId\":%d}",
                event.getEventType(),
                event.getPayloadJson() != null ? event.getPayloadJson() : "null",
                event.getId() == null ? 0 : event.getId()
        );

        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> resp = rest.postForEntity(webhookUrl, entity, String.class);
            if (!resp.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("n8n responded with status " + resp.getStatusCodeValue());
            }
            // success
        } catch (HttpStatusCodeException ex) {
            // bubble up message for retry / logging
            throw new RuntimeException("n8n HTTP error: " + ex.getStatusCode() + " - " + ex.getResponseBodyAsString());
        } catch (Exception ex) {
            throw new RuntimeException("n8n send failed: " + ex.getMessage(), ex);
        }
    }
}

