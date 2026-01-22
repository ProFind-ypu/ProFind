package com.profind.profind_backend.web;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profind.profind_backend.domain.Proposal;
import com.profind.profind_backend.security.UserPrincipal;
import com.profind.profind_backend.service.ProposalService;

@RestController
@RequestMapping("/api/proposals")
public class ProposalController {

    private final ProposalService proposalService;

    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        Long professorId = body.get("professorId") != null ? Long.valueOf(body.get("professorId").toString()) : null;
        Long projectId = body.get("projectId") != null ? Long.valueOf(body.get("projectId").toString()) : null;
        String message = (String) body.getOrDefault("message", "");

        if (professorId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "professorId is required"));
        }

        String formData = null;
        if (body.containsKey("formData")) {
            try {
                formData = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(body.get("formData"));
            } catch (Exception e) {
                formData = body.get("formData").toString();
            }
        }
        String role;
        if (principal.getAuthorities().stream().anyMatch(a -> "ROLE_PROFESSOR".equals(a.getAuthority()))) {
            role = "PROFESSOR";
        } else {
            role = "STUDENT";
        }
        Proposal p = proposalService.createProposal(principal.getId(),role, professorId, projectId, message, formData);
        return ResponseEntity.ok(p);
    }

    @PutMapping
    public ResponseEntity<?> actionProposal(@RequestBody Map<String, Object> body,
            @AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        String action = body.get("action").toString();
        if (action == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "action is required"));
        }

        Long proposalId = body.get("proposalId") != null ? Long.valueOf(body.get("proposalId").toString()) : null;
        if (proposalId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "proposalId is required"));
        }

        try {
            Proposal updated = proposalService.actionProposal(proposalId, action, principal.getId());
            return ResponseEntity.ok(updated);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> myProposals(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        if (principal.getAuthorities().stream().anyMatch(a -> "ROLE_PROFESSOR".equals(a.getAuthority()))) {

            return ResponseEntity.ok(proposalService.findByProfessor(principal.getId()));
        } else {
            return ResponseEntity.ok(proposalService.findByStudent(principal.getId()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProposal(@PathVariable Long id) {
        return ResponseEntity.ok(proposalService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProposal(@PathVariable Long id) {
        proposalService.deleteProposal(id);
        return ResponseEntity.ok(Map.of("message", "Proposal deleted"));
    }
}
