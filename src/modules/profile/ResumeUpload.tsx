import React, { useState } from 'react';
import { Upload, Star, AlertCircle, Loader2, FileText } from 'lucide-react';
import api from '@/lib/api';
import { useSkillSummary } from '@/hooks/useSkills';
import { useQueryClient } from '@tanstack/react-query';

export const ResumeUpload: React.FC = () => {
    const qc = useQueryClient();
    const [uploading, setUploading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [lastResult, setLastResult] = useState<any>(null);
    const { data: summary, refetch: refetchSummary } = useSkillSummary();

    async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setErrorMsg(null);
        const fd = new FormData();
        fd.append('resume', file);
        try {
            const res = await api.post('/profile/resume', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
            setLastResult(res.data.data);
            await refetchSummary();
            await qc.invalidateQueries({ queryKey: ['skills'] });
        } catch (err: any) {
            console.error('[PROFILE] resume upload failed', err);
            const errCode = err?.response?.data?.detail?.error_code;
            if (errCode === 'RESUME_NO_TEXT') {
                setErrorMsg("This PDF appears to be a scanned image. Please upload a text-based PDF.");
            } else if (errCode === 'RESUME_GEMINI_FAILED') {
                setErrorMsg("Could not process your resume right now. Please try again in a moment.");
            } else {
                setErrorMsg("Upload failed. Please try again.");
            }
        } finally {
            setUploading(false);
            // clear file input so user can try again easily
            e.target.value = '';
        }
    }

    return (
        <div className="card p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2 text-lg">
                <FileText size={20} className="text-blue-500" /> Resume Upload
            </h3>
            <p className="text-sm mb-6 text-gray-500 font-medium">Upload your PDF, Word, or Text resume to auto-extract skills and career insights.</p>
            
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50/50 group focus-within:ring-4 focus-within:ring-blue-100">
                <Upload size={32} className="mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-700">Click to upload (PDF, DOCX, TXT)</p>
                <p className="text-xs mt-1 text-gray-400">Max 5MB</p>
                <input type="file" accept=".pdf,.docx,.txt" className="sr-only" onChange={handleResumeUpload} disabled={uploading} />
            </label>

            {uploading && (
                <div className="mt-6 flex items-center justify-center gap-2 text-blue-600 bg-blue-50 py-3 rounded-lg font-medium animate-pulse">
                    <Loader2 size={18} className="animate-spin" />
                    ⏳ Analyzing your resume with AI...
                </div>
            )}

            {errorMsg && (
                <div className="mt-6 bg-red-50 text-red-800 p-4 rounded-lg flex items-start gap-3 border border-red-200">
                    <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-600" />
                    <div className="flex flex-col gap-2">
                      <span className="font-medium">{errorMsg}</span>
                      <button onClick={() => setErrorMsg(null)} className="text-sm font-bold bg-white px-3 py-1.5 rounded-md border border-red-200 w-fit hover:bg-red-50">
                         Retry
                      </button>
                    </div>
                </div>
            )}

            {lastResult && !uploading && !errorMsg && (
                <div className="mt-8 border-t border-gray-100 pt-6 space-y-6">
                    {/* Insights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Strengths</h5>
                            <ul className="text-sm text-emerald-700 space-y-1">
                                {lastResult.strengths?.map((s: string, i: number) => (
                                    <li key={i}>• {s}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                            <h5 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">Areas to Improve</h5>
                            <ul className="text-sm text-amber-700 space-y-1">
                                {lastResult.weaknesses?.map((w: string, i: number) => (
                                    <li key={i}>• {w}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                             <FileText size={16} className="text-blue-500" /> Career Path Suggestions
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {lastResult.career_suggestions?.map((c: string, i: number) => (
                                <span key={i} className="px-3 py-1 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-xs font-bold">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>

                    {lastResult.skill_gap_analysis && (
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl italic text-sm text-gray-600">
                            <strong>Gap Analysis:</strong> {lastResult.skill_gap_analysis}
                        </div>
                    )}

                    <div className="pt-4">
                        <div className="flex justify-between items-end mb-4">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                              <Star size={16} className="text-amber-500" /> Skills extracted
                          </h4>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                              {lastResult.experience_level} LEVEL
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {lastResult.skills_found?.map((skill: any, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 py-1.5 px-3 rounded-lg group">
                                    <span className="text-sm font-bold text-indigo-900">{skill.name}</span>
                                    <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-wider bg-white px-1.5 py-0.5 rounded">
                                        {skill.proficiency_label?.substring(0,3)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
