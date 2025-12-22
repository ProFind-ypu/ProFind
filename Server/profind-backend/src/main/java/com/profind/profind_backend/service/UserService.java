package com.profind.profind_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.profind.profind_backend.domain.AccountStatus;
import com.profind.profind_backend.domain.Role;
import com.profind.profind_backend.domain.User;
import com.profind.profind_backend.exception.RegistrationException;
import com.profind.profind_backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(String email, String rawPassword, String fullName, String uniID, String roleStr) {
        Optional<User> existingEmail = userRepository.findByEmail(email);
        User u;
        if (existingEmail.isPresent()) {
            u = existingEmail.get();
        } else {
            Optional<User> existingUni = userRepository.findByUniId(uniID);
            if (existingUni.isPresent()) {
                u = existingUni.get();
            } else {
                u = new User();
                u.setEmail(email);
                u.setUniID(uniID);
                u.setAccountStatus(AccountStatus.OPEN);
            }
        }

        u.setPasswordHash(encoder.encode(rawPassword));
        u.setFullName(fullName);
        
        if (roleStr != null && !roleStr.isEmpty()) {
            try {
                u.setRole(Role.valueOf(roleStr.toUpperCase()));
            } catch (IllegalArgumentException e) {
                if (u.getRole() == null) u.setRole(Role.STUDENT);
            }
           //TODO dont forget to remove this later 
        } else if (email.contains("professor")) {
            u.setRole(Role.PROFESSOR);
        } else {
            if (u.getRole() == null) u.setRole(Role.STUDENT);
        }
        
        try {
            return userRepository.save(u);
        } catch (Exception e) {
            throw new RegistrationException("ERR_DB_ERROR", "Could not save user: " + e.getMessage());
        }
    }

    public Optional<User> login(String email, String rawPassword) {

        var user = userRepository.findByEmail(email);
        if (user.isPresent() && encoder.matches(rawPassword, user.get().getPasswordHash())) {
            return user;
        }
        System.out.println(email+rawPassword);
        return Optional.empty();

    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUniId(String email) {
        return userRepository.findByUniId(email);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }
}
