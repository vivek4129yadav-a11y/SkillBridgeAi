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
import TalentPool from '@/pages/dashboard/TalentPool'
import ManagePostings from '@/pages/dashboard/ManagePostings'
import Interviews from '@/pages/dashboard/Interviews'
import OrgSettings from '@/pages/dashboard/OrgSettings'
import Pipeline from '@/pages/dashboard/Pipeline'
import BrandCenter from '@/pages/dashboard/BrandCenter'
import Messaging from '@/pages/dashboard/Messaging'
import AIConfig from '@/pages/dashboard/AIConfig'
import CampusHub from '@/pages/dashboard/CampusHub'
import OffersContracts from '@/pages/dashboard/OffersContracts'
import Referrals from '@/pages/dashboard/Referrals'
import AIInterviewer from '@/pages/dashboard/AIInterviewer'
import JDOptimizer from '@/pages/dashboard/JDOptimizer'
import TeamManagement from '@/pages/dashboard/TeamManagement'
import HiringInsights from '@/pages/dashboard/HiringInsights'
import SkillIntel from '@/pages/dashboard/SkillIntel'
import ProfilePage from '@/modules/profile/ProfilePage'
import JobsPage from '@/modules/jobs/JobsPage'
import AdminPage from '@/modules/admin/AdminPage'
import AppLayout from '@/components/layout/AppLayout'
import { AssessmentPage } from '@/modules/assessment/AssessmentPage'
import { GapAnalysisPage } from '@/modules/gap_analysis/GapAnalysisPage'
import { ResourcesAdmin } from '@/modules/admin/ResourcesAdmin'
import ResumeAnalysisPage from '@/pages/ResumeAnalysisPage'
import { SEEKER_ROLES } from '@/constants/roles'
import { Toaster } from '@/components/layout/Toaster'

// Simple guard — redirect to /login if not logged in
function Protected({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

const seekerRoles = SEEKER_ROLES
const employerRoles = ['org_employer']

function RoleGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
    const user = useAuthStore((s) => s.user)
    if (!user || !allowedRoles.includes(user.user_type ?? '')) {
        return <Navigate to="/dashboard" replace />
    }
    return <>{children}</>
}

function DashboardResolver() {
    const user = useAuthStore((s) => s.user)
    const role = user?.user_type

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
            <Toaster />
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
                    
                    {/* Employer Specific Routes */}
                    <Route path="talent-pool" element={<RoleGuard allowedRoles={employerRoles}><TalentPool /></RoleGuard>} />
                    <Route path="manage-jobs" element={<RoleGuard allowedRoles={employerRoles}><ManagePostings /></RoleGuard>} />
                    <Route path="interviews" element={<RoleGuard allowedRoles={employerRoles}><Interviews /></RoleGuard>} />
                    <Route path="pipeline" element={<RoleGuard allowedRoles={employerRoles}><Pipeline /></RoleGuard>} />
                    <Route path="brand-center" element={<RoleGuard allowedRoles={employerRoles}><BrandCenter /></RoleGuard>} />
                    <Route path="messaging" element={<RoleGuard allowedRoles={employerRoles}><Messaging /></RoleGuard>} />
                    <Route path="ai-config" element={<RoleGuard allowedRoles={employerRoles}><AIConfig /></RoleGuard>} />
                    <Route path="campus-hub" element={<RoleGuard allowedRoles={employerRoles}><CampusHub /></RoleGuard>} />
                    <Route path="offers" element={<RoleGuard allowedRoles={employerRoles}><OffersContracts /></RoleGuard>} />
                    <Route path="referrals" element={<RoleGuard allowedRoles={employerRoles}><Referrals /></RoleGuard>} />
                    <Route path="ai-interviewer" element={<RoleGuard allowedRoles={employerRoles}><AIInterviewer /></RoleGuard>} />
                    <Route path="jd-optimizer" element={<RoleGuard allowedRoles={employerRoles}><JDOptimizer /></RoleGuard>} />
                    <Route path="insights" element={<RoleGuard allowedRoles={employerRoles}><HiringInsights /></RoleGuard>} />
                    <Route path="skill-intel" element={<RoleGuard allowedRoles={employerRoles}><SkillIntel /></RoleGuard>} />
                    <Route path="team" element={<RoleGuard allowedRoles={employerRoles}><TeamManagement /></RoleGuard>} />
                    <Route path="settings/org" element={<RoleGuard allowedRoles={employerRoles}><OrgSettings /></RoleGuard>} />

                    <Route path="dashboard/employer" element={<EmployerDashboard />} />
                    <Route path="dashboard/ngo" element={<NGODashboard />} />
                    <Route path="dashboard/government" element={<GovtDashboard />} />
                    <Route path="assessment" element={<RoleGuard allowedRoles={seekerRoles}><AssessmentPage /></RoleGuard>} />
                    <Route path="gap-analysis" element={<RoleGuard allowedRoles={seekerRoles}><GapAnalysisPage /></RoleGuard>} />
                    <Route path="resume-analysis" element={<RoleGuard allowedRoles={seekerRoles}><ResumeAnalysisPage /></RoleGuard>} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="jobs" element={<JobsPage />} />
                    <Route path="admin" element={<AdminPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
