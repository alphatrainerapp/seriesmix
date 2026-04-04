
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockWorkout as initialWorkoutData } from '@/lib/data';
import { ExerciseCard } from '@/components/workouts/exercise-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TrainingPlanHeader } from '@/components/plan/training-plan-header';
import { TrainingSplit } from '@/components/plan/training-split';
import { useState, useCallback, memo, useMemo } from 'react';
import type { CombinationType, Exercise, Set } from '@/lib/types';
import { MobileExerciseCard } from '@/components/workouts/mobile-exercise-card';
import { Accordion } from '@/components/ui/accordion';
import { CombineExercisesDialog } from '@/components/workouts/combine-exercises-dialog';
import { SaveSessionDialog } from '@/components/workouts/save-session-dialog';
import { UseSavedSessionDialog } from '@/components/workouts/use-saved-session-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, ListOrdered, SquarePen, Combine, Save, History, Dumbbell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PageSidebar } from '@/components/sidebar/page-sidebar';

type WorkoutState = {
  data: Exercise[];
  combinationTypes: Record<string, CombinationType>;
};

// Componente isolado para o conteúdo do treino
// Fora do Home para evitar re-criação da definição do componente
const WorkoutTabContent = memo(({ 
  tabId, 
  workout, 
  onUpdateExercise, 
  onApplySetsToAll, 
  onApplySavedSession, 
  onUpdateWorkoutData, 
  onUpdateCombinationTypes 
}: { 
  tabId: string;
  workout: WorkoutState;
  onUpdateExercise: (ex: Exercise, tabId: string) => void;
  onApplySetsToAll: (sets: Set[], tabId: string) => void;
  onApplySavedSession: (data: Exercise[], types: Record<string, CombinationType>, tabId: string) => void;
  onUpdateWorkoutData: (data: Exercise[], tabId: string) => void;
  onUpdateCombinationTypes: (types: Record<string, CombinationType>, tabId: string) => void;
}) => {
  const [isSorting, setIsSorting] = useState(false);

  const renderExerciseList = () => {
    if (!workout || !Array.isArray(workout.data) || workout.data.length === 0) {
      return (
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={10} className="h-48 text-center text-muted-foreground">
              <div className="flex flex-col items-center gap-3">
                <Dumbbell className="h-10 w-10 opacity-10" />
                <p className="font-black uppercase tracking-widest text-xs">Nenhum exercício carregado</p>
                <p className="text-[10px] font-bold opacity-60">Use as opções de sessão ou adicione manualmente.</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    const elements: React.ReactNode[] = [];
    const renderedGroupIds = new Set<string>();

    workout.data.forEach((currentExercise) => {
      if (currentExercise.groupId && renderedGroupIds.has(currentExercise.groupId)) {
        return;
      }
      
      if (currentExercise.groupId) {
        const group = workout.data.filter(e => e.groupId === currentExercise.groupId);
        const combinationType = workout.combinationTypes[currentExercise.groupId];
        elements.push(
          <tbody key={`group-${currentExercise.groupId}-${tabId}`} className="relative border-b-0">
             {group.map((exercise, idx) => (
                <ExerciseCard
                  key={`${exercise.id}-${tabId}`}
                  exercise={exercise}
                  onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)}
                  onApplySetsToAll={(sets) => onApplySetsToAll(sets, tabId)}
                  isFirstInGroup={idx === 0}
                  isLastInGroup={idx === group.length - 1}
                  isGrouped={group.length > 1}
                  combinationType={combinationType}
                />
              ))}
          </tbody>
        );
        renderedGroupIds.add(currentExercise.groupId);
      } else {
        elements.push(
          <tbody key={`${currentExercise.id}-${tabId}`}>
            <ExerciseCard
              exercise={currentExercise}
              onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)}
              onApplySetsToAll={(sets) => onApplySetsToAll(sets, tabId)}
            />
          </tbody>
        );
      }
    });

    return elements;
  };

  return (
    <div className="mt-8 animate-in fade-in-50 duration-500">
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div className="flex flex-wrap items-center gap-6">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">
            {tabId.replace('treino-', 'Treino ').toUpperCase()}
          </h2>

          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              <Checkbox id={`presencial-${tabId}`} className="h-5 w-5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-primary" />
              Presencial
            </label>

            <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <SquarePen className="h-5 w-5 text-primary" />
              Editar variáveis
            </button>

            <CombineExercisesDialog
              exercises={workout.data}
              onUpdateWorkout={(newData) => onUpdateWorkoutData(newData, tabId)}
              combinationTypes={workout.combinationTypes}
              onUpdateCombinationTypes={(newTypes) => onUpdateCombinationTypes(newTypes, tabId)}
            >
              <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                <Combine className="h-5 w-5 text-primary" />
                Combinar
              </button>
            </CombineExercisesDialog>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <SaveSessionDialog 
            workoutData={workout.data} 
            combinationTypes={workout.combinationTypes}
          >
            <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <Save className="h-5 w-5 text-primary" />
              Salvar sessão
            </button>
          </SaveSessionDialog>

          <UseSavedSessionDialog onApplySession={(data, types) => onApplySavedSession(data, types, tabId)}>
            <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
              <History className="h-5 w-5 text-primary" />
              Usar sessão salva
            </button>
          </UseSavedSessionDialog>
        </div>
      </div>
      
      {/* Desktop View */}
      <div className="border rounded-2xl bg-card shadow-sm hidden md:block overflow-hidden w-full border-border/40">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/20 border-b-border/40 text-[10px] uppercase tracking-[0.2em] font-black">
              <TableHead className="w-[40px] px-2"></TableHead>
              <TableHead className="min-w-[200px]">Exercício</TableHead>
              <TableHead className="w-[120px]">Método</TableHead>
              <TableHead className="w-[45px] text-center">Obs</TableHead>
              <TableHead className="w-[55px] text-center">Série</TableHead>
              <TableHead className="w-[55px] text-center">Reps</TableHead>
              <TableHead className="w-[55px] text-center">Inter</TableHead>
              <TableHead className="w-[55px] text-center">Cadê</TableHead>
              <TableHead className="w-[45px] text-center">Status</TableHead>
              <TableHead className="w-[45px]"></TableHead>
            </TableRow>
          </TableHeader>
          {renderExerciseList()}
        </Table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {workout.data.length > 0 ? (
          <Accordion type="single" collapsible className="flex flex-col gap-3 w-full">
            {workout.data.map((exercise) => (
              <MobileExerciseCard
                key={`${exercise.id}-mobile-${tabId}`}
                exercise={exercise}
                onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)}
                combinationType={exercise.groupId ? workout.combinationTypes[exercise.groupId] : undefined}
              />
            ))}
          </Accordion>
        ) : (
          <div className="py-20 text-center border-2 border-dashed rounded-2xl opacity-40 border-border/60">
            <Dumbbell className="h-10 w-10 mx-auto mb-3 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Treino Vazio</p>
          </div>
        )}
      </div>

      <div className="mt-10 space-y-8 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#009688] hover:bg-[#00796b] text-white rounded-xl px-10 h-14 font-black text-xs gap-3 shadow-lg shadow-teal-500/10 border-none uppercase tracking-widest">
                <Plus className="h-6 w-6" />
                ADICIONAR EXERCÍCIO
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-xl p-2 shadow-xl border-border/40">
              <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest">Protocolo aeróbico</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest">Hiit</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest">Exercício</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest">Aquecimento</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            className={cn(
              "rounded-xl px-10 h-14 font-black text-xs gap-3 shadow-sm border-border bg-card transition-all active:scale-95 uppercase tracking-widest",
              isSorting && "border-primary text-primary bg-primary/5"
            )}
            onClick={() => setIsSorting(!isSorting)}
          >
            <ListOrdered className="h-6 w-6" />
            ORDENAR LISTA
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black tracking-tight text-foreground ml-1 uppercase italic">
            Observações {tabId.replace('treino-', 'Treino ').toUpperCase()}:
          </h2>
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all border-border/40">
            <Textarea 
              placeholder="Ao final do treino escreva a duração no campo de feedback..." 
              className="min-h-[160px] border-none shadow-none resize-none focus-visible:ring-0 p-6 text-sm font-bold leading-relaxed bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

