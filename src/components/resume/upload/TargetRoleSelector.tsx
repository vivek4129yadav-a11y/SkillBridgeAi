import React, { useState } from 'react'
import { X } from 'lucide-react'

interface TargetRoleSelectorProps {
    targetRoles: string[]
    onChange: (roles: string[]) => void
}

export const TargetRoleSelector: React.FC<TargetRoleSelectorProps> = ({ targetRoles, onChange }) => {
    const [roleInput, setRoleInput] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const trimmed = roleInput.trim()
            if (trimmed && !targetRoles.includes(trimmed)) {
                onChange([...targetRoles, trimmed])
                setRoleInput('')
            }
        } else if (e.key === 'Backspace' && !roleInput && targetRoles.length > 0) {
            onChange(targetRoles.slice(0, -1))
        }
    }

    const removeRole = (idx: number) => {
        onChange(targetRoles.filter((_, i) => i !== idx))
    }

    return (
        <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                Target Roles
                <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">New</span>
            </label>
            
            <div className="flex flex-wrap gap-2 p-2 min-h-[50px] bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                {targetRoles.map((role, idx) => (
                    <span 
                        key={idx} 
                        className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-lg animate-in zoom-in-95 duration-200"
                    >
                        {role}
                        <button 
                            type="button"
                            onClick={() => removeRole(idx)}
                            className="hover:text-blue-900"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </span>
                ))}
                <input 
                    type="text" 
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={targetRoles.length === 0 ? "e.g. Mechanical Engineer, Frontend Developer" : "Add another..."}
                    className="flex-1 bg-transparent border-none outline-none text-sm px-2 min-w-[150px]"
                />
            </div>
            <p className="text-[10px] text-slate-400 italic font-medium">Adding multiple roles helps our AI prioritize keywords across different career paths.</p>
        </div>
    )
}
