package com.profind.profind_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.profind.profind_backend.domain.Proposal;

import io.lettuce.core.dynamic.annotation.Param;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {

    List<Proposal> findByStudentId(Long studentId);

    List<Proposal> findByProfessorId(Long ProfessorId);

    List<Proposal> findByProjectId(Long ProjectId);

    @Modifying
    @Query(value = """
    UPDATE proposal 
    SET status = 'CLOSED' 
    WHERE project_id = :projectId ;
    """, nativeQuery = true)
    int closeAllItemsByProductId(@Param("projectId") Long projectId);
}