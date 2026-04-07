import { useState, useEffect } from 'react';
import {useAuth0} from "@auth0/auth0-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewProjectDialog } from './NewProjectDialog';
import type { Project } from './types';

function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
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
                console.log('Project created at:', location);
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

    return (
        <div className="px-6 py-8 md:px-12 md:py-10 max-w-[1600px] mx-auto min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                        Project Management
                    </h1>
                    <p className="text-gray-400 mt-2">Manage overarching projects and monitor their current statuses.</p>
                </div>
                <NewProjectDialog onAddProject={handleAddProject} />
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
                    <Card key={project.id} className="bg-[#1f2128] border-[#2b2d36] text-white hover:border-indigo-500/50 transition-colors duration-200 flex flex-col h-full">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-semibold tracking-tight">{project.name}</CardTitle>
                            </div>
                            <CardDescription className="text-gray-400 mt-1.5 leading-relaxed">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="font-medium text-gray-300">Project ID:</span> <span className="text-gray-400">{project.id}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-[#2b2d36] flex justify-between items-center mt-auto">
                            <Badge variant={getStatusVariant(project.status)} className="capitalize px-3 py-1 bg-opacity-20 border-transparent">
                                {project.status.replace('_', ' ')}
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                                View Details &rarr;
                            </Button>
                        </CardFooter>
                    </Card>
                )))}
            </div>
        </div>
    );
}

export default Projects;
