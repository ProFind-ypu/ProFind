package com.profind.profind_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.profind.profind_backend.domain.Profile;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    // List<Profile> findAllById(Iterable<Long> ids);
    List<Profile> findByUserIdIn(List<Long> user_id);    
}
