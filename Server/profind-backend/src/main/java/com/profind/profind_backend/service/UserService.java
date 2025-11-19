package com.profind.profind_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.profind.profind_backend.repository.UserRepository;
import com.profind.profind_backend.domain.User;
import com.profind.profind_backend.domain.Role;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // i used IllegalArgumentException in register to pass the exeption as a message 
    // instade of returning nothing , so the message have more meaning 
    // and save the layout of service 
    // TODO: change the exeptions to simple code 
    public User register(String email, String rawPassword, String fullName, String uniID) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already used");
        }
        if (userRepository.findByUniId(uniID).isPresent()) {
            throw new IllegalArgumentException("University Id already used");
        }

        final User u = new User();
        try {
            u.setEmail(email);
            u.setPasswordHash(encoder.encode(rawPassword));
            u.setFullName(fullName);
            u.setUniID(uniID);
            // TODO: add accountStatus to the User class => accountStatus (open, closed,Suspended )
            u.setRole(Role.STUDENT);
        } catch (Exception e) {
            throw new IllegalArgumentException("Missing variables");
        }
        return userRepository.save(u);
    }

    public Optional<User> login(String email, String rawPassword) {

        var user = userRepository.findByEmail(email);
        if (user.isPresent() && encoder.matches(rawPassword, user.get().getPasswordHash())) {
            return user;
        }

        return Optional.empty();

    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUniId(String email) {
        return userRepository.findByUniId(email);
    }
}
