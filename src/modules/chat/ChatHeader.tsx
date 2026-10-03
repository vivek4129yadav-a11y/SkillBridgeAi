import React from 'react'
import { MessageCircle } from 'lucide-react'

export const ChatHeader: React.FC = () => {
    return (
        <div 
            className="flex items-center justify-between px-4 py-3 border-b" 
            style={{ borderColor: 'hsl(222 30% 18%)', background: 'hsl(222 47% 13%)' }}
        >
            <div className="flex items-center gap-2">
                <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center" 
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                    <MessageCircle size={14} className="text-white" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-white">SkillBridge AI</p>
                    <p className="text-xs" style={{ color: '#4ade80' }}>● Online</p>
                </div>
            </div>
        </div>
    )
}
