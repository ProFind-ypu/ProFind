package com.profind.profind_backend.domain;

import java.util.Arrays;
import java.util.List;
public class ProfessorDto {

    public Long id;
    public String fullName;
    public String year;
    public String bio;
    public List<String> skills;
    public String department;
    public String phonenumber;

    public String avatarUrl;
    public String role;
    public String altemail;    

    public ProfessorDto(Long id,
            String fullName,
            String year,
            String bio,
            String altemail,
            String phonenumber,
            String skills,
            String department,
            String avatarUrl,
            String role) {
                this.id = id;
        this.bio = bio;
        this.fullName=fullName;
        this.year=year;
        this.phonenumber=phonenumber;
        this.skills =  convertToStringlist(skills);
        this.department = department;
        this.altemail=altemail;
        this.avatarUrl = avatarUrl;
        this.role = role;

    }

    private List<String> convertToStringlist(String str){
        return Arrays.asList(str.split(","));
    }
    

    // public static ProfessorDto convert(Profile profile, User user, String department) {
    //     ProfessorDto dto = new ProfessorDto();
    //     dto.id = profile.getUserId();
    //     dto.fullName = user.getFullName();
    //     dto.year = profile.getYear();
    //     dto.bio = profile.getBio();
    //     dto.skills = profile.getSkills();
    //     dto.avatarUrl = profile.getAvatarUrl();
    //     dto.department = department;
    //     dto.role = user.getRole();
    //     return dto;
    // }
}
