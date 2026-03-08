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

  return (
    <AccordionItem value={`item-${exercise.id}`} className="border-none">
      <div className={cn(
        "w-full rounded-xl border border-teal-700/40 bg-card p-4 transition-all shadow-lg",
        exercise.groupId && "border-teal-500/60"
      )}>
        <AccordionTrigger className="flex items-center p-0 hover:no-underline [&>svg]:ml-2">
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            {exercise.groupId && (
              <div className="w-1 h-5 bg-teal-500/40 rounded-full shrink-0" />
            )}
            <span className="font-bold text-sm text-left truncate text-foreground">{exercise.name}</span>
          </div>
          
          <div 
            className="flex items-center shrink-0" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                "h-8 w-8 text-destructive/70 hover:bg-destructive/10 rounded-full cursor-pointer"
              )}
            >
              <Trash2 className="h-4 w-4" />
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="pb-0 pt-4 px-0">
          <div className="space-y-4">
            {videoThumbnail && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border">
                <Image
                  src={videoThumbnail.imageUrl}
                  alt={videoThumbnail.description}
                  fill
                  className="object-cover opacity-80"
                  data-ai-hint={videoThumbnail.imageHint}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-background/80 p-2 rounded-full border border-border">
                    <PlaySquare className="h-6 w-6 text-primary" />
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
                      className={cn("text-[10px] py-0.5 px-2 font-bold gap-1 rounded-full", config.className)}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label} ({count})
                    </Badge>
                  );
                })}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1 cursor-pointer group">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Séries</p>
                  <div className="bg-muted text-foreground font-bold rounded-lg h-10 flex items-center justify-center gap-2 border border-border/50 group-hover:border-primary/50 transition-colors">
                    {exercise.sets.length}
                    <Hash className="h-3 w-3 opacity-30"/>
                  </div>
                </div>
              </EditSetsDialog>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Reps</p>
                <Input 
                  className="bg-muted text-foreground font-bold text-center h-10 border-border/50 rounded-lg focus-visible:ring-primary/40"
                  defaultValue={exercise.repsRange}
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Intervalo</p>
                <Input 
                  className="bg-muted text-foreground font-bold text-center h-10 border-border/50 rounded-lg focus-visible:ring-primary/40"
                  defaultValue={exercise.sets[0]?.interval || '30'}
                />
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Cadência</p>
                <Input 
                  className="bg-muted text-foreground font-bold text-center h-10 border-border/50 rounded-lg focus-visible:ring-primary/40"
                  defaultValue="2.2"
                />
              </div>

              <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1 cursor-pointer group">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Obs</p>
                   <div className="bg-muted text-primary border border-border/50 rounded-lg h-10 flex justify-center items-center group-hover:border-primary/50 transition-colors">
                      <MessageSquare className="h-4 w-4"/>
                  </div>
                </div>
               </EditObservationDialog>

               <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Método</p>
                  <Select defaultValue="padrao">
                      <SelectTrigger className="rounded-lg bg-muted border-border/50 h-10 text-[10px] font-bold text-foreground focus:ring-primary/20">
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
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                   {CombinationIcon && (
                      <CombinationIcon className={cn("h-3 w-3", combinationIconClassName)} />
                    )}
                </div>
                <span className="text-[9px] font-bold text-primary/80 uppercase tracking-widest">
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
