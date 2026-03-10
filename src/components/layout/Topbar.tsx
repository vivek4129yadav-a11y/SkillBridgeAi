import { useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/profile': 'My Profile',
    '/jobs': 'Job Listings',
    '/admin': 'Admin Panel',
}

export default function Topbar() {
    const { pathname } = useLocation()
    const title = titles[pathname] ?? 'SkillBridge AI'

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'hsl(222 30% 18%)', background: 'hsl(222 47% 10%)' }}>
            <h1 className="text-lg font-semibold text-white">{title}</h1>
            <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'hsl(245 80% 65% / 0.15)', color: '#818cf8' }}>
                    MVP
                </span>
            </div>
        </header>
    )
}
