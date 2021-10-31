import { PrimarySkill, StaffRole } from './Project';

export interface CreateProject extends StaffRole {
  primarySkills: PrimarySkill[];
}
