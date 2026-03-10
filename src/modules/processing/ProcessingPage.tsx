import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

interface LogLine {
    step: number
    progress: number
    message: string
    status: string
}

export default function ProcessingPage() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const sessionId = params.get('session_id') || ''
    const [lines, setLines] = useState<LogLine[]>([])
    const [progress, setProgress] = useState(0)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sessionId) return

        const token = useAuthStore.getState().accessToken || ''
        const url = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/onboarding/process-stream?session_id=${sessionId}&token=${token}`
        console.log("[PROCESSOR] Connecting to:", url)

        const sse = new EventSource(url)

        sse.onmessage = (e) => {
            const data: LogLine = JSON.parse(e.data)
            setLines(prev => [...prev, data])
            setProgress(data.progress)

            if (data.status === 'done') {
                sse.close()
                setTimeout(() => navigate('/dashboard'), 1500)
            }
            if (data.status === 'error') {
                sse.close()
            }
        }

        sse.onerror = () => sse.close()

        return () => sse.close()
    }, [sessionId])

    // Auto-scroll to bottom as lines come in
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [lines])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: 'hsl(222 47% 8%)' }}>
            <div className="w-full max-w-xl animate-slide-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                        <span className="text-3xl">🧠</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Processing your profile</h1>
                    <p className="text-sm mt-1" style={{ color: 'hsl(220 15% 55%)' }}>AI is analyzing your responses...</p>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs mb-2" style={{ color: 'hsl(220 15% 55%)' }}>
                        <span>Progress</span><span>{progress}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'hsl(222 30% 18%)' }}>
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />
                    </div>
                </div>

                {/* Log terminal */}
                <div className="rounded-xl border overflow-hidden" style={{ background: 'hsl(220 30% 6%)', borderColor: 'hsl(222 30% 18%)' }}>
                    <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'hsl(222 30% 18%)' }}>
                        <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
                        <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
                        <span className="ml-2 text-xs" style={{ color: 'hsl(220 15% 40%)' }}>skillbridge-processor</span>
                    </div>
                    <div className="p-4 min-h-[200px] max-h-[300px] overflow-y-auto font-mono text-sm space-y-1">
                        {lines.map((line, i) => (
                            <div key={i} className="flex gap-2" style={{ color: line.status === 'done' ? '#4ade80' : line.status === 'error' ? '#f87171' : '#86efac' }}>
                                <span style={{ color: 'hsl(220 15% 35%)' }}>[{String(line.step).padStart(2, '0')}]</span>
                                <span>{line.message}</span>
                            </div>
                        ))}
                        {lines.length === 0 && (
                            <div style={{ color: 'hsl(220 15% 35%)' }}>Connecting to processor...</div>
                        )}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <p className="text-center text-xs mt-4" style={{ color: 'hsl(220 15% 40%)' }}>
                    You'll be redirected to your dashboard automatically.
                </p>
            </div>
        </div>
    )
}
