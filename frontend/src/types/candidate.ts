export interface Candidate {
  id: number;
  candidate_name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: string[];
  education: any;
  ats_score: number;
  match_score: number;
  filename: string;
}