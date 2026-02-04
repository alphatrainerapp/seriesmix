'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import { Check, MessageSquare, Pencil, PlaySquare, Trash2, X, Flame, SlidersHorizontal, Dumbbell, Link2, Timer } from 'lucide-react';
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
    icon: Check,
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
    <AccordionItem value={`item-${exercise.id}`} className="border-none">
      <div className="bg-card rounded-lg shadow-sm">
        <div className="flex items-center p-2">
          <AccordionTrigger className="flex-1 p-2 font-semibold text-left rounded-lg hover:bg-muted/50">
            {exercise.name}
          </AccordionTrigger>
          <Button variant="ghost" size="icon" className="text-green-500">
            <Check />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <X />
          </Button>
        </div>
        <AccordionContent className="p-4 pt-0">
          <div className="space-y-4">
            {videoThumbnail && (
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-primary">
                <Image
                  src={videoThumbnail.imageUrl}
                  alt={videoThumbnail.description}
                  fill
                  className="object-cover"
                  data-ai-hint={videoThumbnail.imageHint}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlaySquare className="h-12 w-12 text-white" />
                </div>
              </div>
            )}
            
            {/* Badges de organização de séries abaixo do vídeo */}
            <div className="flex items-center gap-2 -mt-2 mb-4">
              {setTypesInOrder.map((setType) => {
                  const count = setCounts[setType];
                  if (!count) return null;

                  const config = setTypeConfig[setType];
                  const Icon = config.icon;
                  return (
                    <Badge
                      key={setType}
                      className={cn("text-[10px] font-semibold gap-1.5", config.className)}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label} ({count})
                    </Badge>
                  );
                })}
            </div>

            {/* Grid de Métricas Editáveis */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1 cursor-pointer">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Série</p>
                  <div className="bg-[hsl(var(--chart-1))] text-black font-bold rounded-md py-2 text-sm flex items-center justify-center gap-1 h-10">
                    {exercise.sets.length}
                    <Pencil className="h-3 w-3"/>
                  </div>
                </div>
              </EditSetsDialog>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Repetições</p>
                <Input 
                  className="bg-[hsl(var(--chart-2))] text-black font-bold text-center h-10 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                  defaultValue={exercise.repsRange}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Intervalo</p>
                <Input 
                  className="bg-[hsl(var(--chart-3))] text-black font-bold text-center h-10 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                  defaultValue={exercise.sets[0]?.interval || '30'}
                />
              </div>
               <div className="space-y-1">
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Cadência</p>
                <Input 
                  className="bg-[hsl(var(--chart-4))] text-black font-bold text-center h-10 border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary"
                  defaultValue="2.2"
                />
              </div>
               <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1 cursor-pointer">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Observação</p>
                   <div className="bg-primary/20 text-primary rounded-md h-10 flex justify-center items-center">
                      <MessageSquare className="h-4 w-4"/>
                  </div>
                </div>
               </EditObservationDialog>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Método</label>
                    <Select defaultValue="biset">
                        <SelectTrigger className="rounded-full bg-muted border-border h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="biset">Biset</SelectItem>
                            <SelectItem value="dropset">Dropset</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Cor</label>
                     <div className="flex items-center justify-center h-9 rounded-full bg-muted border-border">
                        {CombinationIcon ? (
                          <CombinationIcon className={cn("h-5 w-5", combinationIconClassName)} />
                        ) : (
                          <div className="w-5 h-5 bg-gray-300 border-2 border-white rounded-sm shadow-inner" style={{ "backgroundImage": "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")" }}></div>
                        )}
                    </div>
                </div>
            </div>
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}