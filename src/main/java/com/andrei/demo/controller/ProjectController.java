package com.andrei.demo.controller;

import com.andrei.demo.config.ScopeValidator;
import com.andrei.demo.model.Project;
import com.andrei.demo.model.Task;
import com.andrei.demo.service.ProjectService;
import com.auth0.spring.boot.Auth0AuthenticationToken;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final ScopeValidator scopeValidator;

    public ProjectController(ProjectService projectService, ScopeValidator scopeValidator) {
        this.projectService = projectService;
        this.scopeValidator = scopeValidator;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAll(Authentication authentication){
        if(scopeValidator.hasRequiredScopes(authentication, "admin", "read:projects")){
            return ResponseEntity.ok(projectService.findAll());
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> addProject(@RequestBody Project project, Authentication authentication){
        if(scopeValidator.hasRequiredScopes(authentication, "admin", "write:projects")){
            projectService.save(project);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(project.getId())
                    .toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.status(403).build();
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.findProjectById(id);

        if (project != null) {
            return ResponseEntity.ok(project);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project updatedProject, Authentication authentication) {
        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;

        Project project = projectService.findProjectById(id);
        if(project != null){
            if (scopeValidator.hasRequiredScopes(auth0Token, "admin", "write:projects")) {
                project.setStatus(updatedProject.getStatus());
                projectService.save(project);
                URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/projects/{id}")
                        .buildAndExpand(project.getId())
                        .toUri();
                return ResponseEntity.created(location).build();
            } else {
                return ResponseEntity.status(403).build();
            }
        }


        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long id, Authentication authentication){
        if(scopeValidator.hasRequiredScopes(authentication, "admin")){
            projectService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(404).build();
        }

    }
}
