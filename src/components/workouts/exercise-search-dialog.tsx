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
import { Search, X, Check, Dumbbell, Zap } from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Mapeamento de Divisões para Categorias (Músculos)
const divisions = [
  { id: 'inf', name: 'Inferiores', categories: ['Quadríceps', 'Posterior de Coxa (Isquiotibiais)', 'Glúteo', 'Quadríceps/Glúteo'] },
  { id: 'pt', name: 'Peito e Tríceps', categories: ['Peitoral', 'Tríceps'] },
  { id: 'cb', name: 'Costas e Bíceps', categories: ['Costas', 'Bíceps'] },
  { id: 'sh', name: 'Ombros e Trapézio', categories: ['Deltoides'] },
  { id: 'core', name: 'Core', categories: ['Abômen'] },
];

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
  const [activeDivision, setActiveDivision] = React.useState<string | null>(null);
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
    setActiveDivision(null);
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const selectDivision = (divisionId: string) => {
    if (activeDivision === divisionId) {
      setActiveDivision(null);
      setSelectedCategories([]);
    } else {
      const division = divisions.find(d => d.id === divisionId);
      if (division) {
        setActiveDivision(divisionId);
        setSelectedCategories(division.categories);
      }
    }
  };

  const resetState = () => {
    setSearch('');
    setSelectedCategories([]);
    setActiveDivision(null);
    setHighlightedExercise(null);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) resetState();
    }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0 overflow-hidden bg-card border-none shadow-2xl rounded-[32px] max-h-[90vh]">
        <DialogHeader className="p-8 pb-4">
          <DialogTitle className="text-2xl font-black italic tracking-tighter uppercase text-left">Buscar Exercício</DialogTitle>
        </DialogHeader>
        
        <div className="px-8 pb-6 space-y-6">
          {/* Campo de Busca */}
          <div className="relative group">
            <Input
              placeholder="Digite o nome do exercício..."
              className="h-14 bg-muted/40 border border-border/40 rounded-2xl text-base font-bold focus-visible:ring-primary/20 pr-12 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {search ? (
               <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSearch('')}
               >
                 <X className="h-5 w-5" />
               </button>
            ) : (
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30" />
            )}
          </div>

          {/* Filtro por Divisão */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Zap className="h-3.5 w-3.5 text-primary fill-primary/20" />
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">Divisões Sugeridas</p>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex w-max gap-3 px-1">
                {divisions.map((div) => (
                  <Badge
                    key={div.id}
                    variant={activeDivision === div.id ? 'default' : 'secondary'}
                    className={cn(
                      "cursor-pointer rounded-xl px-5 py-2.5 text-[10px] font-black uppercase tracking-widest border border-transparent transition-all active:scale-95",
                      activeDivision === div.id 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                        : "hover:bg-muted text-muted-foreground bg-muted/40"
                    )}
                    onClick={() => selectDivision(div.id)}
                  >
                    {div.name}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>

          {/* Filtro por Grupo Muscular */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <Dumbbell className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[11px] font-black uppercase tracking-[0.15em] text-muted-foreground/80">Grupos Musculares</p>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex w-max gap-3 px-1">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                    className={cn(
                      "cursor-pointer rounded-full px-5 py-2 text-[10px] font-bold border-border/60 transition-all uppercase tracking-tight active:scale-95",
                      selectedCategories.includes(category) 
                        ? "bg-primary/20 text-primary border-primary/30" 
                        : "hover:bg-muted text-muted-foreground/60"
                    )}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    {selectedCategories.includes(category) && <Check className="ml-1.5 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>
        </div>

        <ScrollArea className="h-[400px] w-full">
          <div className="px-8 space-y-4 pb-32">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <div
                  key={exercise.name}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-[24px] transition-all group cursor-pointer border-2",
                    highlightedExercise === exercise.name 
                      ? "bg-primary/5 border-primary/30 shadow-sm" 
                      : "hover:bg-muted/40 border-transparent bg-muted/20"
                  )}
                  onClick={() => handleSelect(exercise.name)}
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-muted flex-shrink-0 shadow-inner">
                      <Image 
                        src={`https://picsum.photos/seed/${exercise.imageHint}/120/120`}
                        alt={exercise.name}
                        fill
                        className="object-cover"
                        data-ai-hint={exercise.imageHint}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 opacity-80">
                        {exercise.category}
                      </span>
                      <span className="font-black text-base truncate text-foreground leading-tight uppercase italic tracking-tight">{exercise.name}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-all shadow-sm shrink-0 ml-4",
                    highlightedExercise === exercise.name 
                      ? "bg-primary text-white scale-110" 
                      : "bg-muted text-muted-foreground/20 group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                     <Check className={cn("h-5 w-5 transition-all", highlightedExercise === exercise.name ? "opacity-100 scale-100" : "opacity-0 scale-50")} />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-24 text-center opacity-20">
                <Dumbbell className="h-12 w-12 mx-auto mb-4" />
                <p className="text-sm font-black uppercase tracking-[0.2em]">Nenhum exercício encontrado</p>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-card via-card to-transparent pointer-events-none">
           <Button 
            className="w-full bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 text-white rounded-2xl h-16 font-black shadow-xl shadow-orange-500/30 uppercase tracking-[0.2em] text-sm gap-4 pointer-events-auto transition-transform active:scale-95"
            onClick={handleConfirm}
            disabled={!highlightedExercise}
           >
             CONFIRMAR EXERCÍCIO
             {highlightedExercise && <Check className="h-6 w-6" />}
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
