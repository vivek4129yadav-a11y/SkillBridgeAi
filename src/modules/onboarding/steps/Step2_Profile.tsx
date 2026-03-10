import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const INDIAN_STATES = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other']
const EDUCATION_LEVELS = [
    { value: 'none', label: 'No formal education' },
    { value: 'primary', label: 'Primary (up to 5th)' },
    { value: 'secondary', label: 'Secondary (10th/12th)' },
    { value: 'graduate', label: 'Graduate (B.Tech / B.Sc etc.)' },
    { value: 'postgrad', label: 'Post Graduate' },
]

interface Props {
    onNext: (data: object) => void
    loading: boolean
}

export default function Step2_Profile({ onNext, loading }: Props) {
    const [form, setForm] = useState({ full_name: '', age: '', gender: '', state: '', city: '', education_level: '', languages: 'Hindi,English' })

    const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        onNext({
            ...form,
            age: parseInt(form.age),
            languages: form.languages.split(',').map(l => l.trim()).filter(Boolean),
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <h2 className="text-xl font-semibold text-white mb-1">Basic Profile</h2>
                <p className="text-sm mb-4" style={{ color: 'hsl(220 15% 55%)' }}>Tell us a bit about yourself.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Full Name</label>
                    <input id="full-name" className="input-field" placeholder="Amit Kumar" value={form.full_name} onChange={e => set('full_name', e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Age</label>
                    <input id="age" type="number" min={16} max={70} className="input-field" placeholder="24" value={form.age} onChange={e => set('age', e.target.value)} required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Gender</label>
                    <select id="gender" className="input-field" value={form.gender} onChange={e => set('gender', e.target.value)} required>
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer_not">Prefer not to say</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>State</label>
                    <select id="state" className="input-field" value={form.state} onChange={e => set('state', e.target.value)} required>
                        <option value="">Select state</option>
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>City</label>
                    <input id="city" className="input-field" placeholder="Lucknow" value={form.city} onChange={e => set('city', e.target.value)} required />
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Education Level</label>
                    <select id="education" className="input-field" value={form.education_level} onChange={e => set('education_level', e.target.value)} required>
                        <option value="">Select...</option>
                        {EDUCATION_LEVELS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Languages (comma-separated)</label>
                    <input id="languages" className="input-field" placeholder="Hindi, English, Bhojpuri" value={form.languages} onChange={e => set('languages', e.target.value)} />
                </div>
            </div>

            <button id="profile-next-btn" type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : null} Continue
            </button>
        </form>
    )
}
