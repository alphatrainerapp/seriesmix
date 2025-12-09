import {
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { GripVertical, PlaySquare, MessageSquare, Trash2, Palette, Flame, Wrench, Check, Pencil, AppWindow } from 'lucide-react';
import type { Exercise, Set } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

const setTypeConfig: {
  [key in Set['type']]: {
    icon: React.ElementType;
    className: string;
  };
} = {
  Aquec: {
    icon: Flame,
    className: 'bg-[#dd694d] hover:bg-[#dd694d]/90 text-white border-transparent',
  },
  Prep: {
    icon: Wrench,
    className: 'bg-[#4a80e3] hover:bg-[#4a80e3]/90 text-white border-transparent',
  },
  Válidas: {
    icon: Check,
    className: 'bg-[#56ac73] hover:bg-[#56ac73]/90 text-white border-transparent',
  },
};

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <>
      <TableRow className="align-top hover:bg-muted/50 border-b-0">
        <TableCell className="w-[40px] pt-4 px-2">
          <Button variant="ghost" size="icon">
            <GripVertical className="text-muted-foreground" />
          </Button>
        </TableCell>
        <TableCell className="font-medium p-2 min-w-[250px]">
          <Input 
            className='bg-exercise-card border-border shadow-sm w-full'
            defaultValue={exercise.name}
          />
        </TableCell>
        <TableCell className="p-2 pt-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <PlaySquare className="text-primary" />
            </Button>
            <Select>
              <SelectTrigger className="w-[180px] bg-exercise-card border-border shadow-sm">
                <SelectValue placeholder="Selecione o método..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dropset">Dropset</SelectItem>
                <SelectItem value="rest-pause">Rest-pause</SelectItem>
                <SelectItem value="pyramid">Pyramid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TableCell>
        <TableCell className="w-[100px] text-center p-2 pt-3">
          <Button variant="ghost" size="icon">
            <MessageSquare className="text-primary" />
          </Button>
        </TableCell>
        <TableCell className="w-[50px] p-2 pt-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Input className="w-12 text-center" defaultValue="3" />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
        </TableCell>
        <TableCell className="w-[80px] p-2 pt-3 text-center"><Badge className="bg-[hsl(var(--chart-1))] text-black hover:bg-[hsl(var(--chart-1))]">{exercise.repsRange}</Badge></TableCell>
        <TableCell className="w-[80px] p-2 pt-3 text-center"><Badge className="bg-[hsl(var(--chart-2))] text-black hover:bg-[hsl(var(--chart-2))]">30</Badge></TableCell>
        <TableCell className="w-[80px] p-2 pt-3 text-center"><Badge className="bg-[hsl(var(--chart-3))] text-black hover:bg-[hsl(var(--chart-3))]">2.2</Badge></TableCell>
        <TableCell className="w-[40px] p-2 pt-3">
          <Button variant="ghost" size="icon">
             <AppWindow className="text-muted-foreground" />
          </Button>
        </TableCell>
        <TableCell className="w-[40px] p-2 pt-3">
          <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive hover:bg-destructive/10">
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
       <TableRow className="hover:bg-transparent">
        <TableCell></TableCell>
        <TableCell className="pt-0 pb-4 pl-2" colSpan={9}>
            <div className="flex items-center gap-2">
              {exercise.sets.map((set) => {
                  const config = setTypeConfig[set.type];
                  const Icon = config.icon;
                  return (
                    <Badge
                      key={set.label}
                      className={cn("text-xs font-semibold gap-1.5", config.className)}
                    >
                      <Icon className="h-3 w-3" />
                      {set.label}
                    </Badge>
                  );
                })}
            </div>
        </TableCell>
      </TableRow>
    </>
  );
}
