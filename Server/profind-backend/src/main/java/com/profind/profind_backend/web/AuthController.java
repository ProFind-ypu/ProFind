package com.profind.profind_backend.web;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.profind.profind_backend.service.UserService;
import com.profind.profind_backend.domain.User;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    // you will add JwtUtils later

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String password = body.get("password");
        String fullName = body.get("fullName");
        User u = userService.register(email, password, fullName);
        return ResponseEntity.ok(Map.of("id", u.getId(), "email", u.getEmail()));
    }

    // /login will validate credentials and return JWT (implement next)
}