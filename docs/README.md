# Frontend Setup

## Requirements
- Node.js 18+ 

## Setup

```bash
cd frontend
cp .env.example .env
# Set VITE_API_BASE_URL to your backend URL (default: http://localhost:8000)

npm install
npm run dev
```

Open **http://localhost:5173**

## .env Variables

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL |
| `VITE_ADMIN_SECRET` | Admin secret (same as backend ADMIN_SECRET) |

## Routes

| Path | Component | Description |
|---|---|---|
| `/auth` | AuthPage | Login + OTP verify |
| `/onboarding` | OnboardingPage | 5-step career wizard |
| `/processing` | ProcessingPage | SSE processing stream |
| `/dashboard` | DashboardPage | Main dashboard |
| `/profile` | ProfilePage | View/edit profile + resume upload |
| `/jobs` | JobsPage | Job listings with filters |
| `/admin` | AdminPage | Admin-only job CRUD (hidden from nav) |
