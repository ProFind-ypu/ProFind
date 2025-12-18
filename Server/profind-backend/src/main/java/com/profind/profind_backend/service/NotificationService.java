package com.profind.profind_backend.service;


import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import com.profind.profind_backend.domain.Notification;
import com.profind.profind_backend.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository repo;

    public NotificationService(NotificationRepository repo) {
        this.repo = repo;
    }

    public Notification create(Long userId, String type, String payloadJson) {
        Notification n = new Notification();
        n.setUserId(userId);
        n.setType(type);
        n.setPayload(payloadJson == null ? "{}" : payloadJson);
        n.setRead(false);
        n.setCreatedAt(Instant.now());
        return repo.save(n);
    }

    public List<Notification> getForUser(Long userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Optional<Notification> markRead(Long id, Long actorUserId) {
        Optional<Notification> opt = repo.findById(id);
        if (opt.isPresent()) {
            Notification n = opt.get();
            if (!n.getUserId().equals(actorUserId)) {
                return Optional.empty(); // not owner
            }
            n.setRead(true);
            repo.save(n);
        }
        return opt;
    }
}
