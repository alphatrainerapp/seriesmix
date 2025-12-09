import type { Exercise } from './types';

export const mockWorkout: Exercise[] = [
  {
    name: 'Supino reto no smith',
    preExhaustion: true,
    sets: [
      { type: 'Aquec', label: 'Aquec.' },
      { type: 'Prep', label: 'Prep. (1)' },
      { type: 'Válidas', label: 'Válidas (2)' },
    ],
    repsRange: '8-12',
  },
  {
    name: 'Desenvolvimento com halteres',
    preExhaustion: false,
    sets: [
      { type: 'Prep', label: 'Prep. (1)' },
      { type: 'Válidas', label: 'Válidas (3)' },
    ],
    repsRange: '10-15',
  },
  {
    name: 'Puxada frontal',
    preExhaustion: false,
    sets: [
      { type: 'Aquec', label: 'Aquec.' },
      { type: 'Válidas', label: 'Válidas (4)' },
    ],
    repsRange: '8-10',
  },
];
