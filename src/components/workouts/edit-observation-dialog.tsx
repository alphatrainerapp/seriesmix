'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Exercise } from '@/lib/types';
import { useState } from 'react';

export function EditObservationDialog({
  children,
  exercise,
  onUpdateExercise,
}: {
  children: React.ReactNode;
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
}) {
  const [open, setOpen] = useState(false);
  const [observation, setObservation] = useState(exercise.observation || '');

  const handleSave = () => {
    onUpdateExercise({ ...exercise, observation });
    setOpen(false);
  };
  
  React.useEffect(() => {
    setObservation(exercise.observation || '');
  }, [exercise.observation]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Editar Observação</DialogTitle>
          <DialogDescription>
            Adicione ou edite uma observação para o exercício: {exercise.name}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
            <Textarea 
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: Fazer o movimento de forma controlada..."
                className='min-h-[120px]'
            />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
