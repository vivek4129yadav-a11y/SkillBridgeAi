import { useState, useEffect } from 'react'
import { Loader2, Globe } from 'lucide-react'
import api from '@/lib/api'

interface Question {
    id: string
    question: string
    type: 'text' | 'mcq' | 'rating'
    options: string[]
}

interface Props {
    onNext: (sessionId: string) => void
}

export default function Step4_Questions({ onNext }: Props) {
    const [lang, setLang] = useState<'en' | 'hi'>('en')
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    async function fetchQuestions(language: 'en' | 'hi') {
        setLoading(true)
        try {
            const { data } = await api.post('/onboarding/generate-questions', { language })
            setQuestions(data.data.questions)
            setAnswers({})
        } catch (e) {
            console.error('[ONBOARDING] failed to generate questions', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchQuestions(lang) }, [lang])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)
        try {
            const answerPayload = questions.map(q => ({
                question_id: q.id,
                question_text: q.question,
                answer: answers[q.id] || '',
            }))
            const { data } = await api.post('/onboarding/submit-answers', { answers: answerPayload })
            onNext(data.data.session_id)
        } catch (e) {
            console.error('[ONBOARDING] submit answers failed', e)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-white">Career Assessment</h2>
                    <p className="text-sm mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>AI-generated questions tailored to your profile.</p>
                </div>
                {/* Language toggle */}
                <div id="lang-toggle" className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'hsl(222 30% 22%)' }}>
                    {(['en', 'hi'] as const).map(l => (
                        <button key={l} type="button" onClick={() => setLang(l)}
                            className="px-3 py-1.5 text-xs font-medium transition-all"
                            style={lang === l ? { background: '#6366f1', color: 'white' } : { background: 'hsl(222 47% 14%)', color: 'hsl(220 15% 55%)' }}>
                            {l === 'en' ? 'EN' : 'हि'}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center py-12 gap-3">
                    <Loader2 size={32} className="animate-spin" style={{ color: '#6366f1' }} />
                    <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>Generating questions with AI...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    {questions.map((q, i) => (
                        <div key={q.id}>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'hsl(220 20% 85%)' }}>
                                {i + 1}. {q.question}
                            </label>
                            {q.type === 'text' && (
                                <textarea className="input-field min-h-[80px] resize-none" placeholder="Your answer..." value={answers[q.id] || ''}
                                    onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))} />
                            )}
                            {q.type === 'mcq' && (
                                <div className="space-y-2">
                                    {q.options.map(opt => (
                                        <label key={opt} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors"
                                            style={answers[q.id] === opt
                                                ? { background: 'rgba(99,102,241,0.15)', borderColor: '#6366f1' }
                                                : { background: 'hsl(222 47% 14%)', borderColor: 'hsl(222 30% 22%)' }}>
                                            <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt}
                                                onChange={() => setAnswers(a => ({ ...a, [q.id]: opt }))} className="sr-only" />
                                            <span className="text-sm" style={{ color: answers[q.id] === opt ? '#a5b4fc' : 'hsl(220 20% 80%)' }}>{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {q.type === 'rating' && (
                                <div className="flex gap-2">
                                    {(q.options.length > 0 ? q.options : ['1', '2', '3', '4', '5']).map(n => (
                                        <button key={n} type="button" onClick={() => setAnswers(a => ({ ...a, [q.id]: n }))}
                                            className="flex-1 py-2 rounded-lg text-sm font-medium transition-all border"
                                            style={answers[q.id] === n
                                                ? { background: '#6366f1', borderColor: '#6366f1', color: 'white' }
                                                : { background: 'hsl(222 47% 14%)', borderColor: 'hsl(222 30% 22%)', color: 'hsl(220 15% 55%)' }}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <button id="submit-answers-btn" type="submit" className="btn-primary w-full" disabled={submitting}>
                        {submitting ? <Loader2 size={18} className="animate-spin" /> : null} Submit Answers
                    </button>
                </form>
            )}
        </div>
    )
}
