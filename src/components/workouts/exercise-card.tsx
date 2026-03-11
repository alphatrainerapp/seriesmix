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
import { ExerciseSearchDialog } from './exercise-search-dialog';

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

  const handleUpdateName = (newName: string) => {
    onUpdateExercise({ ...exercise, name: newName });
  };

  return (
    <>
      <TableRow className={cn(
        "align-top hover:bg-muted/50",
        isGrouped && !isLastInGroup ? "border-b-0" : "",
        isGrouped ? "bg-muted/30" : ""
      )}>
        <TableCell className="w-[35px] pt-4 px-1.5 relative">
          {isGrouped && (
             <div className="absolute left-[20px] top-0 h-full w-[2px] bg-primary/20">
                {isFirstInGroup && <div className="absolute -top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/20" />}
                {isLastInGroup && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/20" />}
             </div>
          )}
           {isGrouped && (
             <div className="absolute left-[28px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-primary/20" />
           )}
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <GripVertical className="text-muted-foreground w-3.5 h-3.5" />
          </Button>
        </TableCell>
        <TableCell className="font-medium p-2 min-w-[200px] lg:min-w-[400px]">
          <div className="flex items-center gap-2">
            {isFirstInGroup && (
               <div className="flex items-center justify-center w-5 h-5 bg-primary/20 text-primary rounded-full shrink-0">
                  <Link2 className="h-3.5 w-3.5"/>
                </div>
            )}
            <ExerciseSearchDialog onSelect={handleUpdateName}>
              <button className="flex-1 text-left bg-exercise-card border border-border shadow-sm px-3 rounded-full h-8 text-[13px] font-bold truncate hover:border-primary/50 transition-colors">
                {exercise.name}
              </button>
            </ExerciseSearchDialog>
          </div>
        </TableCell>
        <TableCell className="p-1 pt-3 w-[110px]">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="shrink-0 h-7 w-7">
              <PlaySquare className="text-primary w-3.5 h-3.5" />
            </Button>
            <Select>
              <SelectTrigger className="w-full bg-exercise-card border-border shadow-sm rounded-full h-7 text-[10px] px-2">
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
        <TableCell className="w-[40px] text-center p-0.5 pt-3">
          <EditObservationDialog
            exercise={exercise}
            onUpdateExercise={onUpdateExercise}
          >
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MessageSquare className="text-primary w-3.5 h-3.5" />
            </Button>
          </EditObservationDialog>
        </TableCell>
        <TableCell className="w-[45px] p-0.5 pt-3 text-center">
            <div className="flex items-center justify-center">
              <Input
                className="w-7 text-center bg-[hsl(var(--chart-1))] text-black placeholder:text-black/80 font-bold border-none h-7 text-[10px] rounded-sm px-0"
                value={exercise.sets.length}
                readOnly
              />
              <EditSetsDialog
                exercise={exercise}
                onUpdateExercise={onUpdateExercise}
              >
                <Button variant="ghost" size="icon" className="h-6 w-6 text-primary shrink-0 ml-0.5">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </EditSetsDialog>
            </div>
        </TableCell>
        <TableCell className="w-[45px] px-0.5 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-2))] text-black placeholder:text-black/80 font-bold border-none h-7 text-[10px] rounded-sm px-0"
            defaultValue={exercise.repsRange}
          />
        </TableCell>
        <TableCell className="w-[45px] px-0.5 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-3))] text-black placeholder:text-black/80 font-bold border-none h-7 text-[10px] rounded-sm px-0"
            defaultValue={firstInterval}
          />
        </TableCell>
        <TableCell className="w-[45px] px-0.5 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-4))] text-black placeholder:text-black/80 font-bold border-none h-7 text-[10px] rounded-sm px-0"
            defaultValue="2.2"
          />
        </TableCell>
        <TableCell className="w-[40px] p-1 pt-3 text-center">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            {CombinationIcon ? (
              <CombinationIcon className={cn("h-3.5 w-3.5", combinationIconClassName)} />
            ) : (
               <div className="w-3.5 h-3.5 bg-gray-300 border border-white rounded-sm shadow-inner" style={{ "backgroundImage": "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")" }}></div>
            )}
          </Button>
        </TableCell>
        <TableCell className="w-[40px] p-1 pt-3 text-center">
          <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive hover:bg-destructive/10 h-7 w-7">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </TableCell>
      </TableRow>
       <TableRow className={cn("hover:bg-transparent", isGrouped ? "bg-muted/30" : "")}>
        <TableCell className={cn(isGrouped ? "border-b-0" : "")}></TableCell>
        <TableCell className="pt-0 pb-4 pl-2" colSpan={9}>
            <div className="flex items-center gap-2">
              {setTypesInOrder.map((setType) => {
                  const count = setCounts[setType];
                  const config = setTypeConfig[setType];
                  const Icon = config.icon;
                  
                  return (
                    <div key={setType} className="w-[85px] flex shrink-0">
                      {count > 0 ? (
                        <Badge
                          className={cn("w-full text-[9px] font-black gap-1 px-1.5 py-0.5 uppercase tracking-tighter justify-center", config.className)}
                        >
                          <Icon className="h-2.5 w-2.5" />
                          {config.label} ({count})
                        </Badge>
                      ) : null}
                    </div>
                  );
                })}
            </div>
        </TableCell>
      </TableRow>
    </>
  );
}