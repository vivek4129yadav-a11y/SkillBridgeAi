import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import AuthPage from '@/modules/auth/AuthPage'
import OnboardingPage from '@/modules/onboarding/OnboardingPage'
import ProcessingPage from '@/modules/processing/ProcessingPage'
import DashboardPage from '@/modules/dashboard/DashboardPage'
import ProfilePage from '@/modules/profile/ProfilePage'
import JobsPage from '@/modules/jobs/JobsPage'
import AdminPage from '@/modules/admin/AdminPage'
import AppLayout from '@/components/layout/AppLayout'
import { AssessmentPage } from '@/modules/assessment/AssessmentPage'
import { GapAnalysisPage } from '@/modules/gap_analysis/GapAnalysisPage'
import { ResourcesAdmin } from '@/modules/admin/ResourcesAdmin'

// Simple guard — redirect to /auth if not logged in
function Protected({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthPage />} />

                <Route path="/onboarding" element={
                    <Protected><OnboardingPage /></Protected>
                } />
                <Route path="/processing" element={
                    <Protected><ProcessingPage /></Protected>
                } />

                <Route path="/admin/resources" element={<ResourcesAdmin />} />

                {/* Authenticated pages — wrapped in AppLayout (sidebar + topbar) */}
                <Route path="/" element={<Protected><AppLayout /></Protected>}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="assessment" element={<AssessmentPage />} />
                    <Route path="gap-analysis" element={<GapAnalysisPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="jobs" element={<JobsPage />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
