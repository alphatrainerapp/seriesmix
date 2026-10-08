'use client';

import * as React from 'react';
import { 
  Search, 
  ChevronDown, 
  CheckCircle2, 
  XCircle, 
  Circle,
  Plus,
  Pencil,
  Pause,
  Home,
  Archive,
  Mail,
  MessageCircle,
  Users,
  UserX,
  Clock,
  AlertTriangle,
  ChevronRight,
  Calendar,
  HeartPulse,
  LineChart,
  Camera,
  Apple
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Tipagens e Dados Mockados ---

type AttendanceStatus = 'completed' | 'missed' | 'today' | 'future';

type WorkoutStatusType = 
  | { type: 'future', date: string } 
  | { type: 'today' } 
  | { type: 'delayed', days: number } 
  | { type: 'update' }
  | { type: 'weeks', week: number };

interface StudentData {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'inactive';
  avatar: string;
  observations: string;
  weeklyAttendance: { day: string; status: AttendanceStatus }[];
  completedCount: number;
  totalExpected: number;
  percent: number;
  workoutStatus: WorkoutStatusType;
}

const studentsData: StudentData[] = [
  {
    id: '1',
    name: 'Ana Júlia',
    plan: 'Mensal',
    status: 'active',
    avatar: 'https://picsum.photos/seed/anajulia/200/200',
    observations: 'Foco em superiores e cardio 3x na semana',
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
    percent: 60,
    workoutStatus: { type: 'weeks', week: 3 }
  },
  {
    id: '2',
    name: 'Antonio Henrique',
    plan: 'Anual 12+2',
    status: 'active',
    avatar: 'https://picsum.photos/seed/antonio/200/200',
    observations: 'Joelho valgo, escoliose lombar',
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
    percent: 100,
    workoutStatus: { type: 'weeks', week: 4 }
  },
  {
    id: '3',
    name: 'Anadelis de Oliveira',
    plan: 'free',
    status: 'active',
    avatar: 'https://picsum.photos/seed/anadelis/200/200',
    observations: '--',
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
    percent: 25,
    workoutStatus: { type: 'weeks', week: 1 }
  },
  {
    id: '4',
    name: 'Vinícius Fernandes',
    plan: 'Semestral',
    status: 'active',
    avatar: 'https://picsum.photos/seed/vinicius/200/200',
    observations: 'Recuperação pós-cirúrgica ombro',
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'future' },
      { day: 'QUA', status: 'future' },
      { day: 'QUI', status: 'future' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 1,
    totalExpected: 3,
    percent: 33,
    workoutStatus: { type: 'weeks', week: 2 }
  },
  {
    id: '5',
    name: 'Eduarda Borges',
    plan: 'Anual',
    status: 'active',
    avatar: 'https://picsum.photos/seed/eduarda/200/200',
    observations: 'Atleta de vôlei, foco em explosão',
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'completed' },
      { day: 'QUA', status: 'completed' },
      { day: 'QUI', status: 'today' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 4,
    totalExpected: 6,
    percent: 66,
    workoutStatus: { type: 'future', date: '11/11' }
  },
  {
    id: '6',
    name: 'Ricardo Oliveira',
    plan: 'Trimestral',
    status: 'active',
    avatar: 'https://picsum.photos/seed/ricardo/200/200',
    observations: 'Hipertrofia máxima',
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
    percent: 60,
    workoutStatus: { type: 'weeks', week: 3 }
  },
  {
    id: '7',
    name: 'Suellen Nunes',
    plan: 'Mensal',
    status: 'active',
    avatar: 'https://picsum.photos/seed/suellen/200/200',
    observations: 'Foco em emagrecimento',
    weeklyAttendance: [
      { day: 'SEG', status: 'completed' },
      { day: 'TER', status: 'missed' },
      { day: 'QUA', status: 'completed' },
      { day: 'QUI', status: 'today' },
      { day: 'SEX', status: 'future' },
      { day: 'SÁB', status: 'future' },
      { day: 'DOM', status: 'future' },
    ],
    completedCount: 3,
    totalExpected: 4,
    percent: 75,
    workoutStatus: { type: 'weeks', week: 1 }
  },
];

// --- Sub-componentes ---

const StatusIcon = ({ status }: { status: AttendanceStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4.5 w-4.5 text-[#00bfa5]" />;
    case 'missed':
      return <XCircle className="h-4.5 w-4.5 text-red-500/80" />;
    case 'today':
      return <Circle className="h-4.5 w-4.5 text-[#ffa726] stroke-[2.5]" />;
    default:
      return <Circle className="h-4.5 w-4.5 text-muted-foreground/20 stroke-[1.5]" />;
  }
};

const WeeklyProgress = ({ currentWeek }: { currentWeek: number }) => {
  return (
    <div className="flex gap-1.5 items-center">
      {[1, 2, 3, 4].map((w) => {
        const isCompleted = w < currentWeek;
        const isActive = w === currentWeek;
        return (
          <div
            key={w}
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center text-[12px] font-black transition-all shadow-sm",
              isCompleted && "bg-slate-700 text-white",
              isActive && "bg-[#00bfa5] text-white scale-110 shadow-lg shadow-[#00bfa5]/20",
              w > currentWeek && "bg-muted/30 text-muted-foreground/20 border border-border/10"
            )}
          >
            {w}
          </div>
        );
      })}
    </div>
  );
};

