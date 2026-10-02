import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useLanguage } from '@/hooks/useLanguage'
import { ChatMessage } from './types'
import { ChatHeader } from './ChatHeader'
import { ChatMessageItem } from './ChatMessageItem'
import { ChatInputBar } from './ChatInputBar'

export default function ChatWidget() {
    const [open, setOpen] = useState(false)
    const { language, t } = useLanguage()
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')
    const [streaming, setStreaming] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const { accessToken } = useAuthStore()

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        setMessages([])
    }, [language])

    async function sendMessage() {
        if (!input.trim() || streaming) return
        const userMsg = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setStreaming(true)
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
            <button 
                id="chat-open-btn" 
                onClick={() => setOpen(o => !o)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 32px rgba(99,102,241,0.4)' }}
            >
                {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
            </button>

            {open && (
                <div 
                    id="chat-panel" 
                    className="fixed bottom-24 right-6 z-50 w-96 flex flex-col rounded-2xl shadow-2xl overflow-hidden" 
                    style={{ background: 'hsl(222 47% 11%)', border: '1px solid hsl(222 30% 20%)', height: '500px' }}
                >
                    <ChatHeader />

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.length === 0 && (
                            <div className="text-center py-8 text-sm" style={{ color: 'hsl(220 15% 45%)' }}>
                                {t('chatPlaceholder')}
                            </div>
                        )}
                        {messages.map((m, i) => (
                            <ChatMessageItem 
                                key={i} 
                                message={m} 
                                isStreamingToken={streaming && i === messages.length - 1} 
                            />
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    <ChatInputBar 
                        input={input}
                        streaming={streaming}
                        placeholder={t('typeMessage')}
                        onChange={setInput}
                        onSend={sendMessage}
                    />
                </div>
            )}
        </>
    )
}
