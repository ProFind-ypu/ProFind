package com.profind.profind_backend.web;


import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import com.profind.profind_backend.service.ProjectService;
import com.profind.profind_backend.web.dto.ProjectDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService service;
    public ProjectController(ProjectService service) { this.service = service; }

    @PostMapping
    @PreAuthorize("hasRole('PROFESSOR')")
    public ResponseEntity<ProjectDto> create(@RequestBody ProjectDto dto) {
        ProjectDto saved = service.create(dto);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> get(@PathVariable Long id) {
        var dto = service.getById(id);
        return dto == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(dto);
    }

    @GetMapping
    public Page<ProjectDto> search(@RequestParam(required=false) String q,
                                   @RequestParam(defaultValue="0") int page,
                                   @RequestParam(defaultValue="10") int size) {
        return service.search(q, PageRequest.of(page, size));
    }
}