WorkoutTabContent.displayName = 'WorkoutTabContent';

export default function Home() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('treino-a');
  
  const [workouts, setWorkouts] = useState<Record<string, WorkoutState>>({
    'treino-a': { data: JSON.parse(JSON.stringify(initialWorkoutData)), combinationTypes: { 'warmup': 'biset' } },
    'treino-b': { data: [], combinationTypes: {} },
    'treino-c': { data: [], combinationTypes: {} },
    'treino-d': { data: [], combinationTypes: {} },
    'treino-e': { data: [], combinationTypes: {} },
  });

  const handleUpdateExercise = useCallback((updatedExercise: Exercise, tabId: string) => {
    setWorkouts((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        data: prev[tabId].data.map((ex) =>
          ex.id === updatedExercise.id ? updatedExercise : ex
        ),
      },
    }));
  }, []);

  const handleApplySetsToAll = useCallback((updatedSets: Set[], tabId: string) => {
    setWorkouts((prev) => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        data: prev[tabId].data.map((ex) => ({
          ...ex,
          sets: JSON.parse(JSON.stringify(updatedSets)),
          repsRange: updatedSets.find(s => s.type === 'trabalho')?.reps || ex.repsRange
        })),
      },
    }));
    toast({
      title: "Configuração aplicada",
      description: "As séries foram replicadas para todos os exercícios do treino.",
    });
  }, [toast]);

  const handleApplySavedSession = useCallback((newData: Exercise[], newTypes: Record<string, CombinationType>, tabId: string) => {
    setWorkouts((prev) => {
      const updated = { ...prev };
      updated[tabId] = {
        data: Array.isArray(newData) ? JSON.parse(JSON.stringify(newData)) : [],
        combinationTypes: newTypes || {}
      };
      return updated;
    });
  }, []);

  const handleUpdateWorkoutData = useCallback((newData: Exercise[], tabId: string) => {
    setWorkouts((prev) => ({
      ...prev,
      [tabId]: { ...prev[tabId], data: Array.isArray(newData) ? [...newData] : [] },
    }));
  }, []);

  const handleUpdateCombinationTypes = useCallback((newTypes: Record<string, CombinationType>, tabId: string) => {
    setWorkouts((prev) => ({
      ...prev,
      [tabId]: { ...prev[tabId], combinationTypes: { ...newTypes } },
    }));
  }, []);

  return (
    <div className="app-container py-8 text-foreground transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        <main className="flex-1 min-w-0 w-full space-y-8">
          <TrainingPlanHeader />
          <TrainingSplit />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center border-b border-border/40 overflow-x-auto no-scrollbar">
              <TabsList className="bg-transparent p-0 h-auto gap-2 min-w-max">
                {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                  <TabsTrigger
                    key={`trigger-${letter}`}
                    value={`treino-${letter.toLowerCase()}`}
                    className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-8 py-4 font-black text-xs uppercase tracking-[0.2em] transition-all bg-transparent shadow-none"
                  >
                    Treino {letter}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Renderiza apenas o conteúdo da aba ATIVA para evitar travamentos e loops de estado */}
            <div className="w-full">
              <WorkoutTabContent 
                tabId={activeTab}
                workout={workouts[activeTab]}
                onUpdateExercise={handleUpdateExercise}
                onApplySetsToAll={handleApplySetsToAll}
                onApplySavedSession={handleApplySavedSession}
                onUpdateWorkoutData={handleUpdateWorkoutData}
                onUpdateCombinationTypes={handleUpdateCombinationTypes}
              />
            </div>
          </Tabs>
        </main>
        
        <aside className="w-full lg:w-[320px] xl:w-[380px] space-y-6 shrink-0">
          <PageSidebar />
        </aside>
      </div>
    </div>
  );
}
