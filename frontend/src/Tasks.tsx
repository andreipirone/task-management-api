import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@/components/ui/button';

type Task = {
    id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
};

const initialTasks: Task[] = [
    { id: '1', title: 'Setup backend', description: 'Initialize Spring Boot application with Auth0', status: 'closed' },
    { id: '2', title: 'Design Database', description: 'Create tables for tasks and users', status: 'in_progress' },
    { id: '3', title: 'Build UI components', description: 'Create columns for task statuses', status: 'in_progress' },
    { id: '4', title: 'Implement drag and drop', description: 'Allow dragging tasks between columns', status: 'open' },
    { id: '5', title: 'Connect to API', description: 'Use fetch to sync tasks with Spring Boot', status: 'open' },
];

function Tasks() {
    const { isAuthenticated, user } = useAuth0();
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const openTasks = tasks.filter(t => t.status === 'open');
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress');
    const closedTasks = tasks.filter(t => t.status === 'closed');

    const TaskCard = ({ task }: { task: Task }) => (
        <div className="bg-[#1f2128] border border-[#2b2d36] rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer mb-3 group">
            <h3 className="font-semibold text-gray-100 mb-1 group-hover:text-purple-400 transition-colors">{task.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{task.description}</p>
        </div>
    );

    const Column = ({ title, tasks, dotColor }: { title: string, tasks: Task[], dotColor: string }) => (
        <div className="flex-1 bg-[#16171c]/80 backdrop-blur-sm border border-[#2b2d36]/50 rounded-2xl p-5 min-h-[500px]">
            <div className="flex items-center gap-2 mb-6">
                <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
                <h2 className="font-semibold text-gray-200">{title}</h2>
                <span className="bg-[#2b2d36] text-gray-400 text-xs font-medium px-2 py-0.5 rounded-full ml-auto">
                    {tasks.length}
                </span>
            </div>
            <div className="flex flex-col">
                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
                {tasks.length === 0 && (
                    <div className="text-center p-6 border-2 border-dashed border-[#2b2d36] rounded-xl text-gray-500 text-sm">
                        No tasks here
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="px-6 py-8 md:px-12 md:py-10 max-w-[1600px] mx-auto min-h-screen">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {isAuthenticated ? `Welcome back, ${user?.name?.split(' ')[0] || user?.email?.split('@')[0]}!` : "Task Board"}
                    </h1>
                    <p className="text-gray-400 mt-2">Manage your tasks across different stages.</p>
                </div>
                <Button className="hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-6">
                    + New Task
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Column title="Open" tasks={openTasks} dotColor="bg-blue-400" />
                <Column title="In Progress" tasks={inProgressTasks} dotColor="bg-amber-400" />
                <Column title="Closed" tasks={closedTasks} dotColor="bg-emerald-400" />
            </div>
        </div>
    );
}

export default Tasks;
