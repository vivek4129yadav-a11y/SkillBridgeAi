export interface Question {
  question: string;
  question_type: 'text' | 'mcq' | 'rating';
  options: string[] | null;
  allows_multiple?: boolean;
  allows_other?: boolean;
  skill_probing: string;
}

export interface AssessmentBatch {
  questions: Question[];
  phase: number;
  phase_name: string;
}

export interface AssessmentSession {
  session_id: string;
  question?: Question; // Deprecated but kept for compatibility during transition
  batch?: AssessmentBatch;
  phase: number;
  phase_name: string;
  question_number: number;
  retakes_used: number;
  retakes_remaining: number;
  max_retakes: number;
  can_resume: boolean;
  is_complete: boolean;
  skills_found?: any[]; 
}

export interface AssessmentStatus {
  has_completed: boolean;
  retakes_used: number;
  retakes_remaining: number;
  max_retakes: number;
  last_completed_at: string | null;
  can_retake: boolean;
  next_retake_available_at: string | null;
  has_incomplete: boolean;
  incomplete_session_id: string | null;
}

export interface AssessmentHistoryItem {
  session_id: string;
  retake_number: number;
  is_complete: boolean;
  completed_at: string | null;
  skills_count: number;
  created_at: string;
}
