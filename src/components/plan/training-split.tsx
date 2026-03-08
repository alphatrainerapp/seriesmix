'use client';

import { Button } from '@/components/ui/button';
import { Plus, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const DayBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00bfa5]/40 text-[#00bfa5] text-[11px] font-bold bg-background hover:border-[#00bfa5] transition-colors shadow-sm dark:bg-muted/20">
    <button className="text-muted-foreground/60 hover:text-destructive transition-colors">
      <X className="h-3 w-3" />
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
  <div className="space-y-4 flex-1">
    <div className="bg-card dark:bg-card border border-border rounded-2xl px-6 py-5 flex items-center justify-between shadow-sm hover:border-[#00bfa5]/30 transition-all cursor-pointer group">
      <div className="space-y-0.5">
        <h4 className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">{title}</h4>
        <p className="text-lg text-foreground font-bold tracking-tight">{focus}</p>
      </div>
      <ChevronDown className="h-4 w-4 text-[#00bfa5]/60 group-hover:text-[#00bfa5] transition-colors" />
    </div>
    
    <div className="px-1 space-y-2">
      <p className="text-[10px] font-black text-muted-foreground/50 uppercase tracking-[0.2em] mb-3">Dias</p>
      <div className="flex flex-wrap items-center gap-2">
        {days.map((day) => (
          <DayBadge key={day}>{day}</DayBadge>
        ))}
        <button className="h-8 w-8 rounded-full border border-border bg-background dark:bg-muted/10 text-muted-foreground/60 hover:text-[#00bfa5] hover:border-[#00bfa5] flex items-center justify-center transition-colors shadow-sm">
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
    <div className="bg-card dark:bg-card/40 rounded-3xl border-t-4 border-[#00bfa5] p-6 md:p-8 shadow-sm border-x border-b border-border/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-border/10">
        <h2 className="text-base font-black tracking-tighter text-foreground/80 uppercase italic">
          DIVISÃO DE TREINAMENTO
        </h2>
        
        <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl px-6 h-11 font-bold gap-2 shadow-lg shadow-[#00bfa5]/20 border-none shrink-0 transition-transform active:scale-95">
          <Plus className="h-5 w-5" />
          Selecionar Modelo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {splits.map((split) => (
          <TrainingBlock key={split.title} {...split} />
        ))}
      </div>
    </div>
  );
}
