import React from 'react'
import { AlertTriangle } from 'lucide-react'

interface IndiaFlagsCardProps {
    flags: string[]
}

export const IndiaFlagsCard: React.FC<IndiaFlagsCardProps> = ({ flags }) => {
    if (!flags || flags.length === 0) return null

    return (
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5" />
                India-First Optimization
            </h3>
            <ul className="space-y-2">
                {flags.map((flag, idx) => (
                    <li key={idx} className="text-xs text-orange-800 flex items-start gap-2">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                        {flag}
                    </li>
                ))}
            </ul>
        </div>
    )
}
