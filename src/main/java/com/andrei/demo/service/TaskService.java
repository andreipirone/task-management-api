package com.andrei.demo.service;

import com.andrei.demo.model.Task;

import java.util.List;

public interface TaskService {
    public Task findTaskById(Long id);
    public void save(Task task);
    public void deleteTaskById(Long id);
    public String getTaskUserIdById(Long id);
    public List<Task> findAll();
    public List<Task> findTasksByProjectId(Long projectId);
}
