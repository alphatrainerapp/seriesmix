'use client';

import * as React from 'react';
import { 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Circle,
  Plus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Tipagens e Dados Mockados ---

type AttendanceStatus = 'completed' | 'missed' | 'today' | 'future';

interface StudentData {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'inactive';
  avatar: string;
  currentWeek: number;
  totalWeeks: number;
  weeklyAttendance: { day: string; status: AttendanceStatus }[];
  completedCount: number;
  totalExpected: number;
  percent: number;
}

const studentsData: StudentData[] = [
  {
    id: '1',
    name: 'Ana Júlia',
    plan: 'Mensal',
    status: 'active',
    avatar: 'https://picsum.photos/seed/anajulia/200/200',
    currentWeek: 3,
    totalWeeks: 4,
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'completed' },
      { day: 'QUA', status: 'missed' },
      { day: 'QUI', status: 'today' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 3,
    totalExpected: 5,
    percent: 60
  },
  {
    id: '2',
    name: 'Antonio Henrique',
    plan: 'Mensal',
    status: 'active',
    avatar: 'https://picsum.photos/seed/antonio/200/200',
    currentWeek: 4,
    totalWeeks: 4,
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'completed' },
      { day: 'QUA', status: 'completed' },
      { day: 'QUI', status: 'completed' },
      { day: 'SEX', status: 'completed' },
      { day: 'SÁB', status: 'completed' },
      { day: 'DOM', status: 'completed' },
    ],
    completedCount: 7,
    totalExpected: 7,
    percent: 100
  },
  {
    id: '3',
    name: 'Fabiele Costa',
    plan: 'Anual 12+2',
    status: 'active',
    avatar: 'https://picsum.photos/seed/fabiele/200/200',
    currentWeek: 3,
    totalWeeks: 14,
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'missed' },
      { day: 'QUA', status: 'missed' },
      { day: 'QUI', status: 'today' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 1,
    totalExpected: 4,
    percent: 25
  },
];

// --- Sub-componentes ---

const StatusIcon = ({ status }: { status: AttendanceStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-6 w-6 text-[#00bfa5] fill-[#00bfa5]/10" />;
    case 'missed':
      return <XCircle className="h-6 w-6 text-red-500/80" />;
    case 'today':
      return <Circle className="h-6 w-6 text-[#ffa726] stroke-[2.5]" />;
    default:
      return <Circle className="h-6 w-6 text-muted-foreground/20 stroke-[1.5]" />;
  }
};

const StudentCard = ({ student }: { student: StudentData }) => {
  return (
    <div className="bg-card border border-border/40 rounded-[28px] p-5 md:p-7 shadow-sm transition-all hover:shadow-md group flex flex-col gap-6 relative overflow-hidden">
      {/* Topo: Identificação */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-14 w-14 border-2 border-background shadow-md">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className={cn(
            "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background",
            student.status === 'active' ? "bg-emerald-500" : "bg-red-500"
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-black text-lg text-foreground leading-tight truncate uppercase italic tracking-tight">
            {student.name}
          </h3>
          <Badge variant="outline" className="mt-1 bg-orange-500/10 text-orange-600 border-none rounded-full px-3 text-[9px] font-black uppercase tracking-widest h-5">
            {student.plan}
          </Badge>
        </div>
        <ChevronRight className="h-6 w-6 text-muted-foreground/20 group-hover:text-primary transition-colors" />
      </div>

      {/* Meio: Progresso do Plano */}
      <div className="space-y-3">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">Progresso do Plano (Semanas)</p>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[1, 2, 3, 4].map((num) => (
            <div 
              key={num}
              className={cn(
                "h-11 min-w-[50px] flex-1 rounded-xl flex items-center justify-center text-sm font-black transition-all border",
                student.currentWeek === num 
                  ? "bg-[#00bfa5] border-[#00bfa5] text-white shadow-lg shadow-[#00bfa5]/20" 
                  : "bg-muted/30 border-transparent text-muted-foreground/40"
              )}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Baixo: Frequência da Semana */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center px-1">
          {student.weeklyAttendance.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <span className={cn(
                "text-[9px] font-black tracking-widest",
                day.status === 'today' ? "text-[#ffa726]" : "text-muted-foreground/40"
              )}>
                {day.day}
              </span>
              <StatusIcon status={day.status} />
            </div>
          ))}
        </div>

        {/* Rodapé do Card: Estatísticas */}
        <div className="flex items-center gap-2 text-sm font-black px-1">
          <span className="text-muted-foreground uppercase text-[10px] tracking-widest">{student.completedCount}/{student.totalExpected} treinos realizados</span>
          <span className="text-muted-foreground/20">•</span>
          <span className={cn(
            "text-[12px] italic uppercase tracking-tighter",
            student.percent >= 80 ? "text-[#00bfa5]" : student.percent >= 50 ? "text-[#ffa726]" : "text-red-500"
          )}>
            {student.percent}% DE FREQUÊNCIA
          </span>
        </div>
      </div>
    </div>
  );
};

export default function AlunosPage() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      {/* Header */}
      <div className="app-container py-8 bg-card/30 backdrop-blur-md sticky top-0 z-20 border-b border-border/10">
        <div className="flex flex-col gap-6 mobile-content-wrapper">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter text-foreground uppercase italic">Alunos</h1>
            <p className="text-muted-foreground text-[13px] font-bold uppercase tracking-tight">Gestão de performance e frequência</p>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Pesquisar aluno..." 
              className="h-12 pl-12 rounded-2xl bg-card border-border/40 shadow-sm focus-visible:ring-primary/20 text-sm font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lista */}
      <div className="app-container py-8">
        <div className="space-y-5 mobile-content-wrapper">
          {studentsData.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Info Final */}
        <div className="mt-12 text-center mobile-content-wrapper">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
            FIM DA LISTA • {studentsData.length} ALUNOS ATIVOS
          </p>
        </div>
      </div>

      {/* FAB Mobile */}
      <div className="fixed bottom-10 right-8 z-50 md:hidden">
        <Button size="icon" className="h-14 w-14 rounded-2xl bg-primary shadow-2xl shadow-primary/40 text-white active:scale-90 transition-transform">
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
