import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import VerifyOTPPage from '@/pages/auth/VerifyOTPPage'
import StudentOnboarding from '@/pages/onboarding/StudentOnboarding'
import BlueCollarOnboarding from '@/pages/onboarding/BlueCollarOnboarding'
import InformalWorkerOnboarding from '@/pages/onboarding/InformalWorkerOnboarding'
import EmployerOnboarding from '@/pages/onboarding/EmployerOnboarding'
import NGOOnboarding from '@/pages/onboarding/NGOOnboarding'
import GovernmentOnboarding from '@/pages/onboarding/GovernmentOnboarding'
import ProcessingPage from '@/modules/processing/ProcessingPage'
import DashboardPage from '@/modules/dashboard/DashboardPage'
import SeekerDashboard from '@/pages/dashboard/SeekerDashboard'
import EmployerDashboard from '@/pages/dashboard/EmployerDashboard'
import NGODashboard from '@/pages/dashboard/NGODashboard'
import GovtDashboard from '@/pages/dashboard/GovtDashboard'
import ProfilePage from '@/modules/profile/ProfilePage'
import JobsPage from '@/modules/jobs/JobsPage'
import AdminPage from '@/modules/admin/AdminPage'
import AppLayout from '@/components/layout/AppLayout'
import { AssessmentPage } from '@/modules/assessment/AssessmentPage'
import { GapAnalysisPage } from '@/modules/gap_analysis/GapAnalysisPage'
import { ResourcesAdmin } from '@/modules/admin/ResourcesAdmin'
import ResumeAnalysisPage from '@/pages/ResumeAnalysisPage'

// Simple guard — redirect to /login if not logged in
function Protected({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function DashboardResolver() {
    const user = useAuthStore((s) => s.user)
    const role = user?.user_type

    const seekerRoles = ['individual_youth', 'individual_bluecollar', 'individual_informal']
    if (role && seekerRoles.includes(role)) {
        return <SeekerDashboard />
    }

    if (role === 'org_employer') return <EmployerDashboard />
    if (role === 'org_ngo') return <NGODashboard />
    if (role === 'org_govt') return <GovtDashboard />

    return <DashboardPage />
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/verify-otp" element={<VerifyOTPPage />} />

                <Route path="/onboarding/student" element={<Protected><StudentOnboarding /></Protected>} />
                <Route path="/onboarding/blue-collar" element={<Protected><BlueCollarOnboarding /></Protected>} />
                <Route path="/onboarding/informal-worker" element={<Protected><InformalWorkerOnboarding /></Protected>} />
                <Route path="/onboarding/employer" element={<Protected><EmployerOnboarding /></Protected>} />
                <Route path="/onboarding/ngo" element={<Protected><NGOOnboarding /></Protected>} />
                <Route path="/onboarding/government" element={<Protected><GovernmentOnboarding /></Protected>} />
                <Route path="/processing" element={
                    <Protected><ProcessingPage /></Protected>
                } />

                <Route path="/admin/resources" element={<ResourcesAdmin />} />

                {/* Authenticated pages — wrapped in AppLayout (sidebar + topbar) */}
                <Route path="/" element={<Protected><AppLayout /></Protected>}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<DashboardResolver />} />
                    <Route path="dashboard/employer" element={<EmployerDashboard />} />
                    <Route path="dashboard/ngo" element={<NGODashboard />} />
                    <Route path="dashboard/government" element={<GovtDashboard />} />
                    <Route path="assessment" element={<AssessmentPage />} />
                    <Route path="gap-analysis" element={<GapAnalysisPage />} />
                    <Route path="resume-analysis" element={<ResumeAnalysisPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="jobs" element={<JobsPage />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
