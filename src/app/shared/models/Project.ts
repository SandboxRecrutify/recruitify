export interface Project extends StaffRole {
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  currentApplicationsCount: number;
  plannedApplicationsCount: number;
  description: string;
  primarySkills: PrimarySkill[];
  isActive: boolean;
}
export interface Staff {
  userId: string;
  userName: string;
}
export interface PrimarySkill {
  id?: string;
  name: string;
  description: string;
  link: string;
}

export enum ProjectUserRole {
  mentors = 'Mentors',
  interviewers = 'Interviewers',
  recruiters = 'Recruiters',
  managers = 'Managers',
}

export type StaffRole = { [key in keyof typeof ProjectUserRole]: Staff[] };
