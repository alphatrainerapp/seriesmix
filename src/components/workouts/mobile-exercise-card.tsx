'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '../ui/button';
import { 
  MessageSquare, 
  PlaySquare, 
  Trash2, 
  Flame, 
  SlidersHorizontal, 
  Dumbbell, 
  Link2, 
  Timer, 
  Hash, 
  Shuffle, 
  Pencil, 
  X, 
  ChevronDown, 
  Check,
  Zap,
  Activity
} from 'lucide-react';
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
import { Textarea } from '../ui/textarea';

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

  // Renderização específica para Cardio (Aeróbico / HIIT)
  if (exercise.isCardio && exercise.cardioDetails) {
    const { cardioDetails } = exercise;
    return (
      <AccordionItem value={`item-${exercise.id}`} className="border-none mb-3">
        <div className="w-full rounded-[16px] border border-border/40 bg-muted/40 dark:bg-[#2a2a2e] transition-all shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 h-[64px]">
            <span className="font-bold text-[15px] text-foreground dark:text-white truncate pr-4">
              {exercise.name}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <button className="text-[#ff7043] p-2">
                <Trash2 className="h-5 w-5" />
              </button>
              <AccordionTrigger className="p-0 hover:no-underline [&>svg]:h-5 [&>svg]:w-5 text-muted-foreground dark:text-white/40" />
            </div>
          </div>

          <AccordionContent className="pb-6 pt-2 px-5 bg-card border-t border-border/10">
            <div className="space-y-6 pt-4">
              {/* Nome */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight pl-1">Protocolo:</label>
                <div className="bg-muted dark:bg-[#1a1a1e] p-4 rounded-xl">
                  <Input 
                    value={exercise.name}
                    onChange={(e) => onUpdateExercise({...exercise, name: e.target.value})}
                    className="bg-transparent border-none p-0 h-auto font-bold text-foreground focus-visible:ring-0"
                    readOnly
                  />
                </div>
              </div>

              {/* Tipo de Exercício */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight pl-1">Tipo de Cardio:</label>
                <div className="bg-muted dark:bg-[#1a1a1e] p-4 rounded-xl">
                  <span className="font-bold text-foreground capitalize flex items-center gap-2">
                    {cardioDetails.type === 'hiit' ? <Zap className="h-4 w-4 text-orange-500" /> : <Activity className="h-4 w-4 text-blue-500" />}
                    {cardioDetails.type.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight pl-1">Descrição do Protocolo</label>
                <div className="bg-muted dark:bg-[#1a1a1e] p-4 rounded-xl min-h-[120px]">
                  <Textarea 
                    value={cardioDetails.description}
                    onChange={(e) => onUpdateExercise({
                      ...exercise, 
                      cardioDetails: { ...cardioDetails, description: e.target.value }
                    })}
                    className="bg-transparent border-none p-0 h-auto font-bold text-foreground focus-visible:ring-0 resize-none min-h-[100px] leading-relaxed"
                    placeholder="Descreva o protocolo..."
                    readOnly
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    );
  }

  return (
    <AccordionItem value={`item-${exercise.id}`} className="border-none mb-3">
      <div className={cn(
        "w-full rounded-[16px] border border-border/40 bg-muted/40 dark:bg-[#2a2a2e] transition-all shadow-sm overflow-hidden",
        exercise.groupId && "border-primary/40"
      )}>
        {/* Header Minimizado */}
        <div className="flex items-center justify-between px-5 h-[64px]">
          <ExerciseSearchDialog onSelect={handleUpdateName}>
            <span className="font-bold text-[15px] text-foreground dark:text-white truncate pr-4 cursor-pointer">
              {exercise.name}
            </span>
          </ExerciseSearchDialog>
          
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-[#ff7043] p-2">
              <Trash2 className="h-5 w-5" />
            </button>
            <AccordionTrigger className="p-0 hover:no-underline [&>svg]:h-5 [&>svg]:w-5 text-muted-foreground dark:text-white/40" />
          </div>
        </div>

        <AccordionContent className="pb-6 pt-2 px-5 bg-card border-t border-border/10">
          <div className="space-y-6 pt-4">
            {exercise.videoUrl ? (
              <div className="relative aspect-video rounded-3xl overflow-hidden border-[6px] border-primary/20 shadow-xl bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={exercise.videoUrl}
                  title={`Vídeo de ${exercise.name}`}
                  frameBorder="0"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
            ) : videoThumbnail && (
              <div className="relative aspect-video rounded-3xl overflow-hidden border-[6px] border-primary/20 shadow-xl">
                <Image
                  src={videoThumbnail.imageUrl}
                  alt={videoThumbnail.description}
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="bg-background/90 p-4 rounded-full border border-border shadow-2xl">
                    <PlaySquare className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
               <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Classificação das séries</p>
               <div className="flex flex-wrap items-center gap-3">
                {setTypesInOrder.map((setType) => {
                    const count = setCounts[setType];
                    if (!count || count === 0) return null;
                    const config = setTypeConfig[setType];
                    return (
                      <Badge
                        key={setType}
                        className={cn("text-[11px] py-1.5 px-4 font-black gap-2 rounded-full uppercase tracking-tighter border-none shadow-sm h-8", config.className)}
                      >
                        <config.icon className="h-3.5 w-3.5" />
                        {config.label} ({count})
                      </Badge>
                    );
                  })}
              </div>
            </div>

            <div className="bg-muted dark:bg-[#1a1a1e] p-6 rounded-[24px] space-y-6 shadow-inner border border-border/5">
              <div className="grid grid-cols-3 gap-3">
                <EditSetsDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                  <div className="space-y-2 cursor-pointer">
                    <p className="text-[11px] font-bold text-muted-foreground dark:text-white/60 text-center uppercase tracking-tight">Série</p>
                    <div className="bg-[#ffa726] text-black font-black rounded-xl h-14 flex items-center justify-center shadow-md text-lg relative">
                      {exercise.sets.length}
                      <Pencil className="h-4 w-4 absolute bottom-2 right-2 opacity-60"/>
                    </div>
                  </div>
                </EditSetsDialog>
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-muted-foreground dark:text-white/60 text-center uppercase tracking-tight">Repetições</p>
                  <Input 
                    className="bg-[#c5e1a5] text-black font-black text-center h-14 border-none rounded-xl shadow-md text-lg"
                    defaultValue={exercise.repsRange}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-muted-foreground dark:text-white/60 text-center uppercase tracking-tight">Intervalo</p>
                  <Input 
                    className="bg-[#4caf50] text-black font-black text-center h-14 border-none rounded-xl shadow-md text-lg"
                    defaultValue={exercise.sets[0]?.interval || '40'}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-[11px] font-bold text-muted-foreground dark:text-white/60 text-center uppercase tracking-tight">Cadência</p>
                  <Input 
                    className="bg-[#0097a7] text-white font-black text-center h-14 border-none rounded-xl shadow-md text-lg"
                    defaultValue="2.3"
                  />
                </div>
                <div className="space-y-2">
                  <EditObservationDialog exercise={exercise} onUpdateExercise={onUpdateExercise}>
                    <div className="space-y-2 cursor-pointer">
                      <p className="text-[11px] font-bold text-muted-foreground dark:text-white/60 text-center uppercase tracking-tight">Observação</p>
                      <Button className="w-full bg-[#0097a7] hover:bg-[#00838f] text-white rounded-xl h-14 gap-2 font-black shadow-md border-none">
                        <MessageSquare className="h-6 w-6"/>
                      </Button>
                    </div>
                  </EditObservationDialog>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/10 space-y-6">
               <div className="space-y-2">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Método</p>
                  <Select defaultValue="padrao">
                      <SelectTrigger className="rounded-xl bg-muted/20 border-border/40 h-14 text-[13px] font-bold text-foreground">
                          <SelectValue placeholder="Selecione o método..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                          <SelectItem value="padrao" className="font-bold">PADRÃO</SelectItem>
                          <SelectItem value="biset" className="font-bold">BISET</SelectItem>
                          <SelectItem value="triset" className="font-bold">TRISET</SelectItem>
                      </SelectContent>
                  </Select>
               </div>

               <SubstitutionDialog exercise={exercise} onSave={handleSaveSubstitutions}>
                 <Button 
                   variant="outline" 
                   className={cn(
                     "w-full rounded-2xl h-14 gap-3 font-black uppercase tracking-widest text-[11px]",
                     substitutionCount > 0 
                       ? "text-primary bg-primary/10 border-primary" 
                       : "text-primary border-primary/40"
                   )}
                 >
                   <Shuffle className="h-5 w-5" />
                   Trocas ({substitutionCount})
                 </Button>
               </SubstitutionDialog>
            </div>

            {combinationType && (
              <div className="flex items-center gap-3 pt-4 border-t border-border/10">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                   {CombinationIcon && <CombinationIcon className={cn("h-4.5 w-4.5", combinationIconClassName)} />}
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
