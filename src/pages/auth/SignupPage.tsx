import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '@/services/authService'

const ROLES = [
    { id: 'individual_youth', label: 'Student', icon: '🎓', desc: 'School/College students' },
    { id: 'individual_bluecollar', label: 'Blue Collar', icon: '🛠️', desc: 'Electricians, Plumbers, etc.' },
    { id: 'individual_informal', label: 'Informal Worker', icon: '🏪', desc: 'Vendors, Daily wage labor' },
    { id: 'org_employer', label: 'Employer', icon: '💼', desc: 'Hiring for roles' },
    { id: 'org_ngo', label: 'NGO', icon: '🤝', desc: 'Social impact & skilling' },
    { id: 'org_govt', label: 'Govt Officer', icon: '🏛️', desc: 'Policy & administration' },
]

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!role) {
            setError('Please select your role')
            return
        }
        setLoading(true)
        setError('')
        try {
            await authService.signup(email, role)
            navigate(`/verify-otp?email=${encodeURIComponent(email)}`)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(135deg, hsl(240, 20%, 8%) 0%, hsl(250, 30%, 12%) 50%, hsl(240, 20%, 8%) 100%)' }}>
            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="mt-2 text-slate-400">Join SkillBridge AI and start your journey</p>
                </div>

                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium mb-4 text-slate-300">Choose your role</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {ROLES.map((r) => (
                                    <button
                                        key={r.id}
                                        type="button"
                                        onClick={() => setRole(r.id)}
                                        className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-200 ${
                                            role === r.id 
                                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(99,102,241,1)]' 
                                            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                                        }`}
                                    >
                                        <span className="text-2xl mb-2">{r.icon}</span>
                                        <span className="font-semibold text-white text-sm mb-1">{r.label}</span>
                                        <span className="text-xs text-slate-500 line-clamp-1">{r.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="max-w-md">
                            <label className="block text-sm font-medium mb-2 text-slate-300">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="name@example.com"
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full max-w-md"
                        >
                            {loading ? 'Creating Account...' : 'Continue'}
                        </button>

                        <div className="text-center pt-4 max-w-md">
                            <p className="text-sm text-slate-400">
                                Already have an account?{' '}
                                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
