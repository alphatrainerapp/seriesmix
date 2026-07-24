'use client';

import * as React from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  Trophy, 
  Plus, 
  MessageCircle,
  MoreVertical,
  Hand
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label
} from 'recharts';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

// --- Dados Mockados para os Gráficos ---

const activeStudentsData = [
  { month: 'Fev', value: 20 },
  { month: 'Mar', value: 20 },
  { month: 'Abr', value: 19 },
  { month: 'Mai', value: 21 },
  { month: 'Jun', value: 16 },
  { month: 'Jul', value: 17 },
];

const workoutStatusData = [
  { name: 'Montados', value: 7, color: '#00bfa5' },
  { name: 'Pendentes', value: 5, color: '#e0e0e0' },
];

const plansData = [
  { name: 'Sem plano', value: 0, color: '#ffa726' },
  { name: 'Mensal', value: 2, color: '#90a4ae' },
  { name: 'Trimestral', value: 5, color: '#00bfa5' },
  { name: 'Semestral', value: 3, color: '#90a4ae' },
  { name: 'free', value: 3, color: '#ffa726' },
  { name: 'Anual 12+2', value: 3, color: '#90a4ae' },
];

// --- Sub-componentes do Dashboard ---

const DashboardHeader = () => {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');
  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      <div className="relative flex-1 max-w-md hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Pesquisar" 
          className="h-10 pl-10 rounded-full bg-[#333333] border-none text-sm focus-visible:ring-primary/30"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-[#333333] hover:bg-[#3b3b3b]">
            <Bell className="h-5 w-5 text-white" />
          </Button>
          <span className="absolute top-1 right-1 h-4 w-4 bg-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full">4</span>
        </div>

        <div className="flex items-center gap-3 bg-[#333333] p-1.5 pr-4 rounded-full border border-white/5">
          <Avatar className="h-8 w-8 border border-white/10">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} />}
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-[11px] font-black text-white uppercase tracking-tight leading-none">ALAN LUIZ</p>
            <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">ID: 4</p>
          </div>
          <ChevronDown className="h-4 w-4 text-white/20 ml-1" />
        </div>
      </div>
    </header>
  );
};

export default function HomePage() {
  return (
    <div className="app-container py-6 min-h-screen bg-[#262626]">
      <DashboardHeader />

      <div className="space-y-1 mb-8">
        <div className="flex items-center gap-2 text-orange-400">
          <Hand className="h-5 w-5 fill-current" />
          <span className="text-sm font-black uppercase italic tracking-tighter">Olá, ALAN LUIZ</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">
          Seus alunos tiveram um desempenho <span className="text-primary">ótimo</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Coluna Esquerda - Gráfico Principal */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-[#333333] border-none p-6 rounded-[24px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Alunos ativos</h3>
              <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-white/40 gap-2">
                Últimos 6 Meses <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activeStudentsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 'bold' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#262626', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#00bfa5" 
                    radius={[8, 8, 0, 0]} 
                    barSize={60}
                    label={{ position: 'top', fill: '#00bfa5', fontSize: 10, fontWeight: 'black', dy: -10 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Treinos Donut e Lista */}
          <Card className="bg-[#333333] border-none p-6 rounded-[24px]">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-6">Treinos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-[240px] relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workoutStatusData}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {workoutStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                      <Label 
                        value="12" 
                        position="center" 
                        fill="#fff" 
                        style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic' }} 
                      />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-[80%] -translate-y-1/2 space-y-4 hidden md:block">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">41.7%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">58.3%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-[240px] overflow-y-auto no-scrollbar pr-2">
                {[
                  { name: 'Suellen Nunes dos Santos Souza', week: 1, avatar: null },
                  { name: 'Fabiele Costa Pinheiro', week: 1, avatar: null },
                  { name: 'teste app', week: 1, avatar: null },
                ].map((student, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-[#262626]/50 border border-white/5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-black">SN</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-white uppercase truncate">{student.name}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Semana: {student.week}</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-black font-black text-[9px] uppercase tracking-widest h-8 px-4 rounded-full border-none">
                      Montar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Coluna Direita */}
        <div className="lg:col-span-4 space-y-6">
          {/* Hoje - Treinou / Não Treinou */}
          <Card className="bg-[#333333] border-none p-6 rounded-[24px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-white/40 uppercase tracking-widest">Hoje</h3>
              <ChevronDown className="h-4 w-4 text-white/20" />
            </div>

            <Tabs defaultValue="treinou" className="w-full">
              <TabsList className="grid grid-cols-2 bg-[#262626] p-1 rounded-xl h-11 mb-8">
                <TabsTrigger value="nao-treinou" className="rounded-lg text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-white/10 data-[state=active]:text-white">Não Treinou</TabsTrigger>
                <TabsTrigger value="treinou" className="rounded-lg text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Treinou</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col items-center mb-8">
                <span className="text-7xl font-black text-primary italic leading-none">2</span>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-2">Alunos que treinaram</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Eduarda Borges dos Santos', week: 4, trophy: true },
                  { name: 'Vinícius Fernandes de Jesus', week: 1, trophy: false },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs font-black">E</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-black text-white uppercase leading-tight group-hover:text-primary transition-colors">{s.name}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Semana: {s.week}</p>
                      </div>
                    </div>
                    {s.trophy && <Trophy className="h-4 w-4 text-yellow-500 fill-yellow-500/20" />}
                  </div>
                ))}
              </div>
            </Tabs>
          </Card>

          {/* Planos distribution */}
          <Card className="bg-[#333333] border-none p-6 rounded-[24px]">
            <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-8">Planos</h3>
            
            <div className="h-[180px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={plansData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    hide
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                    {plansData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              {plansData.map((plan, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-md flex items-center justify-center text-[8px] font-black text-black uppercase" style={{ backgroundColor: plan.color }}>
                    {plan.name[0]}
                  </div>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest truncate">{plan.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Botões de Ação Flutuantes / Rodapé */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3">
        <Button size="icon" className="h-12 w-12 rounded-full bg-primary shadow-xl shadow-primary/20">
          <Plus className="h-6 w-6 text-white" />
        </Button>
        <Button size="icon" className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/5 shadow-xl">
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  );
}

