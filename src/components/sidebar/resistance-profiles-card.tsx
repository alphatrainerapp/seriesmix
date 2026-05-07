'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Info, TrendingUp, TrendingDown, RotateCcw, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  title: string;
  count: number;
  exercises: string[];
  type: 'ascendente' | 'u-invertido' | 'descendente';
}

const ProfileSection = ({ title, count, exercises, type }: ProfileSectionProps) => {
  const configs = {
    ascendente: {
      bgColor: 'bg-emerald-100/40 dark:bg-emerald-950/30',
      textColor: 'text-emerald-700 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-900/50',
      icon: TrendingUp,
    },
    'u-invertido': {
      bgColor: 'bg-blue-100/40 dark:bg-blue-950/30',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-900/50',
      icon: RotateCcw,
    },
    descendente: {
      bgColor: 'bg-orange-100/40 dark:bg-orange-950/30',
      textColor: 'text-orange-700 dark:text-orange-400',
      borderColor: 'border-orange-200 dark:border-orange-900/50',
      icon: TrendingDown,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "p-4 rounded-xl border transition-all hover:shadow-md",
      config.bgColor,
      config.borderColor
    )}>
      <div className="flex items-center justify-between mb-3">
        <h4 className={cn("text-[11px] font-black uppercase tracking-widest", config.textColor)}>
          {title} ({count})
        </h4>
        <Icon className={cn("h-4 w-4", config.textColor)} />
      </div>
      <ul className="space-y-1.5">
        {exercises.map((exercise, index) => (
          <li key={index} className="flex items-center gap-2 text-[12px] font-bold text-foreground">
            <div className={cn("h-1.5 w-1.5 rounded-full", config.textColor.replace('text', 'bg'))} />
            {exercise}
          </li>
        ))}
      </ul>
    </div>
  );
};

export function ResistanceProfilesCard() {
  return (
    <Card className="bg-card shadow-sm border-border/60 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold tracking-tight">Perfis de resistência</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground/40 cursor-help" />
          </div>
          <Select defaultValue="treino-a">
            <SelectTrigger className="w-[100px] h-8 text-[11px] font-black rounded-lg border-border/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/40">
              <SelectItem value="treino-a" className="text-[11px] font-bold">Treino A</SelectItem>
              <SelectItem value="treino-b" className="text-[11px] font-bold">Treino B</SelectItem>
              <SelectItem value="treino-c" className="text-[11px] font-bold">Treino C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <ProfileSection 
            type="ascendente"
            title="ASCENDENTE"
            count={3}
            exercises={['Supino reto', 'Supino inclinado', 'Tríceps corda']}
          />
          <ProfileSection 
            type="u-invertido"
            title="U INVERTIDO"
            count={2}
            exercises={['Peck deck', 'Crucifixo máquina']}
          />
          <ProfileSection 
            type="descendente"
            title="DESCENDENTE"
            count={1}
            exercises={['Crossover']}
          />
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-4 shadow-inner-sm">
          <div className="bg-primary/20 p-2 rounded-lg shrink-0">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-[13px] font-black text-foreground">Insight</p>
            <p className="text-[12px] text-foreground/80 leading-relaxed font-semibold">
              Treino com predominância ascendente, favorecendo maior tensão no final da amplitude.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}