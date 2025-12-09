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
    <Card className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-card shadow-sm">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Nome</label>
        <Select defaultValue="anadelis">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anadelis">Anadelis de Oliveira</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 lg:col-span-2">
        <label className="text-sm font-medium text-muted-foreground">Observação Cliente</label>
        <Input disabled />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Objetivo</label>
        <Input defaultValue="Hipertrofia" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Exercício</label>
        <Input defaultValue="Musculação" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Tempo</label>
        <Input defaultValue="1h" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Intensidade</label>
        <Select defaultValue="media-alta">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="media-alta">Media a Alta</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Frequência</label>
        <Input defaultValue="5" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Data do início</label>
        <Input defaultValue="22/09/2025" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Validade da ficha</label>
        <Input defaultValue="21/10/2025" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Divisão ficha</label>
        <Select defaultValue="abcd">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="abcd">ABCD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Semana</label>
        <Select defaultValue="intro">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="intro">SEMANA INTRODUTÓRIA</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
