import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User, Upload, Star } from 'lucide-react'
import api from '@/lib/api'

export default function ProfilePage() {
    const qc = useQueryClient()
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => (await api.get('/profile/me')).data.data,
    })
    const { data: completion } = useQuery({
        queryKey: ['completion'],
        queryFn: async () => (await api.get('/profile/completion-score')).data.data,
    })

    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState<Record<string, string>>({})
    const [uploadResult, setUploadResult] = useState<{ 
        skills_found: Array<{ name: string, proficiency_label?: string }>,
        strengths?: string[],
        weaknesses?: string[],
        career_suggestions?: string[]
    } | null>(null)
    const [uploading, setUploading] = useState(false)

    const updateProfile = useMutation({
        mutationFn: (data: object) => api.patch('/profile/me', data),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['profile'] }); qc.invalidateQueries({ queryKey: ['completion'] }); setEditMode(false) },
    })

    function handleEdit() {
        setForm({ full_name: profile?.full_name || '', phone: profile?.phone || '', city: profile?.city || '' })
        setEditMode(true)
    }

    async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        const fd = new FormData()
        fd.append('resume', file)
        try {
            const { data } = await api.post('/profile/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
            setUploadResult(data.data)
            qc.invalidateQueries({ queryKey: ['profile'] })
            qc.invalidateQueries({ queryKey: ['completion'] })
        } catch (err) {
            console.error('[PROFILE] resume upload failed', err)
        } finally {
            setUploading(false)
        }
    }

    if (isLoading) return <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>

    return (
        <div className="max-w-2xl space-y-6 animate-fade-in">
            {/* Profile Card */}
            <div className="card p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                            <User size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{profile?.full_name || 'Your Profile'}</h2>
                            <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>{profile?.city}, {profile?.state}</p>
                        </div>
                    </div>
                    {completion && (
                        <div className="text-right">
                            <p className="text-2xl font-bold text-white">{completion.score}%</p>
                            <p className="text-xs" style={{ color: 'hsl(220 15% 55%)' }}>Complete</p>
                        </div>
                    )}
                </div>

                {!editMode ? (
                    <div className="space-y-3">
                        {[
                            ['Age', profile?.age],
                            ['Gender', profile?.gender],
                            ['Education', profile?.education_level],
                            ['Phone', profile?.phone || '—'],
                            ['Languages', (profile?.languages || []).join(', ')],
                        ].map(([label, value]) => (
                            <div key={label as string} className="flex justify-between py-2 border-b last:border-none" style={{ borderColor: 'hsl(222 30% 18%)' }}>
                                <span className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>{label}</span>
                                <span className="text-sm text-white capitalize">{value as string}</span>
                            </div>
                        ))}
                        <button id="edit-profile-btn" onClick={handleEdit} className="btn-primary mt-4">Edit Profile</button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {['full_name', 'phone', 'city'].map(k => (
                            <div key={k}>
                                <label className="block text-sm font-medium mb-1.5 capitalize" style={{ color: 'hsl(220 20% 80%)' }}>{k.replace('_', ' ')}</label>
                                <input className="input-field" value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
                            </div>
                        ))}
                        <div className="flex gap-3">
                            <button id="save-profile-btn" onClick={() => updateProfile.mutate(form)} className="btn-primary flex-1" disabled={updateProfile.isPending}>Save</button>
                            <button onClick={() => setEditMode(false)} className="btn-ghost flex-1">Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Resume Upload */}
            <div className="card p-6">
                <h3 className="font-semibold text-white mb-1 flex items-center gap-2"><Upload size={16} style={{ color: '#818cf8' }} /> Resume Upload</h3>
                <p className="text-sm mb-4" style={{ color: 'hsl(220 15% 55%)' }}>Upload your PDF resume to auto-extract skills.</p>
                <label id="resume-upload-area" className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-indigo-500"
                    style={{ borderColor: 'hsl(222 30% 22%)' }}>
                    <Upload size={24} style={{ color: 'hsl(220 15% 40%)' }} className="mb-2" />
                    <p className="text-sm text-white">Click to upload PDF</p>
                    <p className="text-xs mt-1" style={{ color: 'hsl(220 15% 45%)' }}>Max 5MB</p>
                    <input type="file" accept=".pdf" className="sr-only" onChange={handleResumeUpload} disabled={uploading} />
                </label>

                {uploading && <p className="text-sm text-center mt-3" style={{ color: '#818cf8' }}>Parsing resume...</p>}

                {uploadResult && (
                    <div className="mt-4">
                        <p className="text-sm font-medium text-white mb-2 flex items-center gap-1"><Star size={14} style={{ color: '#fbbf24' }} /> Skills extracted:</p>
                        <div className="flex flex-wrap gap-2" id="parsed-skills">
                            {uploadResult.skills_found.map((s, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                                    style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', borderColor: 'rgba(99,102,241,0.2)' }}>
                                    <span className="text-sm font-bold">{s.name}</span>
                                    {s.proficiency_label && (
                                        <span className="text-[10px] uppercase font-black opacity-60 bg-white/10 px-1 rounded">
                                            {s.proficiency_label.substring(0, 3)}
                                        </span>
                                    )}
                                </div>
                            ))}
                            {uploadResult.skills_found.length === 0 && <p className="text-xs" style={{ color: 'hsl(220 15% 45%)' }}>No skills detected. Try a text-based PDF.</p>}
                        </div>
                        
                        {(uploadResult.strengths?.length || 0) > 0 && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                    <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Strengths</p>
                                    <ul className="text-xs text-gray-400 space-y-1">
                                        {uploadResult.strengths?.slice(0, 3).map((st, i) => <li key={i}>• {st}</li>)}
                                    </ul>
                                </div>
                                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                    <p className="text-[10px] font-bold text-amber-400 uppercase mb-1">Career Tip</p>
                                    <p className="text-xs text-gray-400 italic">
                                        {uploadResult.career_suggestions?.[0] || "Consider upskilling in high-demand areas."}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
