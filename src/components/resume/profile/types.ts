export interface Skill {
    name: string
    level: 'advanced' | 'intermediate' | 'beginner'
}

export interface CareerTrajectory {
    direction: 'ascending' | 'lateral' | 'descending' | 'unclear'
    summary: string
    total_experience_months?: number
    average_tenure_months?: number
}

export interface Experience {
    role: string
    company: string
    duration: string
    achievements: string[]
    responsibilities: string[]
    duration_months: number
}

export interface Education {
    degree: string
    institution: string
    year: string
    is_vocational?: boolean
}

export interface StructuredProfile {
    skills: Skill[]
    experiences: Experience[]
    education: Education[]
    soft_skills_inferred: string[]
    career_trajectory: CareerTrajectory
}

export interface ExtractedProfileProps {
    structuredProfile: StructuredProfile
}
