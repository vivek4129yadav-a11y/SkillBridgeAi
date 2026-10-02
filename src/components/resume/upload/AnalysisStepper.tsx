import React from 'react'
import { CheckCircle2 } from 'lucide-react'

interface AnalysisStepperProps {
    steps: string[]
    currentStep: number
}

export const AnalysisStepper: React.FC<AnalysisStepperProps> = ({ steps, currentStep }) => {
    return (
        <div className="py-12 flex flex-col items-center">
            <div className="relative w-full max-w-md">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-500" 
                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between relative">
                    {steps.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                                idx <= currentStep ? 'bg-blue-500 border-white text-white' : 'bg-white border-slate-100 text-slate-300 shadow-sm'
                            }`}
                        >
                            {idx < currentStep ? (
                                <CheckCircle2 className="w-6 h-6" />
                            ) : (
                                <span className="text-sm font-bold">{idx + 1}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-8 text-center space-y-2">
                <h4 className="text-lg font-bold text-slate-900 animate-pulse">{steps[currentStep]}</h4>
                <p className="text-sm text-slate-400 italic">This usually takes about 10-15 seconds.</p>
            </div>

            <div className="mt-12">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin" />
            </div>
        </div>
    )
}
