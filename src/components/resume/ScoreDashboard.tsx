import React from 'react'
import ScoreRing from './ScoreRing'

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
            {/* Target Roles Badge Display */}
            {targetRoles && targetRoles.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Targeting:</span>
                    {targetRoles.map((role, idx) => (
                        <span 
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100"
                        >
                            {role}
                        </span>
                    ))}
                </div>
            )}

            {/* Score Rings Grid */}
            <div className="grid grid-cols-2 md:flex md:justify-around gap-6 items-end">
                <div className="order-1 md:order-none">
                    <ScoreRing
                        score={overall}
                        label="Overall Score"
                        size="lg"
                    />
                </div>
                <ScoreRing
                    score={atsMatching}
                    label="ATS Matching"
                />
                <ScoreRing
                    score={quantification}
                    label="Quantification"
                />
                <ScoreRing
                    score={completeness}
                    label="Completeness"
                />
            </div>

            {/* Issues & Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                {/* ATS Issues */}
                {atsIssues.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            ATS Critical Issues
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {atsIssues.map((issue: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full border border-red-100"
                                >
                                    {issue}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Missing Sections */}
                {missingSections.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            Missing Sections
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {missingSections.map((section: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full border border-orange-100"
                                >
                                    {section}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {atsIssues.length === 0 && missingSections.length === 0 && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                    <p className="text-green-700 text-sm">
                        ✨ Your resume structure looks great! No critical ATS issues or missing sections found.
                    </p>
                </div>
            )}
        </div>
    )
}

export default ScoreDashboard
