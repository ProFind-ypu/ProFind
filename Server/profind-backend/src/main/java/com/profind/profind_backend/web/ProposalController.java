package com.profind.profind_backend.web;

import com.profind.profind_backend.domain.Proposal;
import com.profind.profind_backend.security.UserPrincipal;
import com.profind.profind_backend.service.ProposalService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

        Proposal p = proposalService.createProposal(principal.getId(), professorId, projectId, message, formData);
        return ResponseEntity.ok(p);
    }

    @GetMapping("/me")
    public ResponseEntity<?> myProposals(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        return ResponseEntity.ok(proposalService.findByStudent(principal.getId()));
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
