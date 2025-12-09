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
import type { Exercise, Set } from '@/lib/types';
import { MobileExerciseCard } from '@/components/workouts/mobile-exercise-card';
import { Accordion } from '@/components/ui/accordion';
import { CombineExercisesDialog } from '@/components/workouts/combine-exercises-dialog';

const CombineIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M13.5 2.5H9.5C8.39543 2.5 7.5 3.39543 7.5 4.5V6.5H11.5C12.6046 6.5 13.5 7.39543 13.5 8.5V12.5H15.5C16.6046 12.5 17.5 11.6046 17.5 10.5V4.5C17.5 3.39543 16.6046 2.5 15.5 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 7.5H4.5C3.39543 7.5 2.5 8.39543 2.5 9.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H10.5C11.6046 17.5 12.5 16.6046 12.5 15.5V13.5H8.5C7.39543 13.5 6.5 12.6046 6.5 11.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 9.16667C10.5 9.58784 10.1544 9.93333 9.73333 9.93333C9.31217 9.93333 8.96667 9.58784 8.96667 9.16667C8.96667 8.7455 9.31217 8.4 9.73333 8.4C10.1544 8.4 10.5 8.7455 10.5 9.16667Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M11.75 10.4167C11.75 10.8378 11.4044 11.1833 10.9833 11.1833C10.5622 11.1833 10.2167 10.8378 10.2167 10.4167C10.2167 9.9955 10.5622 9.65 10.9833 9.65C11.4044 9.65 11.75 9.9955 11.75 10.4167Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M9.25 10.4167C9.25 10.8378 8.90443 11.1833 8.48333 11.1833C8.06217 11.1833 7.71667 10.8378 7.71667 10.4167C7.71667 9.9955 8.06217 9.65 8.48333 9.65C8.90443 9.65 9.25 9.9955 9.25 10.4167Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
      <path
        d="M10.5 11.6667C10.5 12.0878 10.1544 12.4333 9.73333 12.4333C9.31217 12.4333 8.96667 12.0878 8.96667 11.6667C8.96667 11.2455 9.31217 10.9 9.73333 10.9C10.1544 10.9 10.5 11.2455 10.5 11.6667Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );

export default function Home() {
  const [workoutData, setWorkoutData] = useState<Exercise[]>(initialWorkoutData);

  const handleUpdateExercise = (updatedExercise: Exercise) => {
    setWorkoutData((prevData) =>
      prevData.map((ex) =>
        ex.id === updatedExercise.id ? updatedExercise : ex
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8 text-foreground gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <main className="flex-1 space-y-6">
          <TrainingPlanHeader />
          <TrainingSplit />
          <Tabs defaultValue="treino-a" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList className="bg-transparent p-0 border-b-0 rounded-none w-full justify-start">
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold tracking-tight">TREINO A</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox id="presencial" />
                      <label htmlFor="presencial">Presencial</label>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox id="editar-varios" />
                      <label htmlFor="editar-varios">Editar Vários</label>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CombineExercisesDialog exercises={workoutData}>
                        <Button variant="ghost" className="text-primary hover:text-primary gap-2">
                          <CombineIcon className="text-primary" />
                          Combinar
                        </Button>
                      </CombineExercisesDialog>
                    </div>
                  </div>
                </div>
              </div>
              {/* Desktop View */}
              <div className="border rounded-lg bg-card shadow-sm hidden md:block">
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
                  <TableBody>
                    {workoutData.map((exercise) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        onUpdateExercise={handleUpdateExercise}
                      />
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile View */}
              <div className="block md:hidden">
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {workoutData.map((exercise) => (
                    <MobileExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      onUpdateExercise={handleUpdateExercise}
                    />
                  ))}
                </Accordion>
              </div>


              <div className="mt-6 flex gap-2">
                <Button>Protocolo aeróbico</Button>
                <Button>Hiit</Button>
                <Button>Exercício</Button>
                <Button>Aquecimento</Button>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold tracking-tight mb-2">Observações Treino A:</h2>
                <Textarea placeholder="Adicione observações sobre o treino..."/>
              </div>

            </TabsContent>
          </Tabs>
        </main>
        <aside className="w-full lg:w-80 space-y-6">
          <PageSidebar />
        </aside>
      </div>
    </div>
  );
}
