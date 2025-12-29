package com.profind.profind_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.profind.profind_backend.domain.Profile;
import com.profind.profind_backend.repository.ProfileRepository;

@Service
public class ProfileService {

    private ProfileRepository profilerepo;

    public ProfileService(ProfileRepository repo) {
        this.profilerepo = repo;

    }

     public void register(Long userId, Long depatmentId, String bio, List<String> skills, String altEmail, String telphonenumber) {
         Profile p = new Profile();
         p.setUserId(userId);
         p.setBio(bio);
         p.setDepartment_id(depatmentId);
         p.setSkills(skills);
         // TODO : add telphone standerization and varifecation 
         p.setTelephoneNumber(telphonenumber);
         p.setAltEmail(altEmail);
         profilerepo.save(p);
     }

}
