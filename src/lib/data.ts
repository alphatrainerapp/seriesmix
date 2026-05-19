import type { Exercise, SavedSession, SystemExercise } from './types';

export const systemExercises: SystemExercise[] = [
  { name: 'Agachamento Livre', category: 'Quadríceps', imageHint: 'squat' },
  { name: 'Agachamento no Smith', category: 'Quadríceps', imageHint: 'smith machine squat' },
  { name: 'Leg Press 45', category: 'Quadríceps', imageHint: 'leg press' },
  { name: 'Cadeira Extensora', category: 'Quadríceps', imageHint: 'leg extension' },
  { name: 'Mesa Flexora', category: 'Posterior de Coxa (Isquiotibiais)', imageHint: 'lying leg curl' },
  { name: 'Cadeira Flexora', category: 'Posterior de Coxa (Isquiotibiais)', imageHint: 'seated leg curl' },
  { name: 'Stiff', category: 'Posterior de Coxa (Isquiotibiais)', imageHint: 'stiff deadlift' },
  { name: 'Elevação Pélvica', category: 'Glúteo', imageHint: 'hip thrust' },
  { name: 'Afundo', category: 'Quadríceps/Glúteo', imageHint: 'lunge' },
  { name: 'Supino Reto', category: 'Peitoral', imageHint: 'bench press' },
  { name: 'Supino Inclinado', category: 'Peitoral', imageHint: 'inclined bench press' },
  { name: 'Crucifixo Reto', category: 'Peitoral', imageHint: 'chest fly' },
  { name: 'Desenvolvimento com Halteres', category: 'Deltoides', imageHint: 'shoulder press' },
  { name: 'Elevação Lateral', category: 'Deltoides', imageHint: 'lateral raise' },
  { name: 'Remada Curvada', category: 'Costas', imageHint: 'bent over row' },
  { name: 'Puxada na Frente', category: 'Costas', imageHint: 'lat pulldown' },
  { name: 'Remada Baixa', category: 'Costas', imageHint: 'seated row' },
  { name: 'Rosca Direta', category: 'Bíceps', imageHint: 'bicep curl' },
  { name: 'Rosca Alternada', category: 'Bíceps', imageHint: 'alternating bicep curl' },
  { name: 'Tríceps Pulley', category: 'Tríceps', imageHint: 'tricep pushdown' },
  { name: 'Abdominal Supra', category: 'Abômen', imageHint: 'crunch' },
  { name: 'Flexora em Pé', category: 'Posterior de Coxa (Isquiotibiais)', imageHint: 'standing leg curl' },
  { name: 'Mesa Flexora Unilateral', category: 'Posterior de Coxa (Isquiotibiais)', imageHint: 'unilateral leg curl' },
  { name: 'Cadeira Flexora Unilateral', category: 'Posterior de Coxa (Isquiotibiais)', imageHint: 'seated unilateral leg curl' },
];

export const mockWorkout: Exercise[] = [
  {
    id: 1,
    name: 'Mobilidade de quadril no banco 2x20s',
    preExhaustion: true,
    sets: [
      { id: 1, type: 'aquecimento', unit: 'time', reps: '20s', interval: '30', rir: '' },
      { id: 2, type: 'preparatoria', unit: 'time', reps: '20s', interval: '30', rir: '' },
    ],
    repsRange: '20s',
    observation: 'Focar na amplitude do movimento conforme o vídeo.',
    groupId: 'warmup',
    videoUrl: 'https://www.youtube.com/embed/qi9tu_oWOJc',
  },
  {
    id: 2,
    name: 'Mobilidade tornozelo no solo 2x15',
    preExhaustion: false,
    sets: [
      { id: 1, type: 'preparatoria', unit: 'reps', reps: '15', interval: '30', rir: '' },
      { id: 2, type: 'preparatoria', unit: 'reps', reps: '15', interval: '30', rir: '' },
    ],
    repsRange: '15',
    groupId: 'warmup',
    videoUrl: 'https://www.youtube.com/embed/qi9tu_oWOJc',
  },
  {
    id: 3,
    name: 'Agachamento no smith',
    preExhaustion: false,
    sets: [
      { id: 1, type: 'aquecimento', unit: 'reps', reps: '15', interval: '60', rir: '' },
      { id: 2, type: 'trabalho', unit: 'reps', reps: '8-10', interval: '60', rir: '' },
      { id: 3, type: 'trabalho', unit: 'reps', reps: '8-10', interval: '60', rir: '' },
    ],
    repsRange: '8-10',
    observation: 'Manter a coluna reta durante todo o movimento.',
    resistanceProfile: 'ascendente',
  },
  {
    id: 4,
    name: 'Leg press 45',
    preExhaustion: false,
    sets: [
        { id: 1, type: 'trabalho', unit: 'reps', reps: '10-12', interval: '60', rir: '' },
        { id: 2, type: 'trabalho', unit: 'reps', reps: '10-12', interval: '60', rir: '' },
        { id: 3, type: 'trabalho', unit: 'reps', reps: '10-12', interval: '60', rir: '' },
    ],
    repsRange: '10-12',
    resistanceProfile: 'ascendente',
  },
  {
    id: 5,
    name: 'Cadeira extensora',
    preExhaustion: false,
    sets: [
        { id: 1, type: 'trabalho', unit: 'reps', reps: '12-15', interval: '60', rir: '' },
        { id: 2, type: 'trabalho', unit: 'reps', reps: '12-15', interval: '60', rir: '' },
        { id: 3, type: 'trabalho', unit: 'reps', reps: '12-15', interval: '60', rir: '' },
    ],
    repsRange: '12-15',
    resistanceProfile: 'u-invertido',
  },
];

