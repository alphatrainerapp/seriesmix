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
  observation?: string;
  groupId?: string;
};

export type CombinationType = 'biset' | 'triset' | 'superserie' | 'hiit';

export type SavedSession = {
  id: string;
  name: string;
  folder?: string;
  date: string;
  workoutData: Exercise[];
  combinationTypes: Record<string, CombinationType>;
};
