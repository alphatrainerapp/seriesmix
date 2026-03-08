
'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockWorkout as initialWorkoutData } from '@/lib/data';
import { ExerciseCard } from '@/components/workouts/exercise-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TrainingPlanHeader } from '@/components/plan/training-plan-header';
import { TrainingSplit } from '@/components/plan/training-split';
import { PageSidebar } from '@/components/sidebar/page-sidebar';
import { useState } from 'react';
import type { CombinationType, Exercise } from '@/lib/types';
import { MobileExerciseCard } from '@/components/workouts/mobile-exercise-card';
import { Accordion } from '@/components/ui/accordion';
import { CombineExercisesDialog } from '@/components/workouts/combine-exercises-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, ListOrdered, SquarePen, Combine } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const [workoutData, setWorkoutData] = useState<Exercise[]>(initialWorkoutData);
  const [combinationTypes, setCombinationTypes] = useState<Record<string, CombinationType>>({
    'warmup': 'biset'
  });
  const [isSorting, setIsSorting] = useState(false);

  const handleUpdateExercise = (updatedExercise: Exercise) => {
    setWorkoutData((prevData) =>
      prevData.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };
  
  const processedExercises = () => {
    const elements: React.ReactNode[] = [];
    const renderedGroupIds = new Set<string>();

    workoutData.forEach((currentExercise) => {
      if (currentExercise.groupId && renderedGroupIds.has(currentExercise.groupId)) {
        return;
      }
      
      if (currentExercise.groupId) {
        const group = workoutData.filter(e => e.groupId === currentExercise.groupId);
        const combinationType = combinationTypes[currentExercise.groupId];
        elements.push(
          <tbody key={`group-${currentExercise.groupId}`} className="relative border-b-0">
             {group.map((exercise, idx) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  onUpdateExercise={handleUpdateExercise}
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
          <tbody key={currentExercise.id}>
            <ExerciseCard
              exercise={currentExercise}
              onUpdateExercise={handleUpdateExercise}
            />
          </tbody>
        );
      }
    });
    return elements;
  };

  return (
    <div className="w-full max-w-[720px] lg:max-w-[1200px] xl:max-w-[1400px] mx-auto px-4 py-8 text-foreground">
      <div className="flex flex-col lg:flex-row gap-8">
        <main className="flex-1 min-w-0 space-y-8">
          <TrainingPlanHeader />
          <TrainingSplit />
          <Tabs defaultValue="treino-a" className="w-full">
            <div className="flex justify-between items-center border-b border-border/40">
              <TabsList className="bg-transparent p-0 h-auto gap-2">
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <TabsTrigger
                    key={letter}
                    value={`treino-${letter.toLowerCase()}`}
                    className="data-[state=active]:border-primary data-[state=active]:text-primary border-b-2 border-transparent rounded-none px-6 py-3 font-bold transition-all bg-transparent shadow-none"
                  >
                    Treino {letter}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <TabsContent value="treino-a" className="mt-8">
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <h2 className="text-2xl font-black tracking-tight uppercase">TREINO A</h2>

                <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <Checkbox id="presencial" className="rounded-sm border-muted-foreground/30" />
                  Presencial
                </label>

                <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                  <SquarePen className="h-5 w-5 text-cyan-400" />
                  Editar variáveis
                </button>

                <CombineExercisesDialog
                  exercises={workoutData}
                  onUpdateWorkout={setWorkoutData}
                  combinationTypes={combinationTypes}
                  onUpdateCombinationTypes={setWorkoutData}
                >
                  <button className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    <Combine className="h-6 w-6 text-cyan-400" />
                    Combinar
                  </button>
                </CombineExercisesDialog>
              </div>
              
              {/* Desktop View */}
              <div className="border rounded-xl bg-card shadow-sm hidden md:block overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent bg-muted/20 border-b-border">
                      <TableHead className="w-[50px] px-2"></TableHead>
                      <TableHead className="min-w-[300px]">Exercício</TableHead>
                      <TableHead className="w-[180px]">Método</TableHead>
                      <TableHead className="w-[80px] text-center">Obs</TableHead>
                      <TableHead className="w-[100px] text-center">Série</TableHead>
                      <TableHead className="w-[100px] text-center">Reps</TableHead>
                      <TableHead className="w-[100px] text-center">Intervalo</TableHead>
                      <TableHead className="w-[100px] text-center">Cadência</TableHead>
                      <TableHead className="w-[50px] text-center">Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  {processedExercises()}
                </Table>
              </div>

              {/* Mobile View */}
              <div className="block md:hidden">
                <Accordion type="single" collapsible className="flex flex-col gap-3 w-full">
                  {workoutData.map((exercise) => (
                    <MobileExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onUpdateExercise={handleUpdateExercise}
                      combinationType={exercise.groupId ? combinationTypes[exercise.groupId] : undefined}
                    />
                  ))}
                </Accordion>
              </div>

              {/* Action Buttons and Observations */}
              <div className="mt-10 space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-[#009688] hover:bg-[#00796b] text-white rounded-xl px-8 h-14 font-black gap-3 shadow-lg shadow-teal-500/10 border-none">
                        <Plus className="h-6 w-6" />
                        ADICIONAR EXERCÍCIO
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 rounded-xl p-2 shadow-xl border-border/40">
                      <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-medium">Protocolo aeróbico</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-medium">Hiit</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-medium">Exercício</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg p-4 cursor-pointer font-medium">Aquecimento</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button 
                    variant="outline" 
                    className={cn(
                      "rounded-xl px-8 h-14 font-black gap-3 shadow-sm border-border bg-card transition-all active:scale-95",
                      isSorting && "border-primary text-primary bg-primary/5"
                    )}
                    onClick={() => setIsSorting(!isSorting)}
                  >
                    <ListOrdered className="h-6 w-6" />
                    ORDENAR LISTA
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-black tracking-tight text-foreground ml-1 uppercase italic">Observações Treino A:</h2>
                  <div className="rounded-2xl border bg-card shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all border-border/40">
                    <Textarea 
                      placeholder="Ao final do treino escreva a duração no campo de feedback..." 
                      className="min-h-[160px] border-none shadow-none resize-none focus-visible:ring-0 p-6 text-base font-medium leading-relaxed bg-transparent"
                    />
                  </div>
                </div>
              </div>

            </TabsContent>
          </Tabs>
        </main>
        
        <aside className="w-full lg:w-[340px] xl:w-[380px] space-y-8 shrink-0">
          <PageSidebar />
        </aside>
      </div>
    </div>
  );
}
