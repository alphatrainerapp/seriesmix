'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Search, X, Check } from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

export function ExerciseSearchDialog({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: (exerciseName: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [highlightedExercise, setHighlightedExercise] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    return Array.from(new Set(systemExercises.map((ex) => ex.category))).sort();
  }, []);

  const filteredExercises = React.useMemo(() => {
    return systemExercises.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(ex.category);
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategories]);

  const handleSelect = (name: string) => {
    setHighlightedExercise(name);
  };

  const handleConfirm = () => {
    if (highlightedExercise) {
      onSelect(highlightedExercise);
      setOpen(false);
      resetState();
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const resetState = () => {
    setSearch('');
    setSelectedCategories([]);
    setHighlightedExercise(null);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) resetState();
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden bg-card border-none shadow-2xl rounded-3xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold tracking-tight">Buscar Exercício</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-4 space-y-4">
          <div className="relative group">
            <Input
              placeholder="Digite o nome do exercício..."
              className="h-12 bg-muted/30 border border-border/50 rounded-xl text-base focus-visible:ring-2 focus-visible:ring-primary/20 pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search ? (
               <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearch('')}
               >
                 <X className="h-4 w-4" />
               </button>
            ) : (
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            )}
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Filtrar por Grupo Muscular</p>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex w-max gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-1.5 text-[11px] font-bold border-border/60 transition-all",
                      selectedCategories.includes(category) 
                        ? "bg-primary text-white border-primary" 
                        : "hover:bg-muted text-muted-foreground"
                    )}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    {selectedCategories.includes(category) && <Check className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>
        </div>

        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-3 pb-24">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <div
                  key={exercise.name}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-2xl transition-all group cursor-pointer border border-transparent",
                    highlightedExercise === exercise.name 
                      ? "bg-primary/5 border-primary/20" 
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => handleSelect(exercise.name)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image 
                        src={`https://picsum.photos/seed/${exercise.imageHint}/100/100`}
                        alt={exercise.name}
                        fill
                        className="object-cover"
                        data-ai-hint={exercise.imageHint}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-primary uppercase tracking-tight">
                        {exercise.category}
                      </span>
                      <span className="font-bold text-sm truncate text-foreground">{exercise.name}</span>
                    </div>
                  </div>
                  {highlightedExercise === exercise.name && (
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                       <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-20 text-center opacity-30">
                <Search className="h-10 w-10 mx-auto mb-3" />
                <p className="text-sm font-bold uppercase tracking-widest">Nenhum exercício encontrado</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)]">
           <Button 
            className="w-full bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 text-white rounded-xl h-12 font-black shadow-lg shadow-orange-500/20 uppercase tracking-widest text-[11px]"
            onClick={handleConfirm}
            disabled={!highlightedExercise}
           >
             CONFIRMAR SELEÇÃO
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
