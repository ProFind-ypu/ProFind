package com.profind.profind_backend.domain;

import java.util.Arrays;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "profile")
public class Profile {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "department_id")
    private long department_id;
    // @Column(name = "year")
    // private String year;
    @Column(name = "bio")
    private String bio;

    @Column(name = "skills")
    private String skills;
    @Column(name = "avatar_url")
    private String avatarUrl;
    @Column(name = "alt_email")
    private String altEmail;
    @Column(name = "telephonenumber")
    private String telephoneNumber;

    public List<String> getSkills() {
        return Arrays.asList(skills.split(","));
    }
       
    public void setSkills(List<String> skills) {
        this.skills = String.join(",", skills);
    }

// private String fullName;
// @Column(name = "role")
// @Enumerated(EnumType.STRING)
// private Role role;
}
