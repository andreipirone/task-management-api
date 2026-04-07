package com.andrei.demo.controller;

import com.andrei.demo.config.ScopeValidator;
import com.andrei.demo.model.Project;
import com.andrei.demo.service.ProjectService;
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
        if(scopeValidator.hasRequiredScopes(authentication, "admin", "reads:projects")){
            return ResponseEntity.ok(projectService.findAll());
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> addProject(@RequestBody Project project, Authentication authentication){
        if(scopeValidator.hasRequiredScopes(authentication, "admin", "writes:projects")){
            projectService.save(project);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(project.getId())
                    .toUri();
            return ResponseEntity.created(location).build();
        } else {
            return ResponseEntity.status(404).build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long id, Authentication authentication){
        if(scopeValidator.hasRequiredScopes(authentication, "admin", "")){
            projectService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(404).build();
        }

    }
}
