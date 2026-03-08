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
    className: 'bg-[#dd694d] hover:bg-[#dd694d]/90 text-white border-transparent',
    label: 'Aquec'
  },
  preparatoria: {
    icon: SlidersHorizontal,
    className: 'bg-[#4a80e3] hover:bg-[#4a80e3]/90 text-white border-transparent',
    label: 'Prep'
  },
  trabalho: {
    icon: Dumbbell,
    className: 'bg-[#56ac73] hover:bg-[#56ac73]/90 text-white border-transparent',
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
  superserie: { icon: Link2, className: 'text-green-500' },
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
    <AccordionItem value={`item-${exercise.id}`} className="border-none mb-4">
      <div className={cn(
        "bg-card rounded-xl shadow-sm border overflow-hidden transition-all",
        exercise.groupId ? "border-primary/30" : "border-border"
      )}>
        <AccordionTrigger className="flex items-center px-4 py-4 hover:no-underline hover:bg-muted/10 [&>svg]:ml-1">
          <div className="flex items-center gap-3 flex-1 overflow-hidden">
            {exercise.groupId && (
              <div className="w-1.5 h-6 bg-primary/40 rounded-full shrink-0" />
            )}
            <span className="font-bold text-sm text-left truncate">{exercise.name}</span>
          </div>
          
          <div 
            className="flex items-center shrink-0" 
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                "h-9 w-9 text-destructive/80 hover:bg-destructive/10 rounded-full cursor-pointer"
              )}
            >
              <Trash2 className="h-5 w-5" />
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-5 pb-5 pt-0">
          <div className="space-y-5">
            {videoThumbnail && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-border shadow-inner-sm">
                <Image
                  src={videoThumbnail.imageUrl}
                  alt={videoThumbnail.description}
                  fill
                  className="object-cover"
                  data-ai-hint={videoThumbnail.imageHint}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-white/95 p-3 rounded-full shadow-lg">
                    <PlaySquare className="h-8 w-8 text-primary" />
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
                      className={cn("text-[10px] py-1 px-3 font-bold gap-1.5 rounded-full shadow-sm", config.className)}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label} ({count})
                    </Badge>
                  );
                })}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1.5 cursor-pointer group">
                  <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest pl-1">Séries</p>
                  <div className="bg-[hsl(var(--chart-1))] text-black font-extrabold rounded-lg py-2 text-sm flex items-center justify-center gap-2 h-12 shadow-sm transition-all active:scale-95 group-hover:brightness-105">
                    {exercise.sets.length}
                    <Hash className="h-3.5 w-3.5 opacity-40"/>
                  </div>
                </div>
              </EditSetsDialog>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest pl-1">Reps</p>
                <Input 
                  className="bg-[hsl(var(--chart-2))] text-black font-extrabold text-center h-12 border-none shadow-sm text-sm focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
                  defaultValue={exercise.repsRange}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest pl-1">Intervalo</p>
                <Input 
                  className="bg-[hsl(var(--chart-3))] text-black font-extrabold text-center h-12 border-none shadow-sm text-sm focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
                  defaultValue={exercise.sets[0]?.interval || '30'}
                />
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest pl-1">Cadência</p>
                <Input 
                  className="bg-[hsl(var(--chart-4))] text-black font-extrabold text-center h-12 border-none shadow-sm text-sm focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
                  defaultValue="2.2"
                />
              </div>

              <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1.5 cursor-pointer group">
                  <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest pl-1">Obs</p>
                   <div className="bg-primary/5 text-primary border border-primary/20 rounded-lg h-12 flex justify-center items-center shadow-sm transition-all active:scale-95 group-hover:bg-primary/10">
                      <MessageSquare className="h-5 w-5"/>
                  </div>
                </div>
               </EditObservationDialog>

               <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest pl-1">Método</p>
                  <Select defaultValue="padrao">
                      <SelectTrigger className="rounded-lg bg-muted/30 border-border h-12 text-xs font-bold shadow-sm focus:ring-primary/20">
                          <SelectValue placeholder="Padrão" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="padrao">Padrão</SelectItem>
                          <SelectItem value="biset">Biset</SelectItem>
                          <SelectItem value="dropset">Dropset</SelectItem>
                      </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-muted/40 flex items-center justify-center border border-border/50">
                   {CombinationIcon ? (
                      <CombinationIcon className={cn("h-4 w-4", combinationIconClassName)} />
                    ) : (
                      <Dumbbell className="h-4 w-4 text-muted-foreground/30" />
                    )}
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  {combinationType ? `Combinado (${combinationType})` : 'Individual'}
                </span>
              </div>
            </div>
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}