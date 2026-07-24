'use client';

import * as React from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Trophy, 
  Plus, 
  MessageCircle,
  Hand,
  Users
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  LabelList
} from 'recharts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

// --- Dados Mockados ---

const activeStudentsDataSets = {
  '3M': [
    { month: 'fev', value: 20 },
    { month: 'mar', value: 20 },
    { month: 'abr', value: 19 },
  ],
  '6M': [
    { month: 'nov', value: 15 },
    { month: 'dez', value: 18 },
    { month: 'jan', value: 17 },
    { month: 'fev', value: 20 },
    { month: 'mar', value: 20 },
    { month: 'abr', value: 19 },
  ],
  '12M': [
    { month: 'mai', value: 12 },
    { month: 'jun', value: 14 },
    { month: 'jul', value: 13 },
    { month: 'ago', value: 16 },
    { month: 'set', value: 15 },
    { month: 'out', value: 14 },
    { month: 'nov', value: 15 },
    { month: 'dez', value: 18 },
    { month: 'jan', value: 17 },
    { month: 'fev', value: 20 },
    { month: 'mar', value: 20 },
    { month: 'abr', value: 19 },
  ],
};

const workoutStatusData = [
  { name: 'Montados', value: 7, color: '#00bfa5' },
  { name: 'Pendentes', value: 5, color: 'hsl(var(--muted))' },
];

const plansDistribution = [
  { name: 'Sem plano', value: 0, max: 10, color: '#ffa726', initial: 'S' },
  { name: 'Mensal', value: 0, max: 10, color: '#90a4ae', initial: 'M' },
  { name: 'Trimestral', value: 2, max: 10, color: '#ffa726', initial: 'T' },
  { name: 'Semestral', value: 6, max: 10, color: '#90a4ae', initial: 'S' },
  { name: 'free', value: 7, max: 10, color: '#ffa726', initial: 'f' },
  { name: 'Anual 12+2', value: 1, max: 10, color: '#90a4ae', initial: 'A' },
];

// --- Sub-componentes ---

const DashboardHeader = () => {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      <div className="relative flex-1 max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Pesquisar" 
          className="h-10 pl-10 rounded-full bg-muted/50 border-none text-sm focus-visible:ring-primary/30"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted">
            <Bell className="h-5 w-5 text-foreground" />
          </Button>
          <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full">4</span>
        </div>

        <div className="flex items-center gap-3 bg-card p-1.5 pr-4 rounded-full border border-border shadow-sm">
          <Avatar className="h-8 w-8 border border-border">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} />}
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-[11px] font-black text-foreground uppercase tracking-tight leading-none">ALAN LUIZ</p>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-0.5">ID: 4</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
        </div>
      </div>
    </header>
  );
};

