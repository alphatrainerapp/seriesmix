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
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Dumbbell,
  Link2,
  Zap,
  Check,
  ArrowLeft,
  Clock,
  Timer,
  Repeat,
  Plus,
  Unplug,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import type { Exercise, CombinationType, Set } from '@/lib/types';
import { Badge } from '../ui/badge';

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

const InputRow = ({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3 text-sm">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span>{label}</span>
    </div>
    <Input className="w-20 bg-muted" value={value} onChange={onChange} />
  </div>
);

export function CombineExercisesDialog({
  children,
  exercises,
  onUpdateWorkout,
  combinationTypes,
  onUpdateCombinationTypes,
}: {
  children: React.ReactNode;
  exercises: Exercise[];
  onUpdateWorkout: (updatedExercises: Exercise[]) => void;
  combinationTypes: Record<string, CombinationType>;
  onUpdateCombinationTypes: (types: Record<string, CombinationType>) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<'select' | 'configure'>('select');
  const [selectedType, setSelectedType] =
    React.useState<CombinationType>('biset');
  const [selectedExercises, setSelectedExercises] = React.useState<number[]>(
    []
  );
  const [exerciseTime, setExerciseTime] = React.useState('00:30');
  const [restTime, setRestTime] = React.useState('00:15');
  const [rounds, setRounds] = React.useState('4');


  const handleContinue = () => {
    setStep('configure');
  };

  const handleBack = () => {
    setStep('select');
  };

  const toggleExerciseSelection = (exerciseId: number) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };
  
  const handleUncombine = (groupIdToUncombine: string) => {
    const updatedExercises = exercises.map(ex => {
      if (ex.groupId === groupIdToUncombine) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { groupId, ...rest } = ex;
        return rest;
      }
      return ex;
    });
    onUpdateWorkout(updatedExercises);
    const newCombinationTypes = { ...combinationTypes };
    delete newCombinationTypes[groupIdToUncombine];
    onUpdateCombinationTypes(newCombinationTypes);
  };

  const handleSaveCombination = () => {
    if (selectedExercises.length < 2) {
      // Maybe show a toast or message here
      console.log("Select at least 2 exercises to combine.");
      return;
    }

    const newGroupId = `group-${Date.now()}`;
    
    let updatedExercises;

    if (selectedType === 'hiit') {
        const numRounds = parseInt(rounds, 10);
        const newSets: Set[] = Array.from({ length: numRounds }, (_, i) => ({
            id: Date.now() + i, // simple unique id
            type: 'trabalho',
            unit: 'time',
            reps: exerciseTime,
            interval: restTime,
            rir: '',
        }));

        updatedExercises = exercises.map(ex => {
            if (selectedExercises.includes(ex.id)) {
                return { 
                  ...ex, 
                  groupId: newGroupId,
                  sets: newSets,
                  repsRange: exerciseTime,
                };
            }
            return ex;
        });

    } else {
        updatedExercises = exercises.map(ex => {
            if (selectedExercises.includes(ex.id)) {
                return { ...ex, groupId: newGroupId };
            }
            return ex;
        });
    }

    onUpdateWorkout(updatedExercises);
    onUpdateCombinationTypes({
      ...combinationTypes,
      [newGroupId]: selectedType,
    })
    setOpen(false); // Close dialog on save
  };

  // Reset state when dialog closes
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('select');
        setSelectedExercises([]);
        setExerciseTime('00:30');
        setRestTime('00:15');
        setRounds('4');
      }, 200);
    }
  }, [open]);

  const selectedConfig = combinationOptions.find(
    (opt) => opt.type === selectedType
  );

  const { grouped, singles } = React.useMemo(() => {
    const grouped: { [key: string]: Exercise[] } = {};
    const singles: Exercise[] = [];

    exercises.forEach(exercise => {
      if (exercise.groupId) {
        if (!grouped[exercise.groupId]) {
          grouped[exercise.groupId] = [];
        }
        grouped[exercise.groupId].push(exercise);
      } else {
        singles.push(exercise);
      }
    });

    return { grouped, singles };
  }, [exercises]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card p-0 gap-0">
        {step === 'select' && (
          <>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-xl">
                Escolha o tipo de combinação
              </DialogTitle>
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
                    selectedType === option.type
                      ? 'border-primary bg-primary/5'
                      : 'border-border'
                  )}
                  onClick={() => setSelectedType(option.type)}
                >
                  {selectedType === option.type && (
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                  )}
                  <option.icon
                    className={cn(
                      'mx-auto mb-2 h-6 w-6',
                      selectedType === option.type
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
            <DialogFooter className="mt-6 p-6 bg-muted/50 sm:justify-center rounded-b-lg">
              <Button
                className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white"
                onClick={handleContinue}
              >
                Continuar
              </Button>
            </DialogFooter>
          </>
        )}
        {step === 'configure' && selectedConfig && (
          <>
            <DialogHeader className="p-6 pb-4">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className='h-8 w-8 -ml-2' onClick={handleBack}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className='flex flex-col'>
                  <DialogTitle className="text-xl">
                    Configurar {selectedConfig.title}
                  </DialogTitle>
                  <DialogDescription>
                    Defina abaixo os intervalos e exercícios da sua sessão
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="px-6 space-y-6 max-h-[50vh] overflow-y-auto">
              {selectedType === 'hiit' && (
                <div className='space-y-3'>
                  <InputRow icon={Clock} label="Tempo de exercício" value={exerciseTime} onChange={(e) => setExerciseTime(e.target.value)} />
                  <InputRow icon={Timer} label="Tempo de descanso" value={restTime} onChange={(e) => setRestTime(e.target.value)} />
                  <InputRow icon={Repeat} label="Nº de voltas" value={rounds} onChange={(e) => setRounds(e.target.value)} />
                </div>
              )}
              {Object.keys(grouped).length > 0 && (
                <div>
                   <h4 className="font-medium text-sm mb-2 flex items-center gap-3">
                      <Link2 className="h-5 w-5 text-muted-foreground" />
                      Combinações Atuais
                    </h4>
                    <div className="space-y-2">
                        {Object.entries(grouped).map(([groupId, groupExercises]) => (
                            <div key={groupId} className="rounded-lg border bg-muted/50 p-3">
                                <div className='flex justify-between items-center mb-2'>
                                  <Badge variant="secondary">Combinação {combinationOptions.find(opt => opt.type === combinationTypes[groupId])?.title}</Badge>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => handleUncombine(groupId)}>
                                      <Unplug className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="space-y-1">
                                {groupExercises.map(exercise => (
                                    <div key={exercise.id} className="flex items-center justify-between rounded-md p-2 bg-background text-sm">
                                        <span>{exercise.name}</span>
                                        <Dumbbell className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center gap-3">
                  <Dumbbell className="h-5 w-5 text-muted-foreground" />
                  Exercícios Individuais
                </h4>
                <div className="space-y-2">
                  {singles.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="flex items-center justify-between rounded-md p-2 hover:bg-muted/50 cursor-pointer"
                      onClick={() => toggleExerciseSelection(exercise.id)}
                    >
                      <div className="flex items-center gap-3">
                         <div className={cn(
                            "flex items-center justify-center h-5 w-5 rounded-sm border-2",
                            selectedExercises.includes(exercise.id) ? "bg-primary border-primary" : "border-muted-foreground/50"
                          )}>
                          {selectedExercises.includes(exercise.id) && <Check className="h-4 w-4 text-primary-foreground" />}
                        </div>
                        <span className="text-sm">{exercise.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="text-primary mt-2 p-0 h-auto">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar exercício
                </Button>
              </div>
            </div>
            <DialogFooter className="mt-6 p-6 bg-muted/50 sm:justify-center rounded-b-lg">
              <Button
                className="w-full bg-[#01bfa5] hover:bg-[#01bfa5]/90 text-white"
                onClick={handleSaveCombination}
                disabled={selectedExercises.length < 2}
              >
                Salvar {selectedConfig.title}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
