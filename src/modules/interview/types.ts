export interface Question {
  id: number;
  question: string;
  type: string;
}

export interface AnswerFeedback {
  score: number;
  feedback: string;
  keywords_matched: string[];
  improvement: string;
}

export interface SessionState {
  session_id: string;
  total_questions: number;
  current_question: Question;
  question_index: number;
}

export interface Report {
  overall_score: number;
  grade: string;
  strengths: string[];
  areas_to_improve: string[];
  recommendation: string;
  summary: string;
}
