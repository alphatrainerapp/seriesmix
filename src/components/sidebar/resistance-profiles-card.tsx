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
import type { Exercise } from '@/lib/types';
import { useMemo } from 'react';

interface ProfileSectionProps {
  title: string;
  count: number;
  exercises: string[];
  type: 'ascendente' | 'u-invertido' | 'descendente';
}

const ProfileSection = ({ title, count, exercises, type }: ProfileSectionProps) => {
  const configs = {
    ascendente: {
      bgColor: 'bg-emerald-100/60 dark:bg-emerald-950/30',
      textColor: 'text-emerald-800 dark:text-emerald-400',
      borderColor: 'border-emerald-300/50 dark:border-emerald-900/50',
      icon: TrendingUp,
    },
    'u-invertido': {
      bgColor: 'bg-blue-100/60 dark:bg-blue-950/30',
      textColor: 'text-blue-800 dark:text-blue-400',
      borderColor: 'border-blue-300/50 dark:border-blue-900/50',
      icon: RotateCcw,
    },
    descendente: {
      bgColor: 'bg-orange-100/60 dark:bg-orange-950/30',
      textColor: 'text-orange-800 dark:text-orange-400',
      borderColor: 'border-orange-300/50 dark:border-orange-900/50',
      icon: TrendingDown,
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  if (count === 0) return null;

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

export function ResistanceProfilesCard({ exercises, currentTab }: { exercises: Exercise[], currentTab: string }) {
  const profiles = useMemo(() => {
    const data = {
      ascendente: [] as string[],
      'u-invertido': [] as string[],
      descendente: [] as string[],
    };

    exercises.forEach((ex) => {
      if (ex.resistanceProfile) {
        data[ex.resistanceProfile].push(ex.name);
      }
    });

    return data;
  }, [exercises]);

  const mainProfile = useMemo(() => {
    const counts = [
      { type: 'ascendente', count: profiles.ascendente.length },
      { type: 'u-invertido', count: profiles['u-invertido'].length },
      { type: 'descendente', count: profiles.descendente.length },
    ];
    return counts.sort((a, b) => b.count - a.count)[0];
  }, [profiles]);

  const hasAnyData = profiles.ascendente.length > 0 || profiles['u-invertido'].length > 0 || profiles.descendente.length > 0;

  return (
    <Card className="bg-card shadow-sm border-border/60 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold tracking-tight">Perfis de resistência</CardTitle>
            <Info className="h-4 w-4 text-muted-foreground/40 cursor-help" />
          </div>
          <Select value={currentTab}>
            <SelectTrigger className="w-[100px] h-8 text-[11px] font-black rounded-lg border-border/80 uppercase">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/40">
              <SelectItem value="treino-a" className="text-[11px] font-bold">TREINO A</SelectItem>
              <SelectItem value="treino-b" className="text-[11px] font-bold">TREINO B</SelectItem>
              <SelectItem value="treino-c" className="text-[11px] font-bold">TREINO C</SelectItem>
              <SelectItem value="treino-d" className="text-[11px] font-bold">TREINO D</SelectItem>
              <SelectItem value="treino-e" className="text-[11px] font-bold">TREINO E</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {hasAnyData ? (
          <>
            <div className="grid grid-cols-1 gap-3">
              <ProfileSection 
                type="ascendente"
                title="ASCENDENTE"
                count={profiles.ascendente.length}
                exercises={profiles.ascendente}
              />
              <ProfileSection 
                type="u-invertido"
                title="U INVERTIDO"
                count={profiles['u-invertido'].length}
                exercises={profiles['u-invertido']}
              />
              <ProfileSection 
                type="descendente"
                title="DESCENDENTE"
                count={profiles.descendente.length}
                exercises={profiles.descendente}
              />
            </div>

            <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-4 shadow-inner-sm">
              <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-[13px] font-black text-foreground">Insight</p>
                <p className="text-[12px] text-foreground/80 leading-relaxed font-semibold">
                  Treino com predominância {mainProfile.type}, favorecendo maior tensão {mainProfile.type === 'ascendente' ? 'no final' : mainProfile.type === 'u-invertido' ? 'no meio' : 'no início'} da amplitude.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-muted-foreground font-medium">Nenhum exercício com perfil de resistência definido para este treino.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
