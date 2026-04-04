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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Folder } from 'lucide-react';
import type { Exercise, CombinationType, SavedSession } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const PREDEFINED_FOLDERS = [
  'Inferiores',
  'Superiores',
  'Peito e Biceps',
  'Costa e Triceps',
];

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
  const [selectedFolder, setSelectedFolder] = React.useState('Geral');
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
      folder: selectedFolder,
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
      description: `A sessão "${sessionName}" foi armazenada em "${selectedFolder}".`,
    });

    setOpen(false);
    setSessionName('');
    setSelectedFolder('Geral');
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
            Dê um nome ao seu treino e escolha uma categoria para organizar.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Nome do Treino
            </label>
            <Input
              placeholder="Ex: Treino A - Hipertrofia"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="h-12 rounded-xl bg-muted/30 border-none font-bold focus-visible:ring-primary/30 text-sm"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
              Selecionar Pasta
            </label>
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-none font-bold focus:ring-primary/30 text-[11px] uppercase tracking-widest px-4">
                <div className="flex items-center gap-2">
                  <Folder className="h-4 w-4 text-primary" />
                  <SelectValue placeholder="Escolha uma pasta" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-border/40">
                <SelectItem value="Geral" className="font-black uppercase text-[10px] tracking-widest p-3">Geral</SelectItem>
                {PREDEFINED_FOLDERS.map((folder) => (
                  <SelectItem key={folder} value={folder} className="font-black uppercase text-[10px] tracking-widest p-3">
                    {folder}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            className="bg-primary hover:bg-primary/90 text-white rounded-xl font-black px-8 shadow-lg shadow-primary/20 border-none h-12 uppercase tracking-widest"
          >
            SALVAR AGORA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
