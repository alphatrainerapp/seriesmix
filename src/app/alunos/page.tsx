'use client';

import * as React from 'react';
import { 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Circle,
  Plus,
  Bell,
  Menu
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
      { day: 'SEX', status: 'missed' },
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
  {
    id: '4',
    name: 'Fabio Gameiro',
    plan: 'Anual 12+2',
    status: 'active',
    avatar: 'https://picsum.photos/seed/fabiog/200/200',
    currentWeek: 2,
    totalWeeks: 14,
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'completed' },
      { day: 'QUA', status: 'future' },
      { day: 'QUI', status: 'today' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 2,
    totalExpected: 2,
    percent: 100
  },
  {
    id: '5',
    name: 'Fer Garcia',
    plan: 'Mensal',
    status: 'inactive',
    avatar: 'https://picsum.photos/seed/fergarcia/200/200',
    currentWeek: 1,
    totalWeeks: 4,
    weeklyAttendance: [
      { day: 'SEG', status: 'future' },
      { day: 'TER', status: 'future' },
      { day: 'QUA', status: 'future' },
      { day: 'QUI', status: 'future' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 0,
    totalExpected: 0,
    percent: 0
  },
];

// --- Sub-componentes ---

const StatusIcon = ({ status }: { status: AttendanceStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-6 w-6 text-[#00bfa5] fill-[#00bfa5]/10" />;
    case 'missed':
      return <XCircle className="h-6 w-6 text-red-500" />;
    case 'today':
      return <Circle className="h-6 w-6 text-[#ffa726] stroke-[2.5]" />;
    default:
      return <Circle className="h-6 w-6 text-muted-foreground/30 stroke-[1.5]" />;
  }
};

const StudentCard = ({ student }: { student: StudentData }) => {
  return (
    <div className="bg-card border border-border/40 rounded-[24px] p-5 md:p-7 shadow-sm transition-all hover:shadow-md group flex flex-col md:flex-row gap-6 md:items-center">
      {/* Coluna Esquerda: Info Básica */}
      <div className="flex flex-col items-center text-center min-w-[140px] gap-2">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className={cn(
            "absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-background",
            student.status === 'active' ? "bg-emerald-500" : "bg-red-500"
          )} />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-base text-foreground leading-tight">{student.name}</h3>
          <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-none rounded-full px-4 text-[10px] font-bold uppercase tracking-wider h-6">
            {student.plan}
          </Badge>
        </div>
      </div>

      {/* Coluna Central: Progresso e Frequência */}
      <div className="flex-1 space-y-6">
        {/* Progresso de Semanas */}
        <div className="space-y-3">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Progresso do Plano (Semanas)</p>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num}
                className={cn(
                  "h-10 w-12 sm:w-14 rounded-lg flex items-center justify-center text-sm font-bold transition-all border",
                  student.currentWeek === num 
                    ? "bg-[#00bfa5] border-[#00bfa5] text-white shadow-lg shadow-[#00bfa5]/20 scale-105" 
                    : "bg-muted/30 border-transparent text-muted-foreground"
                )}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown de Frequência */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <p className="text-[10px] font-black text-[#00bfa5] uppercase tracking-widest">
                Semana Atual <span className="text-muted-foreground/60 mx-1">•</span> {student.currentWeek} de {student.totalWeeks}
             </p>
          </div>
          
          <div className="flex justify-between max-w-lg">
            {student.weeklyAttendance.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <span className={cn(
                  "text-[9px] font-black tracking-widest",
                  day.status === 'today' ? "text-[#ffa726]" : "text-muted-foreground/60"
                )}>
                  {day.day}
                </span>
                <StatusIcon status={day.status} />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="text-muted-foreground">{student.completedCount}/{student.totalExpected} treinos</span>
            <span className="text-muted-foreground/30">•</span>
            <span className={cn(
              student.percent >= 80 ? "text-[#00bfa5]" : student.percent >= 50 ? "text-[#ffa726]" : "text-red-500"
            )}>
              {student.percent}%
            </span>
          </div>
        </div>
      </div>

      {/* Coluna Direita: Ação */}
      <div className="flex items-center justify-end md:pl-4">
        <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors">
          <ChevronRight className="h-6 w-6 text-muted-foreground/40 group-hover:text-primary transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default function AlunosPage() {
  const [search, setSearch] = React.useState('');

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      {/* Header Fiel à Referência */}
      <div className="app-container py-8 border-b border-border/10 bg-card/30 backdrop-blur-md sticky top-0 z-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Alunos</h1>
            <p className="text-muted-foreground text-sm font-medium">Acompanhe o progresso e a frequência semanal dos seus alunos.</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Buscar aluno..." 
              className="h-12 pl-12 rounded-2xl bg-card border-border/40 shadow-sm focus-visible:ring-primary/20 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lista de Alunos */}
      <div className="app-container py-8">
        <div className="space-y-4 max-w-5xl mx-auto">
          {studentsData.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-10 text-center">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Exibindo {studentsData.length} guerreiros ativos no plano
          </p>
        </div>
      </div>

      {/* Floating Action Button Mobile */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <Button size="icon" className="h-14 w-14 rounded-2xl bg-primary shadow-2xl text-white active:scale-90 transition-transform">
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

