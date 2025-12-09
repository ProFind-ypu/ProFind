package com.profind.profind_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.profind.profind_backend.domain.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    boolean existsByStudentIdAndProjectId(Long studentId, Long projectId);
}
