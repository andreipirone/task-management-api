package com.andrei.demo.controller;

import com.andrei.demo.config.ScopeValidator;
import com.andrei.demo.model.Project;
import com.andrei.demo.model.Task;
import com.andrei.demo.service.TaskService;
import com.auth0.spring.boot.Auth0AuthenticationToken;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;
    private final ScopeValidator scopeValidator;

    public TaskController(TaskService taskService, ScopeValidator scopeValidator) {
        this.taskService = taskService;
        this.scopeValidator = scopeValidator;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll(Authentication authentication) {
        return ResponseEntity.ok(taskService.findAll());
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable Long projectId, Authentication authentication) {
        List<Task> tasks = taskService.findTasksByProjectId(projectId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<Void> addTask(@RequestBody Task task, Authentication authentication) {
        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;
        task.setUserId(auth0Token.getName());
        taskService.save(task);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/task/{id}")
                .buildAndExpand(task.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Task task = taskService.findTaskById(id);

        if (task != null) {
            return ResponseEntity.ok(task);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, Authentication authentication) {
        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;

        Task task = taskService.findTaskById(id);
        if(task != null){
            if (task.getUserId().equals(auth0Token.getName()) || scopeValidator.hasRequiredScopes(auth0Token, "admin", "write:users")) {
                task.setStatus(updatedTask.getStatus());
                taskService.save(task);
                URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                        .path("/tasks/{id}")
                        .buildAndExpand(task.getId())
                        .toUri();
                return ResponseEntity.created(location).build();
            } else {
                return ResponseEntity.status(403).build();
            }
        }


        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Task> deleteTask(@PathVariable Long id, Authentication authentication) {
        Auth0AuthenticationToken auth0Token = (Auth0AuthenticationToken) authentication;

        if (this.taskService.getTaskUserIdById(id).equals(auth0Token.getName()) || scopeValidator.hasRequiredScopes(auth0Token, "admin")){
            taskService.deleteTaskById(id);
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.status(403).build();
    }
}
