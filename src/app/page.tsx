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
import { mockWorkout } from '@/lib/data';
import { ExerciseCard } from '@/components/workouts/exercise-card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TrainingPlanHeader } from '@/components/plan/training-plan-header';
import { TrainingSplit } from '@/components/plan/training-split';
import { PageSidebar } from '@/components/sidebar/page-sidebar';

export default function Home() {
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
                  </div>
                </div>
              </div>
              <div className="border rounded-lg bg-card shadow-sm">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-b-border">
                      <TableHead className="w-[40px] px-2"></TableHead>
                      <TableHead className="min-w-[250px]">Exercício</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead className="w-[100px] text-center">
                        Observação
                      </TableHead>
                      <TableHead className="w-[50px] text-center">Série</TableHead>
                      <TableHead className="w-[80px] text-center">Repetições</TableHead>
                      <TableHead className="w-[80px] text-center">Intervalo</TableHead>
                      <TableHead className="w-[80px] text-center">Cadência</TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                      <TableHead className="w-[40px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkout.map((exercise, index) => (
                      <ExerciseCard key={index} exercise={exercise} />
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 flex gap-2">
                  <Button variant="outline">Protocolo aeróbico</Button>
                  <Button variant="outline">Hiit</Button>
                  <Button variant="outline">Exercício</Button>
                  <Button variant="outline">Aquecimento</Button>
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
