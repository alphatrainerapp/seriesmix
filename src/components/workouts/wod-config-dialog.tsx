'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Timer, 
  Plus, 
  Trash2, 
  Dumbbell, 
  Info, 
  Flame, 
  Zap, 
  Clock, 
  Repeat,
  Search,
  Check
} from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Exercise, WodDetails, WodExercise, WodType } from '@/lib/types';

const wodTypes: WodType[] = ['AMRAP', 'EMOM', 'FOR TIME', 'TABATA', 'CHIPPER', 'INTERVALADO', 'LIVRE'];

interface WodConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (wodDetails: WodDetails) => void;
  initialData?: WodDetails;
  exerciseName?: string;
}

export function WodConfigDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
  exerciseName = "Novo WOD"
}: WodConfigDialogProps) {
  const [type, setType] = React.useState<WodType>(initialData?.type || 'AMRAP');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [exercises, setExercises] = React.useState<WodExercise[]>(initialData?.exercises || []);
  const [rounds, setRounds] = React.useState(initialData?.rounds || '1');
  const [duration, setDuration] = React.useState(initialData?.duration || '');
  const [rest, setRest] = React.useState(initialData?.restBetweenRounds || '');
  const [search, setSearch] = React.useState('');

  const filteredLibrary = React.useMemo(() => {
    return systemExercises.filter(ex => 
      ex.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const addExerciseToWod = (name: string) => {
    const newEx: WodExercise = {
      id: Date.now().toString(),
      name,
      metrics: {}
    };
    setExercises([...exercises, newEx]);
    setSearch('');
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateMetric = (id: string, field: keyof WodExercise, value: string) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const handleSave = () => {
    onSave({
      type,
      description,
      exercises,
      rounds,
      duration,
      restBetweenRounds: rest
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden bg-card border-none shadow-2xl rounded-[24px]">
        <DialogHeader className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black uppercase tracking-tighter italic">Configurar WOD</DialogTitle>
              <DialogDescription>{exerciseName}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] px-8 py-2">
          <div className="space-y-6 pb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tipo de Protocolo</label>
                <Select value={type} onValueChange={(val) => setType(val as WodType)}>
                  <SelectTrigger className="h-12 rounded-xl bg-muted/30 border-none font-bold focus:ring-primary/20">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/40">
                    {wodTypes.map(t => (
                      <SelectItem key={t} value={t} className="font-bold text-[11px] uppercase tracking-widest">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Tempo Total / Rounds</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Rounds" 
                    value={rounds} 
                    onChange={e => setRounds(e.target.value)}
                    className="h-12 rounded-xl bg-muted/30 border-none font-bold text-center"
                  />
                  <Input 
                    placeholder="Tempo" 
                    value={duration} 
                    onChange={e => setDuration(e.target.value)}
                    className="h-12 rounded-xl bg-muted/30 border-none font-bold text-center"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Descrição de Execução</label>
              <Textarea 
                placeholder="Ex: AMRAP de 20 minutos. Complete o máximo de voltas possível..." 
                className="min-h-[100px] rounded-xl bg-muted/30 border-none font-medium focus-visible:ring-primary/20 p-4"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Exercícios do Bloco</label>
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{exercises.length} selecionados</span>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar na biblioteca..." 
                  className="h-10 pl-10 rounded-lg bg-muted/20 border-border/40 text-sm"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-xl z-20 overflow-hidden">
                    {filteredLibrary.map(ex => (
                      <button 
                        key={ex.name}
                        onClick={() => addExerciseToWod(ex.name)}
                        className="w-full p-3 text-left text-sm font-bold hover:bg-primary/5 border-b border-border/10 flex items-center justify-between"
                      >
                        {ex.name}
                        <Plus className="h-4 w-4 text-primary" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {exercises.map((ex, idx) => (
                  <div key={ex.id} className="p-4 rounded-2xl bg-muted/20 border border-border/40 relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-[10px] font-black flex items-center justify-center">{idx + 1}</span>
                        <span className="text-sm font-black uppercase tracking-tight">{ex.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/40 hover:text-destructive" onClick={() => removeExercise(ex.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-muted-foreground ml-1">Reps</label>
                        <Input 
                          placeholder="Reps" 
                          value={ex.reps} 
                          onChange={e => updateMetric(ex.id, 'reps', e.target.value)}
                          className="h-8 rounded-lg bg-background border-border/30 text-[10px] font-bold text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-muted-foreground ml-1">Carga</label>
                        <Input 
                          placeholder="KG" 
                          value={ex.load} 
                          onChange={e => updateMetric(ex.id, 'load', e.target.value)}
                          className="h-8 rounded-lg bg-background border-border/30 text-[10px] font-bold text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-muted-foreground ml-1">Dist/Cal</label>
                        <Input 
                          placeholder="M/Cal" 
                          value={ex.distance} 
                          onChange={e => updateMetric(ex.id, 'distance', e.target.value)}
                          className="h-8 rounded-lg bg-background border-border/30 text-[10px] font-bold text-center"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-muted-foreground ml-1">Tempo</label>
                        <Input 
                          placeholder="Tempo" 
                          value={ex.time} 
                          onChange={e => updateMetric(ex.id, 'time', e.target.value)}
                          className="h-8 rounded-lg bg-background border-border/30 text-[10px] font-bold text-center"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-8 bg-muted/50 border-t border-border/10">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold">Cancelar</Button>
          <Button 
            onClick={handleSave}
            className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[12px] shadow-lg shadow-[#00bfa5]/10"
          >
            SALVAR PROTOCOLO WOD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
