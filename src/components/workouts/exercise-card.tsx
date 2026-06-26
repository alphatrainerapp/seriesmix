import {
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import { 
  GripVertical, 
  MessageSquare, 
  Trash2, 
  Link2, 
  Flame, 
  Check, 
  Pencil, 
  SlidersHorizontal, 
  Dumbbell, 
  Timer, 
  Shuffle
} from 'lucide-react';
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
import { SubstitutionDialog } from './substitution-dialog';

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
    label: 'AQUEC'
  },
  preparatoria: {
    icon: SlidersHorizontal,
    className: 'bg-[#4a80e3] hover:bg-[#4a80e3]/90 text-white border-transparent',
    label: 'PREP'
  },
  trabalho: {
    icon: Check,
    className: 'bg-[#56ac73] hover:bg-[#56ac73]/90 text-white border-transparent',
    label: 'VÁLIDAS'
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
  onApplySetsToAll,
  isGrouped = false,
  isFirstInGroup = false,
  isLastInGroup = false,
  combinationType,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
  onApplySetsToAll?: (sets: Set[]) => void;
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

  const handleSaveSubstitutions = (substitutions: string[]) => {
    onUpdateExercise({ ...exercise, substitutions });
  };

  const substitutionCount = exercise.substitutions?.length || 0;

  return (
    <>
      <TableRow className={cn(
        "align-top hover:bg-muted/50 border-b-border/30",
        isGrouped && !isLastInGroup ? "border-b-0" : "",
        isGrouped ? "bg-muted/5 border-x border-primary/10" : "",
        isFirstInGroup ? "border-t border-primary/20 rounded-t-xl" : "",
        isLastInGroup ? "border-b border-primary/20 rounded-b-xl" : ""
      )}>
        <TableCell className="w-[40px] pt-4 px-1.5 relative">
          {isGrouped && (
             <div className="absolute left-[20px] top-0 h-full w-[2px] bg-primary/30">
                {isFirstInGroup && <div className="absolute -top-0 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/40" />}
                {isLastInGroup && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/40" />}
             </div>
          )}
           {isGrouped && (
             <div className="absolute left-[28px] top-1/2 -translate-y-1/2 w-3 h-[2px] bg-primary/30" />
           )}
          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-30 hover:opacity-100">
            <GripVertical className="text-muted-foreground w-4 h-4" />
          </Button>
        </TableCell>
        <TableCell className="font-medium p-2 min-w-[200px]">
          <div className="flex items-center gap-3">
            {isFirstInGroup && (
               <div className="flex items-center justify-center w-6 h-6 bg-primary/20 text-primary rounded-full shrink-0">
                  <Link2 className="h-3.5 w-3.5"/>
                </div>
            )}
            <ExerciseSearchDialog onSelect={handleUpdateName}>
              <button className="flex-1 text-left bg-exercise-card border border-border shadow-sm px-5 rounded-full h-10 text-[13px] font-black uppercase tracking-tight truncate hover:border-primary/50 transition-colors">
                {exercise.name}
              </button>
            </ExerciseSearchDialog>
          </div>
        </TableCell>
        <TableCell className="p-1 pt-3 w-[160px]">
          <div className="flex items-center gap-1.5">
            <SubstitutionDialog exercise={exercise} onSave={handleSaveSubstitutions}>
              <div className="relative group cursor-pointer">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8 transition-all hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)]",
                    substitutionCount > 0 ? "text-primary opacity-100" : "text-primary/70 opacity-100"
                  )}
                >
                  <Shuffle className="w-4 h-4" />
                </Button>
                {substitutionCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full shadow-sm">
                    {substitutionCount}
                  </span>
                )}
              </div>
            </SubstitutionDialog>

            <div className="flex-1 space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">MÉTODO</label>
              <Select>
                <SelectTrigger className="w-full bg-exercise-card border-border shadow-sm rounded-lg h-9 text-[10px] px-3 font-black uppercase tracking-wider">
                  <SelectValue placeholder="SELECIONAR" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="padrao">PADRÃO</SelectItem>
                  <SelectItem value="dropset">DROPSET</SelectItem>
                  <SelectItem value="rest-pause">REST-PAUSE</SelectItem>
                  <SelectItem value="pyramid">PYRAMID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TableCell>
        <TableCell className="w-[45px] text-center p-0.5 pt-3">
          <EditObservationDialog
            exercise={exercise}
            onUpdateExercise={onUpdateExercise}
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 text-primary hover:bg-primary/5 rounded-lg">
              <MessageSquare className="w-4.5 h-4.5" />
            </Button>
          </EditObservationDialog>
        </TableCell>
        <TableCell className="w-[55px] p-0.5 pt-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <Input
                className="w-10 text-center bg-[hsl(var(--chart-1))] text-black font-black border-none h-9 text-[12px] rounded-lg px-0 shadow-sm"
                value={exercise.sets.length}
                readOnly
              />
              <EditSetsDialog
                exercise={exercise}
                onUpdateExercise={onUpdateExercise}
                onApplyToAll={onApplySetsToAll}
              >
                <Button variant="ghost" size="icon" className="h-7 w-7 text-primary shrink-0 opacity-40 hover:opacity-100">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </EditSetsDialog>
            </div>
        </TableCell>
        <TableCell className="w-[55px] px-0.5 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-2))] text-black font-black border-none h-9 text-[12px] rounded-lg px-0 shadow-sm"
            defaultValue={exercise.repsRange}
          />
        </TableCell>
        <TableCell className="w-[55px] px-0.5 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-3))] text-black font-black border-none h-9 text-[12px] rounded-lg px-0 shadow-sm"
            defaultValue={firstInterval}
          />
        </TableCell>
        <TableCell className="w-[55px] px-0.5 pt-3 text-center">
          <Input
            className="w-full text-center bg-[hsl(var(--chart-4))] text-black font-black border-none h-9 text-[12px] rounded-lg px-0 shadow-sm"
            defaultValue="2.2"
          />
        </TableCell>
        <TableCell className="w-[45px] p-1 pt-3 text-center">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            {CombinationIcon ? (
              <CombinationIcon className={cn("h-4.5 w-4.5", combinationIconClassName)} />
            ) : (
               <div className="w-5 h-5 bg-muted border-2 border-dashed border-muted-foreground/20 rounded-lg"></div>
            )}
          </Button>
        </TableCell>
        <TableCell className="w-[45px] p-1 pt-3 text-center">
          <Button variant="ghost" size="icon" className="text-destructive/40 hover:text-destructive hover:bg-destructive/10 h-9 w-9 rounded-lg">
            <Trash2 className="w-4.5 h-4.5" />
          </Button>
        </TableCell>
      </TableRow>
       <TableRow className={cn("hover:bg-transparent", isGrouped ? "bg-muted/5 border-x border-primary/10" : "")}>
        <TableCell className={cn("w-[40px] pt-0 relative", isGrouped ? "border-b-0" : "")}>
           {isGrouped && (
             <div className="absolute left-[20px] top-0 h-full w-[2px] bg-primary/30" />
           )}
        </TableCell>
        <TableCell className="pt-0 pb-5 pl-2" colSpan={9}>
            <div className="flex items-center gap-2 ml-3">
              {setTypesInOrder.map((setType) => {
                  const count = setCounts[setType];
                  if (!count || count === 0) return null;
                  
                  const config = setTypeConfig[setType];
                  const Icon = config.icon;
                  
                  return (
                    <Badge
                      key={setType}
                      className={cn("text-[10px] font-black gap-1.5 px-3 py-1 uppercase tracking-tighter justify-center border-none shadow-sm h-7 rounded-full", config.className)}
                    >
                      <Icon className="h-3.5 w-3.5" />
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
