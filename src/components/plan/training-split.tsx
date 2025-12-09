'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Plus, X } from 'lucide-react';

const DayBadge = ({ children }: { children: React.ReactNode }) => (
  <Badge
    variant="outline"
    className="bg-tag-soft-blue text-tag-soft-blue-foreground border-transparent gap-1 pr-1.5"
  >
    {children}
    <button>
      <X className="h-3 w-3" />
    </button>
  </Badge>
);

const DayPicker = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-2 flex items-center gap-2">
    <label className="text-sm font-medium text-muted-foreground">Dias</label>
    {children}
    <Button variant="ghost" size="icon" className="h-6 w-6">
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

export function TrainingSplit() {
  return (
    <Card className="p-6 bg-card shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">DIVISÃO DE TREINAMENTO</h2>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Selecionar Modelo
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4 border-dashed">
          <Select>
            <SelectTrigger className="font-semibold">
              <SelectValue placeholder="TREINO A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">TREINO A</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Inferiores</p>
          <DayPicker>
            <DayBadge>Segunda</DayBadge>
          </DayPicker>
        </Card>
        <Card className="p-4 border-dashed">
          <Select>
            <SelectTrigger className="font-semibold">
              <SelectValue placeholder="TREINO B" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b">TREINO B</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Puxar</p>
          <DayPicker>
            <DayBadge>Terça</DayBadge>
            <DayBadge>Sexta</DayBadge>
          </DayPicker>
        </Card>
        <Card className="p-4 border-dashed">
          <Select>
            <SelectTrigger className="font-semibold">
              <SelectValue placeholder="TREINO C" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c">TREINO C</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Empurrar</p>
          <DayPicker>
            <DayBadge>Quarta</DayBadge>
          </DayPicker>
        </Card>
        <Card className="p-4 border-dashed">
          <Select>
            <SelectTrigger className="font-semibold">
              <SelectValue placeholder="TREINO D" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="d">TREINO D</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-1">Inferiores</p>
          <DayPicker>
            <DayBadge>Quinta</DayBadge>
          </DayPicker>
        </Card>
      </div>
    </Card>
  );
}
