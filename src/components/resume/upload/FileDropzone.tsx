import React from 'react'
import { CloudUpload, FileText, X } from 'lucide-react'

interface FileDropzoneProps {
    file: File | null
    onFileSelected: (file: File | null) => void
    onError: (err: string | null) => void
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({ file, onFileSelected, onError }) => {
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0]
            if (f.type !== 'application/pdf') {
                onError('Only PDF resumes are supported')
                return
            }
            if (f.size > 5 * 1024 * 1024) {
                onError('File too large (Max 5MB)')
                return
            }
            onFileSelected(f)
            onError(null)
        }
    }

    return (
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
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onFileSelected(null); }}
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
    )
}
