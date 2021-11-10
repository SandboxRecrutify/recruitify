import { Feedback } from './Feedback';

export interface CandidateProjectResults {
  projectId: string;
  feedbacks: Feedback[];
  status: string;
  reason?: string;
}
