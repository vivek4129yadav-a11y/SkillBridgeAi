import React from 'react'

interface ScoreDashboardIssuesProps {
    atsIssues: string[]
    missingSections: string[]
}

export const ScoreDashboardIssues: React.FC<ScoreDashboardIssuesProps> = ({ 
    atsIssues = [], 
    missingSections = [] 
}) => {
    const hasAtsIssues = atsIssues.length > 0
    const hasMissingSections = missingSections.length > 0

    if (!hasAtsIssues && !hasMissingSections) {
        return (
            <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-center">
                <p className="text-green-700 text-sm">
                    ✨ Your resume structure looks great! No critical ATS issues or missing sections found.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            {hasAtsIssues && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        ATS Critical Issues
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {atsIssues.map((issue, idx) => (
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

            {hasMissingSections && (
                <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500" />
                        Missing Sections
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {missingSections.map((section, idx) => (
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
    )
}
