# Frontend Documentation

> For the main setup instructions, see the [Frontend README](file:///home/um/Stuffs/SANKALP/frontend/README.md).

## Requirements
- Node.js 18+
- npm

## Quick Setup

```bash
# 1. Enter directory
cd frontend

# 2. Copy environment file
cp .env.example .env

# 3. Install packages
npm install

# 4. Start local development server
npm run dev
```

Open your browser at **http://localhost:5173**

## Environment Variables (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API URL (`http://localhost:8000`) |
| `VITE_ADMIN_SECRET` | Admin secret (must match backend `ADMIN_SECRET`) |
| `VITE_APP_NAME` | Application name (`SkillBridge AI`) |

## Available Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/login` | User login |
| `/verify-otp` | OTP code verification |
| `/onboarding/*` | Step-by-step profile onboarding wizard |
| `/dashboard` | User role-specific dashboard |
| `/assessment` | Adaptive AI skill assessment quiz |
| `/gap-analysis` | Career skill gap roadmap & suggestions |
| `/resume-analysis` | Resume upload and instant AI feedback |
| `/jobs` | Job listings and filters |
| `/admin` | Job listings management portal |
