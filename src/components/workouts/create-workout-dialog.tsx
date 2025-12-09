'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateWorkoutForm } from './create-workout-form';

export function CreateWorkoutDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />+ Novo treino
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Workout with AI</DialogTitle>
          <DialogDescription>
            Tell us your goals and we'll generate a personalized workout plan for
            you.
          </DialogDescription>
        </DialogHeader>
        <CreateWorkoutForm onFormSubmit={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
