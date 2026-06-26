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
import { Switch } from '@/components/ui/switch';
import {
  Flame,
  SlidersHorizontal,
  Check,
  Plus,
  Trash2,
  HelpCircle,
  RefreshCcw,
  List,
  X,
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
    label: 'Aquec.',
    icon: Flame,
    color: 'text-orange-500',
  },
  {
    value: 'preparatoria',
    label: 'Prep.',
    icon: SlidersHorizontal,
    color: 'text-emerald-500',
  },
  { 
    value: 'trabalho', 
    label: 'Trab.', 
    icon: Check, 
    color: 'text-green-500' 
  },
];

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

  const addNewSet = () => {
    const newSet: Set = {
      id: sets.length > 0 ? Math.max(...sets.map(s => s.id)) + 1 : 1,
      type: 'trabalho',
      unit: 'reps',
      reps: '10-12',
      interval: '40',
      rir: '-',
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
    if (open) {
      setSets(exercise.sets);
    }
  }, [exercise.sets, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[550px] w-[95vw] max-w-[95vw] sm:w-full bg-white p-0 gap-0 overflow-hidden border-none shadow-2xl rounded-[24px]">
        <DialogHeader className="p-6 sm:p-8 pb-4 relative">
          <DialogTitle className="text-[20px] sm:text-[22px] font-bold text-slate-800">Editar Séries do Exercício</DialogTitle>
          <p className="text-slate-400 font-medium mt-1 text-sm sm:text-base truncate pr-8">{exercise.name}</p>
          <DialogClose className="absolute right-6 sm:right-8 top-6 sm:top-8 opacity-40 hover:opacity-100">
            <X className="h-6 w-6" />
          </DialogClose>
        </DialogHeader>
        
        <div className="px-4 sm:px-8 pb-4">
          {/* Header da Tabela - Ajustado para melhor espaçamento */}
          <div className="grid grid-cols-[24px_90px_1fr_1fr_50px_32px] gap-2 sm:gap-3 mb-4 px-1 items-center">
            <div></div>
            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Tipo</div>
            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Reps</div>
            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Int(s)</div>
            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">RIR</div>
            <div className="flex justify-center">
               <HelpCircle className="h-4 w-4 text-slate-300" />
            </div>
          </div>

          {/* Lista de Séries */}
          <div className="space-y-4 max-h-[45vh] overflow-y-auto no-scrollbar pr-1">
            {sets.map((set, index) => {
              const setType = setTypeOptions.find((t) => t.value === set.type);
              const Icon = setType?.icon || Check;
              
              return (
                <div key={set.id} className="grid grid-cols-[24px_90px_1fr_1fr_50px_32px] gap-2 sm:gap-3 items-center group">
                  <div className="flex justify-center">
                    <Icon className={cn('h-5 w-5', setType?.color)} />
                  </div>

                  <Select
                    value={set.type}
                    onValueChange={(value) =>
                      handleSetChange(set.id, 'type', value)
                    }
                  >
                    <SelectTrigger className="bg-slate-50 h-10 sm:h-11 border-slate-100 rounded-xl text-[10px] sm:text-xs font-black uppercase px-2 focus:ring-emerald-500/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {setTypeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="font-bold text-xs">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-1">
                    <Input
                      value={set.reps}
                      onChange={(e) => handleSetChange(set.id, 'reps', e.target.value)}
                      className="bg-slate-50 h-10 sm:h-11 border-slate-100 rounded-xl text-center font-bold text-xs sm:text-sm px-1 min-w-0"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm">
                      <RefreshCcw className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Input
                      value={set.interval}
                      onChange={(e) => handleSetChange(set.id, 'interval', e.target.value)}
                      className="bg-slate-50 h-10 sm:h-11 border-slate-100 rounded-xl text-center font-bold text-xs sm:text-sm px-1 min-w-0"
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm">
                      <List className="h-3.5 w-3.5" />
                    </Button>
                  </div>

                  <Input
                    value={set.rir}
                    onChange={(e) => handleSetChange(set.id, 'rir', e.target.value)}
                    className="bg-slate-50 h-10 sm:h-11 border-slate-100 rounded-xl text-center font-bold text-xs sm:text-sm px-1 min-w-0"
                  />

                  <div className="flex justify-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 text-red-500 hover:bg-red-50 rounded-xl" 
                      onClick={() => removeSet(set.id)}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão Adicionar */}
          <button 
            onClick={addNewSet}
            className="w-full mt-6 h-12 sm:h-14 border-2 border-dashed border-emerald-500/30 rounded-2xl flex items-center justify-center gap-2 text-emerald-500 font-bold hover:bg-emerald-50 transition-colors text-sm"
          >
            <Plus className="h-5 w-5" />
            Adicionar nova série
          </button>

          {/* Opção Aplicar Todos */}
          <div className="flex items-center justify-between mt-8 mb-4 px-2">
            <div className="flex items-center gap-3">
              <Switch 
                id="apply-to-all" 
                checked={shouldApplyToAll}
                onCheckedChange={setShouldApplyToAll}
                className="data-[state=checked]:bg-emerald-500"
              />
              <label htmlFor="apply-to-all" className="text-xs sm:text-sm font-bold text-slate-500 cursor-pointer uppercase tracking-tight">
                Aplicar para todos os exercícios
              </label>
            </div>
            <HelpCircle className="h-5 w-5 text-slate-300" />
          </div>
        </div>

        {/* Footer com Botão Salvar */}
        <div className="p-6 sm:p-8 pt-4">
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white h-14 sm:h-[60px] rounded-2xl font-black text-base sm:text-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] uppercase tracking-widest"
            onClick={handleSave}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
