package com.profind.profind_backend.web;


import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import com.profind.profind_backend.service.NotificationService;
import com.profind.profind_backend.service.UserService;
import com.profind.profind_backend.domain.Notification;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final UserService userService;

    public NotificationController(NotificationService notificationService, UserService userService) {
        this.notificationService = notificationService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<?> myNotifications(Authentication auth) {
        String email = auth.getName();
        var userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        Long userId = userOpt.get().getId();
        List<Notification> list = notificationService.getForUser(userId);
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        var userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("User not found");
        Long userId = userOpt.get().getId();

        Optional<Notification> opt = notificationService.markRead(id, userId);
        if (opt.isEmpty()) return ResponseEntity.status(403).body("Forbidden or not found");
        return ResponseEntity.ok(opt.get());
    }
}
