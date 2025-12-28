package com.profind.profind_backend.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.profind.profind_backend.domain.*;
import com.profind.profind_backend.repository.*;

@Service
public class ProposalService {

    private final ProposalRepository proposalRepo;
    private final ProjectRepository projectRepo;
    private final OutboxEventRepository outboxRepo;
    private final UserRepository userRepo;

    public ProposalService(ProposalRepository proposalRepo, ProjectRepository projectRepo, OutboxEventRepository outboxRepo, UserRepository userRepo) {
        this.proposalRepo = proposalRepo;
        this.projectRepo = projectRepo;
        this.outboxRepo = outboxRepo;
        this.userRepo = userRepo;
    }

    @Transactional
    public Proposal createProposal(Long studentId, Long professorId, Long projectId, String message, String formData) {
        Proposal p = new Proposal();
        if (projectId != null) {
            Project project = projectRepo.findById(projectId)
                    .orElseThrow(() -> new IllegalArgumentException("Project not found"));

            p.setStudentId(studentId);
            p.setProfessorId(professorId);
            p.setProjectId(projectId);
            p.setMessage(message);
            p.setTitle(project.getTitle());
            p.setFormData(formData);
            p.setStatus("PENDING");
            p.setCreatedAt(Instant.now());
            p.setUpdatedAt(Instant.now());
            p = proposalRepo.save(p);

            // Link the project to the proposal (1:1)
            project.setProposal(p);
            projectRepo.save(project);
        } else {
            // Standalone proposal (student idea)
            p.setStudentId(studentId);
            p.setProfessorId(professorId);
            p.setMessage(message);
            p.setTitle("student title");
            p.setFormData(formData);
            p.setStatus("PENDING");
            p.setCreatedAt(Instant.now());
            p.setUpdatedAt(Instant.now());
            p = proposalRepo.save(p);
        }

        // Notify professor
        User student = userRepo.findById(studentId).orElse(null);
        User professor = userRepo.findById(professorId).orElse(null);

        OutboxEvent ev = new OutboxEvent();
        ev.setEventType("PROPOSAL_REQUESTED");
        ev.setPayloadJson(String.format(
            "{\"proposalId\":%d,\"studentId\":%d,\"studentEmail\":\"%s\",\"studentName\":\"%s\",\"professorId\":%d,\"professorEmail\":\"%s\",\"professorName\":\"%s\"}",
            p.getId(), studentId,
            student != null ? student.getEmail() : "",
            student != null ? student.getFullName() : "",
            professorId,
            professor != null ? professor.getEmail() : "",
            professor != null ? professor.getFullName() : ""
        ));
        ev.setStatus(EventStatus.PENDING);
        ev.setCreatedAt(Instant.now());
        outboxRepo.save(ev);

        return p;
    }

    @Transactional
    public Proposal actionProposal(Long proposalId, String action, Long actorId) {
        Proposal proposal = proposalRepo.findById(proposalId)
                .orElseThrow(() -> new IllegalArgumentException("Proposal not found"));

        if (proposal.getProfessorId() != null && !proposal.getProfessorId().equals(actorId)) {
            throw new SecurityException("Unauthorized: Only the project professor can update this proposal");
        }

        String eventType = null;
        if ("approve".equals(action)) {
            proposal.setStatus("approved");
            if (proposal.getProjectId() != null) {
                Project project = projectRepo.findById(proposal.getProjectId()).orElse(null);
                if (project != null) {
                    project.setStatus(ProjectStatus.ASSIGNED);
                    projectRepo.save(project);
                }
            }
            eventType = "PROPOSAL_APPROVED";
        } else if ("disapprove".equals(action)) {
            proposal.setStatus("disapproved");
            eventType = "PROPOSAL_DISAPPROVED";
        } else if ("update".equals(action)) {
            // No status change for update in this context, but maybe a notification?
            // For now, let's just handle approve/disapprove for simplicity as per user request
        } else {
            throw new IllegalArgumentException("Invalid action");
        }

        proposal.setUpdatedAt(Instant.now());
        Proposal saved = proposalRepo.save(proposal);

        if (eventType != null) {
            User student = userRepo.findById(proposal.getStudentId()).orElse(null);
            User professor = userRepo.findById(proposal.getProfessorId()).orElse(null);

            OutboxEvent ev = new OutboxEvent();
            ev.setEventType(eventType);
            ev.setPayloadJson(String.format(
                "{\"proposalId\":%d,\"studentId\":%d,\"studentEmail\":\"%s\",\"studentName\":\"%s\",\"professorId\":%d,\"professorEmail\":\"%s\",\"professorName\":\"%s\"}",
                saved.getId(), proposal.getStudentId(),
                student != null ? student.getEmail() : "",
                student != null ? student.getFullName() : "",
                proposal.getProfessorId(),
                professor != null ? professor.getEmail() : "",
                professor != null ? professor.getFullName() : ""
            ));
            ev.setStatus(EventStatus.PENDING);
            ev.setCreatedAt(Instant.now());
            outboxRepo.save(ev);
        }

        return saved;
    }

    public List<Proposal>
            findByStudent(Long studentId) {
        return proposalRepo.findByStudentId(studentId);
    }

    public Proposal findById(Long id) {
        return proposalRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Proposal not found"));
    }

    public void deleteProposal(Long id) {
        proposalRepo.deleteById(id);
    }

    @Transactional
    public Proposal updateProposal(Proposal proposal) {
        proposal.setUpdatedAt(Instant.now());
        return proposalRepo.save(proposal);
    }

    @Transactional
    public void updateProjectStatus(Long projectId, ProjectStatus status) {
        Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
        project.setStatus(status);
        projectRepo.save(project);
    }
}
