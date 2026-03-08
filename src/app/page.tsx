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
import { Plus, ListOrdered } from 'lucide-react';
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
    <div className="w-full max-w-[700px] lg:max-w-[1100px] mx-auto px-4 text-foreground">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 space-y-6">
          <TrainingPlanHeader />
          <TrainingSplit />
          <Tabs defaultValue="treino-a" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="bg-transparent p-0 border-b-0 rounded-none w-full justify-start overflow-x-auto">
                <TabsTrigger
                  value="treino-a"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none px-4"
                >
                  Treino A
                </TabsTrigger>
                <TabsTrigger
                  value="treino-b"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground px-4"
                >
                  Treino B
                </TabsTrigger>
                <TabsTrigger
                  value="treino-c"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground px-4"
                >
                  Treino C
                </TabsTrigger>
                <TabsTrigger
                  value="treino-d"
                  className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground px-4"
                >
                  Treino D
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="treino-a" className="mt-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h2 className="text-xl font-bold">TREINO A</h2>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox id="presencial" />
                  Presencial
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox id="editar-varios" />
                  Editar vários
                </label>

                <div className="ml-auto">
                  <CombineExercisesDialog
                    exercises={workoutData}
                    onUpdateWorkout={setWorkoutData}
                    combinationTypes={combinationTypes}
                    onUpdateCombinationTypes={setCombinationTypes}
                  >
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg border-none shadow-none">
                      Combinar
                    </Button>
                  </CombineExercisesDialog>
                </div>
              </div>
              
              {/* Desktop View */}
              <div className="border rounded-lg bg-card shadow-sm hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-border">
                      <TableHead className="w-[40px] px-2"></TableHead>
                      <TableHead className="min-w-[450px]">Exercício</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="w-[80px] text-center px-1">
                        Observação
                      </TableHead>
                      <TableHead className="w-[80px] text-center px-0">Série</TableHead>
                      <TableHead className="w-[60px] text-center px-0">Repetições</TableHead>
                      <TableHead className="w-[60px] text-center px-0">Intervalo</TableHead>
                      <TableHead className="w-[60px] text-center px-0">Cadência</TableHead>
                      <TableHead className="w-[40px]">Cor</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
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
              <div className="mt-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="bg-[#009688] hover:bg-[#00796b] text-white rounded-xl px-6 h-12 font-bold gap-2 shadow-sm border-none">
                        <Plus className="h-5 w-5" />
                        Adicionar Exercício
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 rounded-xl p-2">
                      <DropdownMenuItem className="rounded-lg p-3 cursor-pointer">Protocolo aeróbico</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg p-3 cursor-pointer">Hiit</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg p-3 cursor-pointer">Exercício</DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg p-3 cursor-pointer">Aquecimento</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button 
                    variant="outline" 
                    className={cn(
                      "rounded-xl px-6 h-12 font-bold gap-2 shadow-sm border-border bg-card",
                      isSorting && "border-primary text-primary"
                    )}
                    onClick={() => setIsSorting(!isSorting)}
                  >
                    <ListOrdered className="h-5 w-5" />
                    Ordenar Lista
                  </Button>
                </div>

                <div className="space-y-3">
                  <h2 className="text-lg font-bold tracking-tight text-foreground ml-1">Observações Treino A:</h2>
                  <div className="rounded-2xl border bg-card p-1 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <Textarea 
                      placeholder="ao final do treino escreva a duração no campo de feedback" 
                      className="min-h-[120px] border-none shadow-none resize-none focus-visible:ring-0 p-4 text-sm font-medium leading-relaxed"
                    />
                  </div>
                </div>
              </div>

            </TabsContent>
          </Tabs>
        </main>
        
        {/* Sidebar as separate section below or beside based on screen */}
        <aside className="w-full lg:w-[320px] space-y-6">
          <PageSidebar />
        </aside>
      </div>
    </div>
  );
}
