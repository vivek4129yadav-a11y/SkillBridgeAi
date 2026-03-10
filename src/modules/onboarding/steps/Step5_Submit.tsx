import { useEffect } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface Props {
    onSubmit: (sessionId: string) => void
}

// This step is reached after answers are submitted in step 4
// The session_id comes from the onboarding store
export default function Step5_Submit({ onSubmit }: Props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onSubmit("dummy-handled-by-parent") // Actual ID is preserved in OnboardingPage state
        }, 2000)
        return () => clearTimeout(timer)
    }, [onSubmit])

    return (
        <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'rgba(99,102,241,0.15)' }}>
                <CheckCircle2 size={32} style={{ color: '#818cf8' }} />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">All set!</h2>
            <p className="text-sm mb-6" style={{ color: 'hsl(220 15% 55%)' }}>
                Your answers have been submitted. We'll now process your profile and find the best matches for you.
            </p>
            <p className="text-xs" style={{ color: 'hsl(220 15% 45%)' }}>Redirecting to processing screen...</p>
        </div>
    )
}
