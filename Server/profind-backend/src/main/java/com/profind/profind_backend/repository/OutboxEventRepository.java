package com.profind.profind_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.profind.profind_backend.domain.OutboxEvent;
import com.profind.profind_backend.domain.EventStatus;

public interface OutboxEventRepository extends JpaRepository<OutboxEvent, Long> {
    List<OutboxEvent> findByStatus(EventStatus status);
}
