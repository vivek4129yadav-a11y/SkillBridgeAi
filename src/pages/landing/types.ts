export interface CareerSimulatorProfile {
  id: string;
  roleTitle: string;
  category: string;
  location: string;
  currentSalary: string;
  targetSalary: string;
  salaryJumpPercent: number;
  timeToLearn: string;
  openJobsCount: number;
  keySkillsNeeded: string[];
  topFreeCourse: string;
  iconName: string;
}

export interface EngineTab {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
}

export interface PersonaStory {
  id: number;
  name: string;
  age: number;
  city: string;
  role: string;
  beforeStatus: string;
  beforeSalary: string;
  afterStatus: string;
  afterSalary: string;
  timeframe: string;
  story: string;
  roadmapSummary: string[];
  tag: string;
}

export interface TrustFact {
  metric: string;
  label: string;
  source: string;
  detail: string;
}
