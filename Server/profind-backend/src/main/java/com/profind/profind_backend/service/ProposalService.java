package com.profind.profind_backend.service;

import com.profind.profind_backend.domain.Project;
import com.profind.profind_backend.domain.Proposal;
import com.profind.profind_backend.repository.ProjectRepository;
import com.profind.profind_backend.repository.ProposalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
public class ProposalService {
    private final ProposalRepository proposalRepo;
    private final ProjectRepository projectRepo;

    public ProposalService(ProposalRepository proposalRepo, ProjectRepository projectRepo) {
        this.proposalRepo = proposalRepo;
        this.projectRepo = projectRepo;
    }

    @Transactional
    public Proposal createProposal(Long studentId, Long professorId, Long projectId, String message, String formData) {
        if (projectId != null) {
            Project project = projectRepo.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
            
            if (project.getProposal() != null) {
                throw new IllegalStateException("This project is already taken and cannot be requested.");
            }

            Proposal p = new Proposal();
            p.setStudentId(studentId);
            p.setProfessorId(professorId);
            p.setProjectId(projectId);
            p.setMessage(message);
            p.setFormData(formData);
            p.setStatus("PENDING");
            p.setCreatedAt(Instant.now());
            p.setUpdatedAt(Instant.now());
            Proposal savedProposal = proposalRepo.save(p);

            // Link the project to the proposal (1:1)
            project.setProposal(savedProposal);
            projectRepo.save(project);

            return savedProposal;
        } else {
            // Standalone proposal (student idea)
            Proposal p = new Proposal();
            p.setStudentId(studentId);
            p.setProfessorId(professorId);
            p.setMessage(message);
            p.setFormData(formData);
            p.setStatus("PENDING");
            p.setCreatedAt(Instant.now());
            p.setUpdatedAt(Instant.now());
            return proposalRepo.save(p);
        }
    }

    public List<Proposal> findByStudent(Long studentId) {
        return proposalRepo.findByStudentId(studentId);
    }

    public Proposal findById(Long id) {
        return proposalRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Proposal not found"));
    }

    public void deleteProposal(Long id) {
        proposalRepo.deleteById(id);
    }
}
