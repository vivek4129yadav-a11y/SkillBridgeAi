import React from 'react'

interface ReframePhrasingCardProps {
    skillsToReframe: Record<string, string>
}

export const ReframePhrasingCard: React.FC<ReframePhrasingCardProps> = ({ skillsToReframe = {} }) => {
    const entries = Object.entries(skillsToReframe)
    if (entries.length === 0) return null

    return (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Stronger Phrasing</h3>
            <div className="overflow-hidden border border-slate-100 rounded-lg">
                <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider">
                        <tr>
                            <th className="px-4 py-3 text-left">Your Term</th>
                            <th className="px-4 py-3 text-left">The Pro Version</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {entries.map(([weak, strong], idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 text-slate-500 italic">{weak}</td>
                                <td className="px-4 py-3 font-semibold text-blue-600">{strong}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
