package com.profind.profind_backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.profind.profind_backend.domain.Project;
import com.profind.profind_backend.domain.ProjectStatus;
import com.profind.profind_backend.repository.ProjectRepository;
import com.profind.profind_backend.repository.ProposalRepository;
import com.profind.profind_backend.web.dto.ProjectDto;

@Service
public class ProjectService {
    private final ProjectRepository repo;
    private final ProposalRepository proposalRepo;

    public ProjectService(ProjectRepository repo, ProposalRepository proposalRepo) {
        this.repo = repo;
        this.proposalRepo = proposalRepo;
    }

    public ProjectDto create(ProjectDto dto) {
        Project p = new Project();
        p.setProfessorId(dto.professorId);
        p.setTitle(dto.title);
        p.setShortDescription(dto.shortDescription);
        p.setDescription(dto.description);
        p.setRequirements(dto.requirements);        
        p.setTags(dto.tags);
        p.setStatus(ProjectStatus.OPEN);
        
        Project saved = repo.save(p);
        return toDto(saved);
    }

    public ProjectDto getById(Long id) {
        return repo.findById(id).map(this::toDto).orElse(null);
    }

   public List<ProjectDto> getAllProjects() {
    return repo.findAll().stream()
               .map(this::toDto)
               .collect(Collectors.toList());
}

    @CacheEvict(value = "projects", allEntries = true)
    public ProjectDto update(Long id, ProjectDto dto,Optional<ProjectStatus> status) {
        Project p = repo.findById(id).orElseThrow();
        p.setTitle(dto.title);
        p.setShortDescription(dto.shortDescription);
        p.setDescription(dto.description);
        p.setRequirements(dto.requirements);
        p.setTags(dto.tags);
        p.setUpdatedAt(java.time.Instant.now());
        if(status.isPresent()){
            p.setStatus(status.get());
        }
        Project saved = repo.save(p);
        return toDto(saved);
    }

    private ProjectDto toDto(Project p) {
        ProjectDto d = new ProjectDto();
        d.id = p.getId();
        d.professorId = p.getProfessorId();
        d.title = p.getTitle();
        d.shortDescription = p.getShortDescription();
        d.description = p.getDescription();
        d.requirements = p.getRequirements();
        d.tags = p.getTags();
        d.status = p.getStatus().name();
        if (p.getProposal() != null) {
            d.proposalId = p.getProposal().getId();
        }
        d.createdAt = p.getCreatedAt();
        d.updatedAt = p.getUpdatedAt();
        return d;
    }
}
