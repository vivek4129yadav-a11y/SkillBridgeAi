import React from 'react'
import BulletImprover from './BulletImprover'
import { SuggestionCardsProps } from './suggestions/types'
import { SummaryBanner } from './suggestions/SummaryBanner'
import { BulletImprovementsList } from './suggestions/BulletImprovementsList'
import { IndiaFlagsCard } from './suggestions/IndiaFlagsCard'
import { ReframePhrasingCard } from './suggestions/ReframePhrasingCard'
import { TransferableSkillsCard } from './suggestions/TransferableSkillsCard'

export type { BulletImprovement, Suggestions, SuggestionCardsProps } from './suggestions/types'

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ suggestions = {} as any }) => {
    const summary = suggestions?.summary_generated || 'Professional summary focused on key achievements and domain skills.'
    const bulletImprovements = Array.isArray(suggestions?.bullet_improvements) ? suggestions.bullet_improvements : []
    const indiaFlags = Array.isArray(suggestions?.india_specific_flags) ? suggestions.india_specific_flags : []
    const transferableSkills = Array.isArray(suggestions?.transferable_skills_detected) ? suggestions.transferable_skills_detected : []
    const skillsToReframe = (suggestions?.skills_to_reframe && typeof suggestions.skills_to_reframe === 'object')
        ? (suggestions.skills_to_reframe as Record<string, string>)
        : {}

    return (
        <div className="space-y-6 animate-fade-in">
            <SummaryBanner summary={summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BulletImprovementsList bulletImprovements={bulletImprovements} />

                <div className="space-y-6">
                    <IndiaFlagsCard flags={indiaFlags} />
                    <ReframePhrasingCard skillsToReframe={skillsToReframe} />
                    <TransferableSkillsCard transferableSkills={transferableSkills} />
                    <div className="pt-4">
                        <BulletImprover />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCards
