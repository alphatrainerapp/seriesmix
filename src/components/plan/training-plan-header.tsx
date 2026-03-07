'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TrainingPlanHeader() {
  return (
    <Card className="p-4 md:p-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-card shadow-sm rounded-xl">
      <div className="space-y-1.5 col-span-2 md:col-span-1">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Cliente</label>
        <Select defaultValue="anadelis">
          <SelectTrigger className="h-10 md:h-11 font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anadelis">Anadelis de Oliveira</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5 col-span-2 lg:col-span-2">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Observação</label>
        <Input disabled className="h-10 md:h-11 bg-muted/30" placeholder="Sem observações" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Objetivo</label>
        <Input defaultValue="Hipertrofia" className="h-10 md:h-11 font-semibold" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Intensidade</label>
        <Select defaultValue="media-alta">
          <SelectTrigger className="h-10 md:h-11 font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="media-alta">Média a Alta</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Data Início</label>
        <Input defaultValue="22/09/2025" className="h-10 md:h-11 font-semibold" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Validade</label>
        <Input defaultValue="21/10/2025" className="h-10 md:h-11 font-semibold" />
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Divisão</label>
        <Select defaultValue="abcd">
          <SelectTrigger className="h-10 md:h-11 font-semibold">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="abcd">ABCD</SelectItem>
            <SelectItem value="abc">ABC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-wider">Frequência</label>
        <Input defaultValue="5x Semana" className="h-10 md:h-11 font-semibold" />
      </div>
    </Card>
  );
}
