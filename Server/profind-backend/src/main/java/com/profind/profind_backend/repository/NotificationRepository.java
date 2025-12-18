package com.profind.profind_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.profind.profind_backend.domain.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
}

