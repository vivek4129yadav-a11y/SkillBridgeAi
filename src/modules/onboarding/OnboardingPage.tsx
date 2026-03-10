import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api'
import { useOnboardingStore } from '@/store/onboardingStore'
import ProgressBar from './ProgressBar'
import Step1_UserType from './steps/Step1_UserType'
import Step2_Profile from './steps/Step2_Profile'
import Step3_Preferences from './steps/Step3_Preferences'
import Step4_Questions from './steps/Step4_Questions'
import Step5_Submit from './steps/Step5_Submit'

export default function OnboardingPage() {
    const navigate = useNavigate()
    const { currentStep, setStep, markCompleted } = useOnboardingStore()
    const [loading, setLoading] = useState(false)
    const [sessionId, setSessionId] = useState('')

    async function goNext(step: number, payload: unknown, endpoint: string) {
        setLoading(true)
        try {
            await api.post(endpoint, payload)
            markCompleted(step)
            setStep(step + 1)
        } catch (err) {
            console.error('[ONBOARDING] step error', err)
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(sessionId: string) {
        navigate(`/processing?session_id=${sessionId}`)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'hsl(222 47% 8%)' }}>
            <div className="w-full max-w-xl animate-slide-up">
                <div className="mb-6">
                    <ProgressBar current={currentStep} total={5} />
                </div>
                <div className="card p-8">
                    {currentStep === 1 && <Step1_UserType onNext={(userType) => goNext(1, { user_type: userType }, '/onboarding/user-type')} loading={loading} />}
                    {currentStep === 2 && <Step2_Profile onNext={(data) => goNext(2, data, '/onboarding/profile')} loading={loading} />}
                    {currentStep === 3 && <Step3_Preferences onNext={(data) => goNext(3, data, '/onboarding/preferences')} loading={loading} />}
                    {currentStep === 4 && <Step4_Questions onNext={(sid: string) => { setSessionId(sid); markCompleted(4); setStep(5); }} />}
                    {currentStep === 5 && <Step5_Submit onSubmit={() => handleSubmit(sessionId)} />}
                </div>
            </div>
        </div>
    )
}
