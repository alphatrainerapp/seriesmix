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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, X, Plus, ChevronRight } from 'lucide-react';
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
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(['Posterior de Coxa (Isquiotibiais)']);
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
    setSelectedCategories(['Posterior de Coxa (Isquiotibiais)']);
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
          <DialogTitle className="text-xl font-bold tracking-tight">Exercícios</DialogTitle>
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
            {search && (
               <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearch('')}
               >
                 <X className="h-4 w-4" />
               </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedCategories.map(cat => (
              <Badge 
                key={cat} 
                className="bg-black hover:bg-black/90 text-white rounded-full px-4 py-1.5 flex items-center gap-2 text-[11px] font-bold"
              >
                {cat}
                <button onClick={() => toggleCategory(cat)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-dashed border-border text-[11px] font-bold text-muted-foreground hover:bg-muted transition-colors">
              <Plus className="h-3 w-3" />
              FILTRO
            </button>
          </div>
        </div>

        <ScrollArea className="h-[450px] px-6">
          <div className="space-y-4 pb-20">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <div
                  key={exercise.name}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-2xl transition-all group cursor-pointer",
                    highlightedExercise === exercise.name ? "bg-primary/5" : "hover:bg-muted/50"
                  )}
                  onClick={() => handleSelect(exercise.name)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                      <Image 
                        src={`https://picsum.photos/seed/${exercise.imageHint}/100/100`}
                        alt={exercise.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tight">
                        {exercise.category}
                      </span>
                      <span className="font-bold text-[15px] truncate">{exercise.name}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full h-8 px-4 text-[11px] font-bold border-border/60 hover:border-primary/50 transition-colors ml-4"
                  >
                    Ver detalhes
                  </Button>
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

        <div className="absolute bottom-6 right-6">
           <Button 
            className="bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 text-white rounded-full px-8 h-12 font-bold shadow-lg shadow-orange-500/20 uppercase tracking-widest text-xs"
            onClick={handleConfirm}
            disabled={!highlightedExercise}
           >
             Adicionar
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
