import { CandidateProjectResults } from './CandidateProjectResults';
import { CandidateLocation } from './CandidateLocation';
import { CandidateContact } from './CandidateContact';
import { PrimarySkill } from './PrimarySkill';

export interface Candidate {
  name: string;
  surname: string;
  englishLevel: number;
  phoneNumber: string;
  email: string;
  contacts: CandidateContact[];
  location: CandidateLocation;
  primarySkills: PrimarySkill[];
  registrationDate: Date | string;
  bestTimeToConnect: number[];
  goingToExadel: boolean;
  projectResults: CandidateProjectResults[];
  currentJob: string;
  certificates: string;
  additionalQuestions: string;
  additionalInfo: string;
  id: string;
}
