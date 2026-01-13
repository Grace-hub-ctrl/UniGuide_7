
export type Section = 'dashboard' | 'scholarships' | 'colleges' | 'essay' | 'opportunities' | 'profile';

export interface UserProfile {
  name: string;
  email: string;
  grade: string;
  gpa: string;
  major: string;
  location: string;
  interests: string[];
  isProfileComplete: boolean;
}

export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string;
  link: string;
}

export interface CollegeInfo {
  name: string;
  location: string;
  rank: string;
  acceptanceRate: string;
  tuition: string;
  notablePros: string[];
  notableCons: string[];
  url: string;
}

export interface Opportunity {
  title: string;
  organization: string;
  type: 'internship' | 'summer-camp' | 'research';
  location: string;
  description: string;
  link: string;
}

export interface EssayFeedback {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  grammarCheck: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}
