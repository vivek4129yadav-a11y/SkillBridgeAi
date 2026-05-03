// TypeScript types for all API/UI interfaces

// --- Auth ---
export interface AuthTokens {
    access_token: string
    refresh_token: string
    token_type: string
}

// --- User ---
export interface User {
    id: string
    email: string
    user_type: string | null
    preferred_lang: string
    is_active: boolean
    onboarding_done: boolean
    created_at: string
}

export interface UserProfile {
    id: string
    user_id: string
    full_name: string | null
    age: number | null
    gender: string | null
    state: string | null
    city: string | null
    education_level: string | null
    languages: string[] | null
    phone: string | null
    avatar_url: string | null
}

export interface UserPreferences {
    career_interests: string[]
    expected_salary_min: number | null
    expected_salary_max: number | null
    work_type: string
    willing_to_relocate: boolean
    target_roles: string[]
}

// --- Onboarding ---
export interface Question {
    id: string
    question: string
    type: 'text' | 'mcq' | 'rating'
    options: string[]
}

export interface Answer {
    question_id: string
    question_text: string
    answer: string
}

export interface OnboardingStateData {
    current_step: number
    completed_steps: number[]
    step_data: Record<string, unknown>
}

// --- Jobs ---
export interface Job {
    id: string
    title: string
    company: string
    description: string | null
    location_state: string
    location_city: string | null
    job_type: string | null
    work_mode: string | null
    category: string
    required_skills: string[] | null
    salary_min: number | null
    salary_max: number | null
    experience_min: number | null
    is_active: boolean
}

// --- Dashboard ---
export interface DashboardData {
    user: { name: string; user_type: string | null; preferred_lang: string }
    profile_completion_pct: number
    onboarding_done: boolean
    quick_assessment_done: boolean
    gap_analysis_done: boolean
    extracted_skills: string[]
    career_interests: string[]
    location: { state: string | null; city: string | null }
    job_matches: Partial<Job>[]
    recommended_courses?: any[]
    role_specific?: {
        variant: string
        career_pathways?: any[]
        competitive_exams?: any[]
        internships?: any[]
        trade_pulse?: any
        apprenticeships?: any[]
        trade_tips?: string
        micro_biz_ideas?: string[]
        govt_schemes?: any[]
        digital_tips?: string[]
    }
    ai_highlight?: string
}

// --- API wrapper ---
export interface APIResponse<T = unknown> {
    success: boolean
    data?: T
    message?: string
    error_code?: string
    details?: Record<string, unknown>
}

// --- Chat ---
export interface ChatMessage {
    id: string
    role: 'user' | 'assistant'
    content: string
    language: string
    created_at: string
}
