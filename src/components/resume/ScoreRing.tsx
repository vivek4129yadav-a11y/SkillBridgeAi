import React, { useEffect, useState } from 'react'

interface ScoreRingProps {
    score: number
    label: string
    size?: 'sm' | 'md' | 'lg'
}

const ScoreRing: React.FC<ScoreRingProps> = ({ score, label, size = 'md' }) => {
    const [offset, setOffset] = useState(0)

    const sizes = {
        sm: { ring: 60, stroke: 6, font: 'text-sm' },
        md: { ring: 100, stroke: 8, font: 'text-xl' },
        lg: { ring: 140, stroke: 10, font: 'text-3xl' }
    }

    const { ring, stroke, font } = sizes[size]
    const radius = (ring - stroke) / 2
    const circumference = radius * 2 * Math.PI

    useEffect(() => {
        const progressOffset = ((100 - score) / 100) * circumference
        const timer = setTimeout(() => setOffset(progressOffset), 100)
        return () => clearTimeout(timer)
    }, [score, circumference])

    const getColor = (s: number) => {
        if (s <= 40) return '#ef4444' // red-500
        if (s <= 70) return '#eab308' // yellow-500
        return '#22c55e' // green-500
    }

    const color = getColor(score)

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: ring, height: ring }}>
                <svg className="transform -rotate-90" width={ring} height={ring}>
                    {/* Background Circle */}
                    <circle
                        cx={ring / 2}
                        cy={ring / 2}
                        r={radius}
                        stroke="#e2e8f0"
                        strokeWidth={stroke}
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={ring / 2}
                        cy={ring / 2}
                        r={radius}
                        stroke={color}
                        strokeWidth={stroke}
                        fill="transparent"
                        strokeDasharray={circumference}
                        style={{
                            strokeDashoffset: offset,
                            transition: 'stroke-dashoffset 1s ease-out'
                        }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`${font} font-bold`} style={{ color }}>{score}</span>
                </div>
            </div>
            <span className="mt-2 text-sm font-medium text-slate-600">{label}</span>
        </div>
    )
}

export default ScoreRing
