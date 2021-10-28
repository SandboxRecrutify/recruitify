
export interface Project {
  Name: string;
  StartDate: Date | string;
  EndDate: Date | string;
  CurrentApplicationsCount: number;
  PlannedApplicationsCount: number;
  Description: string
  PrimarySkills: { Id: string, Name: string }[]
  Managers: {UserId: string, UserName: string}[]
  Interviewers: {UserId: string, UserName: string}[]
  Recruiters: {UserId: string, UserName: string}[]
  Mentors: {UserId: string, UserName: string}[]
  IsActive: boolean
}
