import React, { useState } from 'react'
import { CloudUpload, FileText, X, Sparkles, CheckCircle2 } from 'lucide-react'
import resumeAnalysisService from '@/services/resumeAnalysisService'

interface ResumeUploadProps {
    onAnalysisComplete: (result: any) => void
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysisComplete }) => {
    const [file, setFile] = useState<File | null>(null)
    const [targetRole, setTargetRole] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisStep, setAnalysisStep] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const steps = [
        "Reading your resume...",
        "Extracting your experience...",
        "Calculating quality scores...",
        "Generating professional improvements..."
    ]

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0]
            if (f.type !== 'application/pdf') {
                setError('Only PDF resumes are supported')
                return
            }
            if (f.size > 5 * 1024 * 1024) {
                setError('File too large (Max 5MB)')
                return
            }
            setFile(f)
            setError(null)
        }
    }

    const runStepper = async () => {
        for (let i = 0; i < steps.length; i++) {
            setAnalysisStep(i)
            await new Promise(resolve => setTimeout(resolve, 1500))
        }
    }

    const handleAnalyze = async () => {
        if (!file) return
        
        setIsAnalyzing(true)
        setError(null)
        
        // Parallel run: stepper UX and actual backend call
        const [analysisResult] = await Promise.all([
            resumeAnalysisService.uploadAndAnalyzeResume(file, targetRole),
            runStepper()
        ])

        if (analysisResult.error) {
            setError(analysisResult.error.message || 'Analysis failed. Please try again.')
            setIsAnalyzing(false)
        } else {
            onAnalysisComplete(analysisResult.data)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 animate-fade-in-up">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Build a Better Resume</h2>
                <p className="text-slate-500">Get instant AI-driven scores and suggestions designed for the Indian job market.</p>
            </div>

            {!isAnalyzing ? (
                <div className="space-y-6">
                    {/* Upload Zone */}
                    <div 
                        className={`relative border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all ${
                            file ? 'border-green-500 bg-green-50/30' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                        }`}
                        onClick={() => !file && document.getElementById('resume-input')?.click()}
                    >
                        <input 
                            id="resume-input"
                            type="file" 
                            accept=".pdf" 
                            className="hidden" 
                            onChange={onFileChange}
                        />
                        <div className="flex flex-col items-center">
                            {file ? (
                                <>
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <FileText className="w-8 h-8 text-green-600" />
                                    </div>
                                    <p className="font-bold text-slate-800">{file.name}</p>
                                    <p className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(0)} KB</p>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="mt-4 p-1.5 hover:bg-red-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-red-500" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                        <CloudUpload className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <p className="font-bold text-slate-700">Drop your resume here</p>
                                    <p className="text-sm text-slate-400 mt-1">or click to browse PDF (Max 5MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Target Role Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Target Role (Optional)</label>
                        <input 
                            type="text" 
                            value={targetRole}
                            onChange={(e) => setTargetRole(e.target.value)}
                            placeholder="e.g. Mechanical Engineer, Frontend Developer, Sales Manager"
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                        <p className="text-[10px] text-slate-400 italic font-medium">Adding a role helps our AI check for relevant keywords.</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium text-center">
                            {error}
                        </div>
                    )}

                    <button 
                        onClick={handleAnalyze}
                        disabled={!file}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed hover:translate-y-[-2px] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-5 h-5" />
                        Analyze Resume
                    </button>
                </div>
            ) : (
                <div className="py-12 flex flex-col items-center">
                    {/* Fancy Stepper */}
                    <div className="relative w-full max-w-md">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-500 transition-all duration-500" 
                                style={{ width: `${((analysisStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                        <div className="flex justify-between relative">
                            {steps.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                                        idx <= analysisStep ? 'bg-blue-500 border-white text-white' : 'bg-white border-slate-100 text-slate-300 shadow-sm'
                                    }`}
                                >
                                    {idx < analysisStep ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                    ) : (
                                        <span className="text-sm font-bold">{idx + 1}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center space-y-2">
                        <h4 className="text-lg font-bold text-slate-900 animate-pulse">{steps[analysisStep]}</h4>
                        <p className="text-sm text-slate-400 italic">This usually takes about 10-15 seconds.</p>
                    </div>

                    {/* Fun Spinner */}
                    <div className="mt-12">
                        <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResumeUpload
