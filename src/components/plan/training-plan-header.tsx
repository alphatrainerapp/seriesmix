'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Target, CalendarDays, User, Pencil, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '../ui/badge';

interface SectionHeaderProps {
  icon: React.ElementType;
  title: string;
}

const SectionHeader = ({ icon: Icon, title }: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-4 mt-6 first:mt-0">
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
      <Icon className="w-4 h-4" />
    </div>
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
  </div>
);

interface FieldProps {
  label: string;
  value: string;
  className?: string;
  inputClassName?: string;
}

const Field = ({ label, value, className, inputClassName }: FieldProps) => (
  <div className={cn("space-y-1.5", className)}>
    {label && (
      <label className="text-sm font-medium text-muted-foreground ml-1">
        {label}
      </label>
    )}
    <Input
      defaultValue={value}
      readOnly
      className={cn(
        "h-11 bg-muted/30 border-none rounded-xl font-medium focus-visible:ring-primary/30 cursor-default",
        inputClassName
      )}
    />
  </div>
);

const StudentProfile = () => {
  const studentAvatar = PlaceHolderImages.find((img) => img.id === 'student-avatar');
  return (
    <div className="flex flex-col items-center mb-8 w-full">
      <div className="flex w-full justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Perfil do Aluno</h2>
        <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl gap-2 shadow-sm border-border/50">
          <Pencil className="h-4 w-4" />
          Editar
        </Button>
      </div>
      
      <div className="relative w-32 h-32 mb-4">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-background shadow-xl bg-muted flex items-center justify-center">
           {studentAvatar ? (
            <Image
              src={studentAvatar.imageUrl}
              alt={studentAvatar.description}
              fill
              className="object-cover rounded-full"
              data-ai-hint={studentAvatar.imageHint}
            />
          ) : (
            <User className="w-12 h-12 text-muted-foreground" />
          )}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-primary text-white p-2 rounded-full border-4 border-background shadow-lg">
          <ShieldCheck className="h-5 w-5" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold tracking-tight">João Silva</h3>
      <div className="flex items-center gap-2 mt-1">
        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 rounded-full px-4">
          ATIVO
        </Badge>
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Membro Premium</span>
      </div>
    </div>
  );
};

export function TrainingPlanHeader() {
  const studentAvatar = PlaceHolderImages.find((img) => img.id === 'student-avatar');

  return (
    <Card className="p-6 bg-card shadow-sm rounded-2xl border border-border/40">
      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        <StudentProfile />

        <SectionHeader icon={Target} title="Programa" />
        <Field label="Objetivo" value="Ganho de massa muscular" />
        <Field label="Tipo de Exercício" value="Musculação" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Duração" value="60 minutos" />
          <Field label="Intensidade" value="Moderada" />
        </div>

        <SectionHeader icon={CalendarDays} title="Cronograma" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Início" value="14/01/2024" />
          <Field label="Fim" value="14/04/2024" />
        </div>
        <Field 
          label="Divisão de Treino" 
          value="ABCD" 
          inputClassName="bg-primary/10 text-primary font-bold"
        />
        <Field label="Frequência Semanal" value="4x por semana" />

        <SectionHeader icon={User} title="Observações" />
        <Field label="" value="Aluno focado em hipertrofia e progressão de carga constante." />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
         <div className="flex justify-between items-start mb-10">
            <div className="flex items-center gap-6">
                <div className="relative w-20 h-20">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-background shadow-xl bg-muted">
                    {studentAvatar ? (
                      <Image
                        src={studentAvatar.imageUrl}
                        alt="João Silva"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                    </div>
                    <div className="absolute bottom-0 right-0 bg-primary h-6 w-6 rounded-full flex items-center justify-center border-2 border-background">
                       <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black tracking-tighter italic uppercase">João Silva</h3>
                      <Badge className="bg-emerald-500 text-white border-none rounded-full px-4 h-6 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        ATIVO
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-[0.2em]">Aluno de Consultoria Online</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="rounded-xl gap-2 font-bold text-muted-foreground">
                Histórico de Medidas
              </Button>
              <Button variant="outline" className="rounded-xl gap-2 shadow-sm border-border hover:bg-muted/50 font-bold px-6">
                  <Pencil className="h-4 w-4" />
                  Editar Perfil
              </Button>
            </div>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
                <SectionHeader icon={Target} title="Programa" />
                <Field label="Objetivo Principal" value="Ganho de massa muscular" />
                <Field label="Tipo de Atividade" value="Musculação" />
            </div>
            <div className="space-y-4">
                <div className="h-8 mb-4 mt-6 first:mt-0" />
                <Field label="Tempo Estimado" value="60 min" />
                <Field label="Intensidade Alvo" value="Moderada" />
            </div>
            <div className="space-y-4">
                <SectionHeader icon={CalendarDays} title="Cronograma" />
                <Field label="Data de Início" value="14/01/2024" />
                <Field label="Divisão Atual" value="ABCD" inputClassName="bg-primary/10 text-primary font-bold" />
            </div>
            <div className="space-y-4">
                <SectionHeader icon={User} title="Prescrição" />
                <Field label="Meta Semanal" value="4x/Semana" />
                <Field label="Foco do Mês" value="Hipertrofia" />
            </div>
         </div>
      </div>
    </Card>
  );
}
