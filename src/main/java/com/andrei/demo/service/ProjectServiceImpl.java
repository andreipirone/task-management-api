package com.andrei.demo.service;

import com.andrei.demo.model.Project;
import com.andrei.demo.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
    private ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project findProjectById(Long id) {
        Optional<Project> res = projectRepository.findById(id);

        Project project = null;

        if (res.isPresent()) {
            project = res.get();
        } else {
            throw new RuntimeException("Project with id " + id + " not found");
        }

        return project;
    }

    @Override
    public void save(Project project) {
        this.projectRepository.save(project);
    }

    @Override
    public void deleteById(Long id) {
        this.projectRepository.deleteById(id);
    }

    @Override
    public List<Project> findAll() {
        return this.projectRepository.findAll();
    }
}
