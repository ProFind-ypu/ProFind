package com.profind.profind_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.profind.profind_backend.domain.Proposal;
import java.util.List;

public interface ProposalRepository extends JpaRepository<Proposal, Long> {
    List<Proposal> findByStudentId(Long studentId);
}
