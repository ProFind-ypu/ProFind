package com.profind.profind_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.profind.profind_backend.domain.ProfessorDto;
import com.profind.profind_backend.domain.Profile;

public interface ProfessorRepository extends JpaRepository<Profile, Long> {

    @Query(value = """
        SELECT p.user_id AS id, 
               u.full_name AS fullName,
               p.bio,
               p.alt_email,
               p.telephonenumber,
               p.skills,
               d.name AS department, 
               p.avatar_url AS avatarUrl, 
               u.role
        FROM profile p
        JOIN users u ON p.user_id = u.id
        JOIN department d ON p.department_id = d.id
        WHERE u.role = 'PROFESSOR'
        """, nativeQuery = true)
    List<ProfessorDto> findAllProfessors();
}