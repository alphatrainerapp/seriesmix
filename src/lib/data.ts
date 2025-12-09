import type { Exercise } from './types';

export const mockWorkout: Exercise[] = [
  {
    name: 'Supino reto no smith',
    preExhaustion: true,
    sets: [
      { type: 'Aquec', label: 'Aque' },
      { type: 'Prep', label: 'Prep' },
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '8-12',
  },
  {
    name: 'Desenvolvimento com halteres',
    preExhaustion: false,
    sets: [
      { type: 'Prep', label: 'Prep' },
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '10-15',
  },
  {
    name: 'Puxada frontal',
    preExhaustion: false,
    sets: [
      { type: 'Aquec', label: 'Aque' },
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '8-10',
  },
];