const PlanProgressBar = ({ plan }: { plan: typeof plansDistribution[0] }) => {
  const percentage = (plan.value / plan.max) * 100;
  return (
    <div className="flex items-center gap-4 group">
      <div 
        className="h-8 w-8 rounded-full flex items-center justify-center text-white text-[12px] font-black shrink-0 shadow-sm transition-transform group-hover:scale-110" 
        style={{ backgroundColor: plan.color }}
      >
        {plan.initial}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between items-center mb-0.5">
          <span className="text-[12px] font-bold text-muted-foreground uppercase tracking-tight">{plan.name}</span>
        </div>
        <div className="relative h-6 w-full bg-muted/30 rounded-full overflow-hidden border border-border/5">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-500 rounded-full flex items-center justify-center"
            style={{ width: `${Math.max(percentage, 8)}%` }}
          >
            {plan.value > 0 && <span className="text-[10px] font-black text-white ml-2">{plan.value}</span>}
          </div>
          {plan.value === 0 && <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted-foreground/40">0</span>}
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [activePeriod, setActivePeriod] = React.useState<keyof typeof activeStudentsDataSets>('3M');
  const activeStudentsData = activeStudentsDataSets[activePeriod];

  return (
    <div className="app-container py-6 min-h-screen bg-background text-foreground transition-colors duration-300">
      <DashboardHeader />

      <div className="space-y-1 mb-8">
        <div className="flex items-center gap-2 text-orange-400">
          <Hand className="h-5 w-5 fill-current" />
          <span className="text-sm font-black uppercase italic tracking-tighter">Olá, ALAN LUIZ</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-foreground uppercase italic tracking-tighter">
          Seus alunos tiveram um desempenho <span className="text-primary">ótimo</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* CARD 3: ALUNOS ATIVOS E PLANOS (Ordem 1 no Mobile, Topo Esquerda no Desktop) */}
        <Card className="order-1 lg:order-1 lg:col-span-8 bg-card border border-border/40 rounded-[28px] shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-10">
              <div className="space-y-1">
                <h3 className="text-[20px] font-black text-foreground uppercase italic tracking-tight">Alunos ativos</h3>
                <p className="text-sm text-muted-foreground font-medium">Histórico de Performance</p>
              </div>
              <div className="flex bg-muted/40 p-1 rounded-xl">
                {(['3M', '6M', '12M'] as const).map((p) => (
                  <Button 
                    key={p} 
                    variant="ghost" 
                    onClick={() => setActivePeriod(p)}
                    className={cn(
                      "h-8 px-4 text-[10px] font-black rounded-lg transition-all",
                      activePeriod === p ? "bg-blue-600 text-white shadow-md" : "text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {p}
                  </Button>
                ))}
              </div>
            </div>

            <div className="h-[200px] w-full mb-12">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeStudentsData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'currentColor', fillOpacity: 0.4, fontSize: 11, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'currentColor', fillOpacity: 0.05 }}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', color: 'hsl(var(--foreground))' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]} 
                    barSize={45}
                  >
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      fill="currentColor" 
                      fontSize={12} 
                      fontWeight="900" 
                      offset={10} 
                      className="italic"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-px bg-border/20 w-full mb-10" />

            <div className="space-y-8">
              <h3 className="text-[16px] font-black text-foreground uppercase italic tracking-tight">Distribuição por plano</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {plansDistribution.map((plan, i) => (
                  <PlanProgressBar key={i} plan={plan} />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* CARD 1: RESUMO DE HOJE (Ordem 2 no Mobile, Coluna Direita no Desktop) */}
        <Card className="order-2 lg:order-2 lg:col-span-4 bg-card border border-border/40 p-8 rounded-[28px] shadow-sm lg:row-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">Resumo de Hoje</h3>
            <Users className="h-4 w-4 text-muted-foreground/40" />
          </div>

          <Tabs defaultValue="treinou" className="w-full">
            <TabsList className="grid grid-cols-2 bg-muted/40 p-1.5 rounded-[16px] h-12 mb-10">
              <TabsTrigger value="nao-treinou" className="rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-foreground">Não Treinou</TabsTrigger>
              <TabsTrigger value="treinou" className="rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Treinou</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col items-center mb-10">
              <span className="text-8xl font-black text-primary italic leading-none shadow-primary/10">2</span>
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-4">Concluíram o treino</p>
            </div>

            <div className="space-y-5">
              {[
                { name: 'Eduarda Borges dos Santos', week: 4, trophy: true },
                { name: 'Vinícius Fernandes de Jesus', week: 1, trophy: false },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-xl transition-colors hover:bg-muted/10">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border/10">
                      <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-black">AL</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-[13px] font-black text-foreground uppercase leading-tight group-hover:text-primary transition-colors">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Semana: {s.week}</p>
                    </div>
                  </div>
                  {s.trophy && <Trophy className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />}
                </div>
              ))}
            </div>
          </Tabs>
        </Card>

        {/* CARD 2: TREINOS PENDENTES (Ordem 3 no Mobile, Abaixo de Alunos Ativos no Desktop) */}
        <Card className="order-3 lg:order-3 lg:col-span-8 bg-card border border-border/40 p-8 rounded-[28px] shadow-sm">
          <h3 className="text-xl font-black text-foreground uppercase italic tracking-tight mb-8">Treinos pendentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="h-[260px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workoutStatusData}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {workoutStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                    <Label 
                      value="12" 
                      position="center" 
                      fill="currentColor" 
                      style={{ fontSize: '38px', fontWeight: '900', fontStyle: 'italic' }} 
                    />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4 max-h-[260px] overflow-y-auto no-scrollbar pr-2">
              {[
                { name: 'Suellen Nunes dos Santos Souza', week: 1 },
                { name: 'Fabiele Costa Pinheiro', week: 1 },
                { name: 'Ricardo Oliveira Silva', week: 2 },
              ].map((student, i) => (
                <div key={i} className="flex items-center justify-between gap-4 p-4 rounded-[20px] bg-muted/20 border border-border/20 transition-all hover:border-primary/30">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-muted text-muted-foreground text-[10px] font-black">ST</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-[12px] font-black text-foreground uppercase truncate">{student.name}</p>
                      <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Semana: {student.week}</p>
                    </div>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-black text-[9px] uppercase tracking-widest h-8 px-5 rounded-full border-none shadow-sm">
                    Montar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

      </div>
      
      {/* Ações Flutuantes Desktop */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 hidden md:flex">
        <Button size="icon" className="h-14 w-14 rounded-full bg-primary shadow-2xl shadow-primary/30 active:scale-90 transition-transform">
          <Plus className="h-7 w-7 text-white" />
        </Button>
        <Button size="icon" className="h-14 w-14 rounded-full bg-card backdrop-blur-xl border border-border/40 shadow-2xl active:scale-90 transition-transform">
          <MessageCircle className="h-7 w-7 text-foreground" />
        </Button>
      </div>
    </div>
  );
}
