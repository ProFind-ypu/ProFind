package com.profind.profind_backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    @Column(name = "year")
    private String year;
    @Column(name = "bio")
    private String bio;
    @Column(name = "skills")
    private String skills;
    @Column(name = "avatar_url")
    private String avatarUrl;
    // private String fullName;
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;
}
