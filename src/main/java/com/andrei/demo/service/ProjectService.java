package com.andrei.demo.service;

import com.andrei.demo.model.Project;

import java.util.List;

public interface ProjectService {
    public Project findProjectById(Long id);
    public void save(Project project);
    public void deleteById(Long id);
    public List<Project> findAll();
}
