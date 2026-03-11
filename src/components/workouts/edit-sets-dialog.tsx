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
      <span>{label}</span>
    </div>
  </SelectItem>
);

const GRID_COLS_CLASS = "md:grid-cols-[40px_160px_1fr_90px_90px_40px]";

export function EditSetsDialog({
  children,
  exercise,
  onUpdateExercise,
}: {
  children: React.ReactNode;
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
}) {
  const [open, setOpen] = useState(false);
  const [sets, setSets] = useState<Set[]>(exercise.sets);

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
    setOpen(false);
  };
  
  React.useEffect(() => {
    setSets(exercise.sets);
  }, [exercise.sets]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-card p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Editar Séries do Exercício</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-4 max-h-[70vh] overflow-y-auto">
          {/* Desktop Header */}
          <div className={cn("hidden md:grid items-center gap-x-4 gap-y-2 text-[10px] text-muted-foreground mb-2 sticky top-0 bg-card py-2 z-10 uppercase font-black tracking-wider", GRID_COLS_CLASS)}>
            <div className="text-center">Série</div>
            <div>Tipo</div>
            <div className="text-center">Repetições/Tempo</div>
            <div className="text-center">Intervalo (s)</div>
            <div className="flex items-center justify-center gap-1">
              RIR <HelpCircle className="h-3 w-3" />
            </div>
            <div></div>
          </div>

          <div className="space-y-4 md:space-y-2">
            {sets.map((set, index) => {
              const setType = setTypeOptions.find((t) => t.value === set.type);
              const Icon = setType?.icon;
              
              return (
                <div key={set.id} className={cn("relative md:grid items-center md:gap-x-4 gap-y-3 p-4 md:p-0 rounded-lg border md:border-none bg-muted/30 md:bg-transparent transition-colors", GRID_COLS_CLASS)}>
                  {/* Série Number Label (Mobile: Badge Style) */}
                  <div className="flex items-center justify-between md:block mb-2 md:mb-0">
                    <span className="text-xs font-bold text-muted-foreground md:text-foreground uppercase tracking-wider md:hidden">Série {index + 1}</span>
                    <div className="hidden md:flex font-black text-foreground h-10 items-center justify-center w-8 text-sm">{index + 1}</div>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive/70 md:hidden" 
                      onClick={() => removeSet(set.id)}
                    >
                        <X className='h-4 w-4' />
                    </Button>
                  </div>

                  {/* Grid for Mobile Inputs */}
                  <div className="grid grid-cols-2 gap-3 md:contents">
                    {/* Tipo */}
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider">Tipo</label>
                      <Select
                        value={set.type}
                        onValueChange={(value) =>
                          handleSetChange(set.id, 'type', value)
                        }
                      >
                        <SelectTrigger className="bg-background h-10 px-2 rounded-xl text-xs font-bold">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className={cn('h-4 w-4', setType?.color)} />}
                              <span className="truncate">{setType?.label}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {setTypeOptions.map((type) => (
                            <SetTypeSelectItem key={type.value} {...type} />
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Reps/Time */}
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider text-center">Reps/Tempo</label>
                      <div className='flex items-center gap-1.5'>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 shrink-0 text-primary bg-background rounded-xl border-border/50" 
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
                          className="bg-background h-10 rounded-xl font-bold text-center"
                        />
                      </div>
                    </div>

                    {/* Interval */}
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider text-center">Intervalo</label>
                      <Input
                        value={set.interval}
                        onChange={(e) =>
                          handleSetChange(set.id, 'interval', e.target.value)
                        }
                        className="bg-background h-10 rounded-xl font-bold text-center"
                      />
                    </div>

                    {/* RIR */}
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-black text-muted-foreground uppercase md:hidden tracking-wider text-center">RIR</label>
                      <Input
                        placeholder="Ex: 2"
                        value={set.rir}
                        onChange={(e) =>
                          handleSetChange(set.id, 'rir', e.target.value)
                        }
                        className="bg-background h-10 rounded-xl font-bold text-center"
                      />
                    </div>
                  </div>

                  {/* Desktop Delete Button */}
                  <div className="hidden md:flex items-center justify-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70 hover:text-destructive hover:bg-destructive/10 rounded-full" onClick={() => removeSet(set.id)}>
                        <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-6 mb-2'>
            <Button variant="outline" className="w-full md:w-auto text-primary border-primary/20 hover:bg-primary/5 h-12 md:h-9 rounded-xl font-bold" onClick={addNewSet}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar nova série
            </Button>
          </div>
        </div>

        <div className="p-6 bg-muted/50 border-t">
          <Button
            className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white h-12 md:h-11 font-black uppercase tracking-widest italic"
            size="lg"
            onClick={handleSave}
          >
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
