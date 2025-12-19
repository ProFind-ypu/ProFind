package com.profind.profind_backend.web;


import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profind.profind_backend.config.JwtUtils;
import com.profind.profind_backend.domain.RefreshToken;
import com.profind.profind_backend.domain.User;
import com.profind.profind_backend.security.UserPrincipal;
import com.profind.profind_backend.service.RefreshTokenService;
import com.profind.profind_backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtUtils jwtUtils, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtUtils = jwtUtils;
        this.refreshTokenService = refreshTokenService;
    }

    static class UserDto {
        public Long id;
        public String name;
        public String email;
        public String type;
    }
    // TODO check if all the variable are provided before registing
    // the current state you can register with the same profile as login 
    // you can register with no name (fullName=null in database )
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        User user = userService.register(
            body.get("email"),
            body.get("password"),
            body.get("fullName"),
            body.get("uni_id"),
            body.get("role")
        );
        // return ResponseEntity.ok(Map.of(
        //     "message", "User registered successfully",
        //     "userId", user.getId()
        // ));

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), body.get("password")));
        // roles list:
        String accessToken = jwtUtils.generateAccessToken(user);
        // String accessToken = jwtUtils.generateAccessToken(user.getId(), user.getEmail(), roles);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        String expirationMs = System.getenv("APP_JWT_EXPIRATION_MS");
        if (expirationMs == null) {
            expirationMs = "3600000";
        }
        return ResponseEntity.ok(Map.of(
            "accessToken", accessToken,
            "refreshToken", refreshToken.getToken(),
            "expiresIn", expirationMs
        ));
    
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        User user = userService.findByEmail(email).orElseThrow();
        // roles list:
        var roles = java.util.List.of(user.getRole().name());
        String accessToken = jwtUtils.generateAccessToken(user);
        // String accessToken = jwtUtils.generateAccessToken(user.getId(), user.getEmail(), roles);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        String expirationMs = System.getenv("APP_JWT_EXPIRATION_MS");
        if (expirationMs == null) {
            expirationMs = "3600000";
        }
        return ResponseEntity.ok(Map.of(
            "accessToken", accessToken,
            "refreshToken", refreshToken.getToken(),
            "expiresIn", expirationMs
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String,String> body) {
        String refreshTokenStr = body.get("refreshToken");
        java.util.Optional<RefreshToken> maybe = refreshTokenService.findByToken(refreshTokenStr);
        if (maybe.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid refresh token"));
        }
        RefreshToken rt = maybe.get();
        if (!refreshTokenService.isValid(rt)) {
            refreshTokenService.deleteByToken(refreshTokenStr);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Refresh token expired"));
        }
        // Issue new access token
        java.util.Optional<User> userOpt = userService.findById(rt.getUserId());
        if (userOpt.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","User not found"));
        User user = userOpt.get();
        // String newAccess = jwtUtils.generateAccessToken(user.getId(), user.getEmail(), java.util.List.of(user.getRole().name()));
        String newAccess = jwtUtils.generateAccessToken(user);
        return ResponseEntity.ok(Map.of("accessToken", newAccess));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String,String> body) {
        String refreshTokenStr = body.get("refreshToken");
        refreshTokenService.deleteByToken(refreshTokenStr);
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        User user = userService.findByEmail(principal.getUsername()).orElseThrow();
        UserDto dto = new UserDto();
        dto.id = user.getId();
        dto.name = user.getFullName() != null ? user.getFullName() : user.getEmail();
        dto.email = user.getEmail();
        dto.type = user.getRole() != null ? user.getRole().name().toLowerCase() : "student";
        return ResponseEntity.ok(Map.of("user", dto));
    }
}
