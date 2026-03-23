import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, CheckCircle2, ChevronRight, Trophy, AlertCircle, RotateCcw, Loader2 } from 'lucide-react'
import api from '@/lib/api'

// ─── Types ───────────────────────────────────────────────────────────────────
interface Question { id: number; question: string; type: string }
interface AnswerFeedback {
    score: number
    feedback: string
    keywords_matched: string[]
    improvement: string
}
interface SessionState {
    session_id: string
    total_questions: number
    current_question: Question
    question_index: number
}
interface Report {
    overall_score: number
    grade: string
    strengths: string[]
    areas_to_improve: string[]
    recommendation: string
    summary: string
}

// ─── Screens ─────────────────────────────────────────────────────────────────

function SetupScreen({ onStart, loading }: { onStart: (role: string, skills: string[]) => void; loading: boolean }) {
    const [role, setRole] = useState('')
    const [skills, setSkills] = useState('')

    return (
        <div className="card p-8 max-w-lg mx-auto space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                    <Mic size={20} className="text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Mock Interview</h2>
                    <p className="text-xs" style={{ color: 'hsl(220 15% 55%)' }}>Practice with AI-powered feedback</p>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Target Role</label>
                    <input
                        className="input-field"
                        placeholder="e.g. Software Engineer, Data Analyst, Sales Executive"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: 'hsl(220 20% 80%)' }}>Your Skills (comma-separated)</label>
                    <input
                        className="input-field"
                        placeholder="e.g. Python, SQL, Communication, Problem Solving"
                        value={skills}
                        onChange={e => setSkills(e.target.value)}
                    />
                </div>
                <button
                    className="btn-primary w-full"
                    disabled={!role.trim() || loading}
                    onClick={() => onStart(role.trim(), skills.split(',').map(s => s.trim()).filter(Boolean))}
                >
                    {loading ? <><Loader2 size={16} className="animate-spin inline mr-2" />Generating Questions…</> : 'Start Interview →'}
                </button>
            </div>

            <p className="text-xs text-center" style={{ color: 'hsl(220 15% 45%)' }}>
                5 questions · AI-scored · Instant feedback report
            </p>
        </div>
    )
}


