import { Staff } from './Staff';

export interface Project {
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  currentCandidatesCount: number;
  plannedCandidatesCount: number;
  primarySkill: string
  staff: Staff[]
}
