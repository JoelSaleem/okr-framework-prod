export interface Objective {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface KeyResult {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  target: number;
  current: number;
  objective: Objective;
}
