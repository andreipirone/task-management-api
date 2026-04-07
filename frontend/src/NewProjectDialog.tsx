import { useState } from 'react';
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

export function NewProjectDialog({ onAddProject }: { onAddProject: (name: string, description: string) => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');
    const [newProjectDesc, setNewProjectDesc] = useState('');

    const handleSave = () => {
        if (!newProjectName.trim()) return;
        onAddProject(newProjectName, newProjectDesc);
        setNewProjectName('');
        setNewProjectDesc('');
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-6">
                    + New Project
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#16171c] text-white border-[#2b2d36]">
                <DialogHeader>
                    <DialogTitle>Add New Project</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Create a new project to track.
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
                        Save Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
