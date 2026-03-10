interface Props {
    current: number
    total: number
}

export default function ProgressBar({ current, total }: Props) {
    const pct = ((current - 1) / total) * 100

    return (
        <div>
            <div className="flex justify-between text-xs mb-2" style={{ color: 'hsl(220 15% 55%)' }}>
                <span>Step {current} of {total}</span>
                <span>{Math.round(pct)}% complete</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'hsl(222 30% 20%)' }}>
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                />
            </div>
        </div>
    )
}
