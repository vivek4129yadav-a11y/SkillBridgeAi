import { useState, useCallback } from 'react'
import api from '@/lib/api'

// Predefined seed skills per career domain
const DOMAIN_SEEDS: Record<string, string[]> = {
    technology:    ['Python', 'JavaScript', 'SQL', 'Cloud', 'DevOps'],
    healthcare:    ['Patient Care', 'Pharmacology', 'Medical Records', 'Nursing', 'First Aid'],
    logistics:     ['Warehouse Management', 'Inventory', 'Supply Chain', 'Logistics', 'Procurement'],
    agriculture:   ['Crop Management', 'Irrigation', 'Soil Science', 'Agronomy', 'Farming'],
    manufacturing: ['Quality Control', 'CNC Operation', 'Welding', 'Machine Operation', 'Lean'],
    hospitality:   ['Customer Service', 'Hotel Management', 'F&B Service', 'Housekeeping', 'Tourism'],
    finance:       ['Accounting', 'Tally ERP', 'GST Filing', 'Financial Analysis', 'Banking'],
    education:     ['Teaching', 'Curriculum Design', 'Classroom Management', 'E-Learning', 'Training'],
    construction:  ['Civil Engineering', 'AutoCAD', 'Site Management', 'Estimating', 'Safety'],
    retail:        ['Sales', 'Merchandising', 'Inventory', 'POS Systems', 'Customer Handling'],
    general:       ['Communication', 'MS Office', 'Team Leadership', 'Problem Solving', 'Data Entry'],
}

interface Bubble {
    id: string
    label: string
    kind: 'seed' | 'related'
    selected: boolean
}

interface Props {
    domain: string
    onSelectionChange: (skills: string[]) => void
}

export default function SkillBubbleGrid({ domain, onSelectionChange }: Props) {
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
            // Toggle off previous expansion and fetch related
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
                    // Remove old related from this seed, keep rest
                    const kept = prev.filter(b => !b.id.startsWith(`${bubble.id}::`))
                    // Toggle selection of the clicked seed
                    const updated = kept.map(b =>
                        b.id === bubble.id ? { ...b, selected: !b.selected } : b
                    )
                    const final = [...updated, ...relatedBubbles]
                    notify(final)
                    return final
                })
            } catch {
                // silently ignore — just toggle selection
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
            // Simple toggle for related or already-expanded seed
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
                {bubbles.map((b, idx) => {
                    const isSeed = b.kind === 'seed'
                    const isExpanded = expandedSeed === b.id
                    return (
                        <button
                            key={b.id}
                            type="button"
                            onClick={() => handleBubbleClick(b)}
                            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer"
                            style={{
                                animationDelay: `${idx * 40}ms`,
                                ...(b.selected
                                    ? { background: 'rgba(99,102,241,0.25)', borderColor: '#6366f1', color: '#818cf8', border: '1.5px solid', boxShadow: '0 0 12px rgba(99,102,241,0.3)' }
                                    : isSeed
                                    ? { background: 'hsl(222 47% 18%)', border: '1px solid hsl(222 30% 28%)', color: 'hsl(220 20% 75%)' }
                                    : { background: 'hsl(222 47% 14%)', border: '1px dashed hsl(222 30% 24%)', color: 'hsl(220 15% 55%)', fontSize: '0.75rem' }),
                                ...(isExpanded && !b.selected
                                    ? { borderColor: 'hsl(200 80% 60%)', color: 'hsl(200 80% 75%)' }
                                    : {}),
                            }}
                        >
                            {isSeed && '◉ '}
                            {b.label}
                        </button>
                    )
                })}
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
