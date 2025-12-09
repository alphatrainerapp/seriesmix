import {
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Clock, Flame, Puzzle, GripVertical, PlaySquare, MessageSquare, Trash2, Palette } from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SetTagProps = {
  type: string;
  label: string;
};

const setTagStyles: Record<
  string,
  {
    icon: React.ElementType;
    className: string;
  }
> = {
  Aquec: {
    icon: Flame,
    className: 'bg-orange-100 text-orange-600 border-orange-200',
  },
  Prep: {
    icon: Puzzle,
    className: 'bg-blue-100 text-blue-600 border-blue-200',
  },
  Válidas: {
    icon: CheckCircle2,
    className: 'bg-green-100 text-green-600 border-green-200',
  },
};

function SetTag({ type, label }: SetTagProps) {
  const style = setTagStyles[type];
  if (!style) return null;
  const Icon = style.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium',
        style.className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <>
      <TableRow className="align-top">
        <TableCell>
          <Button variant="ghost" size="icon">
            <GripVertical className="text-muted-foreground" />
          </Button>
        </TableCell>
        <TableCell className="font-medium pt-5">{exercise.name}</TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <PlaySquare className="text-teal-500" />
            </Button>
            <Select>
              <SelectTrigger className="w-[180px]">
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
        <TableCell className="text-center">
          <Button variant="ghost" size="icon">
            <MessageSquare className="text-teal-500" />
          </Button>
        </TableCell>
        <TableCell><Badge className="bg-orange-400 text-white hover:bg-orange-500">3</Badge></TableCell>
        <TableCell><Badge className="bg-lime-300 text-lime-800 hover:bg-lime-400">12-14</Badge></TableCell>
        <TableCell><Badge className="bg-green-500 text-white hover:bg-green-600">30</Badge></TableCell>
        <TableCell><Badge className="bg-teal-500 text-white hover:bg-teal-600">2.2</Badge></TableCell>
        <TableCell>
          <Button variant="ghost" size="icon">
             <Palette className="text-muted-foreground" />
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
          <TableCell></TableCell>
          <TableCell colSpan={9} className="pb-4 pt-0">
             <div className="flex flex-wrap items-center gap-2">
                {exercise.sets.map((set) => (
                    <SetTag key={set.type} type={set.type} label={set.label} />
                ))}
                <Badge
                    variant="outline"
                    className="flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium bg-gray-100 text-gray-600 border-gray-200"
                >
                    <Clock className="h-3.5 w-3.5" />
                    {exercise.repsRange} reps
                </Badge>
             </div>
          </TableCell>
      </TableRow>
    </>
  );
}

    