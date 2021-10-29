import { PrimarySkill, Staff } from './Project';

export interface CreateProject {
  staff: {
    managers: Staff[];
    recruiters: Staff[];
  };
  primarySkills: PrimarySkill[];
}
