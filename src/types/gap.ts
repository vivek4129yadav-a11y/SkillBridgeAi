export interface GapItem {
  skill_name: string;
  category: string;
  priority_score: number;
  frequency_pct: number;
  learnability_weeks: number;
  recommended_resources: string[];
}

export interface StrengthItem {
  skill_name: string;
  proficiency_label: string;
  job_demand_pct: number;
  message: string;
}

export interface PartialMatch {
  skill_name: string;
  current_level: number;
  current_label: string;
  required_level: number;
  gap_size: number;
}

export interface RoadmapWeek {
  week: number;
  focus_skill: string;
  goal: string;
  action: string;
  resource_id: string | null;
  resource_name: string | null;
  resource_url: string | null;
  milestone: string;
}

export interface GapReport {
  strengths: StrengthItem[];
  gaps: GapItem[];
  partial_matches: PartialMatch[];
  roadmap: RoadmapWeek[];
  total_jobs_analyzed: number;
  computed_at: string;
  is_stale: boolean;
  from_cache: boolean;
  motivational_note?: string;
}
