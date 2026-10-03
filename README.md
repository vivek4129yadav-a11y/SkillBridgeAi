# SkillBridge AI (SANKALP) — Frontend

Web client for the SANKALP AI career guidance and job matching platform.

---

## TL;DR

- **What**: React 18 + Vite frontend for career guidance, ATS resume scoring, and job matching.
- **Stack**: TypeScript, Tailwind CSS, Radix UI, Zustand, TanStack Query, Recharts.
- **Backend Sync**: REST + Server-Sent Events (SSE) talking to a FastAPI/Supabase service.
- **Key Features**: Multi-step onboarding wizard, real-time AI stream processing, interactive resume scoring, and role-based dashboards.

---

## Project

- **Problem**: Job seekers lack structured career advice, submit resumes that fail automated ATS filters, and cannot pinpoint their missing skills for open roles.
- **Solution**: A mobile-first web app that converts raw user input into actionable career steps through conversational skill tests, live PDF resume scoring, and skill-gap visualisations.

---

## Architecture

- **React 18 + Vite**: Fast HMR and strictly typed TypeScript frontend.
- **Zustand**: Client-only state (active session, multi-step onboarding wizard, UI filters).
- **TanStack Query**: Server state caching, deduplication, and automated background refetching.
- **Tailwind CSS + Radix UI**: Accessible primitives (dialogs, tabs, dropdowns) with utility styling.
- **Recharts**: Custom SVG score rings and radar charts for skill gaps and ATS analysis.
- **FastAPI / SSE**: Axios for REST endpoints; native `EventSource` for streaming real-time AI assessment tokens.

---

## Engineering

- **Auth & Route Guards**: Passwordless OTP flow with JWT bearer tokens in local storage. Custom `Protected` router wrapper handles session validation and role-based redirects.
- **Real-Time SSE Streaming**: Async event parser for AI question generation and onboarding pipelines. Manages buffer parsing and connection teardown without blocking the main UI thread.
- **State Segregation**: Separated volatile UI state (Zustand) from remote records (TanStack Query) to stop redundant API calls on filter changes.
- **Resume Ingestion**: Drag-and-drop PDF upload with client-side MIME/size validation and asynchronous polling for ATS analysis results.
- **Accessibility & Mobile-First**: Built on Radix primitives to guarantee keyboard navigation, ARIA roles, and high contrast on budget devices.

---

## What I Learned

- **SSE Lifecycle**: `EventSource` requires explicit teardown in React hook cleanups; missed cleanups create zombie streams during route transitions.
- **Store Splitting**: Keeping server cache out of Zustand prevents stale state bugs and eliminates unnecessary re-renders in multi-step wizards.
- **Pragmatic Accessibility**: Using headless UI primitives gives full layout freedom without having to hand-roll complex keyboard and ARIA behaviours.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL (default: `http://localhost:8000`) |
| `VITE_ADMIN_SECRET` | Admin secret for job management (matches backend `ADMIN_SECRET`) |
| `VITE_DEMO_MODE` | Toggle demo account quick-login bar |

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/auth` | `AuthPage` | Passwordless email login and OTP verification |
| `/onboarding` | `OnboardingPage` | Multi-step career and demographic wizard |
| `/processing` | `ProcessingPage` | SSE real-time processing stream for AI analysis |
| `/dashboard` | `DashboardPage` | Candidate overview, skill metrics, and quick actions |
| `/resume-analysis` | `ResumeAnalysisPage` | Resume scoring, ATS feedback, and bullet improver |
| `/gap-analysis` | `GapAnalysisPage` | Skill deficit breakdown and learning roadmap |
| `/profile` | `ProfilePage` | User profile, demographics, and resume upload |
| `/jobs` | `JobsPage` | Job listings with search, filters, and match scores |
| `/interview` | `MockInterviewPage` | Conversational AI interview simulator |
| `/government` | `GovernmentDashboard` | Macro workforce trends and regional analytics |
| `/admin` | `AdminPage` | Administrative job CRUD operations |
| `/admin/resources` | `ResourcesAdmin` | Curated learning resource administration |
