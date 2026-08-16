'use client';

import * as React from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Save,
  ArrowLeft,
  Calendar,
  Settings2,
  LayoutGrid,
  Info,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// --- Tipagens ---

interface Periodization {
  id: string;
  name: string;
  macrociclo: number; // Meses
  mesociclo: number;  // Semanas por mês
  createdAt: string;
}

interface VariableWeek {
  week: number;
  sets: string;
  reps: string;
  rir: string;
  cadence: string;
  interval: string;
  method?: string;
}

// --- Dados Mockados Iniciais ---

const initialPeriodizations: Periodization[] = [
  { id: '1', name: 'trimestral - Hipertrofia Ondulatória', macrociclo: 3, mesociclo: 4, createdAt: '01/02/2024' },
  { id: '2', name: 'MENSAL - Hipertrofia Ondulatória', macrociclo: 1, mesociclo: 4, createdAt: '10/02/2024' },
  { id: '3', name: 'trimestral unico', macrociclo: 3, mesociclo: 1, createdAt: '15/02/2024' },
  { id: '4', name: 'Anual 14 meses', macrociclo: 14, mesociclo: 4, createdAt: '20/02/2024' },
  { id: '5', name: 'Mensal Hipertrofia', macrociclo: 1, mesociclo: 4, createdAt: '25/02/2024' },
];

// --- Sub-componentes ---

const PeriodizationRow = ({ 
  item, 
  onEdit 
}: { 
  item: Periodization, 
  onEdit: (p: Periodization) => void 
}) => (
  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-[#222] transition-all mb-3 shadow-sm">
    <div className="flex-1">
      <h3 className="text-[13px] font-black text-white/90 uppercase tracking-tight italic">{item.name}</h3>
    </div>
    
    <div className="flex items-center gap-12 mr-8">
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-40">Macrociclo</span>
        <span className="text-sm font-black text-primary italic">{item.macrociclo}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 opacity-40">Mesociclo</span>
        <span className="text-sm font-black text-primary italic">{item.mesociclo}</span>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onEdit(item)}
        className="h-9 w-9 bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20 rounded-xl"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-9 w-9 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <button className="h-9 w-9 flex items-center justify-center text-white/20 hover:text-white transition-colors">
        <ChevronDown className="h-6 w-6" />
      </button>
    </div>
  </div>
);

