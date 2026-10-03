import React from 'react'
import { Send, Loader2 } from 'lucide-react'

interface ChatInputBarProps {
    input: string
    streaming: boolean
    placeholder: string
    onChange: (val: string) => void
    onSend: () => void
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
    input,
    streaming,
    placeholder,
    onChange,
    onSend
}) => {
    return (
        <div className="flex gap-2 p-3 border-t" style={{ borderColor: 'hsl(222 30% 18%)' }}>
            <input 
                id="chat-input" 
                className="input-field flex-1 text-sm py-2.5" 
                placeholder={placeholder}
                value={input} 
                onChange={e => onChange(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && onSend()} 
                disabled={streaming} 
            />
            <button 
                id="chat-send-btn" 
                onClick={onSend} 
                disabled={streaming || !input.trim()}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80 disabled:opacity-40"
                style={{ background: '#6366f1' }}
            >
                {streaming ? <Loader2 size={16} className="animate-spin text-white" /> : <Send size={16} className="text-white" />}
            </button>
        </div>
    )
}
