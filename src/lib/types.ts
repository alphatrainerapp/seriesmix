export type SetType = 'aquecimento' | 'preparatoria' | 'trabalho';

export type Set = {
  id: number;
  type: SetType;
  unit: 'reps' | 'time';
  reps: string;
  interval: string;
  rir: string;
};

export type Exercise = {
  id: number;
  name: string;
  preExhaustion: boolean;
  sets: Set[];
  repsRange: string;
};