export default function PeriodizacaoPage() {
  const { toast } = useToast();
  const [view, setView] = React.useState<'list' | 'editor'>('list');
  const [periodizations, setPeriodizations] = React.useState<Periodization[]>(initialPeriodizations);
  const [activePeriodization, setActivePeriodization] = React.useState<Periodization | null>(null);
  
  // Estados para o formulário de novo periódico
  const [newName, setNewName] = React.useState('');
  const [newMacro, setNewMacro] = React.useState('3');
  const [newMeso, setNewMeso] = React.useState('4');
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Estados para o editor de semanas
  const [weeksData, setWeeksData] = React.useState<VariableWeek[]>([]);

  const handleCreateNew = () => {
    const newItem: Periodization = {
      id: Date.now().toString(),
      name: newName || 'Nova Periodização',
      macrociclo: parseInt(newMacro),
      mesociclo: parseInt(newMeso),
      createdAt: new Date().toLocaleDateString('pt-BR'),
    };
    
    // Gerar semanas iniciais baseadas no cálculo macro * meso
    const totalWeeks = newItem.macrociclo * newItem.mesociclo;
    const initialWeeks: VariableWeek[] = Array.from({ length: totalWeeks }, (_, i) => ({
      week: i + 1,
      sets: '3',
      reps: '10-12',
      rir: '1-2',
      cadence: '2.0.2.0',
      interval: '60s'
    }));

    setWeeksData(initialWeeks);
    setActivePeriodization(newItem);
    setIsDialogOpen(false);
    setView('editor');
    
    toast({
      title: "Periódico Criado",
      description: "Agora você pode configurar as variáveis de cada semana.",
    });
  };

  const handleEdit = (p: Periodization) => {
    setActivePeriodization(p);
    // Em um app real, buscaríamos os dados das semanas do backend
    const totalWeeks = p.macrociclo * p.mesociclo;
    setWeeksData(Array.from({ length: totalWeeks }, (_, i) => ({
      week: i + 1,
      sets: '3',
      reps: '10-12',
      rir: '1-2',
      cadence: '2.0.2.0',
      interval: '60s'
    })));
    setView('editor');
  };

  const handleSaveEditor = () => {
    toast({
      title: "Configurações Salvas",
      description: "A periodização foi atualizada com sucesso.",
    });
    setView('list');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="app-container py-10">
        
        {view === 'list' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-foreground uppercase italic tracking-tighter">
                  Controle de Variáveis e Periodização
                </h1>
                <p className="text-muted-foreground text-sm font-medium">Gerencie os modelos de planejamento para seus alunos.</p>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-11 px-8 font-black uppercase tracking-widest gap-2 shadow-lg shadow-[#00bfa5]/20 border-none transition-transform active:scale-95">
                    <Plus className="h-5 w-5" />
                    Novo Periódico
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-2xl border-none shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">Criar Planejamento</DialogTitle>
                    <p className="text-muted-foreground text-sm font-medium mt-2">Defina a estrutura temporal do seu novo modelo.</p>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Nome do Planejamento</label>
                      <Input 
                        placeholder="Ex: Trimestral - Hipertrofia" 
                        className="h-12 rounded-xl bg-muted/40 border-none font-bold"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Meses (Macrociclo)</label>
                        <Input 
                          type="number" 
                          className="h-12 rounded-xl bg-muted/40 border-none font-bold"
                          value={newMacro}
                          onChange={e => setNewMacro(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Semanas/Mês (Mesociclo)</label>
                        <Input 
                          type="number" 
                          className="h-12 rounded-xl bg-muted/40 border-none font-bold"
                          value={newMeso}
                          onChange={e => setNewMeso(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      className="w-full bg-[#00bfa5] hover:bg-[#00a894] text-white h-14 rounded-xl font-black uppercase tracking-widest"
                      onClick={handleCreateNew}
                    >
                      Configurar Semanas
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-card/50 rounded-3xl border border-border/40 p-1 shadow-sm overflow-hidden">
               <div className="flex items-center px-6 py-4 border-b border-border/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  <div className="flex-1">Nome</div>
                  <div className="w-[100px] text-center">Macrociclo</div>
                  <div className="w-[100px] text-center">Mesociclo</div>
                  <div className="w-[150px] text-right">Ações</div>
               </div>
               <div className="p-4">
                  {periodizations.map((item) => (
                    <PeriodizationRow key={item.id} item={item} onEdit={handleEdit} />
                  ))}
               </div>
            </div>
          </div>
        )}

        {view === 'editor' && activePeriodization && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                 <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setView('list')}
                  className="h-12 w-12 rounded-2xl bg-card border border-border hover:bg-muted"
                 >
                   <ArrowLeft className="h-6 w-6" />
                 </Button>
                 <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-black text-foreground uppercase italic tracking-tighter">
                        {activePeriodization.name}
                      </h1>
                      <Badge className="bg-primary/10 text-primary border-none uppercase text-[10px] font-black tracking-widest px-3">Ativo</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                       <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {activePeriodization.macrociclo} Meses</span>
                       <span className="opacity-20">•</span>
                       <span className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5" /> {activePeriodization.mesociclo} Semanas/Mês</span>
                    </div>
                 </div>
              </div>

              <Button 
                onClick={handleSaveEditor}
                className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-14 px-10 font-black uppercase tracking-widest gap-2 shadow-lg shadow-[#00bfa5]/20"
              >
                <Save className="h-5 w-5" />
                Salvar Periodização
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-8">
               {/* Loop de Meses/Mesociclos */}
               {Array.from({ length: activePeriodization.macrociclo }).map((_, mIdx) => (
                 <Card key={mIdx} className="bg-card border-border/40 rounded-[32px] overflow-hidden shadow-xl">
                    <div className="bg-muted/30 px-8 py-6 border-b border-border/10 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-black italic text-lg shadow-md">
                            {mIdx + 1}
                          </div>
                          <div className="space-y-0.5">
                            <h2 className="text-xl font-black uppercase italic tracking-tight">Mesociclo {mIdx + 1}</h2>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fase de Hipertrofia</p>
                          </div>
                       </div>
                       <Button variant="ghost" className="rounded-xl font-black text-[10px] uppercase tracking-widest gap-2 text-primary">
                          <LayoutGrid className="h-4 w-4" /> Replicar Variáveis
                       </Button>
                    </div>

                    <div className="p-8">
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {weeksData.slice(mIdx * activePeriodization.mesociclo, (mIdx + 1) * activePeriodization.mesociclo).map((week, wIdx) => (
                            <div key={wIdx} className="bg-muted/20 border border-border/30 rounded-3xl p-6 space-y-5 hover:border-primary/40 transition-all group">
                               <div className="flex items-center justify-between mb-2">
                                  <span className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em]">Semana {week.week}</span>
                                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                     <Check className="h-3.5 w-3.5" />
                                  </div>
                               </div>

                               <div className="space-y-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest pl-1">Séries</label>
                                    <Input defaultValue={week.sets} className="h-10 bg-background border-none rounded-xl font-black text-center text-sm shadow-inner" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest pl-1">Repetições</label>
                                    <Input defaultValue={week.reps} className="h-10 bg-background border-none rounded-xl font-black text-center text-sm shadow-inner" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest pl-1">RIR (Falha)</label>
                                    <Input defaultValue={week.rir} className="h-10 bg-background border-none rounded-xl font-black text-center text-sm shadow-inner" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest pl-1">Cadência</label>
                                    <Input defaultValue={week.cadence} className="h-10 bg-background border-none rounded-xl font-black text-center text-sm shadow-inner" />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-widest pl-1">Intervalo</label>
                                    <Input defaultValue={week.interval} className="h-10 bg-background border-none rounded-xl font-black text-center text-sm shadow-inner" />
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                 </Card>
               ))}
            </div>

            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex items-start gap-4">
               <Info className="h-6 w-6 text-primary shrink-0" />
               <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Dica de Periodização</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Você pode replicar as variáveis de uma semana para todo o mesociclo clicando no botão no topo do card. 
                    As variáveis definidas aqui serão sugeridas automaticamente ao carregar treinos para este aluno.
                  </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
