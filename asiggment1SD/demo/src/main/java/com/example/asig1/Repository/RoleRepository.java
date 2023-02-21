package com.example.asig1.Repository;

import com.example.asig1.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RoleRepository extends JpaRepository<Role,Long> {
    @Query(value = "SELECT * FROM role WHERE name = ?1",nativeQuery = true)
    Role findByName(String name);
}
