import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import resumeAnalysisService from '@/services/resumeAnalysisService'
import { FileDropzone } from './upload/FileDropzone'
import { TargetRoleSelector } from './upload/TargetRoleSelector'
import { AnalysisStepper } from './upload/AnalysisStepper'

interface ResumeUploadProps {
    onAnalysisComplete: (result: any) => void
}

const STEPS = [
    "Reading your resume...",
    "Extracting your experience...",
    "Calculating quality scores...",
    "Generating professional improvements..."
]

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onAnalysisComplete }) => {
    const [file, setFile] = useState<File | null>(null)
    const [targetRoles, setTargetRoles] = useState<string[]>([])
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisStep, setAnalysisStep] = useState(0)
    const [error, setError] = useState<string | null>(null)

    const runStepper = async () => {
        for (let i = 0; i < STEPS.length; i++) {
            setAnalysisStep(i)
            await new Promise(resolve => setTimeout(resolve, 1500))
        }
    }

    const handleAnalyze = async () => {
        if (!file) return
        setIsAnalyzing(true)
        setError(null)
        
        const [analysisResult] = await Promise.all([
            resumeAnalysisService.uploadAndAnalyzeResume(file, targetRoles),
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
                    <FileDropzone 
                        file={file} 
                        onFileSelected={setFile} 
                        onError={setError} 
                    />

                    <TargetRoleSelector 
                        targetRoles={targetRoles} 
                        onChange={setTargetRoles} 
                    />

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
                <AnalysisStepper steps={STEPS} currentStep={analysisStep} />
            )}
        </div>
    )
}

export default ResumeUpload
