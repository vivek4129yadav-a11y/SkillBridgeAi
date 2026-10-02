import { useState, useCallback } from 'react'
import api from '@/lib/api'
import { DOMAIN_SEEDS } from './domainSeeds'
import { Bubble, SkillBubbleGridProps } from './types'
import { SkillBubbleButton } from './SkillBubbleButton'

export default function SkillBubbleGrid({ domain, onSelectionChange }: SkillBubbleGridProps) {
    const seeds = DOMAIN_SEEDS[domain] ?? DOMAIN_SEEDS.general
    const [bubbles, setBubbles] = useState<Bubble[]>(
        seeds.map(s => ({ id: s, label: s, kind: 'seed', selected: false }))
    )
    const [loading, setLoading] = useState(false)
    const [expandedSeed, setExpandedSeed] = useState<string | null>(null)

    const notify = useCallback((newBubbles: Bubble[]) => {
        onSelectionChange(newBubbles.filter(b => b.selected).map(b => b.label))
    }, [onSelectionChange])

    async function handleBubbleClick(bubble: Bubble) {
        if (bubble.kind === 'seed' && expandedSeed !== bubble.id) {
            setExpandedSeed(bubble.id)
            setLoading(true)
            try {
                const { data } = await api.post('/api/skills/related', {
                    seed_skill: bubble.label,
                    career_domain: domain,
                    limit: 8,
                })
                const payload = data as { seeds: string[]; related: string[] }
                const relatedBubbles: Bubble[] = payload.related.map(r => ({
                    id: `${bubble.id}::${r}`,
                    label: r,
                    kind: 'related' as const,
                    selected: false,
                }))
                setBubbles(prev => {
                    const kept = prev.filter(b => !b.id.startsWith(`${bubble.id}::`))
                    const updated = kept.map(b =>
                        b.id === bubble.id ? { ...b, selected: !b.selected } : b
                    )
                    const final = [...updated, ...relatedBubbles]
                    notify(final)
                    return final
                })
            } catch {
                setBubbles(prev => {
                    const updated = prev.map(b =>
                        b.id === bubble.id ? { ...b, selected: !b.selected } : b
                    )
                    notify(updated)
                    return updated
                })
            } finally {
                setLoading(false)
            }
        } else {
            setBubbles(prev => {
                const updated = prev.map(b =>
                    b.id === bubble.id ? { ...b, selected: !b.selected } : b
                )
                notify(updated)
                return updated
            })
        }
    }

    const selectedCount = bubbles.filter(b => b.selected).length

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: 'hsl(220 15% 55%)' }}>
                    Click a skill to expand related skills ↓
                </p>
                {selectedCount > 0 && (
                    <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
                    >
                        {selectedCount} selected
                    </span>
                )}
            </div>

            <div className="flex flex-wrap gap-2 min-h-24 relative">
                {bubbles.map((b, idx) => (
                    <SkillBubbleButton
                        key={b.id}
                        bubble={b}
                        isExpanded={expandedSeed === b.id}
                        animationDelayIndex={idx}
                        onClick={() => handleBubbleClick(b)}
                    />
                ))}
                {loading && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5" style={{ color: 'hsl(220 15% 45%)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '100ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '200ms' }} />
                    </div>
                )}
            </div>
        </div>
    )
}
