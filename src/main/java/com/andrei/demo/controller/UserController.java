package com.andrei.demo.controller;

import com.auth0.spring.boot.Auth0AuthenticationToken;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    @GetMapping("/user")
    public String user(){
        return "Hi, user!";
    }

    @GetMapping("/admin")
    public String admin(){
        return "Hi, admin!";
    }

    @GetMapping("/public")
    public ResponseEntity<Map<String, String>> publicEndpoint() {
        return ResponseEntity.ok(Map.of(
                "message", "This endpoint is public - no authentication required"
        ));
    }

    // Protected endpoint - requires authentication
    @GetMapping("/private")
    public ResponseEntity<Map<String, Object>> privateEndpoint(Authentication authentication) {
        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;
        System.out.println(auth0Token);

        return ResponseEntity.ok(Map.of(
                "message", "This endpoint requires authentication",
                "user", authentication.getName(),
                "scopes", auth0Token.getAuthorities()
        ));
    }

    @GetMapping("/profile")
    public ResponseEntity<Map<String, Object>> getUserProfile(Authentication authentication) {
        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;
        Map<String, Object> claims = auth0Token.getClaims();

        Map<String, Object> response = new HashMap<>();
        response.put("userId", authentication.getName());
//        response.put("username", claims.get("https://localhost:8080/internal/nickname"));
//        response.put("email", claims.get("https://localhost:8080/internal/email"));
        response.put("scope", claims.get("scope"));
        response.put("issuer", claims.get("iss"));
        response.put("audience", claims.get("aud"));
        response.put("token", (String) auth0Token.getCredentials());

        return ResponseEntity.ok(response);
    }
}
