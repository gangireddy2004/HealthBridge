package com.healthbridge.controller;

import com.healthbridge.dto.AuthRequest;
import com.healthbridge.dto.AuthResponse;
import com.healthbridge.dto.RegisterRequest;
import com.healthbridge.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    private final AuthService authService;

    // Explicitly handles POST requests to http://localhost:8080/api/auth/register
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        System.out.println("📥 CONTROLLER: Received registration for email: " + request.getEmail());
        String msg = authService.register(request);
        return ResponseEntity.ok(msg);
    }

    // Explicitly handles POST requests to http://localhost:8080/api/auth/login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        System.out.println("📥 CONTROLLER: Received login for email: " + request.getEmail());
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}