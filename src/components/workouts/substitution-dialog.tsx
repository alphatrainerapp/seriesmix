'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  X, 
  Shuffle, 
  Trash2, 
  GripVertical, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/lib/types';

interface SubstitutionDialogProps {
  children: React.ReactNode;
  exercise: Exercise;
  onSave: (substitutions: string[]) => void;
}

export function SubstitutionDialog({ children, exercise, onSave }: SubstitutionDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>(exercise.substitutions || []);

  const filteredExercises = React.useMemo(() => {
    return systemExercises.filter((ex) => {
      const isSelf = ex.name === exercise.name;
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      return !isSelf && matchesSearch;
    });
  }, [search, exercise.name]);

  const toggleExercise = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) {
        return prev.filter((n) => n !== name);
      }
      if (prev.length < 3) {
        return [...prev, name];
      }
      return prev;
    });
  };

  const handleSave = () => {
    onSave(selected);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden bg-card border-none shadow-2xl rounded-[24px]">
        <DialogHeader className="p-8 pb-4">
          <div className="space-y-1">
            <DialogTitle className="text-xl font-bold text-foreground">
              Substituições do exercício
            </DialogTitle>
            <p className="text-[#00bfa5] text-sm font-bold">
              {exercise.name}
            </p>
          </div>
          
          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar exercício..."
              className="h-12 bg-muted/30 border-none rounded-xl pl-11 text-sm focus-visible:ring-[#00bfa5]/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </DialogHeader>

        <div className="px-8 py-2 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Selecione até 3 substituições
          </span>
          <span className={cn(
            "text-[11px] font-black uppercase tracking-widest",
            selected.length === 3 ? "text-[#00bfa5]" : "text-muted-foreground"
          )}>
            {selected.length}/3 selecionadas
          </span>
        </div>

        <ScrollArea className="h-[300px] px-8">
          <div className="space-y-2 pb-4">
            {filteredExercises.map((ex) => {
              const isSelected = selected.includes(ex.name);
              const isDisabled = !isSelected && selected.length >= 3;

              return (
                <div
                  key={ex.name}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group",
                    isSelected ? "border-[#00bfa5] bg-[#00bfa5]/5" : "border-border/40 hover:border-border",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isDisabled && toggleExercise(ex.name)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox 
                      checked={isSelected}
                      disabled={isDisabled}
                      className="border-muted-foreground/30 data-[state=checked]:bg-[#00bfa5] data-[state=checked]:border-[#00bfa5]"
                    />
                    <div className="relative h-10 w-14 rounded-lg overflow-hidden bg-muted">
                       <Image 
                        src={`https://picsum.photos/seed/${ex.imageHint}/100/100`}
                        alt={ex.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-bold text-foreground group-hover:text-[#00bfa5] transition-colors">
                      {ex.name}
                    </span>
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-[#00bfa5]" />}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {selected.length > 0 && (
          <div className="p-8 pt-4 border-t border-border/10 bg-muted/10">
            <p className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-4 pl-1">Selecionadas</p>
            <div className="space-y-2">
              {selected.map((name, index) => (
                <div key={name} className="flex items-center justify-between bg-card p-3 rounded-xl border border-border/40 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted-foreground w-4">{index + 1}</span>
                    <span className="text-sm font-bold text-foreground">{name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground/30" />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExercise(name);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 pt-4 space-y-6">
          <div className="bg-[#00bfa5]/5 border border-[#00bfa5]/10 p-4 rounded-xl flex gap-3 items-start">
            <Info className="h-4 w-4 text-[#00bfa5] shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              Essas substituições ficarão disponíveis para o aluno no app de forma rápida e prática.
            </p>
          </div>

          <DialogFooter className="gap-3 sm:gap-0">
            <Button
              variant="ghost"
              className="rounded-xl font-bold text-muted-foreground hover:text-foreground h-12"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-12 font-black uppercase tracking-widest text-[12px] shadow-lg shadow-[#00bfa5]/10"
              onClick={handleSave}
            >
              Salvar substituições
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
