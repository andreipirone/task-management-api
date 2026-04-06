import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import type { Task } from './types';
import { Column } from './Column';
import { NewTaskDialog } from './NewTaskDialog';

const initialTasks: Task[] = [
    { id: '1', user_id: '1', title: 'Setup backend', description: 'Initialize Spring Boot application with Auth0', status: 'closed' },
    { id: '2', user_id: '1', title: 'Design Database', description: 'Create tables for tasks and users', status: 'in_progress' },
    { id: '3', user_id: '1', title: 'Build UI components', description: 'Create columns for task statuses', status: 'in_progress' },
    { id: '4', user_id: '1', title: 'Implement drag and drop', description: 'Allow dragging tasks between columns', status: 'open' },
    { id: '5', user_id: '1', title: 'Connect to API', description: 'Use fetch to sync tasks with Spring Boot', status: 'open' },
];

function Tasks() {
    const { isAuthenticated, user } = useAuth0();
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleAddTask = (title: string, description: string) => {
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            user_id: user?.sub || '1',
            title,
            description,
            status: 'open'
        };
        setTasks(prev => [...prev, newTask]);
    };

    const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const openTasks = tasks.filter(t => t.status === 'open');
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
    const closedTasks = tasks.filter(t => t.status === 'closed');

    return (
        <div className="px-6 py-8 md:px-12 md:py-10 max-w-[1600px] mx-auto min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {isAuthenticated ? `Welcome back, ${user?.name?.split(' ')[0] || user?.email?.split('@')[0]}!` : "Task Board"}
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your tasks across different stages.</p>
                </div>
                <NewTaskDialog onAddTask={handleAddTask} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Column title="Open" tasks={openTasks} dotColor="bg-blue-400" onStatusChange={updateTaskStatus} />
                <Column title="In Progress" tasks={inProgressTasks} dotColor="bg-amber-400" onStatusChange={updateTaskStatus} />
                <Column title="Closed" tasks={closedTasks} dotColor="bg-emerald-400" onStatusChange={updateTaskStatus} />
            </div>
        </div>
    );
}

export default Tasks;
