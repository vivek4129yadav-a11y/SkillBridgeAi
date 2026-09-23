import React, { useState, useRef } from 'react'
import { UploadCloud, CheckCircle2, Plus, X, ArrowRight, Loader2, Sparkles, FileText } from 'lucide-react'
import api from '@/lib/api'

interface Props {
    onNext: (sessionId: string) => void
}

const SUGGESTED_SKILLS = [
    'Python', 'SQL', 'React', 'JavaScript', 'Excel', 'Data Analysis',
    'Communication', 'Leadership', 'Sales', 'Customer Support',
    'Project Management', 'Digital Marketing', 'Git', 'FastAPI'
]

export default function Step4_Questions({ onNext }: Props) {
    const [skills, setSkills] = useState<string[]>([])
    const [customSkill, setCustomSkill] = useState('')
    const [uploading, setUploading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [uploadedFileName, setUploadedFileName] = useState<string | null>(null)
    const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const toggleSkill = (skill: string) => {
        setSkills(prev => 
            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
        )
    }

    const addCustomSkill = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        const trimmed = customSkill.trim()
        if (trimmed && !skills.includes(trimmed)) {
            setSkills(prev => [...prev, trimmed])
            setCustomSkill('')
        }
    }

    const removeSkill = (skillToRemove: string) => {
        setSkills(prev => prev.filter(s => s !== skillToRemove))
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        setUploadedFileName(file.name)
        setUploadSuccessMsg(null)

        const formData = new FormData()
        formData.append('resume', file)

        try {
            const { data } = await api.post('/profile/resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            const parsedSkills: string[] = []
            if (data?.data?.parser_result?.skills) {
                for (const s of data.data.parser_result.skills) {
                    const name = typeof s === 'string' ? s : s.name
                    if (name && !parsedSkills.includes(name)) {
                        parsedSkills.push(name)
                    }
                }
            }

            if (parsedSkills.length > 0) {
                setSkills(prev => Array.from(new Set([...prev, ...parsedSkills])))
                setUploadSuccessMsg(`Parsed ${parsedSkills.length} skills from ${file.name}`)
            } else {
                setUploadSuccessMsg(`Resume uploaded successfully: ${file.name}`)
            }
        } catch (err) {
            console.error('[ONBOARDING] Resume upload failed', err)
            setUploadSuccessMsg(`Uploaded ${file.name}`)
        } finally {
            setUploading(false)
        }
    }

    const handleContinue = async () => {
        setSubmitting(true)
        try {
            const answerPayload = [
                {
                    question_id: 'skills',
                    question_text: 'Core Skills',
                    answer: skills.join(', ') || 'General Skills',
                }
            ]
            const { data } = await api.post('/onboarding/submit-answers', { answers: answerPayload })
            onNext(data.data.session_id)
        } catch (e) {
            console.error('[ONBOARDING] Submit failed', e)
            onNext('direct-onboarding-session')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-white">Skills & Resume</h2>
                <p className="text-sm mt-0.5" style={{ color: 'hsl(220 15% 55%)' }}>
                    Upload your resume for instant parsing or select your core skills.
                </p>
            </div>

            {/* Resume Upload Box */}
            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all hover:border-indigo-500 hover:bg-indigo-500/5 group"
                style={{ borderColor: 'hsl(222 30% 22%)', background: 'hsl(222 47% 10%)' }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.docx,.txt"
                    className="hidden"
                />

                {uploading ? (
                    <div className="flex flex-col items-center py-2 gap-2">
                        <Loader2 className="animate-spin text-indigo-400" size={28} />
                        <p className="text-sm font-medium text-white">Parsing {uploadedFileName}...</p>
                        <p className="text-xs text-slate-400">Extracting skills and career history</p>
                    </div>
                ) : uploadSuccessMsg ? (
                    <div className="flex flex-col items-center py-2 gap-2">
                        <CheckCircle2 className="text-emerald-400" size={28} />
                        <p className="text-sm font-semibold text-emerald-300">{uploadSuccessMsg}</p>
                        <p className="text-xs text-slate-400">Click to upload a different resume file</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center py-2 gap-2">
                        <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <UploadCloud className="text-indigo-400" size={26} />
                        </div>
                        <p className="text-sm font-semibold text-white">
                            Upload your Resume <span className="text-indigo-400">(PDF, DOCX)</span>
                        </p>
                        <p className="text-xs text-slate-400">
                            Automatic layout-aware extraction of skills, education, and roles
                        </p>
                    </div>
                )}
            </div>

            {/* Skills selection */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                        <Sparkles size={14} className="text-amber-400" />
                        Selected Skills ({skills.length})
                    </label>
                    {skills.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setSkills([])}
                            className="text-xs text-slate-400 hover:text-slate-200 transition"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* Selected skills chips */}
                {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2 p-3 rounded-xl border min-h-[44px]" style={{ background: 'hsl(220 30% 6%)', borderColor: 'hsl(222 30% 18%)' }}>
                        {skills.map(s => (
                            <span
                                key={s}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                            >
                                {s}
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeSkill(s); }}
                                    className="hover:text-white"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-xs text-slate-500 italic">No skills selected yet. Choose suggested skills below or type your own.</p>
                )}

                {/* Add custom skill input */}
                <form onSubmit={addCustomSkill} className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add custom skill (e.g. Flutter, Django, AWS)..."
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        className="input text-xs flex-1"
                    />
                    <button
                        type="submit"
                        disabled={!customSkill.trim()}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-40 transition flex items-center gap-1"
                    >
                        <Plus size={14} /> Add
                    </button>
                </form>

                {/* Suggested skills pills */}
                <div>
                    <p className="text-xs font-medium text-slate-400 mb-2">Popular Skills:</p>
                    <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_SKILLS.map(s => {
                            const isSelected = skills.includes(s)
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => toggleSkill(s)}
                                    className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                                    style={
                                        isSelected
                                            ? { background: '#6366f1', color: 'white' }
                                            : { background: 'hsl(222 47% 12%)', color: 'hsl(220 15% 65%)', border: '1px solid hsl(222 30% 20%)' }
                                    }
                                >
                                    {isSelected ? `✓ ${s}` : `+ ${s}`}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'hsl(222 30% 18%)' }}>
                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={submitting}
                    className="text-xs text-slate-400 hover:text-slate-200 transition"
                >
                    Skip for now
                </button>

                <button
                    type="button"
                    onClick={handleContinue}
                    disabled={submitting}
                    className="btn-primary text-sm px-6 py-2.5 rounded-xl flex items-center gap-2"
                >
                    {submitting ? <Loader2 className="animate-spin" size={16} /> : null}
                    Continue to Dashboard <ArrowRight size={16} />
                </button>
            </div>
        </div>
    )
}
