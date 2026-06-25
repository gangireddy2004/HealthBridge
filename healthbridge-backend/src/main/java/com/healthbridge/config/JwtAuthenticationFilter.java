package com.healthbridge.config;

import com.healthbridge.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        // 1. STRICT FORENSIC VALIDATION: Skip filter processing completely for all unauthenticated or placeholder endpoints
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ") ||
                authHeader.contains("undefined") ||
                authHeader.contains("null") ||
                authHeader.trim().equalsIgnoreCase("Bearer") ||
                authHeader.trim().length() <= 7) {

            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 2. Extract the token payload string cleanly
            jwt = authHeader.substring(7).trim();

            // Extra defensive check if string is completely blank after trimming space elements
            if (jwt.isEmpty() || jwt.split("\\.").length != 3) {
                filterChain.doFilter(request, response);
                return;
            }

            userEmail = jwtService.extractUsername(jwt);

            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Safety catch block ensuring malformed user token text drops out safely without breaking the filter layout chain
            filterChain.doFilter(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}