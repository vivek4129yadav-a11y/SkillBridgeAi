import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, User, Briefcase, LogOut, Zap, ClipboardList, BarChart2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const nav = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/assessment', icon: <ClipboardList size={18} />, label: 'My Assessment' },
    { to: '/gap-analysis', icon: <BarChart2 size={18} />, label: 'Gap Analysis' },
    { to: '/profile', icon: <User size={18} />, label: 'Profile' },
    { to: '/jobs', icon: <Briefcase size={18} />, label: 'Jobs' },
]

export default function Sidebar() {
    const { logout, user } = useAuthStore()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/auth')
    }

    return (
        <aside className="w-64 flex flex-col border-r" style={{ background: 'hsl(222 47% 10%)', borderColor: 'hsl(222 30% 18%)' }}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-6 py-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm text-white">SkillBridge AI</span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-2 space-y-1">
                {nav.map(({ to, icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    >
                        {icon}
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t" style={{ borderColor: 'hsl(222 30% 18%)' }}>
                <div className="px-4 py-2 mb-2">
                    <p className="text-xs" style={{ color: 'hsl(220 15% 55%)' }}>Logged in as</p>
                    <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                </div>
                <button onClick={handleLogout} className="nav-link w-full text-left">
                    <LogOut size={18} />
                    <span>Sign out</span>
                </button>
            </div>
        </aside>
    )
}
