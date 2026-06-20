'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Zap, 
  Timer, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Check,
  Clock,
  Repeat,
  Info,
  Activity,
  Trophy,
  Dumbbell
} from 'lucide-react';
import { systemExercises } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { WodDetails, WodExercise, WodType } from '@/lib/types';

interface WodTypeOption {
  type: WodType;
  label: string;
  description: string;
  icon: React.ElementType;
}

const wodTypeOptions: WodTypeOption[] = [
  { type: 'AMRAP', label: 'AMRAP', description: 'As Many Rounds As Possible - Máximo de voltas no tempo.', icon: Timer },
  { type: 'EMOM', label: 'EMOM', description: 'Every Minute On the Minute - Execute a tarefa a cada minuto.', icon: Clock },
  { type: 'FOR TIME', label: 'For Time', description: 'Complete o mais rápido possível.', icon: Trophy },
  { type: 'TABATA', label: 'TABATA', description: '20s trabalho / 10s descanso - 8 rounds.', icon: Zap },
  { type: 'CHIPPER', label: 'Chipper', description: 'Sequência longa de exercícios com alto volume.', icon: Activity },
  { type: 'INTERVALADO', label: 'Intervalado', description: 'Blocos de trabalho e descanso definidos.', icon: Timer },
  { type: 'LIVRE', label: 'Livre', description: 'Formato livre, sem estrutura fixa.', icon: Dumbbell },
];

interface WodConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (wodDetails: WodDetails) => void;
  initialData?: WodDetails;
  exerciseName?: string;
}

export function WodConfigDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
  exerciseName = "Novo WOD"
}: WodConfigDialogProps) {
  const [step, setStep] = React.useState(1);
  const [wodName, setWodName] = React.useState(initialData?.name || 'METCON 01');
  const [type, setType] = React.useState<WodType>(initialData?.type || 'AMRAP');
  const [description, setDescription] = React.useState(initialData?.description || '');
  const [exercises, setExercises] = React.useState<WodExercise[]>(initialData?.exercises || []);
  const [rounds, setRounds] = React.useState(initialData?.rounds || '1');
  const [duration, setDuration] = React.useState(initialData?.duration || '15:00');
  const [search, setSearch] = React.useState('');

  const filteredLibrary = React.useMemo(() => {
    return systemExercises.filter(ex => 
      ex.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 5);
  }, [search]);

  const addExercise = (name: string) => {
    const newEx: WodExercise = {
      id: Date.now().toString(),
      name,
      reps: '10'
    };
    setExercises([...exercises, newEx]);
    setSearch('');
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: keyof WodExercise, value: string) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const handleSave = () => {
    onSave({
      name: wodName,
      type,
      description,
      exercises,
      rounds,
      duration,
    });
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (open) setStep(1);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden bg-background border-none shadow-2xl rounded-[24px]">
        {/* Progress Header */}
        <div className="p-8 pb-4 border-b border-border/10 bg-muted/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-black uppercase italic tracking-tighter">Novo WOD</h2>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div 
                  key={s} 
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-all",
                    step >= s ? "bg-primary" : "bg-muted"
                  )} 
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", step === 1 ? "text-primary" : "text-muted-foreground")}>
              <span className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center">1</span>
              Tipo de WOD
            </div>
            <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", step === 2 ? "text-primary" : "text-muted-foreground")}>
              <span className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center">2</span>
              Exercícios
            </div>
            <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-widest", step === 3 ? "text-primary" : "text-muted-foreground")}>
              <span className="h-5 w-5 rounded-full border-2 border-current flex items-center justify-center">3</span>
              Configurações
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[60vh] p-8 pt-6">
          {/* STEP 1: SELECT TYPE */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Selecione o tipo de WOD</h3>
                <p className="text-sm text-muted-foreground">Escolha o formato que melhor descreve seu treino.</p>
              </div>
              <div className="grid gap-3">
                {wodTypeOptions.map((opt) => (
                  <button
                    key={opt.type}
                    onClick={() => setType(opt.type)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all",
                      type === opt.type 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
                      type === opt.type ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm uppercase tracking-wider">{opt.label}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{opt.description}</p>
                    </div>
                    {type === opt.type && (
                      <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: EXERCISES */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Exercícios do WOD</h3>
                <p className="text-sm text-muted-foreground">Adicione os exercícios na ordem em que serão executados.</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Adicionar exercício..." 
                  className="h-12 pl-10 rounded-xl bg-muted/30 border-none font-bold"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-2xl shadow-2xl z-20 overflow-hidden">
                    {filteredLibrary.map(ex => (
                      <button 
                        key={ex.name}
                        onClick={() => addExercise(ex.name)}
                        className="w-full p-4 text-left text-sm font-bold hover:bg-primary/5 border-b border-border/10 flex items-center justify-between transition-colors"
                      >
                        {ex.name}
                        <Plus className="h-4 w-4 text-primary" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {exercises.map((ex, idx) => (
                  <div key={ex.id} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 border border-border/40 group">
                    <span className="text-xs font-black text-muted-foreground/30 w-4">{idx + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold uppercase tracking-tight truncate">{ex.name}</p>
                    </div>
                    <Input 
                      className="w-20 h-9 rounded-lg bg-background border-border/40 text-center font-bold text-xs"
                      placeholder="10 reps"
                      value={ex.reps}
                      onChange={e => updateExercise(ex.id, 'reps', e.target.value)}
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive/40 hover:text-destructive hover:bg-destructive/10" onClick={() => removeExercise(ex.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SETTINGS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight">Configurações do WOD</h3>
                <p className="text-sm text-muted-foreground">Define tempo, rounds e descrição de execução.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Nome do WOD</label>
                  <Input 
                    placeholder="Ex: METCON 01" 
                    value={wodName}
                    onChange={e => setWodName(e.target.value)}
                    className="h-12 rounded-xl bg-muted/30 border-none font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Duração</label>
                    <Input 
                      placeholder="15:00 min" 
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="h-12 rounded-xl bg-muted/30 border-none font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Rounds</label>
                    <Input 
                      placeholder="--" 
                      value={rounds}
                      onChange={e => setRounds(e.target.value)}
                      className="h-12 rounded-xl bg-muted/30 border-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Descrição / Como será executado</label>
                  <Textarea 
                    placeholder="Complete o maior número possível de rounds em 15 minutos..." 
                    className="min-h-[120px] rounded-xl bg-muted/30 border-none font-medium p-4 focus-visible:ring-primary/20"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <DialogFooter className="p-8 bg-muted/20 border-t border-border/10">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep(step - 1)} className="rounded-xl font-bold gap-2">
              <ChevronLeft className="h-4 w-4" /> Voltar
            </Button>
          )}
          <div className="flex-1" />
          {step < 3 ? (
            <Button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[11px] gap-2">
              Próximo <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSave} className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-12 px-8 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#00bfa5]/10">
              SALVAR WOD
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
