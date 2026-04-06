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

export function NewTaskDialog({ onAddTask }: { onAddTask: (title: string, description: string) => void }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDesc, setNewTaskDesc] = useState('');

    const handleSave = () => {
        if (!newTaskTitle.trim()) return;
        onAddTask(newTaskTitle, newTaskDesc);
        setNewTaskTitle('');
        setNewTaskDesc('');
        setIsDialogOpen(false);

        
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-6">
                    + New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#16171c] text-white border-[#2b2d36]">
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription className="text-gray-400">
                        Create a new task for your board.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-gray-300">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="col-span-3 bg-[#1f2128] border-[#2b2d36] text-white focus-visible:ring-purple-500"
                            placeholder="Task title"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right text-gray-300">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={newTaskDesc}
                            onChange={(e) => setNewTaskDesc(e.target.value)}
                            className="col-span-3 bg-[#1f2128] border-[#2b2d36] text-white min-h-[100px] focus-visible:ring-purple-500"
                            placeholder="Task description (optional)"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSave}>
                        Save Task
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
