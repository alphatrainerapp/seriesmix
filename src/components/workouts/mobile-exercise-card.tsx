'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '../ui/button';
import { MessageSquare, PlaySquare, Trash2, Flame, SlidersHorizontal, Dumbbell, Link2, Timer, Hash, Shuffle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Exercise, SetType, CombinationType } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EditSetsDialog } from './edit-sets-dialog';
import { EditObservationDialog } from './edit-observation-dialog';
import { ExerciseSearchDialog } from './exercise-search-dialog';
import { SubstitutionDialog } from './substitution-dialog';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const setTypeConfig: {
  [key in SetType]: {
    icon: React.ElementType;
    className: string;
    label: string;
  };
} = {
  aquecimento: {
    icon: Flame,
    className: 'bg-orange-600/20 text-orange-500 border-orange-500/20',
    label: 'Aquec'
  },
  preparatoria: {
    icon: SlidersHorizontal,
    className: 'bg-blue-600/20 text-blue-500 border-blue-500/20',
    label: 'Prep'
  },
  trabalho: {
    icon: Dumbbell,
    className: 'bg-emerald-600/20 text-emerald-500 border-emerald-500/20',
    label: 'Válidas'
  },
};

const combinationIconConfig: {
  [key in CombinationType]: {
    icon: React.ElementType;
    className: string;
  };
} = {
  biset: { icon: Dumbbell, className: 'text-blue-500' },
  triset: { icon: Dumbbell, className: 'text-blue-500' },
  superserie: { icon: Link2, className: 'text-emerald-500' },
  hiit: { icon: Timer, className: 'text-orange-500' },
};

