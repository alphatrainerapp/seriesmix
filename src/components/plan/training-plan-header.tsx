
'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Target, CalendarDays, User, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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
      
      {/* Avatar Circular Perfeito */}
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
      </div>
      
      <h3 className="text-xl font-bold tracking-tight">João Silva</h3>
      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Aluno</p>
    </div>
  );
};

export function TrainingPlanHeader() {
  const studentAvatar = PlaceHolderImages.find((img) => img.id === 'student-avatar');

  return (
    <Card className="p-6 bg-card shadow-sm rounded-2xl border-none">
      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {/* Perfil do Aluno */}
        <StudentProfile />

        {/* Programa */}
        <SectionHeader icon={Target} title="Programa" />
        <Field label="Objetivo" value="Ganho de massa muscular" />
        <Field label="Tipo de Exercício" value="Musculação" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Duração" value="60 minutos" />
          <Field label="Intensidade" value="Moderada" />
        </div>

        {/* Cronograma */}
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

        {/* Observações */}
        <SectionHeader icon={User} title="Observações" />
        <Field label="" value="Aluno focado em hipertrofia e progressão de carga constante." />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
         <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-background shadow-md bg-muted">
                    {studentAvatar ? (
                      <Image
                        src={studentAvatar.imageUrl}
                        alt="João Silva"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-muted-foreground" />
                    )}
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold tracking-tight">João Silva</h3>
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Aluno</p>
                </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl gap-2 shadow-sm">
                <Pencil className="h-4 w-4" />
                Editar Perfil
            </Button>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-4">
                <SectionHeader icon={Target} title="Programa" />
                <Field label="Objetivo" value="Ganho de massa muscular" />
                <Field label="Tipo" value="Musculação" />
            </div>
            <div className="space-y-4">
                <div className="h-8 mb-4 mt-6 first:mt-0" />
                <Field label="Duração" value="60 min" />
                <Field label="Intensidade" value="Moderada" />
            </div>
            <div className="space-y-4">
                <SectionHeader icon={CalendarDays} title="Cronograma" />
                <Field label="Início" value="14/01/2024" />
                <Field label="Divisão" value="ABCD" inputClassName="bg-primary/10 text-primary font-bold" />
            </div>
            <div className="space-y-4">
                <SectionHeader icon={User} title="Notas" />
                <Field label="Frequência" value="4x/Semana" />
                <Field label="Observação" value="Foco em Hipertrofia" />
            </div>
         </div>
      </div>
    </Card>
  );
}
