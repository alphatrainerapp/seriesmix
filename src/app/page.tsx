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
import { WodBlockCard } from '@/components/workouts/wod-block-card';
import { CardioBlockCard } from '@/components/workouts/cardio-block-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TrainingPlanHeader } from '@/components/plan/training-plan-header';
import { TrainingSplit } from '@/components/plan/training-split';
import { useState, useCallback, memo, useMemo } from 'react';
import type { CombinationType, Exercise, Set, WodDetails } from '@/lib/types';
import { MobileExerciseCard } from '@/components/workouts/mobile-exercise-card';
import { Accordion } from '@/components/ui/accordion';
import { CombineExercisesDialog } from '@/components/workouts/combine-exercises-dialog';
import { SaveSessionDialog } from '@/components/workouts/save-session-dialog';
import { UseSavedSessionDialog } from '@/components/workouts/use-saved-session-dialog';
import { ExerciseSearchDialog } from '@/components/workouts/exercise-search-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Plus, 
  ListOrdered, 
  SquarePen, 
  Combine, 
  Save, 
  History, 
  Dumbbell, 
  Check, 
  FolderPlus, 
  Printer, 
  Download, 
  Send, 
  Home as HomeIcon,
  Zap,
  Clock,
  Activity,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { PageSidebar } from '@/components/sidebar/page-sidebar';

type WorkoutState = {
  data: Exercise[];
  combinationTypes: Record<string, CombinationType>;
};

// Barra de ações final baseada na imagem de referência
const WorkoutActionsFooter = () => (
  <div className="flex flex-wrap items-center gap-3 mt-12 pb-10 border-t pt-8 mobile-content-wrapper">
    <Button className="bg-[#ffa726] hover:bg-[#fb8c00] text-white rounded-full px-6 h-10 font-bold gap-2 border-none shadow-sm uppercase text-[11px] tracking-widest">
      <Check className="h-4 w-4" />
      Finalizar
    </Button>
    
    <Button className="bg-[#4db6ac] hover:bg-[#26a69a] text-white rounded-md px-5 h-10 font-bold gap-2 border-none shadow-sm text-[11px] uppercase tracking-widest">
      <Save className="h-4 w-4" />
      Salvar Treino
    </Button>
    
    <Button className="bg-[#90a4ae] hover:bg-[#78909c] text-white rounded-md px-5 h-10 font-bold gap-2 border-none shadow-sm text-[11px] uppercase tracking-widest">
      <FolderPlus className="h-4 w-4" />
      Salvar Modelo
    </Button>
    
    <Button className="bg-[#90a4ae] hover:bg-[#78909c] text-white rounded-md px-5 h-10 font-bold gap-2 border-none shadow-sm text-[11px] uppercase tracking-widest">
      <Printer className="h-4 w-4" />
      Imprimir
    </Button>
    
    <Button className="bg-[#90a4ae] hover:bg-[#78909c] text-white rounded-md px-5 h-10 font-bold gap-2 border-none shadow-sm text-[11px] uppercase tracking-widest">
      <Download className="h-4 w-4" />
      Baixar
    </Button>
    
    <Button className="bg-[#4db6ac] hover:bg-[#26a69a] text-white rounded-md px-5 h-10 font-bold gap-2 border-none shadow-sm text-[11px] uppercase tracking-widest">
      <Send className="h-4 w-4" />
      Enviar
    </Button>
    
    <Button className="bg-[#009688] hover:bg-[#00796b] text-white rounded-md px-5 h-10 font-bold gap-2 border-none shadow-sm text-[11px] uppercase tracking-widest">
      <HomeIcon className="h-4 w-4" />
      Área do Aluno
    </Button>
  </div>
);