const WorkoutStatusPill = ({ status }: { status: WorkoutStatusType }) => {
  if (status.type === 'weeks') {
    return <WeeklyProgress currentWeek={status.week} />;
  }

  const configs = {
    future: {
      label: `Atualizar em ${status.type === 'future' ? status.date : ''}`,
      borderColor: 'border-[#00bfa5]/40',
      textColor: 'text-[#00bfa5]',
      bgColor: 'bg-[#00bfa5]/5',
      icon: Calendar
    },
    today: {
      label: 'Atualizar hoje',
      borderColor: 'border-[#ffa726]/40',
      textColor: 'text-[#ffa726]',
      bgColor: 'bg-[#ffa726]/5',
      icon: Calendar
    },
    delayed: {
      label: `Atrasado há ${status.type === 'delayed' ? status.days : ''} dias`,
      borderColor: 'border-rose-500/40',
      textColor: 'text-rose-500',
      bgColor: 'bg-rose-500/5',
      icon: Calendar
    },
    update: {
      label: 'Atualizar treino',
      borderColor: 'border-blue-500/40',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-500/5',
      icon: Calendar
    }
  };

  const config = configs[status.type];
  const Icon = config.icon;

  return (
    <div className={cn(
      "h-9 px-5 rounded-full border flex items-center gap-2.5 shadow-sm transition-all hover:scale-[1.02] cursor-pointer",
      config.borderColor,
      config.bgColor
    )}>
      <Icon className={cn("h-4 w-4", config.textColor)} />
      <span className={cn("text-[10px] font-black uppercase tracking-widest", config.textColor)}>
        {config.label}
      </span>
    </div>
  );
};

const ActionButton = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
  <button className="flex flex-col items-center justify-center gap-2 p-3 bg-muted/60 hover:bg-muted/80 rounded-2xl transition-all active:scale-95 group border border-transparent hover:border-border/40 min-h-[85px]">
    <span className="text-[9px] font-black text-foreground/70 uppercase tracking-tighter text-center leading-tight max-w-[80px]">
      {label}
    </span>
    <Icon className="h-5 w-5 text-foreground/80 group-hover:text-primary transition-colors" />
  </button>
);

const StudentActionsGrid = () => (
  <div className="grid grid-cols-4 md:grid-cols-8 gap-3 w-full max-w-6xl">
    <ActionButton icon={Pencil} label="Editar" />
    <ActionButton icon={HeartPulse} label="Avaliação Física" />
    <ActionButton icon={LineChart} label="Performance" />
    <ActionButton icon={Apple} label="Dieta" />
    <ActionButton icon={Camera} label="Atualizações" />
    <ActionButton icon={Pause} label="Pausar Treino" />
    <ActionButton icon={Home} label="Área Do Aluno" />
    <ActionButton icon={Archive} label="Arquivar" />
  </div>
);

