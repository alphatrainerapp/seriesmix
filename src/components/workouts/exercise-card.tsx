
import {
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { GripVertical, PlaySquare, MessageSquare, Trash2, Link2, Flame, Check, Pencil, SlidersHorizontal, Dumbbell, Timer } from 'lucide-react';
import type { Exercise, Set, SetType, CombinationType } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { EditSetsDialog } from './edit-sets-dialog';
import { EditObservationDialog } from './edit-observation-dialog';

const setTypeConfig: {
  [key in SetType]: {
    icon: React.ElementType;
    className: string;
    label: string;
  };
} = {
  aquecimento: {
    icon: Flame,
    className: 'bg-[#dd694d] hover:bg-[#dd694d]/90 text-white border-transparent',
    label: 'Aquec'
  },
  preparatoria: {
    icon: SlidersHorizontal,
    className: 'bg-[#4a80e3] hover:bg-[#4a80e3]/90 text-white border-transparent',
    label: 'Prep'
  },
  trabalho: {
    icon: Check,
    className: 'bg-[#56ac73] hover:bg-[#56ac73]/90 text-white border-transparent',
    label: 'Válidas'
  },
};

const combinationIconConfig: {
  [key in CombinationType]: {
    icon: React.ElementType;
    className: string;
  };
} = {
  biset: { icon: Dumbbell, className: 'text-blue-500' },
  triset: { icon: Dumbbell, className: 'text-blue-500' },
  superserie: { icon: Link2, className: 'text-green-500' },
  hiit: { icon: Timer, className: 'text-orange-500' },
};

export function ExerciseCard({
  exercise,
  onUpdateExercise,
  isGrouped = false,
  isFirstInGroup = false,
  isLastInGroup = false,
  combinationType,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
  isGrouped?: boolean;
  isFirstInGroup?: boolean;
  isLastInGroup?: boolean;
  combinationType?: CombinationType;
}) {
  const setCounts = exercise.sets.reduce((acc, set) => {
    acc[set.type] = (acc[set.type] || 0) + 1;
    return acc;
  }, {} as Record<SetType, number>);

  const setTypesInOrder: SetType[] = ['aquecimento', 'preparatoria', 'trabalho'];

  const CombinationIcon = combinationType ? combinationIconConfig[combinationType]?.icon : null;
  const combinationIconClassName = combinationType ? combinationIconConfig[combinationType]?.className : '';
  const firstInterval = exercise.sets[0]?.interval || '0';


  return (
    <>
      <TableRow className={cn(
        "align-top hover:bg-muted/50",
        isGrouped && !isLastInGroup ? "border-b-0" : "",
        isGrouped ? "bg-muted/30" : ""
      )}>
        <TableCell className="w-[40px] pt-4 px-2 relative">
          {isGrouped && (
             <div className="absolute left-[26px] top-0 h-full w-[2px] bg-primary/20">
                {isFirstInGroup && <div className="absolute -top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/20" />}
                {isLastInGroup && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/20" />}
             </div>
          )}
           {isGrouped && (
             <div className="absolute left-[34px] top-1/2 -translate-y-1/2 w-4 h-[2px] bg-primary/20" />
           )}
          <Button variant="ghost" size="icon">
            <GripVertical className="text-muted-foreground" />
          </Button>
        </TableCell>
        <TableCell className="font-medium p-2 min-w-[200px]">
          <div className="flex items-center gap-2">
            {isFirstInGroup && (
               <div className="flex items-center justify-center w-6 h-6 bg-primary/20 text-primary rounded-full shrink-0">
                  <Link2 className="h-4 w-4"/>
                </div>
            )}
            <Input 
              className='bg-exercise-card border-border shadow-sm w-full rounded-full'
              defaultValue={exercise.name}
            />
          </div>
        </TableCell>
        <TableCell className="p-2 pt-3">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <PlaySquare className="text-primary" />
            </Button>
            <Select>
              <SelectTrigger className="w-[140px] bg-exercise-card border-border shadow-sm rounded-full">
                <SelectValue placeholder="Método..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dropset">Dropset</SelectItem>
                <SelectItem value="rest-pause">Rest-pause</SelectItem>
                <SelectItem value="pyramid">Pyramid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TableCell>
        <TableCell className="w-[60px] text-center p-1 pt-3">
          <EditObservationDialog
            exercise={exercise}
            onUpdateExercise={onUpdateExercise}
          >
            <Button variant="ghost" size="icon">
              <MessageSquare className="text-primary" />
            </Button>
          </EditObservationDialog>
        </TableCell>
        <TableCell className="w-[90px] p-1 pt-3 text-center">
            <div className="flex items-center justify-center">
              <Input
                className="w-10 text-center bg-[hsl(var(--chart-1))] text-black placeholder:text-black/80 font-bold border-none"
                value={exercise.sets.length}
                readOnly
              />
              <EditSetsDialog
                exercise={exercise}
                onUpdateExercise={onUpdateExercise}
              >
                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                  <Pencil className="h-4 w-4" />
                </Button>
              </EditSetsDialog>
            </div>
        </TableCell>
        <TableCell className="w-[80px] px-1 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-2))] text-black placeholder:text-black/80 font-bold border-none"
            defaultValue={exercise.repsRange}
          />
        </TableCell>
        <TableCell className="w-[80px] px-1 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-3))] text-black placeholder:text-black/80 font-bold border-none"
            defaultValue={firstInterval}
          />
        </TableCell>
        <TableCell className="w-[80px] px-1 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-4))] text-black placeholder:text-black/80 font-bold border-none"
            defaultValue="2.2"
          />
        </TableCell>
        <TableCell className="w-[40px] p-2 pt-3">
          <Button variant="ghost" size="icon">
            {CombinationIcon ? (
              <CombinationIcon className={cn("h-5 w-5", combinationIconClassName)} />
            ) : (
               <div className="w-5 h-5 bg-gray-300 border-2 border-white rounded-sm shadow-inner" style={{ "backgroundImage": "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")" }}></div>
            )}
          </Button>
        </TableCell>
        <TableCell className="w-[40px] p-2 pt-3">
          <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive hover:bg-destructive/10">
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
       <TableRow className={cn("hover:bg-transparent", isGrouped ? "bg-muted/30" : "")}>
        <TableCell className={cn(isGrouped ? "border-b-0" : "")}></TableCell>
        <TableCell className="pt-0 pb-4 pl-2" colSpan={9}>
            <div className="flex items-center gap-2">
              {setTypesInOrder.map((setType) => {
                  const count = setCounts[setType];
                  if (!count) return null;

                  const config = setTypeConfig[setType];
                  const Icon = config.icon;
                  return (
                    <Badge
                      key={setType}
                      className={cn("text-xs font-semibold gap-1.5", config.className)}
                    >
                      <Icon className="h-3 w-3" />
                      {config.label} ({count})
                    </Badge>
                  );
                })}
            </div>
        </TableCell>
      </TableRow>
    </>
  );
}
