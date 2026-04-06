package com.andrei.demo.controller;

import com.andrei.demo.model.Project;
import com.andrei.demo.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAll(){
        return ResponseEntity.ok(projectService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> addProject(@RequestBody Project project){
        projectService.save(project);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(project.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id){
        Project project = projectService.findProjectById(id);

        if(project != null){
            return ResponseEntity.ok(project);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProject(@PathVariable Long id, @RequestBody Project updatedProject){
        Project project = projectService.findProjectById(id);

        if(project != null) {
            project.setName(updatedProject.getName());
            project.setDescription(updatedProject.getDescription());
            projectService.save(project);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(project.getId())
                    .toUri();
            return ResponseEntity.created(location).build();
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Project> deleteProject(@PathVariable Long id){
        projectService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
