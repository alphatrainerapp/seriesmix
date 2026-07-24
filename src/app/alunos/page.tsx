'use client';

import * as React from 'react';
import { 
  Search, 
  Plus, 
  User, 
  MessageSquare,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Archive,
  ChevronDown,
  Mail,
  MoreVertical
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Dados Mockados Estendidos ---

const studentsData = [
  { 
    id: '1', 
    name: 'Alan', 
    status: 'active', 
    plan: 'free', 
    planProgress: '1/1',
    observations: 'bb',
    workouts: [false, false, false, false],
    whatsappActive: false,
    avatar: 'https://picsum.photos/seed/alan/200/200'
  },
  { 
    id: '2', 
    name: 'Alan Luiz pessoal', 
    status: 'active', 
    plan: 'Semestral', 
    planProgress: '1/6',
    observations: '',
    workouts: [false, false, false, false],
    whatsappActive: true,
    avatar: 'https://picsum.photos/seed/alanluiz/200/200'
  },
  { 
    id: '3', 
    name: 'Anadelis de Oliveira', 
    status: 'active', 
    plan: 'free', 
    planProgress: '2/3',
    observations: '',
    workouts: [true, true, false, false],
    whatsappActive: true,
    avatar: 'https://picsum.photos/seed/anadelis/200/200'
  },
  { 
    id: '4', 
    name: 'Eduarda', 
    status: 'active', 
    plan: 'Trimestral', 
    planProgress: '2/3',
    observations: '',
    workouts: [false, false, false, false],
    whatsappActive: true,
    avatar: 'https://picsum.photos/seed/eduarda/200/200'
  },
  { 
    id: '5', 
    name: 'Fabiele Costa Pinheiro', 
    status: 'active', 
    plan: 'Anual 12+2', 
    planProgress: '13/14',
    observations: 'falsa magra, joelho valgo, escoliose lombar',
    workouts: [false, false, false, false],
    whatsappActive: true,
    avatar: 'https://picsum.photos/seed/fabiele/200/200'
  },
];

const FilterTab = ({ 
  label, 
  count, 
  icon: Icon, 
  active, 
  onClick,
  colorClass
}: { 
  label: string, 
  count: number, 
  icon: any, 
  active?: boolean, 
  onClick: () => void,
  colorClass?: string
}) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap",
      active 
        ? "border-primary text-primary font-bold" 
        : "border-transparent text-muted-foreground hover:text-foreground font-medium"
    )}
  >
    <Icon className={cn("h-4 w-4", !active && "opacity-50", active && colorClass)} />
    <span className="text-sm">{label}</span>
    <span className={cn("text-xs", active ? "text-primary" : "text-muted-foreground")}>{count}</span>
  </button>
);

const WorkoutIndicator = ({ completed, index }: { completed: boolean, index: number }) => (
  <div className={cn(
    "h-7 w-7 rounded-md flex items-center justify-center text-[10px] font-bold border transition-colors",
    completed 
      ? "bg-[#00bfa5] border-[#00bfa5] text-white shadow-sm" 
      : "bg-muted/30 border-border text-muted-foreground"
  )}>
    {index + 1}
  </div>
);

