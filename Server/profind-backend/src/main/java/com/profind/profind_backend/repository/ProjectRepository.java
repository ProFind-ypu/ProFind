package com.profind.profind_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.profind.profind_backend.domain.Project;

public interface ProjectRepository extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
  // JpaSpecificationExecutor will let you add flexible search (by title, tags, professor, status)
}
