import React from 'react'

interface TargetRolesBadgesProps {
    targetRoles?: string[]
}

export const TargetRolesBadges: React.FC<TargetRolesBadgesProps> = ({ targetRoles = [] }) => {
    if (!targetRoles || targetRoles.length === 0) return null

    return (
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
    )
}
