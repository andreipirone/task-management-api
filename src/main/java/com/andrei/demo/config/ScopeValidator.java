package com.andrei.demo.config;

import com.auth0.spring.boot.Auth0AuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ScopeValidator {
    //i wrote this validator because the new auth0 springboot library has a weird way of doing things for some reason.
    // the main problem is that Auth0 permissions are not mapped to Spring's default GrantedAuthorities.
    // therefore i can't use the @PreAuthorize annotation, nor convert the JWT I recieve from the client.
    // so this validator checks the Auth0AuthenticationToken specifically for those permissions.
    public boolean hasRequiredScopes(Authentication authentication, String... requiredScopes) {
        if (!(authentication instanceof Auth0AuthenticationToken)) {
            return false;
        }

        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;

        List<String> tokenScopes = (List<String>) auth0Token.getClaims().get("permissions");
        return new HashSet<>(tokenScopes).containsAll(Arrays.asList(requiredScopes));
    }
}
