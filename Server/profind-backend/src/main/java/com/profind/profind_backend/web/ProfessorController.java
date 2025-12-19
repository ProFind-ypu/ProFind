package com.profind.profind_backend.web;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profind.profind_backend.domain.Role;
import com.profind.profind_backend.domain.User;
import com.profind.profind_backend.service.UserService;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {

    private final UserService userService;

    public ProfessorController(UserService userService) {
        this.userService = userService;
    }

    //TODO: add caching
    //TODO: sperate the User table from the professors , the professors are in a seprate table than user , imagen having 10000 user , you should not go on all the user to get the professors..
    @GetMapping
    public List<ProfessorDto> getAll() {
        return userService.findAllUsers()
                .stream()
                .filter(u -> u.getRole() == Role.PROFESSOR)
                .map(ProfessorDto::from)
                .collect(Collectors.toList());
    }

    static class ProfessorDto {
        public Long id;
        public String fullName;
        
        static ProfessorDto from(User u) {
            ProfessorDto d = new ProfessorDto();
            d.id = u.getId();
            d.fullName = u.getFullName();
            return d;
        }
    }
}
