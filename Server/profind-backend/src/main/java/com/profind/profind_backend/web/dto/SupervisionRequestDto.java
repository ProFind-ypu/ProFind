package com.profind.profind_backend.web.dto;

// Add missing import for Instant
import java.time.Instant;

public class SupervisionRequestDto {
    public Long id;
    public Long studentId;
    public Long professorId;
    public Long projectId;
    public String status;
    public String message;
    public Instant createdAt;
    public Instant updatedAt;
}
