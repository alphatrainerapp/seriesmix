'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import { Check, MessageSquare, Pencil, PlaySquare, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Exercise } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { EditSetsDialog } from './edit-sets-dialog';
import { EditObservationDialog } from './edit-observation-dialog';

export function MobileExerciseCard({
  exercise,
  onUpdateExercise,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
}) {
  const videoThumbnail = PlaceHolderImages.find(
    (img) => img.id === 'exercise-video-thumbnail'
  );
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
            <div className="grid grid-cols-3 gap-2 text-center">
              <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1 cursor-pointer">
                  <p className="text-xs font-medium text-muted-foreground">Série</p>
                  <div className="bg-[hsl(var(--chart-1))] text-black font-bold rounded-md py-2 text-sm flex items-center justify-center gap-1">
                    {exercise.sets.length}
                    <Pencil className="h-3 w-3"/>
                  </div>
                </div>
              </EditSetsDialog>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Repetições</p>
                <div className="bg-[hsl(var(--chart-2))] text-black font-bold rounded-md py-2 text-sm">{exercise.repsRange}</div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Intervalo</p>
                <div className="bg-[hsl(var(--chart-3))] text-black font-bold rounded-md py-2 text-sm">30</div>
              </div>
               <div className="space-y-1">
                <p className-="text-xs font-medium text-muted-foreground">Cadência</p>
                <div className="bg-[hsl(var(--chart-4))] text-black font-bold rounded-md py-2 text-sm">2.2</div>
              </div>
               <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                <div className="space-y-1 cursor-pointer">
                  <p className="text-xs font-medium text-muted-foreground">Observação</p>
                   <div className="bg-primary/20 text-primary rounded-md py-2 flex justify-center items-center">
                      <MessageSquare className="h-4 w-4"/>
                  </div>
                </div>
               </EditObservationDialog>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Método</label>
                    <Select defaultValue="biset">
                        <SelectTrigger className="rounded-full bg-muted border-border">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="biset">Biset</SelectItem>
                            <SelectItem value="dropset">Dropset</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Cor</label>
                     <div className="flex items-center justify-center h-10 rounded-full bg-muted border-border">
                        <div className="w-6 h-6 bg-gray-300 border-2 border-white rounded-sm shadow-inner" style={{ "backgroundImage": "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")" }}></div>
                    </div>
                </div>
            </div>
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}
