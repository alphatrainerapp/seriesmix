import {
  Card,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import { mockWorkout } from '@/lib/data';
import { ExerciseCard } from '@/components/workouts/exercise-card';
import { CreateWorkoutDialog } from '@/components/workouts/create-workout-dialog';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Treinos</h1>
          <p className="text-muted-foreground">Manage and create your workout plans.</p>
        </div>
        <div className="flex items-center gap-2">
          <CreateWorkoutDialog />
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Trash2 className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Pencil className="h-5 w-5" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Copy className="h-5 w-5" />
            <span className="sr-only">Duplicate</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="treino-a">
        <TabsList className="bg-transparent p-0 border-b rounded-none w-full justify-start">
          <TabsTrigger
            value="treino-a"
            className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none px-4"
          >
            Novo Treino
          </TabsTrigger>
          <TabsTrigger
            value="treino-b"
            className="data-[state=active]:border-primary data-[state=active]:border-b-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none text-muted-foreground px-4"
          >
            Histórico
          </TabsTrigger>
        </TabsList>
        <TabsContent value="treino-a" className="mt-6">
          <div className="grid gap-4 md:gap-6">
            {mockWorkout.map((exercise, index) => (
              <ExerciseCard key={index} exercise={exercise} />
            ))}
             <Card className="flex items-center justify-center p-8 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
              <div className="text-center">
                <p className="text-muted-foreground">Add new exercise to your workout</p>
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="treino-b" className="mt-6">
            <Card className="flex items-center justify-center p-16">
              <p className="text-muted-foreground">No workout history yet.</p>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
