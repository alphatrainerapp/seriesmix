export type Set = {
  type: 'Aquec' | 'Prep' | 'Válidas';
  label: string;
};

export type Exercise = {
  name: string;
  preExhaustion: boolean;
  sets: Set[];
  repsRange: string;
};
