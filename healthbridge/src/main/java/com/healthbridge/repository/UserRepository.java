package com.healthbridge.repository;

import com.healthbridge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom finder method to locate a user by their email address during authentication
    Optional<User> findByEmail(String email);
}