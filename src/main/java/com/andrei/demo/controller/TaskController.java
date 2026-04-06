package com.andrei.demo.controller;

import com.andrei.demo.model.Person;
import com.andrei.demo.model.Task;
import com.andrei.demo.repository.TaskRepository;
import com.andrei.demo.service.TaskServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskServiceImpl taskService;

    public TaskController(TaskServiceImpl taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll(){
        return ResponseEntity.ok(taskService.findAll());
    }

    @PostMapping
    public ResponseEntity<Void> addTask(@RequestBody Task task){
        taskService.save(task);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/task/{id}")
                .buildAndExpand(task.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        Task task = taskService.findTaskById(id);

        if(task != null){
            return ResponseEntity.ok(task);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,  @RequestBody Task updatedTask){


        Task task = taskService.findTaskById(id);

        if(task != null) {
//            task.(updatedTask.getName());
//            task.setAge(updatedPerson.getAge());
            taskService.save(task);
            URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                    .path("/persons/{id}")
                    .buildAndExpand(task.getId())
                    .toUri();
            return ResponseEntity.created(location).build();
        }

        return ResponseEntity.notFound().build();
    }
}
