package com.profind.profind_backend.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.profind.profind_backend.domain.ProfessorDto;
import com.profind.profind_backend.repository.ProfessorRepository;
import com.profind.profind_backend.service.UserService;

@RestController
@RequestMapping("/api/professors")
public class ProfessorController {

    // private final UserService userService;
    //TODO change to service
    private final ProfessorRepository professorRepository;


    public ProfessorController(UserService userService,ProfessorRepository professorRepository) {
        // this.userService = userService;
        this.professorRepository=professorRepository;

    }

    //TODO: add caching
    //TODO: sperate the User table from the professors , the professors are in a seprate table than user , imagen having 10000 user , you should not go on all the user to get the professors..
    @GetMapping
    public List<ProfessorDto> getAll() {
        return professorRepository.findAllProfessors();
        //     return userService.findAllUsers()
        //             .stream()
        //             .filter(u -> u.getRole() == Role.PROFESSOR)
        //             .map(ProfessorDto::from)
        //             .collect(Collectors.toList());
    }

    
}
