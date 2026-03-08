'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const DayBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge
    variant="secondary"
    className="bg-tag-soft-blue text-tag-soft-blue-foreground border-transparent gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
  >
    {children}
    <button className="hover:text-destructive transition-colors ml-1">
      <X className="h-3 w-3" />
    </button>
  </Badge>
);

interface TrainingCardProps {
  title: string;
  focus: string;
  days: string[];
}

const TrainingCard = ({ title, focus, days }: TrainingCardProps) => (
  <Card className="p-4 bg-muted/30 border-none shadow-none rounded-xl hover:bg-muted/50 transition-colors flex flex-col justify-between min-h-[100px]">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</p>
        <h4 className="font-bold text-sm text-foreground uppercase tracking-tight">{focus}</h4>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground hover:text-primary">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
    
    <div className="flex flex-wrap items-center gap-1.5 mt-4">
      {days.map((day) => (
        <DayBadge key={day}>{day}</DayBadge>
      ))}
    </div>
  </Card>
);

export function TrainingSplit() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-black tracking-[0.2em] text-muted-foreground uppercase">
          DIVISÃO DE TREINAMENTO
        </h2>
        <Button variant="link" className="text-primary text-xs font-bold p-0 h-auto">
          EDITAR DIVISÃO
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <TrainingCard title="TREINO A" focus="Empurrar" days={["Seg"]} />
        <TrainingCard title="TREINO B" focus="Puxar" days={["Qua"]} />
        <TrainingCard title="TREINO C" focus="Inferiores" days={["Sex"]} />
        <TrainingCard title="TREINO D" focus="Puxar" days={["Ter", "Sáb"]} />
      </div>
    </div>
  );
}
