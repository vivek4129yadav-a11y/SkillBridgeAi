import { NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { 
    LayoutDashboard, 
    User, 
    Briefcase, 
    LogOut, 
    Zap, 
    ClipboardList, 
    BarChart2, 
    Search, 
    TrendingUp,
    FolderKanban,
    Calendar,
    Settings,
    Columns,
    Building2,
    MessageSquare,
    BrainCircuit,
    GraduationCap,
    FileText,
    Users,
    Gift,
    Mic,
    FileCheck
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { SEEKER_ROLES } from '@/constants/roles'

type NavItem = {
    to: string
    icon: React.ReactNode
    label: string
    roles?: string[]
}

type NavGroup = {
    title: string
    items: NavItem[]
    roles?: string[]
}

const seekerNav: NavItem[] = [
    { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/assessment', icon: <ClipboardList size={18} />, label: 'My Assessment' },
    { to: '/gap-analysis', icon: <BarChart2 size={18} />, label: 'Gap Analysis' },
    { to: '/jobs', icon: <Briefcase size={18} />, label: 'Find Jobs' },
    { to: '/profile', icon: <User size={18} />, label: 'My Profile' },
]

const employerGroups: NavGroup[] = [
    {
        title: 'Overview',
        items: [
            { to: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Recruitment Desk' },
            { to: '/messaging', icon: <MessageSquare size={18} />, label: 'Inbox' },
        ]
    },
    {
        title: 'Sourcing',
        items: [
            { to: '/talent-pool', icon: <Search size={18} />, label: 'AI Talent Pool' },
            { to: '/campus-hub', icon: <GraduationCap size={18} />, label: 'Campus Hub' },
            { to: '/referrals', icon: <Gift size={18} />, label: 'Referral Program' },
        ]
    },
    {
        title: 'Recruitment',
        items: [
            { to: '/pipeline', icon: <Columns size={18} />, label: 'Candidate Pipeline' },
            { to: '/interviews', icon: <Calendar size={18} />, label: 'Interview Scheduler' },
            { to: '/offers', icon: <FileText size={18} />, label: 'Offers & Contracts' },
            { to: '/manage-jobs', icon: <FolderKanban size={18} />, label: 'Job Postings' },
        ]
    },
    {
        title: 'Intelligence',
        items: [
            { to: '/ai-interviewer', icon: <Mic size={18} />, label: 'AI Interviewer' },
            { to: '/jd-optimizer', icon: <FileCheck size={18} />, label: 'JD Optimizer' },
            { to: '/insights', icon: <TrendingUp size={18} />, label: 'Hiring Insights' },
            { to: '/skill-intel', icon: <Zap size={18} />, label: 'Market Skills' },
            { to: '/ai-config', icon: <BrainCircuit size={18} />, label: 'AI Agent Settings' },
        ]
    },
    {
        title: 'Organization',
        items: [
            { to: '/team', icon: <Users size={18} />, label: 'Team Management' },
            { to: '/brand-center', icon: <Building2 size={18} />, label: 'Employer Brand' },
            { to: '/settings/org', icon: <Settings size={18} />, label: 'Company Profile' },
            { to: '/profile', icon: <User size={18} />, label: 'Personal Profile' },
        ]
    }
]

export default function Sidebar() {
    const { logout, user } = useAuthStore()
    const navigate = useNavigate()

    const { data: profile, isLoading: profileLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => (await api.get('/profile/me')).data.data,
        enabled: !!user,
    })

    const isSeeker = user?.user_type && SEEKER_ROLES.includes(user.user_type)
    const isEmployer = user?.user_type === 'org_employer'

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <aside className="w-64 flex flex-col border-r h-screen sticky top-0" style={{ background: 'hsl(222 47% 10%)', borderColor: 'hsl(222 30% 18%)' }}>
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-6 py-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Zap size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm text-white">SkillBridge AI</span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-2 space-y-6 overflow-y-auto custom-scrollbar">
                {isSeeker && (
                    <div className="space-y-1">
                        {seekerNav.map(({ to, icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                {icon}
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </div>
                )}

                {isEmployer && employerGroups.map((group) => (
                    <div key={group.title} className="space-y-1">
                        <h3 className="px-4 text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2">
                            {group.title}
                        </h3>
                        {group.items.map(({ to, icon, label }) => (
                            <NavLink
                                key={to}
                                to={to}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                {icon}
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </div>
                ))}

                {/* Generic fallback for other roles (NGO, Govt) - reuse some items or keep simple */}
                {!isSeeker && !isEmployer && (
                    <div className="space-y-1">
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                            <User size={18} />
                            <span>Profile</span>
                        </NavLink>
                    </div>
                )}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t" style={{ borderColor: 'hsl(222 30% 18%)' }}>
                <div className="px-4 py-2 mb-2 min-h-[44px] flex flex-col justify-center">
                    <p className="text-xs" style={{ color: 'hsl(220 15% 55%)' }}>Logged in as</p>
                    {profileLoading ? (
                        <div className="h-4 w-24 bg-white/5 animate-pulse rounded mt-1" />
                    ) : (
                        <p className="text-sm font-medium text-white truncate mt-0.5">
                            {profile?.full_name || user?.email}
                        </p>
                    )}
                </div>
                <button onClick={handleLogout} className="nav-link w-full text-left">
                    <LogOut size={18} />
                    <span>Sign out</span>
                </button>
            </div>
        </aside>
    )
}
