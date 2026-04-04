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
import { Save, Folder } from 'lucide-react';
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
  const [folderName, setFolderName] = React.useState('');
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
      folder: folderName.trim() || 'Geral',
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
      description: `A sessão "${sessionName}" foi armazenada na pasta "${newSession.folder}".`,
    });

    setOpen(false);
    setSessionName('');
    setFolderName('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card rounded-2xl border-none shadow-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2">
            <Save className="h-5 w-5 text-primary" />
            Salvar Sessão
          </DialogTitle>
          <DialogDescription>
            Defina um nome e uma pasta para organizar seus treinos.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Nome do Treino
            </label>
            <Input
              placeholder="Ex: Treino A - Força"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="h-12 rounded-xl bg-muted/30 border-none font-bold focus-visible:ring-primary/30"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Pasta (Opcional)
            </label>
            <div className="relative group">
              <Folder className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Ex: Musculação 2024"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                className="h-12 pl-10 rounded-xl bg-muted/30 border-none font-bold focus-visible:ring-primary/30"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            className="rounded-xl font-bold"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-white rounded-xl font-black px-8 shadow-lg shadow-primary/20 border-none h-12"
          >
            SALVAR SESSÃO
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
