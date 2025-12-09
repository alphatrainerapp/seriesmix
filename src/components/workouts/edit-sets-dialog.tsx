'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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

  const handleSetChange = (id: number, field: keyof Set, value: string | 'reps' | 'time') => {
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
  
  // Sync state if exercise prop changes
  React.useEffect(() => {
    setSets(exercise.sets);
  }, [exercise.sets]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar Séries do Exercício</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] items-center gap-x-4 gap-y-2 text-sm text-muted-foreground px-4">
            <div className="font-medium">Série</div>
            <div className="font-medium">Tipo</div>
            <div className="font-medium">Repetições</div>
            <div className="font-medium">Intervalo (s)</div>
            <div className="flex items-center gap-1 font-medium">
              RIR <HelpCircle className="h-4 w-4" />
            </div>
            <div></div>

            {sets.map((set, index) => {
              const setType = setTypeOptions.find((t) => t.value === set.type);
              const Icon = setType?.icon;
              return (
                <React.Fragment key={set.id}>
                  <div className="font-semibold text-foreground">{index + 1}</div>
                  <div>
                    <Select
                      value={set.type}
                      onValueChange={(value) =>
                        handleSetChange(set.id, 'type', value)
                      }
                    >
                      <SelectTrigger className="bg-background">
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
                  <div className='flex items-center gap-2'>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => toggleSetUnit(set.id)}>
                      {set.unit === 'reps' ? <Hash className="h-5 w-5"/> : <Timer className="h-5 w-5"/>}
                    </Button>
                    <Input
                      value={set.reps}
                      onChange={(e) =>
                        handleSetChange(set.id, 'reps', e.target.value)
                      }
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Input
                      value={set.interval}
                      onChange={(e) =>
                        handleSetChange(set.id, 'interval', e.target.value)
                      }
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder=""
                      value={set.rir}
                      onChange={(e) =>
                        handleSetChange(set.id, 'rir', e.target.value)
                      }
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/70" onClick={() => removeSet(set.id)}>
                        <X className='h-4 w-4' />
                    </Button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <Separator />
        <div className='px-6 py-2'>
            <Button variant="link" className="p-0 h-auto text-primary" onClick={addNewSet}>
                <Plus className="h-4 w-4 mr-1" />
                Adicionar nova série
            </Button>
        </div>
        <div className="px-6 pb-4">
          <Button
            className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white"
            size="lg"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
