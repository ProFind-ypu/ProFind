package com.profind.profind_backend.web;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profind.profind_backend.domain.ProjectStatus;
import com.profind.profind_backend.security.UserPrincipal;
import com.profind.profind_backend.service.ProjectService;
import com.profind.profind_backend.service.ProposalService;
import com.profind.profind_backend.web.dto.ProjectDto;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService service;
    private final ProposalService proposalservice;

    public ProjectController(ProjectService service,ProposalService proposalservice) {
        this.service = service;
        this.proposalservice=proposalservice;
    }

    @PostMapping
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<ProjectDto> create(@RequestBody ProjectDto dto,
            @AuthenticationPrincipal UserPrincipal principal) {
        dto.professorId = principal.getId();
        ProjectDto saved = service.create(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> get(@PathVariable Long id) {
        var dto = service.getById(id);
        return dto == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(dto);
    }
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> DeleteProject(@AuthenticationPrincipal UserPrincipal principal,@PathVariable Long id){
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
         ProjectDto project = service.getById(id);

        if (project.professorId != null && !project.professorId.equals(principal.getId())) {
            throw new SecurityException("Unauthorized: Only the project professor can update this proposal");
        }
        service.update(id, project,Optional.of(ProjectStatus.CLOSED));
        //ToDO add closing the proposals for the project
        // List<Proposal>ps=proposalservice.findByProjectId(projectId);
        proposalservice.deleteAllProposalsByProjectId(project.id);
        return ResponseEntity.status(200).body(true);
    }
    @GetMapping
    public List<ProjectDto> getAllProjects() {
        return service.getAllProjects();
    }

}
