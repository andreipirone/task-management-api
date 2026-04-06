import type { Task } from './types';
import { TaskCard } from './TaskCard';

export const Column = ({ title, tasks, dotColor, onStatusChange }: { title: string, tasks: Task[], dotColor: string, onStatusChange: (id: string, status: Task['status']) => void }) => (
    <div className="flex-1 bg-[#16171c]/80 backdrop-blur-sm border border-[#2b2d36]/50 rounded-xl p-5 min-h-[500px]">
        <div className="flex items-center gap-2 mb-6">
            <div className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></div>
            <h2 className="font-semibold text-gray-200">{title}</h2>
            <span className="bg-[#2b2d36] text-gray-400 text-xs font-medium px-2 py-0.5 rounded-full ml-auto">
                {tasks.length}
            </span>
        </div>
        <div className="flex flex-col">
            {tasks.map(task => <TaskCard key={task.id} task={task} onStatusChange={onStatusChange} />)}
            {tasks.length === 0 && (
                <div className="text-center p-6 border-2 border-dashed border-[#2b2d36] rounded-xl text-gray-500 text-sm">
                    No tasks here
                </div>
            )}
        </div>
    </div>
);
