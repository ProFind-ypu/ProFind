package com.profind.profind_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.profind.profind_backend.repository.ProjectRepository;
import com.profind.profind_backend.domain.Project;
import com.profind.profind_backend.domain.ProjectStatus;
import com.profind.profind_backend.web.dto.ProjectDto;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Service
public class ProjectService {
    private final ProjectRepository repo;

    public ProjectService(ProjectRepository repo) {
        this.repo = repo;
    }

    public ProjectDto create(ProjectDto dto) {
        Project p = new Project();
        p.setProfessorId(dto.professorId);
        p.setTitle(dto.title);
        p.setShortDescription(dto.shortDescription);
        p.setDescription(dto.description);
        p.setTags(dto.tags);
        p.setStatus(ProjectStatus.OPEN);
        Project saved = repo.save(p);
        return toDto(saved);
    }

    public ProjectDto getById(Long id) {
        return repo.findById(id).map(this::toDto).orElse(null);
    }

    @Cacheable(value = "projects", key = "#pageable.pageNumber + '-' + #pageable.pageSize + '-' + (#search ?: '')")
    public Page<ProjectDto> search(String search, Pageable pageable) {
        // simple implementation: search by title containing text.
        // For production use Specification or external search (Elastic).
        Page<Project> page;
        if (search == null || search.isBlank()) {
            page = repo.findAll(pageable);
        } else {
            page = repo.findAll((root, query, cb) -> 
                cb.like(cb.lower(root.get("title")), "%" + search.toLowerCase() + "%")
            , pageable);
        }
        return page.map(this::toDto);
    }

    @CacheEvict(value = "projects", allEntries = true)
    public ProjectDto update(Long id, ProjectDto dto) {
        Project p = repo.findById(id).orElseThrow();
        p.setTitle(dto.title);
        p.setShortDescription(dto.shortDescription);
        p.setDescription(dto.description);
        p.setTags(dto.tags);
        p.setUpdatedAt(java.time.Instant.now());
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
        d.tags = p.getTags();
        d.status = p.getStatus().name();
        d.createdAt = p.getCreatedAt();
        d.updatedAt = p.getUpdatedAt();
        return d;
    }
}
