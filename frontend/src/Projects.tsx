import { useState, useEffect } from 'react';
import {useAuth0} from "@auth0/auth0-react";

import { Badge } from "@/components/ui/badge";
import { NewProjectDialog } from './NewProjectDialog';
import { ProjectCard } from './ProjectCard';
import type { Project } from './types';

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [projectToEdit, setProjectToEdit] = useState<{ id: string; name: string; description: string } | null>(null);
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const token = await getAccessTokenSilently();

            const response = await fetch('http://localhost:8080/projects', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProjects(data);
            } else {
                console.error('Failed to fetch projects:', response.status);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchProjects();
        }
    }, [isAuthenticated]);

    const handleAddProject = async (name: string, description: string) => {
        const newProject = {
            name,
            description,
            status: 'active'
        };

        try {
            const token = await getAccessTokenSilently();

            const response = await fetch('http://localhost:8080/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok || response.status === 201) {
                const location = response.headers.get('Location');
                const id = location ? location.split('/').pop() : Math.random().toString(36).substr(2, 9);

                const createdProject: Project = {
                    id,
                    ...newProject
                };
                setProjects(prev => [...prev, createdProject]);
            } else {
                console.error('Failed to create project:', response.status);
            }
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const getStatusVariant = (status: Project['status']) => {
        switch (status) {
            case 'active': return 'default';
            case 'completed': return 'secondary';
            case 'on_hold': return 'destructive';
            default: return 'outline';
        }
    };

    const handleStatusChange = async (id: string, status: Project['status']) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/projects/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok || response.status === 201) {
                setProjects(prev =>
                    prev.map(p => p.id === id ? { ...p, status } : p)
                );
            } else {
                console.error('Failed to update project status:', response.status);
            }
        } catch (error) {
            console.error('Error updating project status:', error);
        }
    };

    const handleEdit = (id: string) => {
        const project = projects.find(p => p.id === id);
        if (project) {
            setProjectToEdit({ id: project.id, name: project.name, description: project.description });
        }
    };

    const handleEditCancel = () => {
        setProjectToEdit(null);
    };

    const handleEditProjectSubmit = async (id: string, name: string, description: string) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name, description }),
            });

            if (response.ok || response.status === 200) {
                setProjects(prev =>
                    prev.map(p => p.id === id ? { ...p, name, description } : p)
                );
            } else {
                console.error('Failed to update project:', response.status);
            }
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = await getAccessTokenSilently();
            const response = await fetch(`http://localhost:8080/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok || response.status === 204) {
                setProjects(prev => prev.filter(p => p.id !== id));
            } else {
                console.error('Failed to delete project:', response.status);
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className="px-6 py-8 md:px-12 md:py-10 max-w-[1600px] mx-auto min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                        Project Management
                    </h1>
                    <p className="text-gray-400 mt-2">Manage overarching projects and monitor their current statuses.</p>
                </div>
                <NewProjectDialog 
                    onAddProject={handleAddProject} 
                    onEditProject={handleEditProjectSubmit}
                    projectToEdit={projectToEdit}
                    onEditCancel={handleEditCancel}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        Loading projects...
                    </div>
                ) : projects.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-400">
                        No projects found. Create one to get started.
                    </div>
                ) : (
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            statusVariant={getStatusVariant(project.status)}
                            onStatusChange={handleStatusChange}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                )))}
            </div>
        </div>
    );
}

export default Projects;
