package com.andrei.demo.config;

import com.auth0.spring.boot.Auth0AuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ScopeValidator {
    public boolean hasRequiredScopes(Authentication authentication, String... requiredScopes) {
        if (!(authentication instanceof Auth0AuthenticationToken)) {
            return false;
        }

        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;

        List<String> tokenScopes = (List<String>) auth0Token.getClaims().get("permissions");
        return new HashSet<>(tokenScopes).containsAll(Arrays.asList(requiredScopes));
    }
}
