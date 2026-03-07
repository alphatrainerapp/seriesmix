'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, X, ChevronDown } from 'lucide-react';

const DayBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge
    variant="secondary"
    className="bg-primary/10 text-primary border-transparent gap-1.5 px-3 py-1.5 rounded-full font-bold hover:bg-primary/20 transition-colors"
  >
    {children}
    <button className="hover:text-destructive transition-colors">
      <X className="h-3.5 w-3.5" />
    </button>
  </Badge>
);

interface TrainingCardProps {
  title: string;
  focus: string;
  days: string[];
}

const TrainingCard = ({ title, focus, days }: TrainingCardProps) => (
  <Card className="p-0 bg-card shadow-sm overflow-hidden rounded-2xl border-none">
    <div className="p-5 space-y-4">
      <h3 className="font-bold text-base tracking-tight uppercase">{title}</h3>
      <Select defaultValue={focus.toLowerCase()}>
        <SelectTrigger className="bg-background border-border rounded-xl h-12 focus:ring-primary/20">
          <SelectValue placeholder={focus} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="empurrar">Empurrar</SelectItem>
          <SelectItem value="puxar">Puxar</SelectItem>
          <SelectItem value="inferiores">Inferiores</SelectItem>
          <SelectItem value="completo">Completo</SelectItem>
        </SelectContent>
      </Select>
    </div>
    
    <Separator className="bg-border/50" />
    
    <div className="p-5 space-y-3">
      <label className="text-sm font-bold text-muted-foreground ml-1">Dias</label>
      <div className="flex flex-wrap items-center gap-2">
        {days.map((day) => (
          <DayBadge key={day}>{day}</DayBadge>
        ))}
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 rounded-full border-dashed border-2 bg-transparent text-muted-foreground/40 hover:text-primary hover:border-primary transition-all"
        >
          <div className="flex items-center gap-0.5">
            <Plus className="h-4 w-4" />
            <ChevronDown className="h-2.5 w-2.5" />
          </div>
        </Button>
      </div>
    </div>
  </Card>
);

export function TrainingSplit() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-black tracking-tighter text-foreground uppercase leading-tight">
          DIVISÃO DE TREINAMENTO
        </h2>
        <Button className="bg-[#009688] hover:bg-[#00796b] text-white rounded-xl px-6 h-11 font-bold gap-2 shadow-sm transition-colors border-none">
          <Plus className="h-5 w-5" />
          Selecionar Modelo
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <TrainingCard title="TREINO A" focus="Empurrar" days={["Segunda"]} />
        <TrainingCard title="TREINO B" focus="Puxar" days={["Quarta"]} />
        <TrainingCard title="TREINO C" focus="Inferiores" days={["Sexta"]} />
        <TrainingCard title="TREINO D" focus="Puxar" days={["Terça", "Sábado"]} />
      </div>
    </div>
  );
}
