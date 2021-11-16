import { Feedback } from './Feedback';

export interface CandidateProjectResults {
  projectId: string;
  feedbacks: Feedback[];
  status: number;
  reason?: string;
}
