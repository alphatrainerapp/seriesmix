'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Dumbbell, ChevronRight } from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';

export function ExerciseSearchDialog({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: (exerciseName: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filteredExercises = systemExercises.filter((ex) =>
    ex.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (name: string) => {
    onSelect(name);
    setOpen(false);
    setSearch('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[450px] p-0 gap-0 overflow-hidden bg-card border-none shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black italic uppercase tracking-tighter">Buscar Exercício</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Digite o nome do exercício..."
              className="pl-10 h-12 bg-muted/30 border-none rounded-xl text-base focus-visible:ring-2 focus-visible:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <ScrollArea className="h-[350px] px-2 pb-6">
          <div className="px-4 space-y-1">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3 ml-2">Resultados</p>
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <button
                  key={exercise}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-primary/10 text-left transition-all group active:scale-[0.98]"
                  onClick={() => handleSelect(exercise)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Dumbbell className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <span className="font-bold text-sm tracking-tight">{exercise}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </button>
              ))
            ) : (
              <div className="py-12 text-center space-y-2">
                <Dumbbell className="h-10 w-10 text-muted-foreground/20 mx-auto" />
                <p className="text-sm text-muted-foreground font-medium">Nenhum exercício encontrado.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
