package com.healthbridge.service;

import com.healthbridge.dto.AuthRequest;
import com.healthbridge.dto.AuthResponse;
import com.healthbridge.dto.RegisterRequest;
import com.healthbridge.entity.Role;
import com.healthbridge.entity.User;
import com.healthbridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public String register(RegisterRequest request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email ID is already registered in our system!");
            }

            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));

            // Ensures safety parsing matching prefix styles
            String inputRole = request.getRole().toUpperCase();
            if (!inputRole.startsWith("ROLE_")) {
                inputRole = "ROLE_" + inputRole;
            }
            user.setRole(Role.valueOf(inputRole));

            userRepository.save(user);
            System.out.println("🚀 DIAGNOSTIC LOG: User written to database successfully matching: " + user.getEmail());
            return "User account registered successfully!";
        } catch (Exception e) {
            System.err.println("❌ REGISTRATION CRASH ERROR LOG DETECTED:");
            e.printStackTrace();
            throw new RuntimeException("Database sync failed layout mapping variables: " + e.getMessage());
        }
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid user email account coordinates."));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        org.springframework.security.core.userdetails.User userDetails =
                new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
                );

        String jwtToken = jwtService.generateToken(userDetails);
        return new AuthResponse(jwtToken, user.getRole().name());
    }
}