'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Target, CalendarDays, User } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <label className="text-sm font-medium text-muted-foreground ml-1">
      {label}
    </label>
    <Input
      defaultValue={value}
      className={cn(
        "h-11 bg-muted/30 border-none rounded-xl font-medium focus-visible:ring-primary/30",
        inputClassName
      )}
    />
  </div>
);

export function TrainingPlanHeader() {
  return (
    <Card className="p-6 bg-card shadow-sm rounded-2xl border-none">
      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
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
          inputClassName="bg-[#e0f7f4] text-[#00897b] font-bold"
        />
        <Field label="Frequência Semanal" value="4x por semana" />

        {/* Observações */}
        <SectionHeader icon={User} title="Observações" />
        <Field label="" value="Aluno focado em hipertrofia" />
      </div>

      {/* Desktop View (Grid compactado para manter legibilidade) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <SectionHeader icon={Target} title="Programa" />
          <Field label="Objetivo" value="Ganho de massa muscular" />
          <Field label="Tipo" value="Musculação" />
        </div>
        <div className="space-y-4">
          <div className="h-8 mb-4 mt-6 first:mt-0" /> {/* Spacer */}
          <Field label="Duração" value="60 min" />
          <Field label="Intensidade" value="Moderada" />
        </div>
        <div className="space-y-4">
          <SectionHeader icon={CalendarDays} title="Cronograma" />
          <Field label="Início" value="14/01/2024" />
          <Field label="Divisão" value="ABCD" inputClassName="bg-[#e0f7f4] text-[#00897b]" />
        </div>
        <div className="space-y-4">
          <SectionHeader icon={User} title="Notas" />
          <Field label="Frequência" value="4x/Semana" />
          <Field label="Observação" value="Hipertrofia" />
        </div>
      </div>
    </Card>
  );
}
