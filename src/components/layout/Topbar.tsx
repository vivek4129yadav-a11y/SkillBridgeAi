import { useLocation } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import { LanguageToggle } from '../LanguageToggle'
import { StringKey } from '../../i18n/strings'

const titles: Record<string, StringKey> = {
    '/dashboard': 'dashboard',
    '/profile': 'my_profile',
    '/jobs': 'job_matches',
    '/assessment': 'skill_assessment',
    '/chat': 'career_coach',
}

export default function Topbar() {
    const { pathname } = useLocation()
    const { t } = useLanguage()
    
    const titleKey = titles[pathname] || 'dashboard'
    const title = t(titleKey)

    return (
        <header className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'hsl(222 30% 18%)', background: 'hsl(222 47% 10%)' }}>
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-semibold text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                <LanguageToggle />
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'hsl(245 80% 65% / 0.15)', color: '#818cf8' }}>
                    MVP
                </span>
            </div>
        </header>
    )
}
