package com.profind.profind_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.profind.profind_backend.domain.SupervisionRequest;

public interface SupervisionRequestRepository extends JpaRepository<SupervisionRequest, Long> {
    List<SupervisionRequest> findByProfessorId(Long professorId);
    List<SupervisionRequest> findByProfessorIdAndStatus(Long professorId, String status);
    List<SupervisionRequest> findByStudentId(Long studentId);
}
