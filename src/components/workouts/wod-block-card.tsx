'use client';

import { 
  Zap, 
  Trash2, 
  Pencil, 
  GripVertical, 
  Timer,
  ChevronRight
} from 'lucide-react';
import type { Exercise, WodDetails } from '@/lib/types';
import { cn } from '@/lib/utils';
import { WodConfigDialog } from './wod-config-dialog';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export function WodBlockCard({
  exercise,
  onUpdateExercise,
}: {
  exercise: Exercise;
  onUpdateExercise: (exercise: Exercise) => void;
}) {
  const [configOpen, setConfigOpen] = React.useState(false);

  if (!exercise.isWod || !exercise.wodDetails) return null;
  const { wodDetails } = exercise;

  const handleSaveConfig = (newDetails: WodDetails) => {
    onUpdateExercise({
      ...exercise,
      name: `WOD: ${newDetails.type}`,
      wodDetails: newDetails
    });
  };

  return (
    <>
      <TableRow className="bg-primary/5 hover:bg-primary/10 border-b-primary/20 transition-colors group">
        <TableCell className="w-[40px] pt-4 px-1.5 relative">
          <Button variant="ghost" size="icon" className="h-7 w-7 opacity-30 group-hover:opacity-100">
            <GripVertical className="text-muted-foreground w-4 h-4" />
          </Button>
        </TableCell>
        
        <TableCell className="font-medium p-2" colSpan={7}>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-md shrink-0">
              <Zap className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-primary">PROTOCOLO WOD</span>
                <Badge variant="outline" className="h-4 border-primary/30 text-primary font-black text-[8px] uppercase tracking-wider px-1.5 rounded-sm">
                  {wodDetails.type}
                </Badge>
              </div>
              <h3 className="text-sm font-black uppercase italic tracking-tight text-foreground truncate">
                {wodDetails.name || exercise.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-2 pr-2">
              <div className="hidden md:flex items-center gap-4 mr-4 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Timer className="h-3.5 w-3.5 opacity-50" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{wodDetails.duration || '--:--'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest">{wodDetails.exercises.length} EXERCÍCIOS</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                className="h-9 w-9 rounded-lg bg-background border-border hover:border-primary/40 hover:text-primary transition-all shadow-sm"
                onClick={() => setConfigOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
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

      <WodConfigDialog 
        open={configOpen} 
        onOpenChange={setConfigOpen} 
        onSave={handleSaveConfig} 
        initialData={wodDetails}
        exerciseName={wodDetails.name || exercise.name}
      />
    </>
  );
}