const DesktopStudentRow = ({ student, index }: { student: StudentData, index: number }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const isEven = index % 2 === 0;

  return (
    <div className={cn(
      "flex flex-col border-b border-border/5 group",
      isEven ? "bg-card" : "bg-muted/10"
    )}>
      <div className="flex items-center gap-4 py-4 px-6 hover:bg-muted/20 transition-colors">
        {/* Aluno */}
        <div className="w-[200px] flex items-center gap-4 shrink-0">
          <Avatar className="h-12 w-12 border border-border/50">
            <AvatarImage src={student.avatar} />
            <AvatarFallback>{student.name.substring(0,2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-sm text-foreground/80 truncate leading-tight">{student.name}</span>
            <button className="text-[10px] font-bold text-muted-foreground/60 hover:text-primary transition-colors text-left uppercase tracking-tight mt-0.5">Visualizar perfil</button>
          </div>
        </div>

        {/* Observações */}
        <div className="flex-1 min-w-[200px]">
          <p className="text-[12px] text-muted-foreground leading-snug line-clamp-2 italic px-4">
            {student.observations}
          </p>
        </div>

        {/* Plano */}
        <div className="w-[120px] flex flex-col items-center gap-1.5">
          <Badge className={cn(
            "text-[9px] font-black uppercase tracking-widest px-3 h-5 border-none",
            student.plan === 'free' ? "bg-orange-400 text-white" : 
            student.plan.includes('Anual') ? "bg-orange-500 text-white" : "bg-orange-300 text-white"
          )}>
            {student.plan}
          </Badge>
          <span className="text-[11px] font-bold text-muted-foreground/40 italic uppercase tracking-tighter">Status Ativo</span>
        </div>

        {/* Situação */}
        <div className="w-[100px] flex justify-center">
          <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-full px-4 h-6 text-[10px] font-black uppercase tracking-widest">
            Ativo
          </Badge>
        </div>

        {/* Treinos (Resumo de Status) */}
        <div className="w-[260px] flex flex-col gap-3 items-center">
          <WorkoutStatusPill status={student.workoutStatus} />
          
          <div className="flex gap-2 items-center">
            {student.weeklyAttendance.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <StatusIcon status={day.status} />
                <span className={cn(
                  "text-[7px] font-black",
                  day.status === 'today' ? "text-[#ffa726]" : "text-muted-foreground/30"
                )}>{day.day.substring(0,1)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-black whitespace-nowrap">
            <span className="text-muted-foreground uppercase">{student.completedCount}/{student.totalExpected} REALIZADOS</span>
            <span className="text-muted-foreground/20">•</span>
            <span className={cn(
              "uppercase italic",
              student.percent >= 80 ? "text-[#00bfa5]" : student.percent >= 50 ? "text-[#ffa726]" : "text-red-500"
            )}>
              {student.percent}% FREQ.
            </span>
          </div>
        </div>

        {/* Ações */}
        <div className="w-[180px] flex items-center justify-end gap-3">
          <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white h-9 rounded-full px-6 gap-2 font-black text-[10px] uppercase tracking-widest border-none shadow-sm shadow-[#00bfa5]/20">
            <span className="hidden xl:inline">chamar</span>
            <MessageCircle className="h-4 w-4 fill-white" />
          </Button>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted/50 transition-all active:scale-90"
          >
            <ChevronDown className={cn(
              "h-6 w-6 text-muted-foreground/40 transition-transform duration-300",
              isExpanded && "rotate-180 text-primary"
            )} />
          </button>
        </div>
      </div>

      {/* Painel Expansível */}
      {isExpanded && (
        <div className={cn(
          "p-6 flex justify-center animate-in slide-in-from-top-2 duration-300 border-t border-border/5",
          isEven ? "bg-muted/30" : "bg-card/20"
        )}>
          <StudentActionsGrid />
        </div>
      )}
    </div>
  );
};

const MobileStudentCard = ({ student }: { student: StudentData }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

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
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-11 w-11 flex items-center justify-center rounded-full hover:bg-muted/50 transition-all active:scale-90"
        >
          <ChevronRight className={cn(
            "h-7 w-7 text-muted-foreground/30 transition-transform duration-300",
            isExpanded && "rotate-90 text-primary"
          )} />
        </button>
      </div>

      {/* Meio: Status do Treino */}
      <div className="space-y-3">
        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">Status de Treino</p>
        <div className="flex justify-start">
           <WorkoutStatusPill status={student.workoutStatus} />
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
              <div className="flex items-center justify-center h-6 w-6">
                 {day.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-[#00bfa5] fill-[#00bfa5]/10" />}
                 {day.status === 'missed' && <XCircle className="h-5 w-5 text-red-500/80" />}
                 {day.status === 'today' && <Circle className="h-5 w-5 text-[#ffa726] stroke-[2.5]" />}
                 {day.status === 'future' && <Circle className="h-5 w-5 text-muted-foreground/20 stroke-[1.5]" />}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do Card: Estatísticas */}
        <div className="flex items-center gap-1.5 text-[10px] font-black px-1 mt-2">
          <span className="text-muted-foreground uppercase tracking-tight">{student.completedCount}/{student.totalExpected} TREINOS REALIZADOS</span>
          <span className="text-muted-foreground/20">•</span>
          <span className={cn(
            "uppercase italic tracking-tight",
            student.percent >= 80 ? "text-[#00bfa5]" : student.percent >= 50 ? "text-[#ffa726]" : "text-red-500"
          )}>
            {student.percent}% DE FREQUÊNCIA
          </span>
        </div>
      </div>

      {/* Painel de Ações Expansível */}
      {isExpanded && (
        <div className="pt-6 border-t border-border/10 flex justify-center animate-in slide-in-from-top-2 duration-300 overflow-x-auto no-scrollbar">
          <div className="min-w-max pb-2">
            <StudentActionsGrid />
          </div>
        </div>
      )}
    </div>
  );
};

export default function AlunosPage() {
  const [search, setSearch] = React.useState('');

  const filteredStudents = React.useMemo(() => {
    return studentsData.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 pb-20">
      {/* Top Header Filter Counts */}
      <div className="app-container pt-8 pb-4 border-b border-border/5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="flex items-center flex-wrap gap-x-6 gap-y-3">
             <button className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase hover:text-primary transition-colors">
                <Users className="h-4 w-4" /> Todos <span className="text-muted-foreground/40">200</span>
             </button>
             <button className="flex items-center gap-2 text-[11px] font-black text-primary uppercase border-b-2 border-primary pb-1">
                <Users className="h-4 w-4" /> Ativos <span className="text-primary/60">{filteredStudents.length}</span>
             </button>
             <button className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase hover:text-primary transition-colors">
                <UserX className="h-4 w-4" /> Inativos <span className="text-muted-foreground/40">2</span>
             </button>
             <button className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase hover:text-primary transition-colors">
                <Clock className="h-4 w-4" /> Pendentes <span className="text-muted-foreground/40">0</span>
             </button>
             <button className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase hover:text-primary transition-colors">
                <AlertTriangle className="h-4 w-4" /> Vencidos <span className="text-muted-foreground/40">0</span>
             </button>
             <button className="flex items-center gap-2 text-[11px] font-black text-muted-foreground uppercase hover:text-primary transition-colors">
                <Archive className="h-4 w-4" /> Arquivados <span className="text-muted-foreground/40">182</span>
             </button>
          </div>

          <div className="flex items-center gap-3">
             <Button variant="outline" size="icon" className="h-10 w-12 rounded-xl bg-card border-border shadow-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
             </Button>
             <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl h-10 px-6 font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-[#00bfa5]/20 border-none">
                <Plus className="h-4 w-4" />
                Novo Aluno
             </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="app-container py-8">
        <div className="flex flex-col gap-8">
          {/* Barra de Pesquisa */}
          <div className="relative group mobile-content-wrapper">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Pesquisar aluno..." 
              className="h-12 pl-12 rounded-2xl bg-card border-border/40 shadow-sm focus-visible:ring-primary/20 text-sm font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-card rounded-3xl border border-border/40 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="flex items-center gap-4 bg-muted/20 py-4 px-6 border-b border-border/5">
              <span className="w-[200px] text-[10px] font-black text-muted-foreground uppercase tracking-widest shrink-0">Aluno</span>
              <span className="flex-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest px-4">Observações</span>
              <span className="w-[120px] text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">Plano</span>
              <span className="w-[100px] text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">Situação</span>
              <span className="w-[260px] text-center text-[10px] font-black text-muted-foreground uppercase tracking-widest">Treinos</span>
              <span className="w-[180px] text-right text-[10px] font-black text-muted-foreground uppercase tracking-widest">Ações</span>
            </div>
            
            {/* Table Body */}
            <div className="flex flex-col">
              {filteredStudents.map((student, index) => (
                <DesktopStudentRow key={student.id} student={student} index={index} />
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-5 mobile-content-wrapper">
            {filteredStudents.map((student) => (
              <MobileStudentCard key={student.id} student={student} />
            ))}
          </div>

          {/* Info Final */}
          <div className="mt-8 text-center">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">
              FIM DA LISTA • {filteredStudents.length} ALUNOS VISÍVEIS
            </p>
          </div>
        </div>
      </div>

      {/* FAB Mobile */}
      <div className="fixed bottom-10 right-8 z-50 lg:hidden">
        <Button size="icon" className="h-14 w-14 rounded-2xl bg-primary shadow-2xl shadow-primary/40 text-white active:scale-90 transition-transform">
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
