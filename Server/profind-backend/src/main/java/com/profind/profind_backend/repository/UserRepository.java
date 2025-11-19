package com.profind.profind_backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.profind.profind_backend.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUniId(String uniID);
    
}