'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Flame,
  SlidersHorizontal,
  Dumbbell,
  Timer,
  HelpCircle,
  Plus,
  X,
  Hash,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise, Set, SetType } from '@/lib/types';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const setTypeOptions: {
  value: SetType;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    value: 'aquecimento',
    label: 'Aquecimento',
    icon: Flame,
    color: 'text-yellow-500',
  },
  {
    value: 'preparatoria',
    label: 'Preparatória',
    icon: SlidersHorizontal,
    color: 'text-blue-500',
  },
  { value: 'trabalho', label: 'Trabalho', icon: Dumbbell, color: 'text-green-500' },
];

const SetTypeSelectItem = ({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
}) => (
  <SelectItem value={value}>
    <div className="flex items-center gap-2">
      <Icon className={cn('h-4 w-4', color)} />
      <span className="font-bold">{label}</span>
    </div>
  </SelectItem>
);

const GRID_COLS_CLASS = "md:grid-cols-[40px_160px_1fr_90px_90px_40px]";

export function EditSetsDialog({
  children,
  exercise,
  onUpdateExercise,
  onApplyToAll,
}: {
  children: React.ReactNode;
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
  onApplyToAll?: (sets: Set[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [sets, setSets] = useState<Set[]>(exercise.sets);
  const [shouldApplyToAll, setShouldApplyToAll] = useState(false);

  const handleSetChange = (id: number, field: keyof Set, value: string) => {
    setSets((prevSets) =>
      prevSets.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const toggleSetUnit = (id: number) => {
    setSets((prevSets) =>
      prevSets.map((s) => {
        if (s.id === id) {
          return { ...s, unit: s.unit === 'reps' ? 'time' : 'reps' };
        }
        return s;
      })
    );
  };

  const addNewSet = () => {
    const newSet: Set = {
      id: sets.length > 0 ? Math.max(...sets.map(s => s.id)) + 1 : 1,
      type: 'trabalho',
      unit: 'reps',
      reps: '8-12',
      interval: '60',
      rir: '',
    };
    setSets([...sets, newSet]);
  };

  const removeSet = (id: number) => {
    setSets(sets.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    onUpdateExercise({ ...exercise, sets });
    if (shouldApplyToAll && onApplyToAll) {
      onApplyToAll(sets);
    }
    setOpen(false);
  };
  
  React.useEffect(() => {
    setSets(exercise.sets);
  }, [exercise.sets, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-card p-0 gap-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black uppercase tracking-tighter italic">Editar Séries</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          <div className={cn("hidden md:grid items-center gap-x-4 gap-y-2 text-[10px] text-muted-foreground/60 mb-2 sticky top-0 bg-card py-2 z-10 uppercase font-black tracking-[0.15em]", GRID_COLS_CLASS)}>
            <div className="text-center">Série</div>
            <div>Tipo</div>
            <div className="text-center">Reps / Tempo</div>
            <div className="text-center">Intervalo</div>
            <div className="flex items-center justify-center gap-1">
              RIR <HelpCircle className="h-3 w-3 opacity-50" />
            </div>
            <div></div>
          </div>

          <div className="space-y-4 md:space-y-2">
            {sets.map((set, index) => {
              const setType = setTypeOptions.find((t) => t.value === set.type);
              const Icon = setType?.icon;
              
              return (
                <div key={set.id} className={cn("relative md:grid items-center md:gap-x-4 gap-y-3 p-4 md:p-0 rounded-2xl border md:border-none bg-muted/20 md:bg-transparent transition-all", GRID_COLS_CLASS)}>
                  <div className="flex items-center justify-between md:block mb-2 md:mb-0">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest md:hidden">Série {index + 1}</span>
                    <div className="hidden md:flex font-black text-foreground h-10 items-center justify-center w-10 text-sm bg-muted/40 rounded-lg">{index + 1}</div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive/70 md:hidden" 
                      onClick={() => removeSet(set.id)}
                    >
                        <X className='h-4 w-4' />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:contents">
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider">Tipo</label>
                      <Select
                        value={set.type}
                        onValueChange={(value) =>
                          handleSetChange(set.id, 'type', value)
                        }
                      >
                        <SelectTrigger className="bg-background h-10 px-3 rounded-lg text-sm font-bold border-border/40 focus:ring-primary/20">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className={cn('h-4 w-4', setType?.color)} />}
                              <span className="truncate">{setType?.label}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {setTypeOptions.map((type) => (
                            <SetTypeSelectItem key={type.value} {...type} />
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider text-center">Reps/Tempo</label>
                      <div className='flex items-center gap-1.5'>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 shrink-0 text-primary bg-background rounded-lg border-border/40 hover:bg-primary/5" 
                          onClick={() => toggleSetUnit(set.id)}
                          type="button"
                        >
                          {set.unit === 'reps' ? <Hash className="h-4 w-4"/> : <Timer className="h-4 w-4"/>}
                        </Button>
                        <Input
                          value={set.reps}
                          onChange={(e) =>
                            handleSetChange(set.id, 'reps', e.target.value)
                          }
                          className="bg-background h-10 rounded-lg font-bold text-center border-border/40 text-sm md:text-[14px]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider text-center">Intervalo</label>
                      <Input
                        value={set.interval}
                        onChange={(e) =>
                          handleSetChange(set.id, 'interval', e.target.value)
                        }
                        className="bg-background h-10 rounded-lg font-bold text-center border-border/40 text-sm md:text-[14px]"
                      />
                    </div>

                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider text-center">RIR</label>
                      <Input
                        placeholder="Ex: 2"
                        value={set.rir}
                        onChange={(e) =>
                          handleSetChange(set.id, 'rir', e.target.value)
                        }
                        className="bg-background h-10 rounded-lg font-bold text-center border-border/40 text-sm md:text-[14px]"
                      />
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-full" onClick={() => removeSet(set.id)}>
                        <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-6 mb-2'>
            <Button variant="outline" className="w-full md:w-auto text-primary border-primary/20 hover:bg-primary/5 h-12 md:h-10 rounded-lg font-black text-[11px] uppercase tracking-widest" onClick={addNewSet}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Série
            </Button>
          </div>
        </div>

        <div className="p-6 bg-muted/50 border-t flex flex-col gap-4">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white h-12 md:h-14 font-black uppercase tracking-[0.2em] text-sm shadow-lg shadow-primary/20 rounded-lg"
            size="lg"
            onClick={handleSave}
          >
            Salvar Alterações
          </Button>
          
          {onApplyToAll && (
            <div className="flex items-center justify-center gap-3 py-1">
              <Checkbox 
                id="apply-to-all" 
                checked={shouldApplyToAll} 
                onCheckedChange={(checked) => setShouldApplyToAll(checked as boolean)}
                className="border-primary/40 data-[state=checked]:bg-primary h-5 w-5 rounded-md"
              />
              <label 
                htmlFor="apply-to-all" 
                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors"
              >
                Replicar para todos os exercícios deste treino
              </label>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}