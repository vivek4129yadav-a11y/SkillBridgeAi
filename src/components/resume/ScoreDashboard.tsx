import React from 'react'
import ScoreRing from './ScoreRing'
import { TargetRolesBadges } from './dashboard/TargetRolesBadges'
import { ScoreDashboardIssues } from './dashboard/ScoreDashboardIssues'

interface QualityScores {
    overall: number
    ats_compatibility: number
    quantification_score: number
    section_completeness: number
    ats_issues: string[]
    missing_sections: string[]
}

interface ScoreDashboardProps {
    qualityScores: QualityScores
    targetRoles?: string[]
}

const ScoreDashboard: React.FC<ScoreDashboardProps> = ({ qualityScores = {} as any, targetRoles = [] }) => {
    const overall = qualityScores?.overall ?? 0
    const atsMatching = qualityScores?.ats_compatibility ?? 0
    const quantification = qualityScores?.quantification_score ?? 0
    const completeness = qualityScores?.section_completeness ?? 0
    const atsIssues = Array.isArray(qualityScores?.ats_issues) ? qualityScores.ats_issues : []
    const missingSections = Array.isArray(qualityScores?.missing_sections) ? qualityScores.missing_sections : []

    return (
        <div className="space-y-8 animate-fade-in">
            <TargetRolesBadges targetRoles={targetRoles} />

            <div className="grid grid-cols-2 md:flex md:justify-around gap-6 items-end">
                <div className="order-1 md:order-none">
                    <ScoreRing score={overall} label="Overall Score" size="lg" />
                </div>
                <ScoreRing score={atsMatching} label="ATS Matching" />
                <ScoreRing score={quantification} label="Quantification" />
                <ScoreRing score={completeness} label="Completeness" />
            </div>

            <ScoreDashboardIssues 
                atsIssues={atsIssues} 
                missingSections={missingSections} 
            />
        </div>
    )
}

export default ScoreDashboard
