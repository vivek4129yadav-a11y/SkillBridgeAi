import React from 'react'

export const ResumeLoadingState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading your analysis...</p>
        </div>
    )
}