export function MobileExerciseCard({
  exercise,
  onUpdateExercise,
  combinationType,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
  combinationType?: CombinationType;
}) {
  const videoThumbnail = PlaceHolderImages.find(
    (img) => img.id === 'exercise-video-thumbnail'
  );

  const setCounts = exercise.sets.reduce((acc, set) => {
    acc[set.type] = (acc[set.type] || 0) + 1;
    return acc;
  }, {} as Record<SetType, number>);

  const setTypesInOrder: SetType[] = ['aquecimento', 'preparatoria', 'trabalho'];
  const CombinationIcon = combinationType ? combinationIconConfig[combinationType]?.icon : null;
  const combinationIconClassName = combinationType ? combinationIconConfig[combinationType]?.className : '';

  const handleUpdateName = (newName: string) => {
    onUpdateExercise({ ...exercise, name: newName });
  };

  const handleSaveSubstitutions = (substitutions: string[]) => {
    onUpdateExercise({ ...exercise, substitutions });
  };

  const substitutionCount = exercise.substitutions?.length || 0;

  return (
    <AccordionItem value={`item-${exercise.id}`} className="border-none">
      <div className={cn(
        "w-full rounded-[24px] border border-teal-700/10 bg-card p-5 transition-all shadow-md active:shadow-sm mb-4",
        exercise.groupId && "border-teal-500/40 bg-primary/[0.02]"
      )}>
        <AccordionTrigger className="flex items-center p-0 hover:no-underline [&>svg]:ml-auto h-12">
          <div className="flex items-center gap-3 flex-1 overflow-hidden pr-2">
            {exercise.groupId && (
              <div className="w-1.5 h-8 bg-teal-500/60 rounded-full shrink-0" />
            )}
            <ExerciseSearchDialog onSelect={handleUpdateName}>
              <span 
                className="font-black text-[15px] text-left leading-tight text-foreground uppercase tracking-tight truncate hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {exercise.name}
              </span>
            </ExerciseSearchDialog>
          </div>
          
          <div 
            className="flex items-center shrink-0" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                "h-11 w-11 text-destructive/70 hover:bg-destructive/10 rounded-full cursor-pointer flex items-center justify-center"
              )}
            >
              <Trash2 className="h-5.5 w-5.5" />
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-0 pt-6 px-0">
          <div className="space-y-6">
            {exercise.videoUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-lg bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={exercise.videoUrl}
                  title={`Vídeo de ${exercise.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                  loading="lazy"
                />
              </div>
            ) : videoThumbnail && (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-lg">
                <Image
                  src={videoThumbnail.imageUrl}
                  alt={videoThumbnail.description}
                  fill
                  className="object-cover opacity-90"
                  data-ai-hint={videoThumbnail.imageHint}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-background/90 p-3 rounded-full border border-border shadow-xl">
                    <PlaySquare className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              {setTypesInOrder.map((setType) => {
                  const count = setCounts[setType];
                  if (!count || count === 0) return null;

                  const config = setTypeConfig[setType];
                  const Icon = config.icon;
                  return (
                    <Badge
                      key={setType}
                      variant="outline"
                      className={cn("text-[11px] py-1.5 px-4 font-black gap-1.5 rounded-full uppercase tracking-tighter", config.className)}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {config.label} ({count})
                    </Badge>
                  );
                })}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1.5 cursor-pointer group">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Séries</p>
                  <div className="bg-[hsl(var(--chart-1))] text-black font-black rounded-2xl h-14 flex items-center justify-center gap-2 border-none transition-transform active:scale-95 shadow-sm text-lg">
                    {exercise.sets.length}
                    <Hash className="h-5 w-5 opacity-30"/>
                  </div>
                </div>
              </EditSetsDialog>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Reps</p>
                <Input 
                  className="bg-[hsl(var(--chart-2))] text-black font-black text-center h-14 border-none rounded-2xl focus-visible:ring-primary/40 shadow-sm text-lg"
                  defaultValue={exercise.repsRange}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Intervalo</p>
                <Input 
                  className="bg-[hsl(var(--chart-3))] text-black font-black text-center h-14 border-none rounded-2xl focus-visible:ring-primary/40 shadow-sm text-lg"
                  defaultValue={exercise.sets[0]?.interval || '30'}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Cadência</p>
                <Input 
                  className="bg-[hsl(var(--chart-4))] text-black font-black text-center h-14 border-none rounded-2xl focus-visible:ring-primary/40 shadow-sm text-lg"
                  defaultValue="2.2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <Button variant="outline" className="rounded-2xl h-14 gap-2 font-black uppercase tracking-widest text-[11px] shadow-sm bg-muted/40 border-border/40">
                  <MessageSquare className="h-5 w-5 text-primary"/>
                  OBSERVAÇÕES
                </Button>
               </EditObservationDialog>

               <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Método</p>
                  <Select defaultValue="padrao">
                      <SelectTrigger className="rounded-2xl bg-muted/40 border-border/40 h-14 text-[11px] font-black text-foreground focus:ring-primary/20 shadow-sm">
                          <SelectValue placeholder="MÉTODO" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border rounded-xl">
                          <SelectItem value="padrao" className="font-bold">PADRÃO</SelectItem>
                          <SelectItem value="biset" className="font-bold">BISET</SelectItem>
                          <SelectItem value="dropset" className="font-bold">DROPSET</SelectItem>
                      </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="pb-2">
              <SubstitutionDialog exercise={exercise} onSave={handleSaveSubstitutions}>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full rounded-2xl h-14 gap-3 font-black uppercase tracking-widest text-[11px] shadow-sm transition-all",
                    substitutionCount > 0 
                      ? "text-[#00bfa5] bg-[#00bfa5]/10 border-[#00bfa5] shadow-[#00bfa5]/20" 
                      : "text-[#00bfa5] border-[#00bfa5]/40 hover:bg-[#00bfa5]/5"
                  )}
                >
                  <Shuffle className="h-5 w-5" />
                  Trocas ({substitutionCount})
                </Button>
              </SubstitutionDialog>
            </div>

            {combinationType && (
              <div className="flex items-center gap-3 pt-5 border-t border-border/10">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                   {CombinationIcon && (
                      <CombinationIcon className={cn("h-4.5 w-4.5", combinationIconClassName)} />
                    )}
                </div>
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                  COMBINADO ({combinationType})
                </span>
              </div>
            )}
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}
