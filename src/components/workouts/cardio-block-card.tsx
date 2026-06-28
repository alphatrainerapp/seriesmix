'use client';

import { 
  Activity, 
  Trash2, 
  Pencil, 
  GripVertical, 
  Timer,
  ChevronRight,
  Zap
} from 'lucide-react';
import type { Exercise } from '@/lib/types';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function CardioBlockCard({
  exercise,
  onUpdateExercise,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
}) {
  if (!exercise.isCardio || !exercise.cardioDetails) return null;
  const { cardioDetails } = exercise;

  return (
    <>
      <TableRow className="bg-muted/10 hover:bg-muted/20 border-b-border/30 transition-colors group">
        <TableCell className="w-[40px] pt-4 px-1.5 relative">
          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-30 group-hover:opacity-100">
            <GripVertical className="text-muted-foreground w-4 h-4" />
          </Button>
        </TableCell>
        
        <TableCell className="font-medium p-2" colSpan={7}>
          <div className="flex items-center gap-4">
            <div className={cn(
              "h-10 w-10 rounded-xl text-white flex items-center justify-center shadow-md shrink-0",
              cardioDetails.type === 'hiit' ? "bg-orange-500" : "bg-blue-500"
            )}>
              {cardioDetails.type === 'hiit' ? <Zap className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground">
                  PROTOCOLO {cardioDetails.type.toUpperCase()}
                </span>
              </div>
              <h3 className="text-sm font-black uppercase italic tracking-tight text-foreground truncate">
                {exercise.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 pr-2">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] font-bold text-muted-foreground uppercase truncate max-w-[200px]">
                  {cardioDetails.description.split('\n')[0]}
                </span>
              </div>

              <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TableCell>

        <TableCell className="w-[45px] p-1 pt-3 text-center" colSpan={2}>
           <ChevronRight className="h-5 w-5 text-muted-foreground/20 group-hover:text-primary transition-colors mx-auto" />
        </TableCell>
      </TableRow>
    </>
  );
}
