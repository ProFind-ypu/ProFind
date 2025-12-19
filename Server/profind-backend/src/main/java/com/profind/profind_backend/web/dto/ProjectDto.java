package com.profind.profind_backend.web.dto;

import java.time.Instant;
import java.util.List;

public class ProjectDto {
    public Long id;
    public Long professorId;
    public String title;
    public String shortDescription;
    public String description;
    public List<String> requirments;// NEW
    public List<String> tags;
    public String status;
    public Instant createdAt;
    public Instant updatedAt;
}
