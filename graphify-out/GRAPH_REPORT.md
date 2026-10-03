# Graph Report - frontend  (2026-10-03)

## Corpus Check
- 123 files · ~25,344 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 539 nodes · 804 edges · 31 communities (21 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bf1cc1e5`
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
- ScoreDashboard.tsx
- ResourcesAdmin.tsx
- compilerOptions
- assessment.ts
- EmptyState.tsx
- ErrorCard.tsx
- Skeleton.tsx
- tailwind.config.ts
- Component Reference
- Key Components
- SkillBridge AI (SANKALP) — Frontend
- rules/graphify.md
- workflows/graphify.md

## God Nodes (most connected - your core abstractions)
1. `api` - 21 edges
2. `compilerOptions` - 18 edges
3. `useAuthStore` - 15 edges
4. `useAuth()` - 10 edges
5. `Component Reference` - 10 edges
6. `SkillBridge AI (SANKALP) — Frontend` - 8 edges
7. `Onboarding` - 8 edges
8. `useLanguage` - 7 edges
9. `compilerOptions` - 7 edges
10. `Key Components` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Protected()` --calls--> `useAuthStore`  [EXTRACTED]
  src/App.tsx → src/store/authStore.ts
- `useAuth()` --calls--> `useOnboardingStore`  [EXTRACTED]
  src/hooks/useAuth.ts → src/store/onboardingStore.ts
- `ChatWidget()` --calls--> `useAuthStore`  [EXTRACTED]
  src/modules/chat/ChatWidget.tsx → src/store/authStore.ts
- `JobCardProps` --references--> `Job`  [EXTRACTED]
  src/modules/jobs/components/JobCard.tsx → src/types/index.ts
- `LanguageToggle()` --calls--> `useLanguage`  [EXTRACTED]
  src/components/LanguageToggle.tsx → src/hooks/useLanguage.ts

## Import Cycles
- None detected.

## Communities (31 total, 6 thin omitted)

### Community 0 - "App.tsx"
Cohesion: 0.07
Nodes (32): App(), Protected(), DemoLoginBar(), DemoLoginBarProps, PERSONAS, nav, Sidebar(), log (+24 more)

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
Cohesion: 0.09
Nodes (21): ExtractedProfile(), ResumeUpload(), ResumeUploadProps, STEPS, SuggestionCards(), AnalysisStepper(), AnalysisStepperProps, FileDropzone() (+13 more)

### Community 6 - "devDependencies"
Cohesion: 0.07
Nodes (26): autoprefixer, devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, typescript (+18 more)

### Community 7 - "ChatWidget.tsx"
Cohesion: 0.15
Nodes (16): LanguageToggle(), AppLayout(), titles, Topbar(), LanguageState, useLanguage, Language, StringKey (+8 more)

### Community 8 - "SuggestionCards.tsx"
Cohesion: 0.12
Nodes (16): BulletImprovementResult(), BulletImprovementResultProps, BulletImprover(), BulletImprovementsList(), BulletImprovementsListProps, IndiaFlagsCard(), IndiaFlagsCardProps, ReframePhrasingCard() (+8 more)

### Community 9 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2020, src, compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules (+16 more)

### Community 10 - "GovernmentDashboard.tsx"
Cohesion: 0.17
Nodes (16): DistrictsTab(), DistrictsTabProps, COLORS, OverviewTab(), OverviewTabProps, StatCard(), StatCardProps, YouthTab() (+8 more)

### Community 11 - "ExtractedProfile.tsx"
Cohesion: 0.18
Nodes (16): EducationSection(), EducationSectionProps, directionColors, ExperienceTimeline(), ExperienceTimelineProps, levelConfig, SkillsMatrix(), SkillsMatrixProps (+8 more)

### Community 12 - "MockInterviewPage.tsx"
Cohesion: 0.16
Nodes (12): QuestionScreen(), QuestionScreenProps, ReportScreen(), ReportScreenProps, SetupScreen(), SetupScreenProps, MockInterviewPage(), Screen (+4 more)

### Community 13 - "SkillBubbleGrid.tsx"
Cohesion: 0.18
Nodes (9): DOMAIN_SEEDS, SkillBubbleButton(), SkillBubbleButtonProps, SkillBubbleGrid(), Bubble, SkillBubbleGridProps, CAREER_OPTIONS, Props (+1 more)

### Community 14 - "ScoreDashboard.tsx"
Cohesion: 0.17
Nodes (10): ScoreDashboardIssues(), ScoreDashboardIssuesProps, TargetRolesBadges(), TargetRolesBadgesProps, ResumeScoreWidget(), QualityScores, ScoreDashboard(), ScoreDashboardProps (+2 more)

### Community 15 - "ResourcesAdmin.tsx"
Cohesion: 0.23
Nodes (8): AdminUnlockModal(), AdminUnlockModalProps, BulkUploadTab(), BulkUploadTabProps, Resource, ResourceListTab(), ResourceListTabProps, ResourcesAdmin()

### Community 16 - "compilerOptions"
Cohesion: 0.20
Nodes (9): vite.config.ts, compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, skipLibCheck, strict (+1 more)

### Community 17 - "assessment.ts"
Cohesion: 0.33
Nodes (5): AssessmentHistoryItem, AssessmentSession, AssessmentStatus, Question, NOTE: skills_found imported specifically where needed or kept loose here

### Community 26 - "Component Reference"
Cohesion: 0.07
Nodes (29): Admin, AdminPage, AppLayout, Auth, AuthPage, Chat, ChatWidget, Component Reference (+21 more)

### Community 27 - "Key Components"
Cohesion: 0.22
Nodes (8): 1. `ResumeUpload.tsx`, 2. `ScoreDashboard.tsx` & `ScoreRing.tsx`, 3. `SuggestionCards.tsx`, 4. `BulletImprover.tsx`, 5. `ExtractedProfile.tsx`, Integration, Key Components, Resume Analysis UI Documentation

### Community 28 - "SkillBridge AI (SANKALP) — Frontend"
Cohesion: 0.17
Nodes (11): Architecture, Engineering, Environment Variables, Getting Started, Installation, Prerequisites, Project, Routes (+3 more)

## Knowledge Gaps
- **187 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+182 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 223 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `api` connect `App.tsx` to `GapAnalysisPage.tsx`, `DashboardPage.tsx`, `OnboardingPage.tsx`, `GovernmentDashboard.tsx`, `MockInterviewPage.tsx`, `SkillBubbleGrid.tsx`, `ResourcesAdmin.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `useAuthStore` connect `App.tsx` to `ChatWidget.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useAuth()` (e.g. with `handleLogout()` and `requestOTP()`) actually correct?**
  _`useAuth()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _187 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06868686868686869 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._