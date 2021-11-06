export interface Candidate {
  name: string;
  surname: string;
  englishLevel: number;
  phoneNumber: string;
  email: string;
  contacts: CandidateContacts;
  location: CandidatesLocation;
  primarySkills: PrimarySkills[];
  registrationDate: Date | string;
  bestTimeToConnect: number[];
  goingToExadel: boolean;
  projectResults: CandidatesProjectResults[];
  currentJob: string;
  certificates: string;
  additionalQuestions: string;
  additionalInfo: string;
  id: string;
}

export interface PrimarySkills {
  primarySkillId: string;
  primarySkillName: string;
}

export interface CandidateContacts {
  type: string;
  value: string;
}

export interface CandidatesLocation {
  city: string;
  country: string;
}

export interface CandidatesProjectResults {
  feedbacks: CandidatesFeedback[];
  projectId: string;
  status: number;
}

export interface CandidatesFeedback {
  textFeedback: string;
  rating: number;
  userId: string;
  type: number;
  isRecommended: boolean;
  createdOn: Date | string;
}
