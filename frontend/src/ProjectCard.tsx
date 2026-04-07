import type { Project } from './types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface ProjectCardProps {
    project: Project;
    statusVariant: 'default' | 'secondary' | 'destructive' | 'outline';
    onStatusChange: (id: string, status: Project['status']) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const ProjectCard = ({ project, statusVariant, onStatusChange, onEdit, onDelete }: ProjectCardProps) => (
    <ContextMenu>
        <ContextMenuTrigger asChild>
            <Card className="bg-[#1f2128] border-[#2b2d36] text-white hover:border-indigo-500/50 transition-colors duration-200 flex flex-col h-full">
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
                    <Badge variant={statusVariant} className="capitalize px-3 py-1 bg-opacity-20 border-transparent">
                        {project.status.replace('_', ' ')}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                        View Details &rarr;
                    </Button>
                </CardFooter>
            </Card>
        </ContextMenuTrigger>
        <ContextMenuContent className='bg-[#1f2128] border-[#2b2d36] text-white'>
            <ContextMenuItem onClick={() => project.id && onStatusChange(project.id, 'active')}>Mark as Active</ContextMenuItem>
            <ContextMenuItem onClick={() => project.id && onStatusChange(project.id, 'on_hold')}>Mark as On Hold</ContextMenuItem>
            <ContextMenuItem onClick={() => project.id && onStatusChange(project.id, 'completed')}>Mark as Completed</ContextMenuItem>
            <ContextMenuItem onClick={() => project.id && onEdit(project.id)}>Edit</ContextMenuItem>
            <ContextMenuItem onClick={() => project.id && onDelete(project.id)}>Delete</ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
);
