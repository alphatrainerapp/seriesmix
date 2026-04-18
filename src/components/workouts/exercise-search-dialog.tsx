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
import { Search, X, Check, Dumbbell, Zap, LayoutGrid } from 'lucide-react';
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
    setActiveDivision(null); // Limpa divisão ativa se mexer no individual
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
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden bg-card border-none shadow-2xl rounded-3xl">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-bold tracking-tight">Buscar Exercício</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-4 space-y-5">
          {/* Campo de Busca */}
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

          {/* Filtro por Divisão */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <LayoutGrid className="h-3 w-3 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Divisões Sugeridas</p>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex w-max gap-2">
                {divisions.map((div) => (
                  <Badge
                    key={div.id}
                    variant={activeDivision === div.id ? 'default' : 'secondary'}
                    className={cn(
                      "cursor-pointer rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-transparent transition-all",
                      activeDivision === div.id 
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                        : "hover:bg-muted text-muted-foreground bg-muted/50"
                    )}
                    onClick={() => selectDivision(div.id)}
                  >
                    <Zap className={cn("h-3 w-3 mr-1.5", activeDivision === div.id ? "text-white" : "text-primary")} />
                    {div.name}
                  </Badge>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </div>

          {/* Filtro por Grupo Muscular */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell className="h-3 w-3 text-muted-foreground" />
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Grupos Musculares</p>
            </div>
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <div className="flex w-max gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                    className={cn(
                      "cursor-pointer rounded-full px-4 py-1.5 text-[10px] font-bold border-border/60 transition-all uppercase tracking-tight",
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

        <ScrollArea className="h-[380px] px-6">
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
                    <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-muted flex-shrink-0 shadow-sm">
                      <Image 
                        src={`https://picsum.photos/seed/${exercise.imageHint}/100/100`}
                        alt={exercise.name}
                        fill
                        className="object-cover"
                        data-ai-hint={exercise.imageHint}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-primary uppercase tracking-tight mb-0.5">
                        {exercise.category}
                      </span>
                      <span className="font-bold text-sm truncate text-foreground leading-tight uppercase italic">{exercise.name}</span>
                    </div>
                  </div>
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center transition-all",
                    highlightedExercise === exercise.name 
                      ? "bg-primary text-white scale-110" 
                      : "bg-muted text-muted-foreground/30 group-hover:bg-primary/10 group-hover:text-primary"
                  )}>
                     <Check className={cn("h-4 w-4", highlightedExercise === exercise.name ? "opacity-100" : "opacity-0")} />
                  </div>
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

        <div className="absolute bottom-6 left-6 right-6">
           <Button 
            className="w-full bg-[#FF6A3D] hover:bg-[#FF6A3D]/90 text-white rounded-xl h-14 font-black shadow-lg shadow-orange-500/20 uppercase tracking-widest text-[12px] gap-3"
            onClick={handleConfirm}
            disabled={!highlightedExercise}
           >
             CONFIRMAR EXERCÍCIO
             {highlightedExercise && <Check className="h-5 w-5" />}
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
