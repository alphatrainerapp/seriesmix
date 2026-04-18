
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  X, 
  Check, 
  Dumbbell, 
  Plus, 
  Info, 
  ChevronDown,
  User,
  Heart,
  Activity
} from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Mapeamento de Divisões para Categorias (Músculos)
const divisions = [
  { id: 'inf', name: 'Inferiores', categories: ['Quadríceps', 'Posterior de Coxa (Isquiotibiais)', 'Glúteo', 'Panturrilha', 'Quadríceps/Glúteo'] },
  { id: 'pt', name: 'Peito e Tríceps', categories: ['Peitoral', 'Tríceps'] },
  { id: 'cb', name: 'Costas e Bíceps', categories: ['Costas', 'Bíceps'] },
  { id: 'sh', name: 'Ombros e Trapézio', categories: ['Deltoides', 'Trapézio'] },
  { id: 'core', name: 'Core', categories: ['Abômen'] },
];

const muscleIcons: Record<string, React.ElementType> = {
  'Quadríceps': Activity,
  'Posterior de Coxa (Isquiotibiais)': Activity,
  'Glúteo': User,
  'Panturrilha': User,
  'Peitoral': Dumbbell,
  'Costas': Activity,
  'Bíceps': Dumbbell,
  'Tríceps': Dumbbell,
  'Deltoides': User,
  'Abômen': Heart,
  'Trapézio': Activity,
  'Quadríceps/Glúteo': Activity,
};

export function ExerciseSearchDialog({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: (exerciseName: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(['Quadríceps', 'Posterior de Coxa (Isquiotibiais)', 'Glúteo', 'Panturrilha']);
  const [activeDivision, setActiveDivision] = React.useState<string | null>('inf');
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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSelect = (name: string) => {
    setHighlightedExercise(name);
  };

  const handleConfirm = () => {
    if (highlightedExercise) {
      onSelect(highlightedExercise);
      setOpen(false);
    }
  };

  const clearDivision = () => {
    setActiveDivision(null);
    setSelectedCategories([]);
  };

  const handleSelectAll = () => {
    setSelectedCategories([...categories]);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setActiveDivision(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[640px] p-0 gap-0 overflow-hidden bg-background border-border shadow-2xl rounded-[24px] max-h-[95vh] flex flex-col">
        
        {/* Header Section */}
        <div className="p-8 pb-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <DialogTitle className="text-[28px] font-bold text-foreground tracking-tight">
              Buscar exercício
            </DialogTitle>
            <p className="text-muted-foreground text-[15px]">
              Encontre exercícios por nome, divisão ou grupo muscular.
            </p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Digite o nome do exercício..."
              className="h-14 bg-muted/30 border-border rounded-xl text-base font-medium pl-12 focus-visible:ring-primary/20 transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setSearch('')}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-8 pb-32">
          <div className="space-y-8">
            
            {/* Division Active Section */}
            {activeDivision && (
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground pl-1">Divisão Ativa</p>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-2.5 rounded-xl flex items-center gap-2 group cursor-pointer hover:bg-primary/20">
                    <Activity className="h-4 w-4" />
                    <span className="font-bold text-[13px]">
                      {divisions.find(d => d.id === activeDivision)?.name}
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); clearDivision(); }}>
                      <X className="h-4 w-4 text-primary/60 group-hover:text-primary" />
                    </button>
                  </Badge>
                  
                  <div className="flex-1 bg-muted/30 rounded-xl p-3 flex items-center gap-3 border border-border">
                    <Info className="h-5 w-5 text-muted-foreground shrink-0" />
                    <p className="text-[12px] text-muted-foreground leading-tight">
                      A divisão ativa filtra os músculos exibidos. Você pode alterar a seleção abaixo.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Muscle Groups Section */}
            <div className="space-y-4 rounded-2xl border border-border p-6 bg-card/50 shadow-sm">
              <div className="flex items-center justify-between px-1">
                <div className="space-y-0.5">
                  <p className="text-[13px] font-bold uppercase tracking-widest text-foreground">Grupos Musculares</p>
                  <p className="text-[12px] text-muted-foreground font-medium">Selecione os músculos para filtrar os exercícios.</p>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={handleSelectAll}
                    className="text-[12px] font-bold text-primary hover:underline"
                  >
                    Selecionar todos
                  </button>
                  <button 
                    onClick={handleClearAll}
                    className="text-[12px] font-bold text-muted-foreground hover:underline"
                  >
                    Limpar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((category) => {
                  const isActive = selectedCategories.includes(category);
                  const Icon = muscleIcons[category] || Activity;
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-3.5 rounded-xl border text-left transition-all active:scale-95 group relative",
                        isActive 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground/50"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      <span className="text-[12px] font-bold truncate pr-4">{category}</span>
                      <div className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 rounded-full flex items-center justify-center transition-all",
                        isActive ? "bg-primary" : "border-2 border-border"
                      )}>
                        {isActive ? (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        ) : (
                          <div className="h-1.5 w-1.5 rounded-full bg-border" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center gap-2 px-1 text-muted-foreground">
                <div className="bg-primary/10 p-1 rounded-md">
                  <Heart className="h-3 w-3 text-primary" />
                </div>
                <p className="text-[11px] font-medium italic">
                  Dica: desmarque os músculos da divisão ou selecione outros para buscar em grupos específicos.
                </p>
              </div>
            </div>

            {/* Exercise Results Section */}
            <div className="space-y-4 rounded-2xl border border-border p-6 bg-card/50 shadow-sm">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-bold uppercase tracking-widest text-foreground">Exercícios Encontrados</p>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground font-bold px-2 py-0 h-5 text-[10px]">
                    {filteredExercises.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground font-bold">
                  Ordenar por:
                  <button className="flex items-center gap-1 text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                    Mais relevantes <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredExercises.map((exercise) => (
                  <div
                    key={exercise.name}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group",
                      highlightedExercise === exercise.name 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/40 hover:bg-muted/30"
                    )}
                    onClick={() => handleSelect(exercise.name)}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative h-[72px] w-[100px] rounded-xl overflow-hidden bg-muted shrink-0 shadow-sm">
                        <Image 
                          src={`https://picsum.photos/seed/${exercise.imageHint}/200/144`}
                          alt={exercise.name}
                          fill
                          className="object-cover"
                          data-ai-hint={exercise.imageHint}
                        />
                      </div>
                      <div className="flex flex-col min-w-0 space-y-1.5">
                        <span className="font-bold text-[15px] text-foreground leading-tight truncate">
                          {exercise.name}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border text-[9px] font-bold px-2 py-0 uppercase">
                            {exercise.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <button className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0 ml-4",
                      highlightedExercise === exercise.name 
                        ? "bg-primary text-primary-foreground" 
                        : "border border-primary text-primary bg-transparent hover:bg-primary/10"
                    )}>
                      {highlightedExercise === exercise.name ? <Check className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 text-[13px] font-bold text-primary flex items-center justify-center gap-2 hover:bg-primary/10 rounded-xl transition-colors">
                Ver mais exercícios <ChevronDown className="h-4 w-4" />
              </button>
            </div>

          </div>
        </ScrollArea>

        {/* Footer Fixed Action */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pt-4 bg-background/80 backdrop-blur-sm border-t border-border z-10">
           <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-14 font-bold uppercase tracking-widest text-[14px] gap-3 shadow-lg shadow-primary/10 transition-transform active:scale-95"
            onClick={handleConfirm}
            disabled={!highlightedExercise}
           >
             <Plus className="h-5 w-5" />
             ADICIONAR EXERCÍCIO
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
