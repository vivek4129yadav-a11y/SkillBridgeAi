export interface BulletImprovement {
    original: string
    improved: string
    reason: string
}

export interface Suggestions {
    summary_generated: string
    bullet_improvements: BulletImprovement[]
    skills_to_add: string[]
    skills_to_reframe: Record<string, string>
    india_specific_flags: string[]
    transferable_skills_detected: string[]
}

export interface SuggestionCardsProps {
    suggestions: Suggestions
}
