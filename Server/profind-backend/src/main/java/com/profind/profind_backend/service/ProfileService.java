package com.profind.profind_backend.service;
import org.springframework.stereotype.Service;

import com.profind.profind_backend.repository.ProfileRepository;


@Service
public class ProfileService{
        private  ProfileRepository profilerepo;
        public ProfileService(ProfileRepository repo) {
        this.profilerepo = repo;
        
    }
    
}