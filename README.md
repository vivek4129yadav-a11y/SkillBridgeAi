# SANKALP Frontend

React single-page app for SANKALP. Built with TypeScript, Vite, and Tailwind CSS.

---

## Requirements

- Node.js 18 or newer (Node.js 20 LTS recommended)
- npm 9 or newer

Check your versions:

```bash
node -v
npm -v
```

---

## Installation

### 1. Open Directory

Move to the `frontend` folder:

```bash
cd frontend
```

### 2. Configure Environment Variables

Copy the sample file:

```bash
cp .env.example .env
```

Settings in `.env`:

| Variable | Required | Description | Default |
|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | Backend server root URL | `http://localhost:8000` |
| `VITE_ADMIN_SECRET` | Yes | Admin secret for job management | `your-admin-secret-for-job-crud` |
| `VITE_APP_NAME` | No | App name displayed in UI | `SkillBridge AI` |
| `VITE_APP_ENV` | No | Runtime environment | `development` |

### 3. Install Packages

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Vite development server with hot reload |
| `npm run build` | Checks types and builds production bundle into `dist/` |
| `npm run preview` | Runs a local server to test the production build |
| `npm run lint` | Runs ESLint across source files |

---

## Application Routes

| Path | View | Target Audience | Purpose |
|---|---|---|---|
| `/` | LandingPage | All visitors | Shows features and quick links |
| `/login` | AuthPage (Login) | All users | Accepts email to send a login code |
| `/verify-otp` | AuthPage (Verify) | All users | Verifies the 6-digit login code |
| `/onboarding/*` | OnboardingWizard | New users | Guides profile setup and role selection |
| `/dashboard` | DashboardPage | Logged-in users | Displays user progress, skill scores, and job matches |
| `/assessment` | AssessmentPage | Job seekers | Runs dynamic AI skill tests |
| `/gap-analysis` | GapAnalysisPage | Job seekers | Shows skill gaps and learning paths |
| `/resume-analysis` | ResumeAnalysisPage | Job seekers | Checks PDF resumes and suggests improvements |
| `/jobs` | JobsPage | Job seekers | Lists and filters active jobs |
| `/admin` | AdminPage | Administrators | Adds, edits, and removes job postings |

---

## Project Structure

```
frontend/
├── src/
│   ├── components/     # UI building blocks (buttons, dialogs, layouts)
│   ├── constants/      # App constants and role names
│   ├── hooks/          # Custom React hooks
│   ├── modules/        # Feature areas (assessment, gap analysis, jobs, profile)
│   ├── pages/          # Route view components
│   ├── services/       # API call wrappers
│   ├── store/          # Zustand state stores
│   ├── types/          # TypeScript interfaces and types
│   ├── App.tsx         # Main route declarations
│   ├── main.tsx        # React mount entry point
│   └── index.css       # Tailwind directives and custom styles
├── public/             # Static files
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

---

## Troubleshooting

- **Network error on login:**
  - Make sure the backend server runs on `http://localhost:8000`.
  - Check `VITE_API_BASE_URL` in `frontend/.env`.
  - Check `CORS_ORIGINS` in `backend/.env`.
- **Finding the login code:**
  - Look at the terminal running the backend.
  - The server prints the 6-digit code there.
- **Port 5173 is busy:**
  - Vite offers port 5174 automatically. Press `y` to accept it.
  - Update `CORS_ORIGINS` in `backend/.env` if you change ports.
