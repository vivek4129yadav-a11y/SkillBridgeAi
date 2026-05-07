import React, { useState, useRef } from 'react'
import { 
    Upload, 
    FileText, 
    X, 
    CheckCircle2, 
    AlertCircle,
    Loader2,
    Search
} from 'lucide-react'
import * as Progress from '@radix-ui/react-progress'
import resumeAnalysisService from '@/services/resumeAnalysisService'
import { cn } from '@/lib/utils'

interface ResumeUploadProps {
    onAnalysisComplete: (data: any) => void
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'error' | 'success'

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysisComplete }) => {
    const [file, setFile] = useState<File | null>(null)
    const [targetRole, setTargetRole] = useState('')
    const [uploadState, setUploadState] = useState<UploadState>('idle')
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Please upload a PDF file.')
                return
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('File size should be less than 5MB.')
                return
            }
            setFile(selectedFile)
            setError(null)
        }
    }

    const removeFile = () => {
        setFile(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploadState('uploading')
        setError(null)
        setProgress(10)

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval)
                    return 90
                }
                return prev + 5
            })
        }, 1000)

        const { data, error } = await resumeAnalysisService.uploadAndAnalyzeResume(file, targetRole)
        
        clearInterval(interval)

        if (error) {
            setUploadState('error')
            setError(typeof error === 'string' ? error : 'Analysis failed. Please try again.')
            setProgress(0)
        } else {
            setProgress(100)
            setUploadState('success')
            setTimeout(() => {
                onAnalysisComplete(data)
            }, 1000)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900">Analyze Your Resume</h2>
                <p className="text-slate-500 font-medium">Upload your PDF resume to get instant AI-powered feedback and ATS scoring.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors group relative">
                {!file ? (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center space-y-4 cursor-pointer py-8"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Upload className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-400 mt-1">PDF only (Max 5MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                                <FileText className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{file.name}</span>
                                <span className="text-[10px] font-bold text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <button 
                            onClick={removeFile}
                            disabled={uploadState === 'uploading'}
                            className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                />
            </div>

            {/* Target Role Input */}
            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Target Job Role (Optional)</label>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                        type="text" 
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Full Stack Developer, Data Analyst..."
                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
            )}

            {/* Progress Bar */}
            {uploadState !== 'idle' && uploadState !== 'error' && (
                <div className="space-y-3 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                    <div className="flex justify-between items-center text-sm font-bold text-blue-700">
                        <div className="flex items-center gap-2">
                            {uploadState === 'success' ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}
                            <span>
                                {uploadState === 'uploading' ? 'Uploading & Analyzing...' : 
                                 uploadState === 'success' ? 'Analysis Complete!' : 'Processing...'}
                            </span>
                        </div>
                        <span>{progress}%</span>
                    </div>
                    <Progress.Root
                        className="relative overflow-hidden bg-blue-200 rounded-full w-full h-2"
                        value={progress}
                    >
                        <Progress.Indicator
                            className="bg-blue-600 w-full h-full transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${100 - progress}%)` }}
                        />
                    </Progress.Root>
                </div>
            )}

            {/* Action Button */}
            <button
                disabled={!file || uploadState === 'uploading' || uploadState === 'success'}
                onClick={handleUpload}
                className={cn(
                    "w-full py-4 rounded-2xl font-extrabold text-white transition-all shadow-lg",
                    !file || uploadState === 'uploading' || uploadState === 'success'
                        ? "bg-slate-300 shadow-none cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-blue-100 hover:-translate-y-0.5 active:translate-y-0"
                )}
            >
                {uploadState === 'uploading' ? 'Analyzing...' : 'Start Analysis'}
            </button>
        </div>
    )
}

export default ResumeUpload
