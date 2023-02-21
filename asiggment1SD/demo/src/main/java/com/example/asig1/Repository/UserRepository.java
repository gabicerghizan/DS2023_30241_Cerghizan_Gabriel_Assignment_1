package com.example.asig1.Repository;

import com.example.asig1.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "SELECT * FROM user WHERE username = ?1", nativeQuery = true)
    User findByUsername(String username);
    @Query(value = "SELECT * FROM user WHERE email = ?1", nativeQuery = true)
    User findByEmail(String email);
}