const createSets = (count: number, reps: string) => Array.from({ length: count }, (_, i) => ({
  id: i + 1,
  type: 'trabalho' as const,
  unit: 'reps' as const,
  reps,
  interval: '60',
  rir: ''
}));

export const exampleSessions: SavedSession[] = [
  {
    id: 'ex-1',
    name: 'Costas e Bíceps - Foco Remada',
    folder: 'Costa e Triceps', 
    date: 'Exemplo',
    combinationTypes: {},
    workoutData: [
      { id: 101, name: 'Puxada na Frente', preExhaustion: false, sets: createSets(3, '10-12'), repsRange: '10-12', resistanceProfile: 'ascendente' },
      { id: 102, name: 'Remada Curvada', preExhaustion: false, sets: createSets(3, '8-10'), repsRange: '8-10', resistanceProfile: 'descendente' },
      { id: 103, name: 'Remada Baixa', preExhaustion: false, sets: createSets(3, '12-15'), repsRange: '12-15', resistanceProfile: 'ascendente' },
      { id: 104, name: 'Rosca Direta', preExhaustion: false, sets: createSets(3, '10-12'), repsRange: '10-12', resistanceProfile: 'u-invertido' },
      { id: 105, name: 'Rosca Alternada', preExhaustion: false, sets: createSets(3, '12'), repsRange: '12', resistanceProfile: 'u-invertido' },
    ]
  },
  {
    id: 'ex-2',
    name: 'Peito e Tríceps - Força',
    folder: 'Peito e Biceps',
    date: 'Exemplo',
    combinationTypes: {},
    workoutData: [
      { id: 201, name: 'Supino Reto', preExhaustion: false, sets: createSets(3, '8-10'), repsRange: '8-10', resistanceProfile: 'ascendente' },
      { id: 202, name: 'Supino Inclinado', preExhaustion: false, sets: createSets(3, '10-12'), repsRange: '10-12', resistanceProfile: 'ascendente' },
      { id: 203, name: 'Crucifixo Reto', preExhaustion: false, sets: createSets(3, '12-15'), repsRange: '12-15', resistanceProfile: 'u-invertido' },
      { id: 204, name: 'Tríceps Pulley', preExhaustion: false, sets: createSets(3, '12-15'), repsRange: '12-15', resistanceProfile: 'descendente' },
      { id: 205, name: 'Tríceps Testa', preExhaustion: false, sets: createSets(3, '10-12'), repsRange: '10-12', resistanceProfile: 'ascendente' },
    ]
  },
  {
    id: 'ex-3',
    name: 'Bíceps e Tríceps - Pump Absurdo',
    folder: 'Geral',
    date: 'Exemplo',
    combinationTypes: {},
    workoutData: [
      { id: 301, name: 'Rosca Direta', preExhaustion: false, sets: createSets(3, '10-12'), repsRange: '10-12', resistanceProfile: 'u-invertido' },
      { id: 302, name: 'Rosca Alternada', preExhaustion: false, sets: createSets(3, '12'), repsRange: '12', resistanceProfile: 'u-invertido' },
      { id: 303, name: 'Tríceps Pulley', preExhaustion: false, sets: createSets(3, '12-15'), repsRange: '12-15', resistanceProfile: 'descendente' },
      { id: 304, name: 'Tríceps Testa', preExhaustion: false, sets: createSets(3, '10-12'), repsRange: '10-12', resistanceProfile: 'ascendente' },
      { id: 305, name: 'Rosca Concentrada', preExhaustion: false, sets: createSets(3, '12'), repsRange: '12', resistanceProfile: 'u-invertido' },
    ]
  }
];