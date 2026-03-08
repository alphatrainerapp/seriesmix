'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const DayBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00bfa5]/40 text-[#00bfa5] text-sm font-medium bg-white hover:border-[#00bfa5] transition-colors shadow-sm">
    <button className="text-muted-foreground/60 hover:text-destructive transition-colors">
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
  <div className="space-y-3">
    <div className="bg-white border border-border rounded-2xl px-7 py-4 flex items-center justify-between shadow-sm hover:border-[#00bfa5]/30 transition-all cursor-pointer">
      <div className="space-y-0.5">
        <h4 className="text-[13px] font-semibold tracking-tight text-muted-foreground uppercase">{title}</h4>
        <p className="text-base text-foreground/80 font-medium">{focus}</p>
      </div>
      <ChevronDown className="h-4 w-4 text-[#00bfa5]/60" />
    </div>
    
    <div className="px-2 space-y-2">
      <p className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-wider">Dias</p>
      <div className="flex flex-wrap items-center gap-2">
        {days.map((day) => (
          <DayBadge key={day}>{day}</DayBadge>
        ))}
        <button className="h-8 w-8 rounded-full border border-border bg-white text-muted-foreground/60 hover:text-[#00bfa5] hover:border-[#00bfa5] flex items-center justify-center transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  </div>
);

export function TrainingSplit() {
  const splits = [
    { title: "TREINO A", focus: "Inferiores", days: ["Segunda"] },
    { title: "TREINO B", focus: "Puxar", days: ["Terça"] },
    { title: "TREINO C", focus: "Empurrar", days: ["Quarta"] },
    { title: "TREINO D", focus: "Inferiores", days: ["Quinta"] },
    { title: "TREINO E", focus: "Fullbody", days: ["Sábado"] },
  ];

  return (
    <div className="bg-[#f8f9fa] rounded-2xl border-t-4 border-[#00bfa5] p-6 md:p-10 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-4 border-b border-border/50">
        <h2 className="text-xl font-bold tracking-tight text-[#4a5568] uppercase">
          DIVISÃO DE TREINAMENTO
        </h2>
        
        <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-lg px-5 h-10 font-bold gap-2 shadow-md border-none shrink-0">
          <Plus className="h-4 w-4" />
          Selecionar Modelo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {splits.map((split) => (
          <TrainingBlock key={split.title} {...split} />
        ))}
      </div>
    </div>
  );
}
