'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '../ui/button';
import { MessageSquare, PlaySquare, Trash2, Flame, SlidersHorizontal, Dumbbell, Link2, Timer, Hash } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Exercise, SetType, CombinationType } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EditSetsDialog } from './edit-sets-dialog';
import { EditObservationDialog } from './edit-observation-dialog';
import { ExerciseSearchDialog } from './exercise-search-dialog';
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

  return (
    <AccordionItem value={`item-${exercise.id}`} className="border-none">
      <div className={cn(
        "w-full rounded-2xl border border-teal-700/20 bg-card p-4 transition-all shadow-md active:shadow-sm",
        exercise.groupId && "border-teal-500/50"
      )}>
        <AccordionTrigger className="flex items-center p-0 hover:no-underline [&>svg]:ml-auto">
          <div className="flex items-center gap-3 flex-1 overflow-hidden pr-2">
            {exercise.groupId && (
              <div className="w-1.5 h-6 bg-teal-500/40 rounded-full shrink-0" />
            )}
            <ExerciseSearchDialog onSelect={handleUpdateName}>
              <button 
                className="font-extrabold text-[15px] text-left leading-tight text-foreground uppercase tracking-tight truncate hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {exercise.name}
              </button>
            </ExerciseSearchDialog>
          </div>
          
          <div 
            className="flex items-center shrink-0" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                "h-10 w-10 text-destructive/70 hover:bg-destructive/10 rounded-full cursor-pointer flex items-center justify-center"
              )}
            >
              <Trash2 className="h-5 w-5" />
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-0 pt-5 px-0">
          <div className="space-y-5">
            {videoThumbnail && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-inner-sm">
                <Image
                  src={videoThumbnail.imageUrl}
                  alt={videoThumbnail.description}
                  fill
                  className="object-cover opacity-90"
                  data-ai-hint={videoThumbnail.imageHint}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-background/90 p-3 rounded-full border border-border shadow-xl">
                    <PlaySquare className="h-7 w-7 text-primary" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-2">
              {setTypesInOrder.map((setType) => {
                  const count = setCounts[setType];
                  if (!count) return null;

                  const config = setTypeConfig[setType];
                  const Icon = config.icon;
                  return (
                    <Badge
                      key={setType}
                      variant="outline"
                      className={cn("text-[11px] py-1 px-3 font-bold gap-1.5 rounded-full", config.className)}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {config.label} ({count})
                    </Badge>
                  );
                })}
            </div>

            <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
              <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1.5 cursor-pointer group">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Séries</p>
                  <div className="bg-[hsl(var(--chart-1))] text-black font-black rounded-xl h-12 flex items-center justify-center gap-2 border-none transition-transform active:scale-95 shadow-sm">
                    {exercise.sets.length}
                    <Hash className="h-4 w-4 opacity-30"/>
                  </div>
                </div>
              </EditSetsDialog>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Reps</p>
                <Input 
                  className="bg-[hsl(var(--chart-2))] text-black font-black text-center h-12 border-none rounded-xl focus-visible:ring-primary/40 shadow-sm text-base"
                  defaultValue={exercise.repsRange}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Intervalo</p>
                <Input 
                  className="bg-[hsl(var(--chart-3))] text-black font-black text-center h-12 border-none rounded-xl focus-visible:ring-primary/40 shadow-sm text-base"
                  defaultValue={exercise.sets[0]?.interval || '30'}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Cadência</p>
                <Input 
                  className="bg-[hsl(var(--chart-4))] text-black font-black text-center h-12 border-none rounded-xl focus-visible:ring-primary/40 shadow-sm text-base"
                  defaultValue="2.2"
                />
              </div>

              <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1.5 cursor-pointer group">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Obs</p>
                   <div className="bg-muted text-primary border border-border/50 rounded-xl h-12 flex justify-center items-center group-hover:border-primary/50 transition-colors shadow-sm">
                      <MessageSquare className="h-5 w-5"/>
                  </div>
                </div>
               </EditObservationDialog>

               <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Método</p>
                  <Select defaultValue="padrao">
                      <SelectTrigger className="rounded-xl bg-muted border-border/50 h-12 text-[11px] font-black text-foreground focus:ring-primary/20 shadow-sm">
                          <SelectValue placeholder="Padrão" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                          <SelectItem value="padrao">Padrão</SelectItem>
                          <SelectItem value="biset">Biset</SelectItem>
                          <SelectItem value="dropset">Dropset</SelectItem>
                      </SelectContent>
                  </Select>
               </div>
            </div>

            {combinationType && (
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                   {CombinationIcon && (
                      <CombinationIcon className={cn("h-4 w-4", combinationIconClassName)} />
                    )}
                </div>
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
                  Combinado ({combinationType})
                </span>
              </div>
            )}
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}
