import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewProjectDialogProps {
    onAddProject?: (name: string, description: string) => void;
    onEditProject?: (id: string, name: string, description: string) => void;
    projectToEdit?: { id: string; name: string; description: string } | null;
    onEditCancel?: () => void;
}

export function NewProjectDialog({ onAddProject, onEditProject, projectToEdit, onEditCancel }: NewProjectDialogProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');

    useEffect(() => {
        if (projectToEdit) {
            setNewProjectName(projectToEdit.name);
            setNewProjectDesc(projectToEdit.description);
            setIsDialogOpen(true);
        }
    }, [projectToEdit]);

    const isEditMode = !!projectToEdit;

    const handleSave = () => {
        if (!newProjectName.trim()) return;
        
        if (isEditMode && onEditProject) {
            onEditProject(projectToEdit.id, newProjectName, newProjectDesc);
        } else if (onAddProject) {
            onAddProject(newProjectName, newProjectDesc);
        }
        
        setNewProjectName('');
        setNewProjectDesc('');
        if (onEditCancel) {
            onEditCancel();
        }
        setIsDialogOpen(false);
    };

    const handleOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            setNewProjectName('');
            setNewProjectDesc('');
            if (onEditCancel) {
                onEditCancel();
            }
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
            {!isEditMode && (
                <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-6">
                        + New Project
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[425px] bg-[#16171c] text-white border-[#2b2d36]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        {isEditMode ? 'Update the project details.' : 'Create a new project to track.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-gray-300">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={newProjectName}
                            onChange={(e) => setNewProjectName(e.target.value)}
                            className="col-span-3 bg-[#1f2128] border-[#2b2d36] text-white focus-visible:ring-purple-500"
                            placeholder="Project name"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right text-gray-300">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={newProjectDesc}
                            onChange={(e) => setNewProjectDesc(e.target.value)}
                            className="col-span-3 bg-[#1f2128] border-[#2b2d36] text-white min-h-[100px] focus-visible:ring-purple-500"
                            placeholder="Project description (optional)"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave}>
                        {isEditMode ? 'Update Project' : 'Save Project'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
