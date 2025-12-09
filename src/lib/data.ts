import type { Exercise } from './types';

export const mockWorkout: Exercise[] = [
  {
    id: 1,
    name: 'Mobilidade de quadril no banco 2x20s',
    preExhaustion: true,
    sets: [
      { id: 1, type: 'aquecimento', reps: '20s', interval: '30', rir: '' },
      { id: 2, type: 'preparatoria', reps: '20s', interval: '30', rir: '' },
    ],
    repsRange: '20s',
  },
  {
    id: 2,
    name: 'Mobilidade tornozelo no solo 2x15',
    preExhaustion: false,
    sets: [
      { id: 1, type: 'preparatoria', reps: '15', interval: '30', rir: '' },
      { id: 2, type: 'preparatoria', reps: '15', interval: '30', rir: '' },
    ],
    repsRange: '15',
  },
  {
    id: 3,
    name: 'Agachamento no smith',
    preExhaustion: false,
    sets: [
      { id: 1, type: 'aquecimento', reps: '15', interval: '60', rir: '' },
      { id: 2, type: 'trabalho', reps: '8-10', interval: '60', rir: '' },
      { id: 3, type: 'trabalho', reps: '8-10', interval: '60', rir: '' },
    ],
    repsRange: '8-10',
  },
  {
    id: 4,
    name: 'Leg press 45',
    preExhaustion: false,
    sets: [
        { id: 1, type: 'trabalho', reps: '10-12', interval: '60', rir: '' },
        { id: 2, type: 'trabalho', reps: '10-12', interval: '60', rir: '' },
        { id: 3, type: 'trabalho', reps: '10-12', interval: '60', rir: '' },
    ],
    repsRange: '10-12',
  },
  {
    id: 5,
    name: 'Cadeira extensora',
    preExhaustion: false,
    sets: [
        { id: 1, type: 'trabalho', reps: '12-15', interval: '60', rir: '' },
        { id: 2, type: 'trabalho', reps: '12-15', interval: '60', rir: '' },
        { id: 3, type: 'trabalho', reps: '12-15', interval: '60', rir: '' },
    ],
    repsRange: '12-15',
  },
  {
    id: 6,
    name: 'Mesa flexora',
    preExhaustion: false,
    sets: [
        { id: 1, type: 'trabalho', reps: '10-12', interval: '60', rir: '' },
        { id: 2, type: 'trabalho', reps: '10-12', interval: '60', rir: '' },
        { id: 3, type: 'trabalho', reps: '10-12', interval: '60', rir: '' },
    ],
    repsRange: '10-12',
  },
  {
    id: 7,
    name: 'Elevação pélvica',
    preExhaustion: false,
    sets: [
        { id: 1, type: 'trabalho', reps: '12-15', interval: '60', rir: '' },
        { id: 2, type: 'trabalho', reps: '12-15', interval: '60', rir: '' },
        { id: 3, type: 'trabalho', reps: '12-15', interval: '60', rir: '' },
    ],
    repsRange: '12-15',
  },
];
