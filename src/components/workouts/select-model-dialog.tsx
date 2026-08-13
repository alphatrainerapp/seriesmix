
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Folder, History, Check, X, ArrowLeft, Info, AlertTriangle } from 'lucide-react';
import type { SavedSession, Exercise, CombinationType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { exampleSessions } from '@/lib/data';

interface SelectModelDialogProps {
  onApplySession: (workoutData: Exercise[], combinationTypes: Record<string, CombinationType>, keepVariables: boolean) => void;
  children: React.ReactNode;
}

export function SelectModelDialog({ onApplySession, children }: SelectModelDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<'select' | 'variables'>('select');
  const [savedSessions, setSavedSessions] = React.useState<SavedSession[]>([]);
  
  const [selectedFolder, setSelectedFolder] = React.useState<string>("");
  const [selectedModelId, setSelectedModelId] = React.useState<string>("");
  const [variableOption, setVariableOption] = React.useState<'model' | 'periodization'>('model');

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
      setStep('select');
      setSelectedFolder("");
      setSelectedModelId("");
    }
  }, [open, loadSessions]);

  const allSessions = React.useMemo(() => [...exampleSessions, ...savedSessions], [savedSessions]);

  const folders = React.useMemo(() => {
    const uniqueFolders = Array.from(new Set(allSessions.map(s => s.folder || 'Geral')));
    return uniqueFolders.sort();
  }, [allSessions]);

  const filteredSessions = React.useMemo(() => {
    if (!selectedFolder) return allSessions;
    return allSessions.filter(s => (s.folder || 'Geral') === selectedFolder);
  }, [allSessions, selectedFolder]);

  const handleNext = () => {
    if (!selectedModelId) {
      toast({
        variant: 'destructive',
        title: 'Seleção necessária',
        description: 'Por favor, selecione um modelo de treino.',
      });
      return;
    }
    setStep('variables');
  };

  const handleConfirm = () => {
    const session = allSessions.find(s => s.id === selectedModelId);
    if (session) {
      onApplySession(session.workoutData, session.combinationTypes, variableOption === 'model');
      toast({
        title: 'Modelo carregado!',
        description: `O treino "${session.name}" foi aplicado com sucesso.`,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card rounded-2xl border-none shadow-2xl p-0 gap-0 overflow-hidden">
        
        {step === 'select' ? (
          <>
            <DialogHeader className="p-8 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground">
                  Selecionar Modelo
                </DialogTitle>
                <button onClick={() => setOpen(false)} className="text-muted-foreground/40 hover:text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </DialogHeader>

            <div className="p-8 pt-4 space-y-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Selecione a pasta
                </label>
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger className="h-14 rounded-xl bg-muted/40 border-none font-bold text-sm focus:ring-primary/30">
                    <SelectValue placeholder="Selecione a pasta" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/40">
                    <SelectItem value="Geral" className="font-bold">Geral</SelectItem>
                    {folders.filter(f => f !== 'Geral').map((folder) => (
                      <SelectItem key={folder} value={folder} className="font-bold">{folder}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">
                  Selecione o modelo
                </label>
                <Select value={selectedModelId} onValueChange={setSelectedModelId} disabled={!selectedFolder}>
                  <SelectTrigger className="h-14 rounded-xl bg-muted/40 border-none font-bold text-sm focus:ring-primary/30">
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-border/40">
                    {filteredSessions.map((session) => (
                      <SelectItem key={session.id} value={session.id} className="font-bold">
                        {session.name}
                      </SelectItem>
                    ))}
                    {filteredSessions.length === 0 && (
                      <div className="p-4 text-center text-xs text-muted-foreground italic">Nenhum modelo nesta pasta</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="p-8 bg-muted/20 flex gap-3 border-t border-border/10">
               <Button 
                className="flex-1 bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-12 font-black uppercase tracking-widest text-[12px] shadow-lg shadow-[#00bfa5]/10"
                onClick={handleNext}
                disabled={!selectedModelId}
               >
                 Confirmar
               </Button>
               <Button 
                variant="outline"
                className="flex-1 rounded-xl h-12 font-black uppercase tracking-widest text-[12px] bg-white text-black border-none"
                onClick={() => setOpen(false)}
               >
                 Fechar
               </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="p-8 pb-4">
              <div className="flex items-center gap-3">
                <button onClick={() => setStep('select')} className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter text-foreground">
                  Configurar Variáveis
                </DialogTitle>
              </div>
              <DialogDescription className="mt-2 text-muted-foreground font-medium">
                Como deseja aplicar os parâmetros deste modelo?
              </DialogDescription>
            </DialogHeader>

            <div className="p-8 pt-4">
              <RadioGroup value={variableOption} onValueChange={(val: any) => setVariableOption(val)} className="space-y-4">
                <div className={cn(
                  "flex items-start gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer",
                  variableOption === 'model' ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"
                )} onClick={() => setVariableOption('model')}>
                  <RadioGroupItem value="model" className="mt-1" />
                  <div className="space-y-1">
                    <p className="font-black text-sm uppercase tracking-tight">Manter variáveis do modelo</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Utiliza as séries, repetições e intervalos que foram salvos originalmente no modelo.
                    </p>
                  </div>
                </div>

                <div className={cn(
                  "flex items-start gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer",
                  variableOption === 'periodization' ? "border-primary bg-primary/5" : "border-border hover:border-primary/20"
                )} onClick={() => setVariableOption('periodization')}>
                  <RadioGroupItem value="periodization" className="mt-1" />
                  <div className="space-y-1">
                    <p className="font-black text-sm uppercase tracking-tight">Seguir variáveis da periodização</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Mantém o volume de treino atual do aluno, apenas substituindo os exercícios pelos do modelo.
                    </p>
                  </div>
                </div>
              </RadioGroup>

              <div className="mt-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-orange-600 font-bold uppercase leading-relaxed">
                  Atenção: Ao confirmar, o treino atual desta aba será substituído.
                </p>
              </div>
            </div>

            <DialogFooter className="p-8 bg-muted/20 border-t border-border/10">
               <Button 
                className="w-full bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-14 font-black uppercase tracking-widest text-[14px] shadow-lg shadow-[#00bfa5]/10"
                onClick={handleConfirm}
               >
                 Finalizar e Carregar
               </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
