import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useAuthStore } from '@/store/authStore'
import { useLanguage } from '@/hooks/useLanguage'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const { language, t } = useLanguage()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState('')
    const [streaming, setStreaming] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const { accessToken } = useAuthStore()

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Clear messages when language changes to reset context
    useEffect(() => {
        setMessages([])
    }, [language])

    async function sendMessage() {
        if (!input.trim() || streaming) return
        const userMsg = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setStreaming(true)

        // Add empty assistant message that we'll stream into
        setMessages(prev => [...prev, { role: 'assistant', content: '' }])

        const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

        try {
            const resp = await fetch(`${apiBase}/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                body: JSON.stringify({ content: userMsg, language }),
            })

            const reader = resp.body!.getReader()
            const decoder = new TextDecoder()
            let buf = ''

            while (true) {
                const { done, value } = await reader.read()
                if (done) break
                buf += decoder.decode(value, { stream: true })
                const lines = buf.split('\n')
                buf = lines.pop() || ''

                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue
                    const data = JSON.parse(line.slice(6))
                    if (data.done) break
                    if (data.error) {
                        setMessages(prev => {
                            const copy = [...prev]
                            copy[copy.length - 1] = { role: 'assistant', content: data.error }
                            return copy
                        })
                        break
                    }
                    if (data.token) {
                        setMessages(prev => {
                            const copy = [...prev]
                            copy[copy.length - 1] = { role: 'assistant', content: copy[copy.length - 1].content + data.token }
                            return copy
                        })
                    }
                }
            }
        } catch (e) {
            console.error('[CHAT] stream failed', e)
        } finally {
            setStreaming(false)
        }
    }

    return (
        <>
            {/* Floating button */}
            <button id="chat-open-btn" onClick={() => setOpen(o => !o)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}>
                {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
            </button>

            {/* Chat panel */}
            {open && (
                <div id="chat-panel" className="fixed bottom-24 right-6 z-50 w-96 flex flex-col rounded-2xl shadow-2xl overflow-hidden" style={{ background: 'hsl(222 47% 11%)', border: '1px solid hsl(222 30% 20%)', height: '500px' }}>
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'hsl(222 30% 18%)', background: 'hsl(222 47% 13%)' }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                <MessageCircle size={14} className="text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">SkillBridge AI</p>
                                <p className="text-xs" style={{ color: '#4ade80' }}>● Online</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 && (
                            <div className="text-center py-8 text-sm" style={{ color: 'hsl(220 15% 45%)' }}>
                                {t('chatPlaceholder')}
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${m.role === 'user' ? 'text-white' : ''} chat-markdown`}
                                    style={m.role === 'user'
                                        ? { background: '#6366f1' }
                                        : { background: 'hsl(222 47% 16%)', color: 'hsl(220 20% 85%)' }}>
                                    <ReactMarkdown>
                                        {m.content || (streaming && i === messages.length - 1 ? '●' : '')}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="flex gap-2 p-3 border-t" style={{ borderColor: 'hsl(222 30% 18%)' }}>
                        <input id="chat-input" className="input-field flex-1 text-sm py-2.5" placeholder={t('typeMessage')}
                            value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} disabled={streaming} />
                        <button id="chat-send-btn" onClick={sendMessage} disabled={streaming || !input.trim()}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:opacity-80 disabled:opacity-40"
                            style={{ background: '#6366f1' }}>
                            {streaming ? <Loader2 size={16} className="animate-spin text-white" /> : <Send size={16} className="text-white" />}
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
