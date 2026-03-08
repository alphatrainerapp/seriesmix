
'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const DayBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/40 text-teal-700 dark:text-teal-400 text-sm font-medium bg-transparent group hover:border-teal-500 transition-colors">
    <button className="text-muted-foreground/60 group-hover:text-destructive transition-colors">
      <X className="h-3.5 w-3.5" />
    </button>
    {children}
  </div>
);

interface TrainingBlockProps {
  title: string;
  focus: string;
  days: string[];
}

const TrainingBlock = ({ title, focus, days }: TrainingBlockProps) => (
  <div className="space-y-4">
    <Card className="p-7 border border-border/80 rounded-[2.5rem] bg-card shadow-none transition-all hover:border-teal-500/30">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h4 className="text-lg font-medium tracking-tight text-foreground/80 uppercase">{title}</h4>
          <p className="text-sm text-muted-foreground font-medium">{focus}</p>
        </div>
        <ChevronDown className="h-5 w-5 text-teal-500/60" />
      </div>
    </Card>
    
    <div className="px-1 space-y-3">
      <p className="text-sm font-medium text-muted-foreground/60">Dias</p>
      <div className="flex flex-wrap items-center gap-3">
        {days.map((day) => (
          <DayBadge key={day}>{day}</DayBadge>
        ))}
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-border/80 text-muted-foreground/60 hover:text-primary hover:border-primary/50 bg-transparent">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
);

export function TrainingSplit() {
  const splits = [
    { title: "TREINO A", focus: "Peito e tríceps", days: ["Segunda"] },
    { title: "TREINO B", focus: "Dorsais e bíceps", days: ["Quarta", "Sábado"] },
    { title: "TREINO C", focus: "Inferiores", days: ["Sexta"] },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-black tracking-[0.2em] text-muted-foreground uppercase">
          DIVISÃO DE TREINAMENTO
        </h2>
        <Button variant="link" className="text-primary text-xs font-bold p-0 h-auto">
          EDITAR DIVISÃO
        </Button>
      </div>

      <div className="flex flex-col gap-10">
        {splits.map((split) => (
          <TrainingBlock key={split.title} {...split} />
        ))}
      </div>
    </div>
  );
}