// Componente isolado para o conteúdo do treino
const WorkoutTabContent = memo(({ 
  tabId, 
  workout, 
  onUpdateExercise, 
  onApplySetsToAll, 
  onApplySavedSession, 
  onUpdateWorkoutData, 
  onUpdateWorkoutDataWithCombination,
  onAddWod,
  onAddCardio,
  onAddRegularExercise
}: { 
  tabId: string;
  workout: WorkoutState;
  onUpdateExercise: (ex: Exercise, tabId: string) => void;
  onApplySetsToAll: (sets: Set[], tabId: string) => void;
  onApplySavedSession: (data: Exercise[], types: Record<string, CombinationType>, tabId: string) => void;
  onUpdateWorkoutData: (data: Exercise[], tabId: string) => void;
  onUpdateWorkoutDataWithCombination: (types: Record<string, CombinationType>, tabId: string) => void;
  onAddWod: (tabId: string) => void;
  onAddCardio: (type: 'aerobico' | 'hiit', tabId: string) => void;
  onAddRegularExercise: (name: string, tabId: string) => void;
}) => {
  const [isSorting, setIsSorting] = useState(false);

  const estimatedDuration = useMemo(() => {
    let totalSeconds = 0;
    
    workout.data.forEach(ex => {
      if (ex.isWod && ex.wodDetails?.duration) {
        const mins = parseInt(ex.wodDetails.duration.split(':')[0]);
        totalSeconds += (isNaN(mins) ? 15 : mins) * 60;
      } else if (ex.isCardio) {
        totalSeconds += 20 * 60; // Assume 20 min padrão para cardio
      } else if (ex.sets && ex.sets.length > 0) {
        const numSets = ex.sets.length;
        const setExecutionTime = 60;
        const intervalTime = parseInt(ex.sets[0]?.interval) || 60;
        totalSeconds += (numSets * setExecutionTime) + ((numSets - 1) * intervalTime);
      }
    });
    
    if (workout.data.length > 0) {
      totalSeconds += 300; 
    }

    return Math.ceil(totalSeconds / 60);
  }, [workout.data]);

  const renderExerciseList = () => {
    if (!workout || !Array.isArray(workout.data) || workout.data.length === 0) {
      return (
        <TableBody>
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={10} className="h-48 text-center text-muted-foreground">
              <div className="flex flex-col items-center gap-3">
                <Dumbbell className="h-10 w-10 opacity-10" />
                <p className="font-black uppercase tracking-widest text-xs">Nenhum exercício carregado</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    const elements: React.ReactNode[] = [];
    const renderedGroupIds = new Set<string>();

    workout.data.forEach((currentExercise) => {
      if (currentExercise.isWod) {
        elements.push(
          <TableBody key={`wod-body-${currentExercise.id}-${tabId}`}>
            <WodBlockCard 
              exercise={currentExercise} 
              onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)} 
            />
          </TableBody>
        );
        return;
      }

      if (currentExercise.isCardio) {
        elements.push(
          <TableBody key={`cardio-body-${currentExercise.id}-${tabId}`}>
            <CardioBlockCard 
              exercise={currentExercise} 
              onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)} 
            />
          </TableBody>
        );
        return;
      }

      if (currentExercise.groupId && renderedGroupIds.has(currentExercise.groupId)) {
        return;
      }
      
      if (currentExercise.groupId) {
        const group = workout.data.filter(e => e.groupId === currentExercise.groupId);
        const combinationType = workout.combinationTypes[currentExercise.groupId];
        elements.push(
          <TableBody key={`group-${currentExercise.groupId}-${tabId}`} className="relative border-b-0">
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
          </TableBody>
        );
        renderedGroupIds.add(currentExercise.groupId);
      } else {
        elements.push(
          <TableBody key={`${currentExercise.id}-${tabId}`}>
            <ExerciseCard
              exercise={currentExercise}
              onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)}
              onApplySetsToAll={(sets) => onApplySetsToAll(sets, tabId)}
            />
          </TableBody>
        );
      }
    });

    return elements;
  };

  return (
    <div className="mt-8 animate-in fade-in-50 duration-500 mobile-content-wrapper">
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
              {tabId.replace('treino-', 'Treino ').toUpperCase()}
            </h2>
            {estimatedDuration > 0 && (
              <div className="flex items-center gap-2 text-primary px-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Duração: {estimatedDuration} min</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <SaveSessionDialog workoutData={workout.data} combinationTypes={workout.combinationTypes}>
            <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
              <Save className="h-5 w-5 text-primary" />
              Salvar sessão
            </button>
          </SaveSessionDialog>

          <UseSavedSessionDialog onApplySession={(data, types) => onApplySavedSession(data, types, tabId)}>
            <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground">
              <History className="h-5 w-5 text-primary" />
              Usar sessão salva
            </button>
          </UseSavedSessionDialog>
        </div>
      </div>
      
      <div className="space-y-4">
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
      </div>

      <div className="block md:hidden">
        {workout.data.length > 0 ? (
          <Accordion type="single" collapsible className="flex flex-col gap-3 w-full">
            {workout.data.map((currentExercise) => (
              <MobileExerciseCard
                key={`${currentExercise.id}-mobile-${tabId}`}
                exercise={currentExercise}
                onUpdateExercise={(ex) => onUpdateExercise(ex, tabId)}
                combinationType={currentExercise.groupId ? workout.combinationTypes[currentExercise.groupId] : undefined}
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
              <Button className="bg-[#009688] hover:bg-[#00796b] text-white rounded-xl px-10 h-14 font-black text-xs gap-3 shadow-lg border-none uppercase tracking-widest">
                <Plus className="h-6 w-6" />
                ADICIONAR EXERCÍCIO
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-xl p-2 shadow-xl border-border/40">
              <DropdownMenuItem 
                className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest"
                onClick={() => onAddCardio('aerobico', tabId)}
              >
                <Activity className="h-4 w-4 mr-2 text-blue-500" />
                Protocolo aeróbico
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest"
                onClick={() => onAddCardio('hiit', tabId)}
              >
                <Zap className="h-4 w-4 mr-2 text-orange-500" />
                Hiit
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest"
                onClick={() => onAddWod(tabId)}
              >
                <Zap className="h-4 w-4 mr-2 text-primary" />
                Protocolo WOD
              </DropdownMenuItem>
              <ExerciseSearchDialog onSelect={(name) => onAddRegularExercise(name, tabId)}>
                <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest" onSelect={(e) => e.preventDefault()}>
                  <Dumbbell className="h-4 w-4 mr-2 text-primary" />
                  Exercício
                </DropdownMenuItem>
              </ExerciseSearchDialog>
              <ExerciseSearchDialog onSelect={(name) => onAddRegularExercise(name, tabId)}>
                <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-bold uppercase text-[10px] tracking-widest" onSelect={(e) => e.preventDefault()}>
                  <Flame className="h-4 w-4 mr-2 text-orange-600" />
                  Aquecimento
                </DropdownMenuItem>
              </ExerciseSearchDialog>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="outline" 
            className={cn(
              "rounded-xl px-10 h-14 font-black text-xs gap-3 shadow-sm border-border bg-card uppercase tracking-widest",
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
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden border-border/40">
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
  }, []);

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

  const handleAddWod = (tabId: string) => {
    const newWod: Exercise = {
      id: Date.now(),
      name: 'WOD: AMRAP',
      isWod: true,
      preExhaustion: false,
      repsRange: '',
      sets: [],
      wodDetails: {
        name: 'METCON 01',
        type: 'AMRAP',
        description: 'Complete o máximo de voltas possível no tempo determinado.',
        exercises: [],
        rounds: '1',
        duration: '15:00'
      }
    };
    setWorkouts(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        data: [...prev[tabId].data, newWod]
      }
    }));
  };

  const handleAddCardio = (type: 'aerobico' | 'hiit', tabId: string) => {
    const newEx: Exercise = {
      id: Date.now(),
      name: type === 'aerobico' ? 'Aeróbico: Pace Progressivo' : 'HIIT: Protocolo Tabata',
      preExhaustion: false,
      isCardio: true,
      cardioDetails: {
        type,
        description: type === 'aerobico' 
          ? 'Iniciar com 5min de aquecimento leve.\nDepois 20min alternando 1km em pace confortável e 1km em pace moderado/forte.\nFinalizar com 5min de volta à calma.'
          : 'Aquecimento: 2min de trote leve.\nProtocolo principal: 20 segundos de esforço máximo seguidos de 10 segundos de descanso passivo.\nRepetir o ciclo 8 vezes (total 4 minutos).\nFinalizar com 2min de caminhada.',
      },
      sets: [],
      repsRange: ''
    };
    setWorkouts(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        data: [...prev[tabId].data, newEx]
      }
    }));
    toast({
      title: "Protocolo Carregado",
      description: `Protocolo de ${type} adicionado com sucesso.`,
    });
  };

  const handleAddRegularExercise = (name: string, tabId: string) => {
    const newEx: Exercise = {
      id: Date.now(),
      name,
      preExhaustion: false,
      sets: [
        { id: 1, type: 'trabalho', unit: 'reps', reps: '10-12', interval: '60', rir: '' }
      ],
      repsRange: '10-12',
    };
    setWorkouts(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        data: [...prev[tabId].data, newEx]
      }
    }));
    toast({
      title: "Exercício Adicionado",
      description: `${name} foi inserido no seu treino.`,
    });
  };

  return (
    <div className="app-container py-8 text-foreground transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        <main className="flex-1 min-w-0 w-full space-y-8">
          <div className="mobile-content-wrapper w-full space-y-8">
            <TrainingPlanHeader />
            <TrainingSplit />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center border-b border-border/40 overflow-x-auto no-scrollbar mobile-content-wrapper">
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

            <div className="w-full">
              <WorkoutTabContent 
                tabId={activeTab}
                workout={workouts[activeTab]}
                onUpdateExercise={handleUpdateExercise}
                onApplySetsToAll={handleApplySetsToAll}
                onApplySavedSession={handleApplySavedSession}
                onUpdateWorkoutData={handleUpdateWorkoutData}
                onUpdateWorkoutDataWithCombination={handleUpdateCombinationTypes}
                onAddWod={handleAddWod}
                onAddCardio={handleAddCardio}
                onAddRegularExercise={handleAddRegularExercise}
              />
            </div>
          </Tabs>

          <WorkoutActionsFooter />
        </main>
        
        <aside className="w-full lg:w-[320px] xl:w-[380px] space-y-6 shrink-0 mobile-content-wrapper lg:mobile-content-wrapper-none">
          <PageSidebar exercises={workouts[activeTab].data} currentTab={activeTab} />
        </aside>
      </div>
    </div>
  );
}
