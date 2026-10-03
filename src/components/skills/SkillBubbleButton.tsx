import React from 'react'
import { Bubble } from './types'

interface SkillBubbleButtonProps {
    bubble: Bubble
    isExpanded: boolean
    animationDelayIndex: number
    onClick: () => void
}

export const SkillBubbleButton: React.FC<SkillBubbleButtonProps> = ({
    bubble,
    isExpanded,
    animationDelayIndex,
    onClick
}) => {
    const isSeed = bubble.kind === 'seed'

    return (
        <button
            type="button"
            onClick={onClick}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
            style={{
                animationDelay: `${animationDelayIndex * 40}ms`,
                ...(bubble.selected
                    ? { background: 'rgba(99,102,241,0.25)', borderColor: '#6366f1', color: '#818cf8', border: '1.5px solid', boxShadow: '0 0 12px rgba(99,102,241,0.3)' }
                    : isSeed
                    ? { background: 'hsl(222 47% 18%)', border: '1px solid hsl(222 30% 28%)', color: 'hsl(220 20% 75%)' }
                    : { background: 'hsl(222 47% 14%)', border: '1px dashed hsl(222 30% 24%)', color: 'hsl(220 15% 55%)', fontSize: '0.75rem' }),
                ...(isExpanded && !bubble.selected
                    ? { borderColor: 'hsl(200 80% 60%)', color: 'hsl(200 80% 75%)' }
                    : {}),
            }}
        >
            {isSeed && '◉ '}
            {bubble.label}
        </button>
    )
}
