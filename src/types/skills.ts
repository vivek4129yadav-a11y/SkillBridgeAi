export interface SkillItem {
  skill_name: string;
  category: string;
  proficiency_numeric: number;   // 1-5
  proficiency_label: string;
  source: 'resume' | 'assessment' | 'both';
  confidence_score: number;
  last_updated: string;
}

export interface SkillSummary {
  total_skills: number;
  by_category: Record<string, SkillItem[]>;
  top_5: SkillItem[];
  source_breakdown: {
    resume_only: number;
    assessment_only: number;
    both: number;
  };
}

export interface UserSkillProfile {
  user_id: string;
  skills: SkillItem[];
  profile_version: number;
  resume_contributed: boolean;
  assessment_contributed: boolean;
  last_updated: string;
}
