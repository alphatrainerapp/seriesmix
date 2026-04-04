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
import { Input } from '@/components/ui/input';
import { History, Calendar, Trash2, ChevronRight, Dumbbell, Folder, Search, Star } from 'lucide-react';
import type { SavedSession, Exercise, CombinationType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { exampleSessions } from '@/lib/data';

export function UseSavedSessionDialog({
  onApplySession,
  children,
}: {
  onApplySession: (workoutData: Exercise[], combinationTypes: Record<string, CombinationType>) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [savedSessions, setSavedSessions] = React.useState<SavedSession[]>([]);
  const [search, setSearch] = React.useState('');
  const [selectedFolder, setSelectedFolder] = React.useState<string | null>(null);
  const { toast } = useToast();

  const loadSessions = React.useCallback(() => {
    const savedSessionsRaw = localStorage.getItem('workout-sessions');
    if (savedSessionsRaw) {
      setSavedSessions(JSON.parse(savedSessionsRaw));
    }
  }, []);

  React.useEffect(() => {
    if (open) {
      loadSessions();
    }
  }, [open, loadSessions]);

  // Combine saved sessions with pre-defined examples
  const allSessions = React.useMemo(() => [...exampleSessions, ...savedSessions], [savedSessions]);

  const folders = React.useMemo(() => {
    const uniqueFolders = Array.from(new Set(allSessions.map(s => s.folder || 'Geral')));
    return uniqueFolders.sort();
  }, [allSessions]);

  const filteredSessions = React.useMemo(() => {
    return allSessions.filter((session) => {
      const matchesSearch = session.name.toLowerCase().includes(search.toLowerCase());
      const matchesFolder = !selectedFolder || (session.folder || 'Geral') === selectedFolder;
      return matchesSearch && matchesFolder;
    });
  }, [allSessions, search, selectedFolder]);

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
    const isExample = exampleSessions.some(s => s.id === sessionId);
    if (isExample) {
      toast({
        variant: 'destructive',
        title: 'Não é possível excluir',
        description: 'Sessões de exemplo do sistema não podem ser removidas.',
      });
      return;
    }

    const updatedSessions = savedSessions.filter((s) => s.id !== sessionId);
    localStorage.setItem('workout-sessions', JSON.stringify(updatedSessions));
    setSavedSessions(updatedSessions);
    toast({
      title: 'Sessão removida',
      description: 'A sessão salva foi excluída permanentemente.',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-card rounded-2xl border-none shadow-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-black uppercase tracking-tighter italic flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Minhas Sessões Salvas
          </DialogTitle>
          <DialogDescription>
            Busque por nome ou filtre por categoria para carregar seu treino.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Buscar treino salvo..."
              className="h-12 pl-10 rounded-xl bg-muted/30 border-none font-bold focus-visible:ring-primary/30"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedFolder(null)}
              className={cn(
                "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                !selectedFolder 
                  ? "bg-primary text-white border-primary" 
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
              )}
            >
              Todas
            </button>
            {folders.map(folder => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2",
                  selectedFolder === folder 
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/10" 
                    : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted"
                )}
              >
                <Folder className="h-3 w-3" />
                {folder}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="h-[350px] px-6 pb-6">
          <div className="space-y-3 pb-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => {
                const isExample = exampleSessions.some(s => s.id === session.id);
                return (
                  <div
                    key={session.id}
                    onClick={() => handleApply(session)}
                    className="group relative flex items-center justify-between p-4 rounded-2xl border border-border/40 bg-muted/10 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-md border border-primary/10">
                          {session.folder || 'Geral'}
                        </span>
                        {isExample && (
                          <span className="text-[9px] font-black text-yellow-600 uppercase tracking-widest bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/10 flex items-center gap-1">
                            <Star className="h-2 w-2 fill-yellow-600" />
                            Sugestão
                          </span>
                        )}
                      </div>
                      <h4 className="font-black text-foreground truncate uppercase italic tracking-tight mb-1 text-base">
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
                      {!isExample && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-destructive/40 hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => handleDelete(e, session.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      )}
                      <ChevronRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center space-y-3">
                <Search className="h-12 w-12 text-muted-foreground/20 mx-auto" />
                <p className="text-sm text-muted-foreground font-medium">
                  {search || selectedFolder ? "Nenhuma sessão corresponde aos filtros." : "Você ainda não possui sessões salvas."}
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
