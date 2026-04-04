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
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react';
import type { Exercise, CombinationType, SavedSession } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function SaveSessionDialog({
  workoutData,
  combinationTypes,
  children,
}: {
  workoutData: Exercise[];
  combinationTypes: Record<string, CombinationType>;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [sessionName, setSessionName] = React.useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!sessionName.trim()) {
      toast({
        variant: 'destructive',
        title: 'Nome obrigatório',
        description: 'Por favor, insira um nome para a sessão.',
      });
      return;
    }

    const newSession: SavedSession = {
      id: Date.now().toString(),
      name: sessionName,
      date: new Date().toLocaleDateString('pt-BR'),
      workoutData,
      combinationTypes,
    };

    const savedSessionsRaw = localStorage.getItem('workout-sessions');
    const savedSessions: SavedSession[] = savedSessionsRaw ? JSON.parse(savedSessionsRaw) : [];
    
    savedSessions.push(newSession);
    localStorage.setItem('workout-sessions', JSON.stringify(savedSessions));

    toast({
      title: 'Sessão salva!',
      description: `A sessão "${sessionName}" foi armazenada com sucesso.`,
    });

    setOpen(false);
    setSessionName('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card rounded-2xl border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2">
            <Save className="h-5 w-5 text-primary" />
            Salvar Sessão
          </DialogTitle>
          <DialogDescription>
            Dê um nome para este conjunto de exercícios e configurações.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Ex: Treino de Força A - Foco Quadríceps"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="h-12 rounded-xl bg-muted/30 border-none font-medium focus-visible:ring-primary/30"
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl font-bold"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl font-black px-6 shadow-lg shadow-primary/20 border-none"
          >
            SALVAR AGORA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