export default function AlunosPage() {
  const [activeFilter, setActiveFilter] = React.useState('ativos');
  const [search, setSearch] = React.useState('');

  const filteredStudents = studentsData.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header Actions */}
      <div className="app-container py-6 flex justify-end gap-3">
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-card border-border shadow-sm">
          <Mail className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-xl px-6 h-10 font-bold gap-2 shadow-lg shadow-[#00bfa5]/20 border-none">
          <Plus className="h-5 w-5" />
          Novo Aluno
        </Button>
      </div>

      {/* Navigation Filters */}
      <div className="border-b border-border/40 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="app-container flex items-center overflow-x-auto no-scrollbar">
          <FilterTab 
            label="Todos" 
            count={200} 
            icon={Users} 
            active={activeFilter === 'todos'} 
            onClick={() => setActiveFilter('todos')} 
          />
          <FilterTab 
            label="Ativos" 
            count={16} 
            icon={User} 
            active={activeFilter === 'ativos'} 
            colorClass="text-[#00bfa5]"
            onClick={() => setActiveFilter('ativos')} 
          />
          <FilterTab 
            label="Inativos" 
            count={2} 
            icon={XCircle} 
            active={activeFilter === 'inativos'} 
            onClick={() => setActiveFilter('inativos')} 
          />
          <FilterTab 
            label="Pendentes" 
            count={0} 
            icon={Clock} 
            active={activeFilter === 'pendentes'} 
            onClick={() => setActiveFilter('pendentes')} 
          />
          <FilterTab 
            label="Vencidos" 
            count={0} 
            icon={AlertTriangle} 
            active={activeFilter === 'vencidos'} 
            onClick={() => setActiveFilter('vencidos')} 
          />
          <FilterTab 
            label="Arquivados" 
            count={182} 
            icon={Archive} 
            active={activeFilter === 'arquivados'} 
            onClick={() => setActiveFilter('arquivados')} 
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="app-container py-8">
        <div className="bg-card rounded-2xl border border-border/40 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/10 border-b border-border/40">
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Aluno</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground">Observações</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground text-center">Plano</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground text-center">Situação</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground text-center">Treinos</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-muted-foreground text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filteredStudents.map((student, idx) => (
                  <tr key={student.id} className={cn("group transition-colors hover:bg-muted/5", idx % 2 === 1 && "bg-muted/5")}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center gap-1">
                          <Avatar className="h-12 w-12 border-2 border-background shadow-md">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <button className="text-[10px] text-muted-foreground font-bold hover:text-primary transition-colors">Visualizar perfil</button>
                        </div>
                        <span className="font-bold text-sm text-foreground/80">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                        {student.observations || '--'}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-wider">
                          {student.plan}
                        </Badge>
                        <span className="text-[10px] font-bold text-muted-foreground">{student.planProgress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-none rounded-md px-3 py-1.5 text-[10px] font-black uppercase tracking-widest">
                        ATIVO
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        {student.workouts.map((completed, i) => (
                          <WorkoutIndicator key={i} completed={completed} index={i} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Button 
                          className={cn(
                            "rounded-full h-8 px-5 text-[10px] font-black uppercase tracking-widest gap-2 shadow-sm",
                            student.whatsappActive 
                              ? "bg-[#00e676] hover:bg-[#00c853] text-white" 
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          chamar
                          <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.888 11.888-11.888 3.176 0 6.161 1.237 8.404 3.484 2.247 2.247 3.484 5.232 3.484 8.404 0 6.556-5.332 11.888-11.888 11.888-2.003 0-4.01-.505-5.834-1.464l-6.153 1.687zm6.333-3.032l.363.216c1.52.214 3.061.321 4.601.321 5.433 0 9.852-4.419 9.852-9.852 0-2.627-1.023-5.097-2.883-6.957-1.86-1.86-4.329-2.883-6.957-2.883-5.433 0-9.852 4.419-9.852 9.852 0 1.83.508 3.593 1.47 5.143l.235.377-1.103 4.025 4.274-1.171z" />
                          </svg>
                        </Button>
                        <button className="text-muted-foreground hover:text-foreground p-1 transition-colors">
                          <ChevronDown className="h-6 w-6" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-2">
          <span>Mostrando {filteredStudents.length} de 200 guerreiros</span>
          <div className="flex gap-4">
             <button className="hover:text-primary">Anterior</button>
             <button className="hover:text-primary">Próximo</button>
          </div>
        </div>
      </div>

      {/* Floating Messenger (simulating the chat icon in bottom right) */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button size="icon" className="h-14 w-14 rounded-2xl bg-[#37474f] hover:bg-[#263238] shadow-2xl text-white">
          <MessageSquare className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
