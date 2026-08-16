
'use client';

import * as React from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  Save, 
  ArrowLeft,
  Calendar,
  Settings2,
  Info,
  Check,
  Zap,
  MoreVertical,
  MessageCircle,
  ChevronUp,
  Copy,
  Dumbbell,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// --- Tipagens ---

interface Periodization {
  id: string;
  name: string;
  macrociclo: number; 
  mesociclo: number;  
  createdAt: string;
}

interface SessionData {
  id: string;
  dia: string;
  tipoTreino: string;
  ocorrencia: number;
  series: string;
  repeticoes: string;
  intervalo: string;
  cadencia: string;
  intensidade: string;
  rir: string;
}

// --- Sub-componentes ---

const VariableInput = ({ label, value, color, onChange }: { label: string, value: string, color: string, onChange: (val: string) => void }) => (
  <div className="space-y-1.5 flex-1 min-w-0">
    <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-muted-foreground/80 ml-1">
      {label}:
    </label>
    <div className="bg-card rounded-xl p-2 sm:p-3 shadow-inner-sm border border-border/5">
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 bg-transparent border-none text-center font-black text-sm sm:text-base focus-visible:ring-0 shadow-none p-0"
      />
      <div className={cn("h-1 w-full rounded-full mt-2", color)} />
    </div>
  </div>
);

const SessionCard = ({ session }: { session: SessionData }) => (
  <div className="bg-card border border-border/40 rounded-2xl p-4 shadow-sm space-y-4 hover:border-primary/30 transition-all group">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={cn(
          "h-2 w-2 rounded-full",
          session.tipoTreino === 'A' ? "bg-orange-500" : session.tipoTreino === 'B' ? "bg-emerald-500" : "bg-cyan-500"
        )} />
        <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
          {session.dia} • TREINO {session.tipoTreino}
        </span>
      </div>
      <MoreVertical className="h-4 w-4 text-muted-foreground/30" />
    </div>
    
    <div className="space-y-0.5">
      <p className="text-[9px] font-bold text-muted-foreground uppercase">{session.ocorrencia}ª ocorrência</p>
    </div>

    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
      <div className="flex justify-between items-center border-b border-border/5 pb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase">Séries</span>
        <span className="text-[11px] font-black">{session.series}</span>
      </div>
      <div className="flex justify-between items-center border-b border-border/5 pb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase">Reps</span>
        <span className="text-[11px] font-black">{session.repeticoes}</span>
      </div>
      <div className="flex justify-between items-center border-b border-border/5 pb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase">Intervalo</span>
        <span className="text-[11px] font-black">{session.intervalo}s</span>
      </div>
      <div className="flex justify-between items-center border-b border-border/5 pb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase">Cadência</span>
        <span className="text-[11px] font-black">{session.cadencia}</span>
      </div>
      <div className="flex justify-between items-center border-b border-border/5 pb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase">Intensidade</span>
        <span className="text-[11px] font-black">{session.intensidade}%</span>
      </div>
      <div className="flex justify-between items-center border-b border-border/5 pb-1">
        <span className="text-[9px] font-bold text-muted-foreground uppercase">RIR</span>
        <span className="text-[11px] font-black">{session.rir}</span>
      </div>
    </div>

    <button className="w-full h-9 rounded-xl border border-border bg-muted/20 hover:bg-primary/5 hover:border-primary/30 transition-all flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/70">
      <Dumbbell className="h-3.5 w-3.5" />
      Editar exercícios (8)
    </button>
  </div>
);

const initialPeriodizations: Periodization[] = [
  { id: '1', name: 'trimestral - Hipertrofia Ondulatória', macrociclo: 3, mesociclo: 4, createdAt: '01/02/2024' },
  { id: '2', name: 'MENSAL - Hipertrofia Ondulatória', macrociclo: 1, mesociclo: 4, createdAt: '10/02/2024' },
];

