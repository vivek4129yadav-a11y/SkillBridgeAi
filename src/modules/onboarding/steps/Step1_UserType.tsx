import { Loader2 } from 'lucide-react'

const USER_TYPES = [
    { id: 'individual_youth', label: 'Youth / Student', emoji: '🎓', desc: 'Fresh grad, student (18-28)' },
    { id: 'individual_bluecollar', label: 'Blue Collar', emoji: '🔧', desc: 'Mechanic, electrician, driver' },
    { id: 'individual_informal', label: 'Informal Worker', emoji: '🛒', desc: 'Vendor, gig worker, daily wage' },
    { id: 'org_ngo', label: 'NGO', emoji: '🤝', desc: 'Training & placement outcomes' },
    { id: 'org_employer', label: 'Employer', emoji: '🏢', desc: 'Hiring & skill needs' },
    { id: 'org_govt', label: 'Government', emoji: '🏛️', desc: 'Skill gap monitoring' },
]

interface Props {
    onNext: (userType: string) => void
    loading: boolean
}

export default function Step1_UserType({ onNext, loading }: Props) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-white mb-1">Who are you?</h2>
            <p className="text-sm mb-6" style={{ color: 'hsl(220 15% 55%)' }}>
                This helps us personalize your experience.
            </p>
            <div className="grid grid-cols-2 gap-3">
                {USER_TYPES.map((t) => (
                    <button
                        key={t.id}
                        id={`user-type-${t.id}`}
                        onClick={() => !loading && onNext(t.id)}
                        disabled={loading}
                        className="flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 hover:border-indigo-500 hover:shadow-lg disabled:opacity-50"
                        style={{ background: 'hsl(222 47% 14%)', borderColor: 'hsl(222 30% 22%)' }}
                    >
                        <span className="text-2xl mb-2">{t.emoji}</span>
                        <span className="text-sm font-semibold text-white">{t.label}</span>
                        <span className="text-xs mt-1" style={{ color: 'hsl(220 15% 55%)' }}>{t.desc}</span>
                    </button>
                ))}
            </div>
            {loading && <div className="flex justify-center mt-4"><Loader2 className="animate-spin" style={{ color: '#6366f1' }} /></div>}
        </div>
    )
}
