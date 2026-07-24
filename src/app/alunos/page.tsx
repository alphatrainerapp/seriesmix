'use client';

import * as React from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  User, 
  Calendar, 
  Dumbbell, 
  Send,
  Filter,
  Users,
  CheckCircle2,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// --- Dados Mockados de Alunos ---

const studentsData = [
  { 
    id: '1', 
    name: 'João Silva', 
    status: 'active', 
    plan: 'Semestral', 
    lastWorkout: '14/01/2024', 
    email: 'joao.silva@email.com',
    avatar: 'https://picsum.photos/seed/joao/200/200'
  },
  { 
    id: '2', 
    name: 'Eduarda Borges dos Santos', 
    status: 'active', 
    plan: 'Trimestral', 
    lastWorkout: '13/01/2024', 
    email: 'eduarda.borges@email.com',
    avatar: 'https://picsum.photos/seed/eduarda/200/200'
  },
  { 
    id: '3', 
    name: 'Vinícius Fernandes de Jesus', 
    status: 'active', 
    plan: 'Mensal', 
    lastWorkout: '12/01/2024', 
    email: 'vinicius.fernandes@email.com',
    avatar: 'https://picsum.photos/seed/vinicius/200/200'
  },
  { 
    id: '4', 
    name: 'Suellen Nunes dos Santos', 
    status: 'inactive', 
    plan: 'Anual 12+2', 
    lastWorkout: '05/01/2024', 
    email: 'suellen.nunes@email.com',
    avatar: 'https://picsum.photos/seed/suellen/200/200'
  },
  { 
    id: '5', 
    name: 'Fabiele Costa Pinheiro', 
    status: 'active', 
    plan: 'free', 
    lastWorkout: '14/01/2024', 
    email: 'fabiele.costa@email.com',
    avatar: 'https://picsum.photos/seed/fabiele/200/200'
  },
  { 
    id: '6', 
    name: 'Ricardo Oliveira Silva', 
    status: 'active', 
    plan: 'Trimestral', 
    lastWorkout: '10/01/2024', 
    email: 'ricardo.oliveira@email.com',
    avatar: 'https://picsum.photos/seed/ricardo/200/200'
  },
];

const StudentCard = ({ student }: { student: typeof studentsData[0] }) => {
  return (
    <Card className="group bg-card border border-border/40 p-5 rounded-[24px] shadow-sm hover:border-primary/40 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-background shadow-lg">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className={cn(
              "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-4 border-card flex items-center justify-center",
              student.status === 'active' ? "bg-emerald-500" : "bg-muted-foreground/40"
            )}>
              {student.status === 'active' ? (
                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
              ) : (
                <XCircle className="h-2.5 w-2.5 text-white" />
              )}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-black text-foreground uppercase tracking-tight truncate leading-tight group-hover:text-primary transition-colors">
              {student.name}
            </h3>
            <p className="text-[11px] text-muted-foreground font-bold truncate mt-0.5">{student.email}</p>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl border-border/40">
            <DropdownMenuItem className="font-bold text-[11px] uppercase tracking-widest p-3">Editar Dados</DropdownMenuItem>
            <DropdownMenuItem className="font-bold text-[11px] uppercase tracking-widest p-3">Ver Medidas</DropdownMenuItem>
            <DropdownMenuItem className="font-bold text-[11px] uppercase tracking-widest p-3 text-destructive">Arquivar Aluno</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-muted/30 p-3 rounded-xl border border-border/5">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">PLANO ATUAL</p>
          <p className="text-[12px] font-black text-primary uppercase truncate">{student.plan}</p>
        </div>
        <div className="bg-muted/30 p-3 rounded-xl border border-border/5">
          <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">ÚLTIMO TREINO</p>
          <div className="flex items-center gap-1.5 text-foreground">
            <Calendar className="h-3 w-3 opacity-40" />
            <p className="text-[11px] font-black">{student.lastWorkout}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-11 font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-primary/10 transition-transform active:scale-95">
          <User className="h-3.5 w-3.5" />
          Perfil
        </Button>
        <Button variant="outline" className="flex-1 rounded-xl h-11 border-border hover:bg-muted/50 font-black uppercase text-[10px] tracking-widest gap-2 transition-transform active:scale-95">
          <Send className="h-3.5 w-3.5" />
          Treino
        </Button>
      </div>
    </Card>
  );
};

export default function AlunosPage() {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || student.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app-container py-8 min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Users className="h-6 w-6" />
            <span className="text-sm font-black uppercase italic tracking-tighter">Gestão de Alunos</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-foreground uppercase italic tracking-tighter">
            Seus <span className="text-primary">Guerreiros</span>
          </h1>
        </div>

        <Button className="bg-[#00bfa5] hover:bg-[#00a894] text-white rounded-2xl px-8 h-14 font-black text-xs gap-3 shadow-lg shadow-[#00bfa5]/20 border-none uppercase tracking-widest transition-all active:scale-95">
          <Plus className="h-6 w-6" />
          ADICIONAR NOVO ALUNO
        </Button>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Pesquisar por nome ou email..." 
            className="h-14 pl-12 rounded-2xl bg-card border border-border/40 text-sm focus-visible:ring-primary/30 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Tabs value={filter} onValueChange={setFilter} className="w-full lg:w-auto">
          <TabsList className="grid grid-cols-3 bg-muted/40 p-1.5 rounded-[20px] h-14 w-full lg:w-[400px]">
            <TabsTrigger 
              value="all" 
              className="rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-background data-[state=active]:text-foreground shadow-none"
            >
              Todos ({studentsData.length})
            </TabsTrigger>
            <TabsTrigger 
              value="active" 
              className="rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white shadow-none"
            >
              Ativos ({studentsData.filter(s => s.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger 
              value="inactive" 
              className="rounded-xl text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-muted-foreground/20 data-[state=active]:text-foreground shadow-none"
            >
              Inativos ({studentsData.filter(s => s.status === 'inactive').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid Section */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center opacity-40">
          <Search className="h-16 w-16 mb-4 text-muted-foreground" />
          <p className="text-xl font-black uppercase italic tracking-tighter">Nenhum aluno encontrado</p>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mt-2">Tente ajustar sua busca ou filtros</p>
        </div>
      )}

      {/* Floating Action Mobile */}
      <div className="fixed bottom-28 right-6 md:hidden z-50">
        <Button size="icon" className="h-16 w-16 rounded-full bg-primary shadow-2xl shadow-primary/40 active:scale-90 transition-transform">
          <Plus className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
}
