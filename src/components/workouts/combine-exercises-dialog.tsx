'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Dumbbell, Link2, Zap, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CombinationType = 'biset' | 'triset' | 'superserie' | 'hiit';

const combinationOptions = [
  {
    type: 'biset' as CombinationType,
    icon: Dumbbell,
    title: 'Biset',
    description: '2 exercícios seguidos para o mesmo grupo muscular',
  },
  {
    type: 'triset' as CombinationType,
    icon: Dumbbell,
    title: 'Triset',
    description: '3 exercícios seguidos para intensificar o treino',
  },
  {
    type: 'superserie' as CombinationType,
    icon: Link2,
    title: 'Supersérie',
    description: 'Combina dois músculos diferentes em sequência',
  },
  {
    type: 'hiit' as CombinationType,
    icon: Zap,
    title: 'HIIT',
    description: 'Alterna alta intensidade e descanso curto',
  },
];

export function CombineExercisesDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CombinationType>('biset');

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card p-0">
        <DialogHeader className='p-6 pb-2'>
          <DialogTitle className="text-xl">Escolha o tipo de combinação</DialogTitle>
          <DialogDescription>
            Selecione abaixo o formato para agrupar seus exercícios
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 px-6">
          {combinationOptions.map((option) => (
            <div
              key={option.type}
              className={cn(
                'relative cursor-pointer rounded-lg border-2 p-4 text-center transition-all hover:border-primary/50',
                selected === option.type
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              )}
              onClick={() => setSelected(option.type)}
            >
              {selected === option.type && (
                <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              <option.icon
                className={cn(
                  'mx-auto mb-2 h-6 w-6',
                  selected === option.type
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              />
              <p className="font-semibold">{option.title}</p>
              <p className="text-xs text-muted-foreground">
                {option.description}
              </p>
            </div>
          ))}
        </div>
        <DialogFooter className='p-6 bg-muted/50 sm:justify-center rounded-b-lg'>
          <Button
            className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white"
            onClick={() => setOpen(false)}
          >
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
