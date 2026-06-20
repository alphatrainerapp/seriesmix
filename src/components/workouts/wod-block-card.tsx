'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Timer, 
  Trash2, 
  Pencil, 
  GripVertical, 
  PlaySquare, 
  Info,
  Clock,
  Repeat,
  LayoutList,
  Dumbbell
} from 'lucide-react';
import type { Exercise, WodDetails } from '@/lib/types';
import { cn } from '@/lib/utils';
import { WodConfigDialog } from './wod-config-dialog';
import * as React from 'react';

export function WodBlockCard({
  exercise,
  onUpdateExercise,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
}) {
  const [configOpen, setConfigOpen] = React.useState(false);

  if (!exercise.isWod || !exercise.wodDetails) return null;
  const { wodDetails } = exercise;

  const handleSaveConfig = (newDetails: WodDetails) => {
    onUpdateExercise({
      ...exercise,
      name: `WOD: ${newDetails.type}`,
      wodDetails: newDetails
    });
  };

  return (
    <div className="relative mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <Card className="overflow-hidden border-2 border-primary/20 bg-card dark:bg-card/40 rounded-3xl shadow-lg group">
        {/* Header do Bloco WOD */}
        <div className="bg-primary/5 p-6 border-b border-primary/10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-full px-3">PROTOCOLO WOD</Badge>
                <Badge variant="outline" className="border-primary/30 text-primary font-black text-[9px] uppercase tracking-[0.2em] rounded-full px-3">{wodDetails.type}</Badge>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter italic text-foreground">{exercise.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
             <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-xl bg-background border-border hover:border-primary/40 hover:text-primary transition-all"
              onClick={() => setConfigOpen(true)}
            >
              <Pencil className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-xl">
              <Trash2 className="h-5 w-5" />
            </Button>
            <div className="h-10 w-6 flex items-center justify-center text-muted-foreground/30 cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-[1fr_280px] gap-8">
          {/* Lado Esquerdo: Descrição e Exercícios */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <LayoutList className="h-4 w-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Descrição da Estratégia</span>
              </div>
              <div className="p-5 rounded-2xl bg-muted/20 border border-border/40">
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">{wodDetails.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Dumbbell className="h-4 w-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Sequência de Movimentos</span>
              </div>
              <div className="grid gap-3">
                {wodDetails.exercises.map((ex, idx) => (
                  <div key={ex.id} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/40 hover:border-primary/20 transition-all group/item shadow-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-muted-foreground/30">{idx + 1}</span>
                      <span className="font-bold text-sm text-foreground uppercase tracking-tight">{ex.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {ex.reps && <Badge variant="secondary" className="bg-muted text-[10px] font-black">{ex.reps} REPS</Badge>}
                      {ex.load && <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black border-emerald-500/20">{ex.load} KG</Badge>}
                      {ex.distance && <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 text-[10px] font-black border-blue-500/20">{ex.distance}</Badge>}
                      {ex.time && <Badge variant="secondary" className="bg-orange-500/10 text-orange-600 text-[10px] font-black border-orange-500/20">{ex.time}</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Direito: Métricas e Timer */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-primary/10 bg-primary/[0.02] p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <Repeat className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold text-muted-foreground">Rounds</span>
                  </div>
                  <span className="text-lg font-black italic">{wodDetails.rounds || '1'}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-xs font-bold text-muted-foreground">Tempo Total</span>
                  </div>
                  <span className="text-lg font-black italic">{wodDetails.duration || '--'}</span>
                </div>
              </div>

              <div className="pt-2">
                <div className="aspect-square rounded-full border-4 border-dashed border-primary/20 flex flex-col items-center justify-center relative p-8 group-hover:border-primary/40 transition-all">
                  <Timer className="h-10 w-10 text-primary mb-2 opacity-50" />
                  <span className="text-2xl font-black italic tracking-widest text-foreground/40">00:00</span>
                  <div className="absolute -bottom-2">
                     <Badge className="bg-[#00bfa5] text-white border-none rounded-full px-4 h-8 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-[#00bfa5]/20">TIMER AUTOMÁTICO</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" className="w-full h-11 rounded-xl text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5">
                   <PlaySquare className="h-4 w-4 mr-2" /> Ver Execução
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <WodConfigDialog 
        open={configOpen} 
        onOpenChange={setConfigOpen} 
        onSave={handleSaveConfig} 
        initialData={wodDetails}
        exerciseName={exercise.name}
      />
    </div>
  );
}