import React from 'react'
import { BarChart3, Sparkles, User, LucideIcon } from 'lucide-react'

export type TabKey = 'score' | 'suggestions' | 'profile'

interface TabItem {
    id: TabKey
    label: string
    icon: LucideIcon
}

export const TABS: readonly TabItem[] = [
    { id: 'score', label: 'Score Breakdown', icon: BarChart3 },
    { id: 'suggestions', label: 'AI Suggestions', icon: Sparkles },
    { id: 'profile', label: 'Extracted Profile', icon: User },
] as const

interface ResumePageTabsProps {
    activeTab: TabKey
    onChange: (tab: TabKey) => void
}

export const ResumePageTabs: React.FC<ResumePageTabsProps> = ({ activeTab, onChange }) => {
    return (
        <div className="flex p-1.5 bg-slate-100 rounded-2xl w-fit mx-auto md:mx-0">
            {TABS.map((tab) => {
                const Icon = tab.icon
                return (
                    <button
                        key={tab.id}
                        onClick={() => onChange(tab.id)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                            activeTab === tab.id 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                    >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}
