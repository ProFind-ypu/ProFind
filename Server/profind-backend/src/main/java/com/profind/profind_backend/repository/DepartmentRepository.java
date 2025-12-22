package com.profind.profind_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.profind.profind_backend.domain.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    // List<Profile> findAllById(Iterable<Long> ids);
    Department findById(long id);
}
