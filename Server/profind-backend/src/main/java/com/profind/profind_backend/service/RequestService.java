package com.profind.profind_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.util.List;

import com.profind.profind_backend.domain.*;
import com.profind.profind_backend.repository.*;

@Service
public class RequestService {
    private final SupervisionRequestRepository requestRepo;
    private final AssignmentRepository assignmentRepo;
    private final OutboxEventRepository outboxRepo;
    private final ProjectRepository projectRepo;
    private final UserRepository userRepo;

    public RequestService(SupervisionRequestRepository requestRepo,
                          AssignmentRepository assignmentRepo,
                          OutboxEventRepository outboxRepo,
                          ProjectRepository projectRepo,
                          UserRepository userRepo) {
        this.requestRepo = requestRepo;
        this.assignmentRepo = assignmentRepo;
        this.outboxRepo = outboxRepo;
        this.projectRepo = projectRepo;
        this.userRepo = userRepo;
    }

    public SupervisionRequest createRequest(Long studentId, Long professorId, Long projectId, String message, String formData) {
        SupervisionRequest r = new SupervisionRequest();
        r.setStudentId(studentId);
        r.setProfessorId(professorId);
        r.setProjectId(projectId);
        r.setStatus("PENDING");
        r.setMessage(message);
        r.setFormData(formData);
        r.setCreatedAt(Instant.now());
        SupervisionRequest saved = requestRepo.save(r);

        // Notify professor
        User student = userRepo.findById(studentId).orElse(null);
        User professor = userRepo.findById(professorId).orElse(null);

        OutboxEvent ev = new OutboxEvent();
        ev.setEventType("SUPERVISION_REQUESTED");
        ev.setPayloadJson(String.format(
            "{\"requestId\":%d,\"studentId\":%d,\"studentEmail\":\"%s\",\"studentName\":\"%s\",\"professorId\":%d,\"professorEmail\":\"%s\",\"professorName\":\"%s\"}",
            saved.getId(), studentId,
            student != null ? student.getEmail() : "",
            student != null ? student.getFullName() : "",
            professorId,
            professor != null ? professor.getEmail() : "",
            professor != null ? professor.getFullName() : ""
        ));
        ev.setStatus(EventStatus.PENDING);
        ev.setCreatedAt(Instant.now());
        outboxRepo.save(ev);

        return saved;
    }

    @Transactional
    public void changeStatusToAccepted(Long requestId, Long actorId) {
        SupervisionRequest req = requestRepo.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("Request not found"));
        if (!req.getProfessorId().equals(actorId)) {
            throw new SecurityException("Only professor can accept");
        }
        if (!"PENDING".equals(req.getStatus())) {
            throw new IllegalStateException("Request not in pending state");
        }

        // 1) update request
        req.setStatus("ACCEPTED");
        req.setUpdatedAt(Instant.now());
        requestRepo.save(req);

        // 2) create assignment
        Assignment a = new Assignment();
        a.setStudentId(req.getStudentId());
        a.setProfessorId(req.getProfessorId());
        a.setProjectId(req.getProjectId() != null ? req.getProjectId() : 0L);
        a.setStatus("ACTIVE");
        a.setCreatedAt(Instant.now());
        assignmentRepo.save(a);

        // 3) enqueue outbox event
        User student = userRepo.findById(req.getStudentId()).orElse(null);
        User professor = userRepo.findById(req.getProfessorId()).orElse(null);
        
        OutboxEvent ev = new OutboxEvent();
        ev.setEventType("SUPERVISION_ACCEPTED");
        ev.setPayloadJson(String.format(
            "{\"requestId\":%d,\"assignmentId\":%d,\"studentId\":%d,\"studentEmail\":\"%s\",\"studentName\":\"%s\",\"professorId\":%d,\"professorEmail\":\"%s\",\"professorName\":\"%s\"}",
            req.getId(), a.getId(), req.getStudentId(), 
            student != null ? student.getEmail() : "", 
            student != null ? student.getFullName() : "",
            req.getProfessorId(),
            professor != null ? professor.getEmail() : "",
            professor != null ? professor.getFullName() : ""
        ));
        ev.setStatus(EventStatus.PENDING);
        ev.setCreatedAt(Instant.now());
        outboxRepo.save(ev);
    }

    public void changeStatusToRejected(Long requestId, Long actorId, String reason) {
        SupervisionRequest req = requestRepo.findById(requestId)
            .orElseThrow(() -> new IllegalArgumentException("Request not found"));
        if (!req.getProfessorId().equals(actorId)) {
            throw new SecurityException("Only professor can reject");
        }
        req.setStatus("REJECTED");
        req.setUpdatedAt(Instant.now());
        requestRepo.save(req);
        
        User student = userRepo.findById(req.getStudentId()).orElse(null);
        User professor = userRepo.findById(req.getProfessorId()).orElse(null);

        OutboxEvent ev = new OutboxEvent();
        ev.setEventType("SUPERVISION_REJECTED");
        ev.setPayloadJson(String.format(
            "{\"requestId\":%d,\"reason\":\"%s\",\"studentId\":%d,\"studentEmail\":\"%s\",\"studentName\":\"%s\",\"professorId\":%d,\"professorEmail\":\"%s\",\"professorName\":\"%s\"}",
            req.getId(), (reason == null ? "" : reason), req.getStudentId(),
            student != null ? student.getEmail() : "",
            student != null ? student.getFullName() : "",
            req.getProfessorId(),
            professor != null ? professor.getEmail() : "",
            professor != null ? professor.getFullName() : ""
        ));
        ev.setStatus(EventStatus.PENDING);
        ev.setCreatedAt(Instant.now());
        outboxRepo.save(ev);
    }

    public List<SupervisionRequest> findByProfessor(Long professorId) {
        return requestRepo.findByProfessorId(professorId);
    }

    public List<SupervisionRequest> findByStudent(Long studentId) {
        return requestRepo.findByStudentId(studentId);
    }
}