export default function PeriodizacaoPage() {
  const { toast } = useToast();
  const [view, setView] = React.useState<'list' | 'editor'>('list');
  const [periodizations] = React.useState<Periodization[]>(initialPeriodizations);
  
  // Estados do Editor
  const [name, setName] = React.useState('trimestral');
  const [months, setMonths] = React.useState('3');
  const [weeksPerMonth, setWeeksPerMonth] = React.useState('4');
  const [activeMacro, setActiveMacro] = React.useState('1');
  const [expandedCycles, setExpandedCycles] = React.useState<Set<number>>(new Set([0]));
  const [isCustomizingSessions, setIsCustomizingSessions] = React.useState(false);
  const [frequency, setFrequency] = React.useState('4');

  const toggleCycle = (idx: number) => {
    const newSet = new Set(expandedCycles);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedCycles(newSet);
  };

  // Dados Mockados de Sessão
  const sessionsData: SessionData[] = [
    { id: '1', dia: 'SEGUNDA', tipoTreino: 'A', ocorrencia: 1, series: '4', repeticoes: '6-8', intervalo: '120', cadencia: '2-0-1', intensidade: '80', rir: '2' },
    { id: '2', dia: 'TERÇA', tipoTreino: 'B', ocorrencia: 1, series: '3', repeticoes: '10-12', intervalo: '90', cadencia: '2-1-2', intensidade: '70', rir: '2' },
    { id: '3', dia: 'QUINTA', tipoTreino: 'C', ocorrencia: 1, series: '3', repeticoes: '15-20', intervalo: '45', cadencia: '2-0-2', intensidade: '65', rir: '2' },
    { id: '4', dia: 'SEXTA', tipoTreino: 'A', ocorrencia: 2, series: '3', repeticoes: '10-12', intervalo: '90', cadencia: '2-0-1', intensidade: '72', rir: '2' },
  ];

  // Gerar dados para o gráfico baseado nos inputs
  const chartData = React.useMemo(() => {
    const totalWeeks = parseInt(months) * parseInt(weeksPerMonth);
    return Array.from({ length: totalWeeks || 1 }, (_, i) => {
      const month = Math.floor(i / (parseInt(weeksPerMonth) || 4)) + 1;
      const week = (i % (parseInt(weeksPerMonth) || 4)) + 1;
      return {
        name: `M${month} S${week}`,
        series: 3,
        reps: 15,
      };
    });
  }, [months, weeksPerMonth]);

  const handleSave = () => {
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

              <Button 
                onClick={() => setView('editor')}
                className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-11 px-8 font-black uppercase tracking-widest gap-2 shadow-lg shadow-[#00bfa5]/20 border-none"
              >
                <Plus className="h-5 w-5" />
                Novo Periódico
              </Button>
            </div>

            <div className="bg-card rounded-3xl border border-border/40 p-1 shadow-sm overflow-hidden">
               <div className="flex items-center px-6 py-4 border-b border-border/10 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                  <div className="flex-1">Nome</div>
                  <div className="w-[100px] text-center">Macrociclo</div>
                  <div className="w-[100px] text-center">Mesociclo</div>
                  <div className="w-[150px] text-right">Ações</div>
               </div>
               <div className="p-4 space-y-3">
                  {periodizations.map((item) => (
                    <div key={item.id} className="bg-muted/30 border border-border/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-muted/50 transition-all shadow-sm">
                      <div className="flex-1">
                        <h3 className="text-[13px] font-black text-foreground uppercase tracking-tight italic">{item.name}</h3>
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
                        <Button variant="ghost" size="icon" onClick={() => setView('editor')} className="h-9 w-9 bg-primary/10 text-primary rounded-xl">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 bg-destructive/10 text-destructive rounded-xl">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <button className="h-9 w-9 flex items-center justify-center text-muted-foreground/40 hover:text-foreground">
                          <ChevronDown className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {view === 'editor' && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <header className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setView('list')} className="h-10 w-10 rounded-xl hover:bg-muted">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
                  Controle de variáveis e periodização
                </h1>
              </div>
              <div className="flex items-center gap-4">
                 <button className="h-10 w-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-lg">
                    <MessageCircle className="h-5 w-5" />
                 </button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* COLUNA ESQUERDA: CONFIGURAÇÕES */}
              <div className="lg:col-span-7 space-y-6">
                <Card className="bg-card border-border/40 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
                  
                  {/* Inputs Principais */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                        NOME DA PERIODIZAÇÃO: <span className="text-red-500">*</span>
                      </label>
                      <Input 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="h-12 bg-muted/10 border-border/40 rounded-xl font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                          PERIODIZAÇÃO DE QUANTOS MESES? <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          type="number" 
                          value={months} 
                          onChange={e => setMonths(e.target.value)}
                          className="h-12 bg-muted/10 border-border/40 rounded-xl font-bold"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                          CADA MÊS POSSUIRÁ QUANTAS SEMANAS? <span className="text-red-500">*</span>
                        </label>
                        <Input 
                          type="number" 
                          value={weeksPerMonth} 
                          onChange={e => setWeeksPerMonth(e.target.value)}
                          className="h-12 bg-muted/10 border-border/40 rounded-xl font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Abas de Macrociclo */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border/10">
                      <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[70%]">
                         {Array.from({ length: parseInt(months) || 1 }).map((_, i) => (
                           <button 
                            key={i}
                            onClick={() => setActiveMacro((i+1).toString())}
                            className={cn(
                              "px-4 py-3 text-[11px] font-black uppercase tracking-widest transition-all border-b-4 shrink-0",
                              activeMacro === (i+1).toString() ? "border-primary text-foreground" : "border-transparent text-muted-foreground/40 hover:text-foreground"
                            )}
                           >
                             Macrociclo {i + 1}
                           </button>
                         ))}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                         <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest hidden sm:inline">Repetir Macrociclos</span>
                         <Switch defaultChecked />
                      </div>
                    </div>

                    {/* Ciclos Dinâmicos baseados nas semanas */}
                    <div className="space-y-6">
                       {Array.from({ length: parseInt(weeksPerMonth) || 1 }).map((_, i) => (
                         <div key={i} className="bg-muted/5 rounded-2xl p-4 sm:p-5 border border-border/5 space-y-6">
                            <div className="space-y-1.5 group">
                                <div className="flex items-center justify-between">
                                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 ml-1">
                                    NOME DO CICLO {i + 1}: <span className="text-red-500">*</span>
                                  </label>
                                  <button 
                                    onClick={() => toggleCycle(i)}
                                    className="text-muted-foreground/40 hover:text-primary transition-colors"
                                  >
                                    {expandedCycles.has(i) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                  </button>
                                </div>
                                <div className="relative">
                                  <Input 
                                    defaultValue={`Ciclo ${i + 1}`}
                                    className="h-11 bg-muted/10 border-border/30 rounded-xl font-bold text-sm focus-visible:ring-primary/20 pr-12"
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                      <div className="h-6 w-6 bg-[#00bfa5] rounded flex items-center justify-center text-white">
                                        <Check className="h-3 w-3" />
                                      </div>
                                  </div>
                                </div>
                            </div>

                            {/* Detalhes Expansíveis do Ciclo */}
                            {expandedCycles.has(i) && (
                              <div className="space-y-8 animate-in slide-in-from-top-2 duration-300">
                                 {/* Variáveis Gerais */}
                                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <VariableInput label="SÉRIES" value="3" color="bg-orange-500" onChange={() => {}} />
                                    <VariableInput label="REPETIÇÕES (MARGEM)" value="12-15" color="bg-[#8bc34a]" onChange={() => {}} />
                                    <VariableInput label="INTERVALO" value="30" color="bg-[#2e7d32]" onChange={() => {}} />
                                    <VariableInput label="CADÊNCIA" value="1" color="bg-[#00acc1]" onChange={() => {}} />
                                 </div>

                                 {/* Toggle Ondulação Diária */}
                                 <div className="flex items-center gap-3 pt-2">
                                    <Checkbox 
                                      id={`daily-undulation-${i}`} 
                                      checked={isCustomizingSessions}
                                      onCheckedChange={(checked) => setIsCustomizingSessions(checked === true)}
                                      className="h-5 w-5 rounded-md border-primary data-[state=checked]:bg-primary"
                                    />
                                    <label htmlFor={`daily-undulation-${i}`} className="text-[11px] font-black uppercase tracking-tight text-foreground/80 flex items-center gap-2 cursor-pointer">
                                      Personalizar variáveis por sessão (ondulação diária)
                                      <Info className="h-3.5 w-3.5 text-muted-foreground/40" />
                                    </label>
                                 </div>

                                 {/* Configuração por Sessão (Aparece se o toggle estiver ativo) */}
                                 {isCustomizingSessions && (
                                   <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                      <div className="flex flex-col sm:flex-row gap-6">
                                         <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Frequência semanal</label>
                                            <Select value={frequency} onValueChange={setFrequency}>
                                               <SelectTrigger className="h-11 w-full sm:w-[160px] bg-muted/20 border-border/40 rounded-xl font-bold">
                                                  <SelectValue />
                                               </SelectTrigger>
                                               <SelectContent className="rounded-xl">
                                                  {['2', '3', '4', '5', '6', '7'].map(num => (
                                                    <SelectItem key={num} value={num} className="font-bold">{num} sessões</SelectItem>
                                                  ))}
                                               </SelectContent>
                                            </Select>
                                         </div>

                                         <div className="flex-1 space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground ml-1">Distribuição semanal</label>
                                            <div className="flex items-center gap-2">
                                               <div className="flex items-center border border-border/40 rounded-xl overflow-hidden shadow-sm">
                                                  {['SEG', 'TER', 'QUI', 'SEX'].map((day, idx) => (
                                                    <div key={day} className="flex flex-col items-center bg-card px-4 py-1.5 border-r border-border/40 last:border-none">
                                                       <span className="text-[8px] font-black text-muted-foreground/40">{day}</span>
                                                       <span className="text-sm font-black text-foreground">{idx === 0 || idx === 3 ? 'A' : idx === 1 ? 'B' : 'C'}</span>
                                                    </div>
                                                  ))}
                                               </div>
                                               <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold text-[10px] uppercase border-border/60 hover:bg-primary/5 hover:text-primary">
                                                  <Copy className="h-3.5 w-3.5" />
                                                  <span className="hidden sm:inline">Copiar estrutura para próxima semana</span>
                                               </Button>
                                            </div>
                                         </div>
                                      </div>

                                      {/* Grid de Sessões */}
                                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                                         {sessionsData.map((session) => (
                                           <SessionCard key={session.id} session={session} />
                                         ))}
                                      </div>

                                      <div className="flex items-center gap-2 text-muted-foreground/40 px-2">
                                         <AlertCircle className="h-3.5 w-3.5" />
                                         <p className="text-[10px] font-bold uppercase italic">As variáveis acima substituem as configurações gerais desta semana.</p>
                                      </div>
                                   </div>
                                 )}
                              </div>
                            )}
                         </div>
                       ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-6">
                    <Button 
                      onClick={handleSave}
                      className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-12 px-12 font-black uppercase tracking-widest gap-2 shadow-lg shadow-[#00bfa5]/20 border-none"
                    >
                      <Save className="h-4 w-4" />
                      Salvar
                    </Button>
                  </div>
                </Card>
              </div>

              {/* COLUNA DIREITA: GRÁFICOS E VISUALIZAÇÃO */}
              <div className="lg:col-span-5 space-y-6">
                {/* Card de Volume */}
                <Card className="bg-card border-border/40 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-center gap-8 mb-8">
                     <h3 className="text-lg font-black uppercase tracking-tighter italic text-center w-full">Volume</h3>
                  </div>
                  <div className="flex items-center justify-center gap-6 mb-6">
                      <div className="flex items-center gap-2">
                         <div className="h-3 w-3 rounded-full bg-orange-500" />
                         <span className="text-[10px] font-black uppercase text-muted-foreground">Séries Semana</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="h-3 w-3 rounded-full bg-blue-600" />
                         <span className="text-[10px] font-black uppercase text-muted-foreground">Repetições</span>
                      </div>
                  </div>
                  <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: '900', fill: 'currentColor', opacity: 0.4 }} 
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: '900', fill: 'currentColor', opacity: 0.4 }} 
                        />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="series" 
                          stroke="#ffa726" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: '#ffa726', strokeWidth: 2, stroke: '#fff' }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="reps" 
                          stroke="#2563eb" 
                          strokeWidth={3} 
                          dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] font-black text-center text-muted-foreground/40 mt-4 uppercase tracking-widest">Semana</p>
                </Card>

                {/* Card de Hierarquia Periodização */}
                <Card className="bg-card border-border/40 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-lg font-black uppercase tracking-tighter italic text-center mb-8">Periodização</h3>
                  
                  <div className="flex items-center justify-center gap-6 mb-10">
                      <div className="flex items-center gap-2">
                         <div className="h-4 w-4 rounded-full bg-orange-500" />
                         <span className="text-[10px] font-black uppercase text-muted-foreground">Macrociclo</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="h-4 w-4 rounded-full bg-slate-400" />
                         <span className="text-[10px] font-black uppercase text-muted-foreground">Mesociclo</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="h-4 w-4 rounded-full bg-slate-800" />
                         <span className="text-[10px] font-black uppercase text-muted-foreground">Microciclo</span>
                      </div>
                  </div>

                  <div className="space-y-12">
                     <div className="relative flex justify-center px-4">
                        <div className="absolute top-[-10px] left-8 right-8 h-1 border-t-2 border-l-2 border-r-2 border-orange-500 rounded-t-lg" />
                        
                        <div className="grid grid-cols-3 gap-6 w-full">
                           {Array.from({ length: 3 }).map((_, mIdx) => (
                             <div key={mIdx} className="space-y-4">
                               <div className="grid grid-cols-4 gap-1.5">
                                  {Array.from({ length: 4 }).map((_, wIdx) => (
                                    <div 
                                      key={wIdx} 
                                      className="h-10 w-full bg-slate-800 text-white flex items-center justify-center rounded-md font-black text-xs shadow-sm hover:scale-105 transition-transform cursor-default"
                                    >
                                      {(mIdx * 4) + wIdx + 1}
                                    </div>
                                  ))}
                               </div>
                               <p className="text-[10px] font-black text-center text-muted-foreground uppercase tracking-widest">Mês {mIdx + 1}</p>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Entenda a Organização */}
                  <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                     <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-primary" />
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-primary">Entenda a organização</h4>
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-bold text-foreground/70 leading-relaxed uppercase">
                           A, B, C = Estrutura do treino (exercícios e ordem)
                        </p>
                        <p className="text-[10px] font-bold text-foreground/70 leading-relaxed uppercase">
                           Cada ocorrência (A1, A2, A3...) pode ter variáveis diferentes.
                        </p>
                        <p className="text-[10px] font-bold text-primary italic leading-relaxed uppercase mt-1">
                           Ex: A1 (força) → A2 (volume) → A3 (hipertrofia)
                        </p>
                     </div>
                  </div>
                </Card>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
