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
import { Separator } from '../ui/separator';
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
          <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-2 sticky top-0 bg-card py-2 z-10">
            <div className="font-medium">Série</div>
            <div className="font-medium">Tipo</div>
            <div className="font-medium">Repetições/Tempo</div>
            <div className="font-medium">Intervalo (s)</div>
            <div className="flex items-center gap-1 font-medium">
              RIR <HelpCircle className="h-4 w-4" />
            </div>
            <div></div>
          </div>

          <div className="space-y-4 md:space-y-2">
            {sets.map((set, index) => {
              const setType = setTypeOptions.find((t) => t.value === set.type);
              const Icon = setType?.icon;
              
              return (
                <div key={set.id} className="relative md:grid md:grid-cols-[auto_1fr_1fr_1fr_1fr_auto] items-center md:gap-x-4 gap-y-3 p-4 md:p-0 rounded-lg border md:border-none bg-muted/30 md:bg-transparent">
                  {/* Série Number Label (Mobile: Badge Style) */}
                  <div className="flex items-center justify-between md:block mb-2 md:mb-0">
                    <span className="text-xs font-bold text-muted-foreground md:text-foreground uppercase tracking-wider md:hidden">Série {index + 1}</span>
                    <div className="hidden md:flex font-semibold text-foreground h-10 items-center justify-center w-8">{index + 1}</div>
                    
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
                      <label className="text-[10px] font-medium text-muted-foreground uppercase md:hidden">Tipo</label>
                      <Select
                        value={set.type}
                        onValueChange={(value) =>
                          handleSetChange(set.id, 'type', value)
                        }
                      >
                        <SelectTrigger className="bg-background h-10">
                          <SelectValue>
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className={cn('h-4 w-4', setType?.color)} />}
                              <span>{setType?.label}</span>
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
                      <label className="text-[10px] font-medium text-muted-foreground uppercase md:hidden">Reps/Tempo</label>
                      <div className='flex items-center gap-1.5'>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-10 w-10 shrink-0 text-primary bg-background" 
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
                          className="bg-background h-10"
                        />
                      </div>
                    </div>

                    {/* Interval */}
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase md:hidden">Intervalo (s)</label>
                      <Input
                        value={set.interval}
                        onChange={(e) =>
                          handleSetChange(set.id, 'interval', e.target.value)
                        }
                        className="bg-background h-10"
                      />
                    </div>

                    {/* RIR */}
                    <div className="space-y-1 md:space-y-0">
                      <label className="text-[10px] font-medium text-muted-foreground uppercase md:hidden flex items-center gap-1">RIR <HelpCircle className="h-3 w-3"/></label>
                      <Input
                        placeholder="Ex: 2"
                        value={set.rir}
                        onChange={(e) =>
                          handleSetChange(set.id, 'rir', e.target.value)
                        }
                        className="bg-background h-10"
                      />
                    </div>
                  </div>

                  {/* Desktop Delete Button */}
                  <div className="hidden md:block">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70" onClick={() => removeSet(set.id)}>
                        <X className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className='mt-6 mb-2'>
            <Button variant="outline" className="w-full md:w-auto text-primary border-primary/20 hover:bg-primary/5 h-12 md:h-9" onClick={addNewSet}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar nova série
            </Button>
          </div>
        </div>

        <div className="p-6 bg-muted/50 border-t">
          <Button
            className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white h-12 md:h-11 font-semibold"
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
