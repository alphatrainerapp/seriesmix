import type { Exercise } from './types';

export const mockWorkout: Exercise[] = [
  {
    name: 'Mobilidade de quadril no banco 2x20s',
    preExhaustion: true,
    sets: [
      { type: 'Aquec', label: 'Aque' },
      { type: 'Prep', label: 'Prep' },
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '20s',
  },
  {
    name: 'Mobilidade tornozelo no solo 2x15',
    preExhaustion: false,
    sets: [
      { type: 'Prep', label: 'Prep' },
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '15',
  },
  {
    name: 'Agachamento no smith',
    preExhaustion: false,
    sets: [
      { type: 'Aquec', label: 'Aque' },
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '8-10',
  },
  {
    name: 'Leg press 45',
    preExhaustion: false,
    sets: [
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '10-12',
  },
  {
    name: 'Cadeira extensora',
    preExhaustion: false,
    sets: [
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '12-15',
  },
  {
    name: 'Mesa flexora',
    preExhaustion: false,
    sets: [
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '10-12',
  },
  {
    name: 'Elevação pélvica',
    preExhaustion: false,
    sets: [
      { type: 'Válidas', label: 'Váli' },
    ],
    repsRange: '12-15',
  },
];
