'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { History, Calendar, Trash2, ChevronRight, Dumbbell } from 'lucide-react';
import type { SavedSession, Exercise, CombinationType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function UseSavedSessionDialog({
  onApplySession,
  children,
}: {
  onApplySession: (workoutData: Exercise[], combinationTypes: Record<string, CombinationType>) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [sessions, setSessions] = React.useState<SavedSession[]>([]);
  const { toast } = useToast();

  const loadSessions = React.useCallback(() => {
    const savedSessionsRaw = localStorage.getItem('workout-sessions');
    if (savedSessionsRaw) {
      setSessions(JSON.parse(savedSessionsRaw));
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      loadSessions();
    }
  }, [open, loadSessions]);

  const handleApply = (session: SavedSession) => {
    onApplySession(session.workoutData, session.combinationTypes);
    toast({
      title: 'Sessão aplicada!',
      description: `O treino "${session.name}" foi carregado com sucesso.`,
    });
    setOpen(false);
  };

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    const updatedSessions = sessions.filter((s) => s.id !== sessionId);
    localStorage.setItem('workout-sessions', JSON.stringify(updatedSessions));
    setSessions(updatedSessions);
    toast({
      title: 'Sessão removida',
      description: 'A sessão salva foi excluída permanentemente.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-card rounded-2xl border-none shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Minhas Sessões Salvas
          </DialogTitle>
          <DialogDescription>
            Escolha um treino salvo para aplicar na sessão atual.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] px-6 pb-6 mt-4">
          <div className="space-y-3">
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => handleApply(session)}
                  className="group relative flex items-center justify-between p-4 rounded-2xl border bg-muted/20 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-foreground truncate uppercase italic tracking-tight mb-1">
                      {session.name}
                    </h4>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar className="h-3 w-3" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                        <Dumbbell className="h-3 w-3" />
                        {session.workoutData.length} Exercícios
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDelete(e, session.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center space-y-3">
                <History className="h-12 w-12 text-muted-foreground/20 mx-auto" />
                <p className="text-sm text-muted-foreground font-medium">Você ainda não salvou nenhuma sessão.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
