import type { Task } from './types';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export const TaskCard = ({ task, onStatusChange }: { task: Task, onStatusChange: (id: string, status: Task['status']) => void }) => (
    <ContextMenu>
        <ContextMenuTrigger asChild>
            <div className="bg-[#1f2128] border border-[#2b2d36] rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer mb-3 group">
                <h3 className="font-semibold text-gray-100 mb-1 group-hover:text-purple-400 transition-colors">{task.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{task.description}</p>
                <h3 className="text-sm text-gray-400 leading-relaxed">{task.user_id}</h3>
            </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
            <ContextMenuItem onClick={() => onStatusChange(task.id, 'open')}>Mark as Open</ContextMenuItem>
            <ContextMenuItem onClick={() => onStatusChange(task.id, 'in_progress')}>Mark as In Progress</ContextMenuItem>
            <ContextMenuItem onClick={() => onStatusChange(task.id, 'closed')}>Mark as Closed</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
);
