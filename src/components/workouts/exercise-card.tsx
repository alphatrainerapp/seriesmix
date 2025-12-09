import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Clock, Flame, Puzzle } from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { cn } from '@/lib/utils';

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
    className: 'bg-tag-red/10 text-tag-red border-tag-red/20',
  },
  Prep: {
    icon: Puzzle,
    className: 'bg-tag-blue/10 text-tag-blue border-tag-blue/20',
  },
  Válidas: {
    icon: CheckCircle2,
    className: 'bg-tag-green/10 text-tag-green border-tag-green/20',
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
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
          {exercise.preExhaustion && (
            <Badge
              variant="outline"
              className="bg-tag-soft-blue text-tag-soft-blue-foreground border-tag-soft-blue-foreground/20 font-medium"
            >
              Pré-exaustão
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Separator className="my-3" />
        <div className="flex flex-wrap items-center gap-2">
          {exercise.sets.map((set) => (
            <SetTag key={set.type} type={set.type} label={set.label} />
          ))}
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 py-1 px-2.5 text-xs font-medium bg-tag-green/10 text-tag-green border-tag-green/20"
          >
            <Clock className="h-3.5 w-3.5" />
            {exercise.repsRange} reps
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
