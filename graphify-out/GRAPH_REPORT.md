# Graph Report - frontend  (2026-10-03)

## Corpus Check
- 166 files · ~55,845 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 690 nodes · 975 edges · 66 communities (33 shown, 13 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `433c66cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- App.tsx
- dependencies
- GapAnalysisPage.tsx
- DashboardPage.tsx
- OnboardingPage.tsx
- ResumeAnalysisPage.tsx
- devDependencies
- ChatWidget.tsx
- SuggestionCards.tsx
- compilerOptions
- GovernmentDashboard.tsx
- ExtractedProfile.tsx
- MockInterviewPage.tsx
- SkillBubbleGrid.tsx
- api.ts
- ResourcesAdmin.tsx
- compilerOptions
- assessment.ts
- EmptyState.tsx
- ErrorCard.tsx
- Skeleton.tsx
- GovernmentOnboarding.jsx
- tailwind.config.ts
- Component Reference
- Key Components
- SkillBridge AI (SANKALP) — Frontend
- landing/types.ts
- rules/graphify.md
- workflows/graphify.md
- useAuth
- declarations.d.ts
- Toaster.tsx
- BlueCollarOnboarding.jsx
- InformalWorkerOnboarding.jsx
- EmployerDashboard.jsx
- EmployerOnboarding.jsx
- StudentOnboarding.jsx
- onboardingService.ts
- NGOOnboarding.jsx
- DemoLoginBar.tsx
- roles.ts
- MockInterviewPage
- QuickPathFinder.tsx
- ProfilePage
- OrgSettings.tsx
- Interviews.tsx

## God Nodes (most connected - your core abstractions)
1. `api` - 29 edges
2. `useAuthStore` - 24 edges
3. `compilerOptions` - 18 edges
4. `useAuth()` - 10 edges
5. `Component Reference` - 10 edges
6. `SkillBridge AI (SANKALP) — Frontend` - 8 edges
7. `Onboarding` - 8 edges
8. `useLanguage` - 7 edges
9. `onboardingService` - 7 edges
10. `compilerOptions` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Protected()` --calls--> `useAuthStore`  [EXTRACTED]
  src/App.tsx → src/store/authStore.ts
- `DemoLoginBar()` --calls--> `useAuthStore`  [EXTRACTED]
  src/components/auth/DemoLoginBar.tsx → src/store/authStore.ts
- `useAuth()` --calls--> `useAuthStore`  [EXTRACTED]
  src/hooks/useAuth.ts → src/store/authStore.ts
- `useAuth()` --calls--> `useOnboardingStore`  [EXTRACTED]
  src/hooks/useAuth.ts → src/store/onboardingStore.ts
- `ChatWidget()` --calls--> `useAuthStore`  [EXTRACTED]
  src/modules/chat/ChatWidget.tsx → src/store/authStore.ts

## Import Cycles
- None detected.

## Communities (66 total, 13 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.13
Nodes (14): Protected(), AppLayout(), nav, Sidebar(), AdminPage(), AuthPage(), GovernmentDashboard(), LogLine (+6 more)

### Community 1 - "dependencies"
Cohesion: 0.04
Nodes (45): axios, clsx, lucide-react, dependencies, axios, clsx, lucide-react, @radix-ui/react-avatar (+37 more)

### Community 2 - "GapAnalysisPage.tsx"
Cohesion: 0.10
Nodes (23): useGapReport(), useRunGapAnalysis(), useSkillProfile(), GapAnalysisBanner(), GapAnalysisEmptyState(), GapAnalysisEmptyStateProps, GapAnalysisLoading(), GapAnalysisPage() (+15 more)

### Community 3 - "DashboardPage.tsx"
Cohesion: 0.08
Nodes (28): DashboardPage(), useDashboard(), CareerIdentity, CareerIdentityCard(), useCareerIdentity(), CircularProgress(), CircularProgressProps, RecommendationsWidget() (+20 more)

### Community 4 - "OnboardingPage.tsx"
Cohesion: 0.08
Nodes (21): ResumeDropzone(), ResumeDropzoneProps, SkillPicker(), SkillPickerProps, SUGGESTED_SKILLS, OnboardingPage(), ProgressBar(), Props (+13 more)

### Community 5 - "ResumeAnalysisPage.tsx"
Cohesion: 0.06
Nodes (30): ScoreDashboardIssues(), ScoreDashboardIssuesProps, TargetRolesBadges(), TargetRolesBadgesProps, ExtractedProfile(), ResumeScoreWidget(), ResumeUpload(), ResumeUploadProps (+22 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (26): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript (+18 more)

### Community 7 - "ChatWidget.tsx"
Cohesion: 0.15
Nodes (15): LanguageToggle(), titles, Topbar(), LanguageState, useLanguage, Language, StringKey, UI_STRINGS (+7 more)

### Community 8 - "SuggestionCards.tsx"
Cohesion: 0.12
Nodes (17): BulletImprovementResult(), BulletImprovementResultProps, BulletImprover(), SuggestionCards(), BulletImprovementsList(), BulletImprovementsListProps, IndiaFlagsCard(), IndiaFlagsCardProps (+9 more)

### Community 9 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules (+16 more)

### Community 10 - "GovernmentDashboard.tsx"
Cohesion: 0.18
Nodes (15): DistrictsTab(), DistrictsTabProps, COLORS, OverviewTab(), OverviewTabProps, StatCard(), StatCardProps, YouthTab() (+7 more)

### Community 11 - "ExtractedProfile.tsx"
Cohesion: 0.18
Nodes (16): EducationSection(), EducationSectionProps, directionColors, ExperienceTimeline(), ExperienceTimelineProps, levelConfig, SkillsMatrix(), SkillsMatrixProps (+8 more)

### Community 12 - "MockInterviewPage.tsx"
Cohesion: 0.22
Nodes (11): QuestionScreen(), QuestionScreenProps, ReportScreen(), ReportScreenProps, SetupScreen(), SetupScreenProps, Screen, AnswerFeedback (+3 more)

### Community 13 - "SkillBubbleGrid.tsx"
Cohesion: 0.18
Nodes (9): DOMAIN_SEEDS, SkillBubbleButton(), SkillBubbleButtonProps, SkillBubbleGrid(), Bubble, SkillBubbleGridProps, CAREER_OPTIONS, Props (+1 more)

### Community 14 - "api.ts"
Cohesion: 0.14
Nodes (8): log, api, log, logger(), authService, UserInfo, log, ResumeAnalysisService

### Community 15 - "ResourcesAdmin.tsx"
Cohesion: 0.23
Nodes (8): AdminUnlockModal(), AdminUnlockModalProps, BulkUploadTab(), BulkUploadTabProps, Resource, ResourceListTab(), ResourceListTabProps, ResourcesAdmin()

### Community 16 - "compilerOptions"
Cohesion: 0.20
Nodes (9): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, strict (+1 more)

### Community 17 - "assessment.ts"
Cohesion: 0.33
Nodes (5): AssessmentHistoryItem, AssessmentSession, AssessmentStatus, Question, NOTE: skills_found imported specifically where needed or kept loose here

### Community 21 - "GovernmentOnboarding.jsx"
Cohesion: 0.32
Nodes (6): useToast(), ACCESS_LEVELS, DEPARTMENTS, DISTRICTS, GovernmentOnboarding(), STATES

### Community 26 - "Component Reference"
Cohesion: 0.07
Nodes (29): Admin, AdminPage, AppLayout, Auth, AuthPage, Chat, ChatWidget, Component Reference (+21 more)

### Community 27 - "Key Components"
Cohesion: 0.22
Nodes (8): 1. `ResumeUpload.tsx`, 2. `ScoreDashboard.tsx` & `ScoreRing.tsx`, 3. `SuggestionCards.tsx`, 4. `BulletImprover.tsx`, 5. `ExtractedProfile.tsx`, Integration, Key Components, Resume Analysis UI Documentation

### Community 28 - "SkillBridge AI (SANKALP) — Frontend"
Cohesion: 0.17
Nodes (11): Architecture, Engineering, Environment Variables, Getting Started, Installation, Prerequisites, Project, Routes (+3 more)

### Community 29 - "landing/types.ts"
Cohesion: 0.15
Nodes (8): FACTS, ENGINES, PROFILES, STORIES, CareerSimulatorProfile, EngineTab, PersonaStory, TrustFact

### Community 32 - "useAuth"
Cohesion: 0.24
Nodes (9): useAuth(), requestOTP(), verifyOTP(), LoginForm(), handleSubmit(), Props, OTPVerifyForm(), handleSubmit() (+1 more)

### Community 33 - "declarations.d.ts"
Cohesion: 0.18
Nodes (10): @/pages/dashboard/EmployerDashboard, @/pages/dashboard/GovtDashboard, @/pages/dashboard/NGODashboard, @/pages/dashboard/SeekerDashboard, @/pages/onboarding/BlueCollarOnboarding, @/pages/onboarding/EmployerOnboarding, @/pages/onboarding/GovernmentOnboarding, @/pages/onboarding/InformalWorkerOnboarding (+2 more)

### Community 34 - "Toaster.tsx"
Cohesion: 0.33
Nodes (7): cn(), Toaster(), ToastItem(), Toast, ToastStore, ToastVariant, useToastStore

### Community 35 - "BlueCollarOnboarding.jsx"
Cohesion: 0.25
Nodes (6): EMPLOYMENT_STATUS, EXP_YEARS, LANGUAGES, RADII, STATES, TRADES

### Community 36 - "InformalWorkerOnboarding.jsx"
Cohesion: 0.25
Nodes (6): GOALS, INCOME_RANGES, LANGUAGES, LITERACY_LEVELS, STATES, WORK_TYPES

### Community 38 - "EmployerOnboarding.jsx"
Cohesion: 0.29
Nodes (5): COMPANY_SIZES, INDUSTRIES, SKILLS, STATES, WORK_TYPES

### Community 39 - "StudentOnboarding.jsx"
Cohesion: 0.29
Nodes (5): EDUCATION_LEVELS, INTERESTS, LANGUAGES, STATES, STREAMS

### Community 40 - "onboardingService.ts"
Cohesion: 0.29
Nodes (6): BlueCollarOnboardingData, EmployerOnboardingData, GovtOnboardingData, InformalWorkerOnboardingData, NgoOnboardingData, StudentOnboardingData

### Community 41 - "NGOOnboarding.jsx"
Cohesion: 0.33
Nodes (4): BENEFICIARIES, SECTORS, STATES, onboardingService

### Community 42 - "DemoLoginBar.tsx"
Cohesion: 0.40
Nodes (3): DemoLoginBar(), DemoLoginBarProps, PERSONAS

## Knowledge Gaps
- **246 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+241 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 334 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api` connect `api.ts` to `App.tsx`, `GapAnalysisPage.tsx`, `DashboardPage.tsx`, `OnboardingPage.tsx`, `EmployerDashboard.jsx`, `onboardingService.ts`, `DemoLoginBar.tsx`, `GovernmentDashboard.tsx`, `MockInterviewPage.tsx`, `SkillBubbleGrid.tsx`, `ResourcesAdmin.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `useAuthStore` connect `App.tsx` to `useAuth`, `BlueCollarOnboarding.jsx`, `InformalWorkerOnboarding.jsx`, `EmployerOnboarding.jsx`, `ChatWidget.tsx`, `StudentOnboarding.jsx`, `NGOOnboarding.jsx`, `DemoLoginBar.tsx`, `onboardingService.ts`, `api.ts`, `GovernmentOnboarding.jsx`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useAuth()` (e.g. with `handleLogout()` and `requestOTP()`) actually correct?**
  _`useAuth()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _246 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._