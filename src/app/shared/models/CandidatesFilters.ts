import { PrimarySkill } from './Project';
import { EnglishLevel } from './EnglishLevel';
import { CandidateLocation } from './CandidateLocation';
import { Status } from './CandidatesStatus';

export interface CandidatesFiltersValues {
 locations?: CandidateLocation[]
 date?: Date
 englishLevel?: (keyof typeof EnglishLevel)[];
 skill?: PrimarySkill[]
 statuses?: (keyof typeof Status)[];
 test?: number
 recruiter?: number
 entryInterview?: number
 mentor?: number
 finalInterview?: number

}




