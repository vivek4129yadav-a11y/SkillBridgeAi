import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
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

const RATING_LEVELS = [
    { value: '1', label: 'Novice' },
    { value: '2', label: 'Basic' },
    { value: '3', label: 'Intermediate' },
    { value: '4', label: 'Advanced' },
    { value: '5', label: 'Expert' },
]

function resolveQuestionType(q: Question): 'text' | 'mcq' | 'rating' {
    const text = q.question.toLowerCase()
    const isOpenEnded = /\b(describe|explain|in your own words|in a few words|tell us|what are your|how do you|share your|detail|write)\b/i.test(text)
    const isExplicitRating = /\b(rate|scale of 1|scale 1-5|how comfortable|how confident)\b/i.test(text)

    if (isOpenEnded && !isExplicitRating) return 'text'
    if (isExplicitRating || q.type === 'rating') return 'rating'
    if (q.type === 'mcq' && q.options && q.options.length >= 2) return 'mcq'
    return 'text'
}

export default function Step4_Questions({ onNext }: Props) {
    const [lang, setLang] = useState<'en' | 'hi'>('en')
    const [questions, setQuestions] = useState<Question[]>([])
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [notes, setNotes] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    async function fetchQuestions(language: 'en' | 'hi') {
        setLoading(true)
        try {
            const { data } = await api.post('/onboarding/generate-questions', { language })
            setQuestions(data.data.questions || [])
            setAnswers({})
            setNotes({})
        } catch (e) {
            console.error('[ONBOARDING] Failed to generate questions', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchQuestions(lang) }, [lang])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)
        try {
            const answerPayload = questions.map(q => {
                const baseAnswer = answers[q.id] || ''
                const note = notes[q.id]?.trim()
                const combined = note ? `${baseAnswer} (Note: ${note})` : baseAnswer
                return {
                    question_id: q.id,
                    question_text: q.question,
                    answer: combined,
                }
            })
            const { data } = await api.post('/onboarding/submit-answers', { answers: answerPayload })
            onNext(data.data.session_id)
        } catch (e) {
            console.error('[ONBOARDING] Submit answers failed', e)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-white">Career Assessment</h2>
                    <p className="text-sm mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>AI-tailored questions for your career path.</p>
                </div>
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
                    <Loader2 size={32} className="animate-spin text-indigo-500" />
                    <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>Generating questions with AI...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {questions.map((q, i) => {
                        const resolvedType = resolveQuestionType(q)
                        return (
                            <div key={q.id} className="p-4 rounded-xl border" style={{ background: 'hsl(222 47% 11%)', borderColor: 'hsl(222 30% 18%)' }}>
                                <label className="block text-sm font-medium mb-3 text-white leading-relaxed">
                                    <span className="text-indigo-400 font-semibold mr-1.5">{i + 1}.</span>
                                    {q.question}
                                </label>

                                {resolvedType === 'text' && (
                                    <textarea
                                        className="input-field min-h-[90px] w-full resize-none text-sm p-3 rounded-lg"
                                        placeholder="Type your response here..."
                                        value={answers[q.id] || ''}
                                        onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
                                        required
                                    />
                                )}

                                {resolvedType === 'mcq' && (
                                    <div className="space-y-2">
                                        {(q.options && q.options.length > 0 ? q.options : ['Yes', 'No']).map(opt => (
                                            <label key={opt} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors"
                                                style={answers[q.id] === opt
                                                    ? { background: 'rgba(99,102,241,0.18)', borderColor: '#6366f1' }
                                                    : { background: 'hsl(222 47% 14%)', borderColor: 'hsl(222 30% 22%)' }}>
                                                <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt}
                                                    onChange={() => setAnswers(a => ({ ...a, [q.id]: opt }))} className="sr-only" required />
                                                <span className="text-sm font-medium" style={{ color: answers[q.id] === opt ? '#c7d2fe' : 'hsl(220 20% 80%)' }}>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}

                                {resolvedType === 'rating' && (
                                    <div className="space-y-2.5">
                                        <div className="grid grid-cols-5 gap-2">
                                            {RATING_LEVELS.map(level => {
                                                const selected = answers[q.id] === level.value
                                                return (
                                                    <button
                                                        key={level.value}
                                                        type="button"
                                                        onClick={() => setAnswers(a => ({ ...a, [q.id]: level.value }))}
                                                        className="py-2.5 px-1 rounded-lg text-center transition-all border flex flex-col items-center justify-center gap-0.5"
                                                        style={selected
                                                            ? { background: '#6366f1', borderColor: '#818cf8', color: 'white' }
                                                            : { background: 'hsl(222 47% 14%)', borderColor: 'hsl(222 30% 22%)', color: 'hsl(220 15% 65%)' }}
                                                    >
                                                        <span className="text-base font-bold">{level.value}</span>
                                                        <span className="text-[10px] leading-tight opacity-90 truncate max-w-full px-0.5">{level.label}</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                        <input
                                            type="text"
                                            className="input-field text-xs py-2 px-3 w-full rounded-md"
                                            placeholder="Optional: add detail or context..."
                                            value={notes[q.id] || ''}
                                            onChange={e => setNotes(n => ({ ...n, [q.id]: e.target.value }))}
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    <button id="submit-answers-btn" type="submit" className="btn-primary w-full py-3 text-sm font-semibold" disabled={submitting}>
                        {submitting ? <Loader2 size={18} className="animate-spin mr-2" /> : null} Submit Answers
                    </button>
                </form>
            )}
        </div>
    )
}
