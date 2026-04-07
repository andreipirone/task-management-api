package com.andrei.demo.service;

import com.andrei.demo.model.Task;
import com.andrei.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }


    @Override
    public Task findTaskById(Long id) {
        Optional<Task> res = taskRepository.findById(id);

        Task task = null;

        if(res.isPresent()){
            task = res.get();
        } else {
            throw new RuntimeException("Task with id " + id + " not found");
        }

        return task;
    }

    @Override
    public void save(Task task) {
        this.taskRepository.save(task);
    }

    @Override
    public void deleteTaskById(Long id) {
        this.taskRepository.deleteById(id);
    }

    @Override
    public String getTaskUserIdById(Long id) {
        return this.taskRepository.findUserIdById(id);
    }

    @Override
    public List<Task> findAll() {
        return this.taskRepository.findAll();
    }

    @Override
    public List<Task> findTasksByProjectId(Long projectId) {
        return this.taskRepository.findTasksByProjectId(projectId);
    }
}
