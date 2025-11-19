package com.profind.profind_backend.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.profind.profind_backend.service.UserService;
import com.profind.profind_backend.domain.User;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    // you will add JwtUtils later

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        final String email = body.get("email");
        final String password = body.get("password");
        final String fullName = body.get("fullName");
        final String uniID = body.get("uni_id");
        try {
            final User u = userService.register(email, password, fullName, uniID);
            //TODO: return jwt token with other info  
            return ResponseEntity.ok(Map.of("id", u.getId(), "email", u.getEmail()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", e.getMessage(),
                    "code", "REGISTRATION_FAILED"
            ));

        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        final String email = body.get("email");
        final String password = body.get("password");

        final Optional<User> u = userService.login(email, password);
        if (u.isPresent()) {
            return ResponseEntity.ok(Map.of("id", u.get().getId(), "email", u.get().getEmail()));
        }

        //TODO: add status code ("code", "AUTH_FAILED", 404, not found .....)
        //TODO : return jwt token , with extra data 
        return ResponseEntity.status(401).body(Map.of(
                "error", "Invalid email or password",
                "code", "LOGIN_AUTH_FAILED"
        ));
    }

}
