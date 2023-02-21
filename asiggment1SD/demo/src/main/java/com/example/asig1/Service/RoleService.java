package com.example.asig1.Service;

import com.example.asig1.Model.Role;
import com.example.asig1.Repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service

public class RoleService {
    private RoleRepository roleRepository;

    public void saveRole(Role role) {
        this.roleRepository.save(role);
    }
}
