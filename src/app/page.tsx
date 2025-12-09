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
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8 text-foreground">
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
              <h1 className="text-3xl font-bold tracking-tight">TREINO A</h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Checkbox id="presencial" />
                  <label htmlFor="presencial">Presencial</label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="editar-varios" />
                  <label htmlFor="editar-varios">Editar Vários</label>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-lg bg-workout-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b-border">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Exercício</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="w-[120px] text-center">
                    Observação
                  </TableHead>
                  <TableHead>Série</TableHead>
                  <TableHead>Repetições</TableHead>
                  <TableHead>Intervalo</TableHead>
                  <TableHead>Cadência</TableHead>
                  <TableHead>Cor</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
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
              <Button>Protocolo aeróbico</Button>
              <Button variant="outline">Hiit</Button>
              <Button variant="outline">Exercício</Button>
              <Button variant="outline">Aquecimento</Button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold tracking-tight mb-2">Observações Treino A:</h2>
            <Textarea placeholder="Adicione observações sobre o treino..."/>
          </div>

        </TabsContent>
        <TabsContent value="treino-b" className="mt-6">
          <Card className="flex items-center justify-center p-16 bg-card shadow-sm">
            <p className="text-muted-foreground">No workout history yet.</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
