import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import SkillBubbleGrid from '@/components/skills/SkillBubbleGrid'

const CAREER_OPTIONS = ['technology', 'healthcare', 'logistics', 'agriculture', 'manufacturing', 'hospitality', 'finance', 'education', 'construction', 'retail']

interface Props {
    onNext: (data: object) => void
    loading: boolean
}

export default function Step3_Preferences({ onNext, loading }: Props) {
    const [interests, setInterests] = useState<string[]>([])
    const [salaryMin, setSalaryMin] = useState('')
    const [salaryMax, setSalaryMax] = useState('')
    const [workType, setWorkType] = useState('any')
    const [relocate, setRelocate] = useState(false)
    const [targetRoles, setTargetRoles] = useState('')
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])

    function toggleInterest(i: string) {
        setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onNext({
            career_interests: interests,
            expected_salary_min: salaryMin ? parseInt(salaryMin) : null,
            expected_salary_max: salaryMax ? parseInt(salaryMax) : null,
            work_type: workType,
            willing_to_relocate: relocate,
            target_roles: targetRoles.split(',').map(r => r.trim()).filter(Boolean),
            skill_tags: selectedSkills,
        })
    }

    const primaryDomain = interests[0] ?? 'general'

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-xl font-semibold text-white mb-1">Career Preferences</h2>
                <p className="text-sm mb-4" style={{ color: 'hsl(220 15% 55%)' }}>What are you looking for?</p>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(220 20% 80%)' }}>Career Interests</label>
                <div className="flex flex-wrap gap-2">
                    {CAREER_OPTIONS.map(opt => (
                        <button key={opt} type="button" onClick={() => toggleInterest(opt)}
                            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer"
                            style={interests.includes(opt)
                                ? { background: 'rgba(99,102,241,0.2)', borderColor: '#6366f1', color: '#818cf8', border: '1px solid' }
                                : { background: 'hsl(222 47% 16%)', border: '1px solid hsl(222 30% 22%)', color: 'hsl(220 15% 60%)' }
                            }>
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Skill Bubble Grid — shown after at least 1 interest is selected */}
            {interests.length > 0 && (
                <div
                    className="rounded-xl p-4 border"
                    style={{ background: 'hsl(222 47% 11%)', borderColor: 'hsl(222 30% 20%)' }}
                >
                    <label className="block text-sm font-medium mb-3" style={{ color: 'hsl(220 20% 80%)' }}>
                        Select Your Skills
                    </label>
                    <SkillBubbleGrid
                        domain={primaryDomain}
                        onSelectionChange={setSelectedSkills}
                    />
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Min Salary (₹/mo)</label>
                    <input id="salary-min" type="number" className="input-field" placeholder="15000" value={salaryMin} onChange={e => setSalaryMin(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Max Salary (₹/mo)</label>
                    <input id="salary-max" type="number" className="input-field" placeholder="50000" value={salaryMax} onChange={e => setSalaryMax(e.target.value)} />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Work Type</label>
                <select id="work-type" className="input-field" value={workType} onChange={e => setWorkType(e.target.value)}>
                    <option value="any">Any</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>

            <div className="flex items-center gap-3">
                <input id="relocate-toggle" type="checkbox" checked={relocate} onChange={e => setRelocate(e.target.checked)} className="w-4 h-4 rounded" />
                <label htmlFor="relocate-toggle" className="text-sm" style={{ color: 'hsl(220 20% 80%)' }}>Willing to relocate</label>
            </div>

            <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Target Roles (comma-separated)</label>
                <input id="target-roles" className="input-field" placeholder="Software Developer, Data Analyst" value={targetRoles} onChange={e => setTargetRoles(e.target.value)} />
            </div>

            <button id="prefs-next-btn" type="submit" className="btn-primary w-full" disabled={loading || interests.length === 0}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : null} Continue
            </button>
        </form>
    )
}
