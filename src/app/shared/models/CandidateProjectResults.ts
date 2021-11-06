import { Feedback } from './Feedback';

export interface CandidateProjectResults {
  feedbacks: Feedback[];
  projectId: string;
  status: number;
}
