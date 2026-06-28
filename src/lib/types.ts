export type SetType = 'aquecimento' | 'preparatoria' | 'trabalho';

export type Set = {
  id: number;
  type: SetType;
  unit: 'reps' | 'time';
  reps: string;
  interval: string;
  rir: string;
};

export type SystemExercise = {
  name: string;
  category: string;
  imageHint: string;
};

export type WodType = 'AMRAP' | 'EMOM' | 'FOR TIME' | 'TABATA' | 'CHIPPER' | 'INTERVALADO' | 'LIVRE';

export interface WodExercise {
  id: string;
  name: string;
  reps?: string;
  load?: string;
  distance?: string;
  calories?: string;
  time?: string;
}

export interface WodDetails {
  name?: string;
  type: WodType;
  description: string;
  exercises: WodExercise[];
  rounds?: string;
  duration?: string;
  restBetweenRounds?: string;
}

export interface CardioDetails {
  type: 'aerobico' | 'hiit';
  description: string;
}

export type Exercise = {
  id: number;
  name: string;
  preExhaustion: boolean;
  sets: Set[];
  repsRange: string;
  observation?: string;
  groupId?: string;
  category?: string;
  resistanceProfile?: 'ascendente' | 'u-invertido' | 'descendente';
  videoUrl?: string;
  substitutions?: string[];
  isWod?: boolean;
  wodDetails?: WodDetails;
  isCardio?: boolean;
  cardioDetails?: CardioDetails;
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
