import React from 'react'
import { useToastStore, Toast as ToastType } from '@/store/toastStore'
import { X, AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const Toaster: React.FC = () => {
    const { toasts, removeToast } = useToastStore()

    return (
        <div className="fixed bottom-0 right-0 p-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-md w-full">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
            ))}
        </div>
    )
}

const ToastItem: React.FC<{ toast: ToastType; onRemove: () => void }> = ({ toast, onRemove }) => {
    const isDestructive = toast.variant === 'destructive'
    const isSuccess = toast.variant === 'success'

    return (
        <div
            className={cn(
                "pointer-events-auto flex items-start gap-4 p-4 rounded-2xl border shadow-2xl animate-scale-in",
                "glass-card",
                isDestructive && "border-rose-500/50 bg-rose-500/10",
                isSuccess && "border-emerald-500/50 bg-emerald-500/10"
            )}
        >
            <div className="flex-shrink-0 mt-0.5">
                {isDestructive ? (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                ) : isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                    <Info className="w-5 h-5 text-indigo-400" />
                )}
            </div>

            <div className="flex-grow min-w-0">
                {toast.title && (
                    <h4 className={cn(
                        "text-sm font-bold tracking-tight mb-1 uppercase opacity-80",
                        isDestructive && "text-rose-200",
                        isSuccess && "text-emerald-200",
                        !isDestructive && !isSuccess && "text-indigo-200"
                    )}>
                        {toast.title}
                    </h4>
                )}
                {toast.description && (
                    <p className="text-sm text-white/70 leading-relaxed font-medium">
                        {toast.description}
                    </p>
                )}
            </div>

            <button
                onClick={onRemove}
                className="flex-shrink-0 text-white/30 hover:text-white/60 transition-colors rounded-lg p-1 hover:bg-white/5"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}
