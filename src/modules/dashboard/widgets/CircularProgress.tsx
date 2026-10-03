import React from 'react'

interface CircularProgressProps {
    pct: number
    color: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ pct, color }) => {
    const r = 18
    const circumference = 2 * Math.PI * r
    const offset = circumference * (1 - Math.min(pct, 100) / 100)
    return (
        <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90">
            <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle 
                cx="22" 
                cy="22" 
                r={r} 
                fill="none" 
                stroke={color} 
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-700"
            />
        </svg>
    )
}
