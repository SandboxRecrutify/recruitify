export interface UserRoles {
  roles: Role[]
  projectId: string
}

export enum Role {
    Admin,
    Manager,
    Recruiter,
    Interviewer,
    Mentor,
}
