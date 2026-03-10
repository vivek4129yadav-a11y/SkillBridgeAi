import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2, Edit, Plus, Upload, Shield } from 'lucide-react'
import api from '@/lib/api'

export default function AdminPage() {
    const qc = useQueryClient()
    const [secret, setSecret] = useState(sessionStorage.getItem('admin_secret') || '')
    const [secretSaved, setSecretSaved] = useState(!!sessionStorage.getItem('admin_secret'))
    const [activeTab, setActiveTab] = useState<'list' | 'create' | 'bulk'>('list')
    const [bulkJson, setBulkJson] = useState('')

    const adminHeaders = { 'X-Admin-Secret': secret }

    const { data: jobs = [], refetch } = useQuery({
        queryKey: ['admin-jobs'],
        queryFn: async () => (await api.get('/jobs/', { headers: adminHeaders })).data.data,
        enabled: secretSaved,
    })

    const deleteJob = useMutation({
        mutationFn: (id: string) => api.delete(`/jobs/admin/${id}`, { headers: adminHeaders }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-jobs'] }),
    })

    const bulkUpload = useMutation({
        mutationFn: (jobs: object[]) => api.post('/jobs/admin/bulk', jobs, { headers: adminHeaders }),
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-jobs'] }); setActiveTab('list'); setBulkJson('') },
    })

    function saveSecret() {
        sessionStorage.setItem('admin_secret', secret)
        setSecretSaved(true)
    }

    function handleBulkSubmit() {
        try {
            const parsed = JSON.parse(bulkJson)
            bulkUpload.mutate(Array.isArray(parsed) ? parsed : [parsed])
        } catch {
            alert('Invalid JSON')
        }
    }

    if (!secretSaved) {
        return (
            <div className="max-w-md mx-auto mt-16 card p-8 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <Shield size={20} style={{ color: '#818cf8' }} />
                    <h2 className="text-xl font-bold text-white">Admin Access</h2>
                </div>
                <input id="admin-secret-input" type="password" className="input-field" placeholder="Enter admin secret..." value={secret} onChange={e => setSecret(e.target.value)} />
                <button id="save-admin-secret-btn" onClick={saveSecret} className="btn-primary w-full">Access Admin Panel</button>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Shield size={22} style={{ color: '#f87171' }} /> Admin Panel</h2>
                <button onClick={() => { sessionStorage.removeItem('admin_secret'); setSecretSaved(false) }} className="btn-ghost text-xs" style={{ color: '#f87171' }}>
                    Revoke Access
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                {[['list', 'Jobs List'], ['create', 'Add Job'], ['bulk', 'Bulk Upload']].map(([t, label]) => (
                    <button key={t} id={`admin-tab-${t}`} onClick={() => setActiveTab(t as 'list' | 'create' | 'bulk')}
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={activeTab === t ? { background: '#6366f1', color: 'white' } : { background: 'hsl(222 47% 14%)', color: 'hsl(220 15% 55%)' }}>
                        {label}
                    </button>
                ))}
            </div>

            {activeTab === 'list' && (
                <div className="card overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ borderBottom: '1px solid hsl(222 30% 18%)' }}>
                                {['Title', 'Company', 'State', 'Category', 'Actions'].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-xs font-medium" style={{ color: 'hsl(220 15% 55%)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job: { id: string; title: string; company: string; location_state: string; category: string }) => (
                                <tr key={job.id} className="border-b" style={{ borderColor: 'hsl(222 30% 16%)' }}>
                                    <td className="px-4 py-3 text-white">{job.title}</td>
                                    <td className="px-4 py-3" style={{ color: 'hsl(220 15% 55%)' }}>{job.company}</td>
                                    <td className="px-4 py-3" style={{ color: 'hsl(220 15% 55%)' }}>{job.location_state}</td>
                                    <td className="px-4 py-3"><span className="badge text-xs capitalize">{job.category}</span></td>
                                    <td className="px-4 py-3">
                                        <button id={`delete-job-${job.id}`} onClick={() => deleteJob.mutate(job.id)} className="p-1.5 rounded-lg transition-colors hover:bg-red-500/20" style={{ color: '#f87171' }}>
                                            <Trash2 size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {jobs.length === 0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-sm" style={{ color: 'hsl(220 15% 45%)' }}>No jobs yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'bulk' && (
                <div className="space-y-4">
                    <p className="text-sm" style={{ color: 'hsl(220 15% 55%)' }}>Paste a JSON array of job objects to bulk insert.</p>
                    <textarea id="bulk-json-input" className="input-field font-mono text-xs min-h-[300px] resize-y" placeholder='[{"title":"...","company":"...","location_state":"...","category":"..."}]'
                        value={bulkJson} onChange={e => setBulkJson(e.target.value)} />
                    <button id="bulk-upload-btn" onClick={handleBulkSubmit} className="btn-primary" disabled={bulkUpload.isPending}>
                        <Upload size={16} /> {bulkUpload.isPending ? 'Uploading...' : 'Upload Jobs'}
                    </button>
                    {bulkUpload.isSuccess && <p className="text-sm" style={{ color: '#4ade80' }}>✓ Jobs uploaded successfully.</p>}
                    {bulkUpload.isError && <p className="text-sm" style={{ color: '#f87171' }}>Upload failed — check admin secret and JSON format.</p>}
                </div>
            )}
        </div>
    )
}
