'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Flame,
  SlidersHorizontal,
  Dumbbell,
  Timer,
  HelpCircle,
  Plus,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

const setTypes = [
  {
    value: 'aquecimento',
    label: 'Aquecimento',
    icon: Flame,
    color: 'text-yellow-500',
  },
  {
    value: 'preparatoria',
    label: 'Preparatória',
    icon: SlidersHorizontal,
    color: 'text-blue-500',
  },
  { value: 'trabalho', label: 'Trabalho', icon: Dumbbell, color: 'text-green-500' },
];

const mockSets = [
  {
    id: 1,
    type: 'aquecimento',
    reps: '20s',
    interval: '60',
    rir: '',
  },
  {
    id: 2,
    type: 'preparatoria',
    reps: '8-12',
    interval: '60',
    rir: '',
  },
  {
    id: 3,
    type: 'trabalho',
    reps: '8-12',
    interval: '60',
    rir: '',
  },
];

const SetTypeSelectItem = ({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
}) => (
  <SelectItem value={value}>
    <div className="flex items-center gap-2">
      <Icon className={cn('h-4 w-4', color)} />
      <span>{label}</span>
    </div>
  </SelectItem>
);

export function EditSetsDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-card">
        <DialogHeader>
          <DialogTitle className="text-xl">Editar Séries do Exercício</DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-[auto_1fr_1fr_1fr_1fr] items-center gap-x-4 gap-y-2 text-sm text-muted-foreground px-4">
            <div className="font-medium">Série</div>
            <div className="font-medium">Tipo</div>
            <div className="font-medium">Repetições</div>
            <div className="font-medium">Intervalo (s)</div>
            <div className="flex items-center gap-1 font-medium">
              RIR <HelpCircle className="h-4 w-4" />
            </div>

            {mockSets.map((set) => {
              const setType = setTypes.find((t) => t.value === set.type);
              const Icon = setType?.icon;
              return (
                <React.Fragment key={set.id}>
                  <div className="font-semibold text-foreground">{set.id}</div>
                  <div>
                    <Select defaultValue={set.type}>
                      <SelectTrigger className="bg-background">
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className={cn('h-4 w-4', setType?.color)} />}
                            <span>{setType?.label}</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {setTypes.map((type) => (
                          <SetTypeSelectItem key={type.value} {...type} />
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input defaultValue={set.reps} className="bg-background" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-primary" />
                    <Input defaultValue={set.interval} className="bg-background" />
                  </div>
                  <div>
                    <Input placeholder="" className="bg-background" />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <Separator />
        <div className='px-6 py-2'>
            <Button variant="link" className="p-0 h-auto text-primary">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar nova série
            </Button>
        </div>
        <div className="px-6 pb-4">
          <Button
            className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white"
            size="lg"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