function QuestionScreen({
    session,
    onAnswer,
    lastFeedback,
    loading,
}: {
    session: SessionState
    onAnswer: (answer: string) => void
    lastFeedback: AnswerFeedback | null
    loading: boolean
}) {
    const [answer, setAnswer] = useState('')
    const { current_question, question_index, total_questions } = session
    const progress = (question_index / total_questions) * 100

    function handleSubmit() {
        if (answer.trim()) {
            onAnswer(answer.trim())
            setAnswer('')
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Progress */}
            <div className="space-y-1.5">
                <div className="flex justify-between text-xs" style={{ color: 'hsl(220 15% 50%)' }}>
                    <span>Question {question_index + 1} of {total_questions}</span>
                    <span>{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-500 transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Feedback from previous answer */}
            {lastFeedback && (
                <div className="rounded-xl p-4 space-y-2" style={{ background: 'hsl(222 47% 11%)', border: '1px solid hsl(222 30% 20%)' }}>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">Previous Answer Feedback</p>
                        <span
                            className="text-lg font-bold"
                            style={{ color: lastFeedback.score >= 7 ? '#4ade80' : lastFeedback.score >= 5 ? '#fb923c' : '#f87171' }}
                        >
                            {lastFeedback.score}/10
                        </span>
                    </div>
                    <p className="text-sm" style={{ color: 'hsl(220 15% 65%)' }}>{lastFeedback.feedback}</p>
                    {lastFeedback.improvement && (
                        <p className="text-xs italic" style={{ color: 'hsl(220 15% 50%)' }}>💡 {lastFeedback.improvement}</p>
                    )}
                    {lastFeedback.keywords_matched?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {lastFeedback.keywords_matched.map(kw => (
                                <span key={kw} className="text-xs px-2 py-0.5 rounded-full"
                                    style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
                                    ✓ {kw}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Current Question */}
            <div className="card p-6 space-y-4">
                <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 flex-shrink-0 mt-0.5">
                        Q{question_index + 1}
                    </span>
                    <div>
                        <span className="text-xs mb-1 inline-block capitalize" style={{ color: 'hsl(220 15% 50%)' }}>{current_question.type}</span>
                        <p className="text-base font-medium text-white leading-relaxed">{current_question.question}</p>
                    </div>
                </div>

                <textarea
                    className="input-field resize-none"
                    rows={5}
                    placeholder="Type your answer here… Be specific and use the STAR method (Situation, Task, Action, Result) for behavioural questions."
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                />

                <button
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    disabled={!answer.trim() || loading}
                    onClick={handleSubmit}
                >
                    {loading
                        ? <><Loader2 size={16} className="animate-spin" /> Scoring…</>
                        : <>{question_index + 1 < total_questions ? 'Submit & Next' : 'Submit Final Answer'} <ChevronRight size={16} /></>
                    }
                </button>
            </div>
        </div>
    )
}


function ReportScreen({ report, role, onRetry }: { report: Report; role: string; onRetry: () => void }) {
    const scoreColor = report.overall_score >= 7 ? '#4ade80' : report.overall_score >= 5 ? '#fb923c' : '#f87171'
    const circumference = 2 * Math.PI * 36
    const offset = circumference * (1 - report.overall_score / 10)

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="card p-8 text-center space-y-4">
                <Trophy size={32} className="mx-auto text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Interview Complete!</h2>
                <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>Target role: <span className="text-white font-medium">{role}</span></p>

                {/* Score ring */}
                <div className="relative w-28 h-28 mx-auto">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="7" />
                        <circle cx="40" cy="40" r="36" fill="none" stroke={scoreColor} strokeWidth="7"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="transition-all duration-1000"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-white">{report.grade}</span>
                        <span className="text-xs font-medium" style={{ color: scoreColor }}>{report.overall_score}/10</span>
                    </div>
                </div>

                <p className="text-sm font-medium px-3 py-2 rounded-lg inline-block"
                    style={{ background: 'rgba(99,102,241,0.1)', color: '#a5b4fc' }}>
                    {report.recommendation}
                </p>
            </div>

            <div className="card p-6 space-y-3">
                <p className="text-sm font-medium text-white">Overall Summary</p>
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(220 15% 65%)' }}>{report.summary}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.strengths?.length > 0 && (
                    <div className="card p-5 space-y-2">
                        <p className="text-sm font-medium text-green-400 flex items-center gap-1.5"><CheckCircle2 size={14} /> Strengths</p>
                        <ul className="space-y-1">
                            {report.strengths.map((s, i) => <li key={i} className="text-sm text-white/70">• {s}</li>)}
                        </ul>
                    </div>
                )}
                {report.areas_to_improve?.length > 0 && (
                    <div className="card p-5 space-y-2">
                        <p className="text-sm font-medium text-orange-400 flex items-center gap-1.5"><AlertCircle size={14} /> Improve On</p>
                        <ul className="space-y-1">
                            {report.areas_to_improve.map((a, i) => <li key={i} className="text-sm text-white/70">• {a}</li>)}
                        </ul>
                    </div>
                )}
            </div>

            <button className="btn-secondary w-full flex items-center justify-center gap-2" onClick={onRetry}>
                <RotateCcw size={16} /> Try Another Interview
            </button>
        </div>
    )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
type Phase = 'setup' | 'interviewing' | 'complete'

export default function MockInterviewPage() {
    const [phase, setPhase] = useState<Phase>('setup')
    const [loading, setLoading] = useState(false)
    const [session, setSession] = useState<SessionState | null>(null)
    const [targetRole, setTargetRole] = useState('')
    const [lastFeedback, setLastFeedback] = useState<AnswerFeedback | null>(null)
    const [report, setReport] = useState<Report | null>(null)
    const navigate = useNavigate()

    async function handleStart(role: string, skills: string[]) {
        setLoading(true)
        setTargetRole(role)
        try {
            const { data } = await api.post('/interview/start', { target_role: role, skills, question_count: 5 })
            setSession(data.data)
            setPhase('interviewing')
        } catch (err) {
            console.error('[INTERVIEW] start error', err)
        } finally {
            setLoading(false)
        }
    }

    async function handleAnswer(answer: string) {
        if (!session) return
        setLoading(true)
        try {
            const { data } = await api.post('/interview/answer', {
                session_id: session.session_id,
                question_id: session.current_question.id,
                answer,
            })
            const result = data.data
            setLastFeedback(result.scoring)

            if (result.is_complete) {
                // Fetch full report
                const { data: reportData } = await api.get(`/interview/report/${session.session_id}`)
                setReport(reportData.data.report)
                setPhase('complete')
            } else {
                setSession(prev => prev ? ({
                    ...prev,
                    current_question: result.next_question,
                    question_index: result.question_index,
                }) : null)
            }
        } catch (err) {
            console.error('[INTERVIEW] answer error', err)
        } finally {
            setLoading(false)
        }
    }

    function handleRetry() {
        setPhase('setup')
        setSession(null)
        setLastFeedback(null)
        setReport(null)
    }

    return (
        <div className="min-h-screen py-8 px-4" style={{ background: 'hsl(222 47% 8%)' }}>
            <div className="max-w-3xl mx-auto">
                {phase === 'setup' && <SetupScreen onStart={handleStart} loading={loading} />}
                {phase === 'interviewing' && session && (
                    <QuestionScreen
                        session={session}
                        onAnswer={handleAnswer}
                        lastFeedback={lastFeedback}
                        loading={loading}
                    />
                )}
                {phase === 'complete' && report && (
                    <ReportScreen report={report} role={targetRole} onRetry={handleRetry} />
                )}
            </div>
        </div>
    )
}
