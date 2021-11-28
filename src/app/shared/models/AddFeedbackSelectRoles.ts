import { Role } from './UserRoles';

export interface FeedbackSelectRole {
  feedbackType: number;
  roleName: keyof typeof Role;
}
