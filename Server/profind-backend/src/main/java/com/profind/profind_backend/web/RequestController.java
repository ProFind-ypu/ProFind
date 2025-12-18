package com.profind.profind_backend.web;


import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.profind.profind_backend.security.UserPrincipal;
import java.util.Map;
import com.profind.profind_backend.service.RequestService;
import com.profind.profind_backend.service.UserService;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService requestService;
    private final UserService userService;
    public RequestController(RequestService requestService, UserService userService) {
        this.requestService = requestService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String,Object> body,
                                    @AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        Object professorIdObj = body.get("professorId");
        if (professorIdObj == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "professorId is required"));
        }

        Long studentId = principal.getId();
        Long professorId = Long.valueOf(professorIdObj.toString());
        Long projectId = body.get("projectId") != null ? Long.valueOf(body.get("projectId").toString()) : null;
        String message = (String) body.getOrDefault("message", "");
        var created = requestService.createRequest(studentId, professorId, projectId, message);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> changeStatus(@PathVariable Long id, @RequestBody Map<String,String> body,
                                          @AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String newStatus = body.get("status");
        Long actorId = principal.getId();
        if ("ACCEPTED".equalsIgnoreCase(newStatus)) {
            requestService.changeStatusToAccepted(id, actorId);
        } else if ("REJECTED".equalsIgnoreCase(newStatus)) {
            requestService.changeStatusToRejected(id, actorId, body.get("reason"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("error","invalid status"));
        }
        return ResponseEntity.ok(Map.of("status","ok"));
    }

    @GetMapping("/professor/{pid}")
    public ResponseEntity<?> forProfessor(@PathVariable Long pid) {
        return ResponseEntity.ok(requestService.findByProfessor(pid));
    }
    @GetMapping("/student/me")
    public ResponseEntity<?> myRequests(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        Long studentId = principal.getId();
        return ResponseEntity.ok(requestService.findByStudent(studentId));
    }

}

