# SANKALP Frontend

This is the frontend web user interface for **SANKALP (SkillBridge AI)**.  
It is built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

It provides simple, interactive screens for job seekers, students, blue-collar workers, employers, NGOs, and government administrators.

---

## 📋 What You Need First (Prerequisites)

Make sure you have installed on your computer:
- **Node.js 18+** (Node.js 20 recommended): [Download Node.js](https://nodejs.org/)
- **npm** (comes automatically when you install Node.js)

To check if Node.js and npm are installed, run:
```bash
node -v
npm -v
```

---

## 🚀 Quick Setup Guide (Step-by-Step)

### Step 1: Open the Frontend Directory
Open your terminal and navigate to the `frontend` folder:
```bash
cd frontend
```

---

### Step 2: Configure Environment Variables (`.env`)
1. Make a copy of `.env.example` and name it `.env`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows Command Prompt: `copy .env.example .env`)*

2. Open `.env` in your text editor:
   ```env
   # URL of your running backend server
   VITE_API_BASE_URL=http://localhost:8000

   # Admin secret (must match ADMIN_SECRET from backend .env)
   VITE_ADMIN_SECRET=your-admin-secret-for-job-crud

   # Application details
   VITE_APP_NAME=SkillBridge AI
   VITE_APP_ENV=development
   ```

---

### Step 3: Install Required Packages
Run this command to download and install all frontend packages:
```bash
npm install
```

---

### Step 4: Start the Development Server
Start the frontend with:
```bash
npm run dev
```

Your frontend app will start immediately!  
Open your web browser and go to:  
👉 **`http://localhost:5173`**

---

## 🧭 Main Pages & Routes

| URL Path | Page Name | Who Uses It | What It Does |
|---|---|---|---|
| `/` | Landing Page | All Visitors | Introduction to SANKALP with feature highlights and quick actions |
| `/login` | Login Page | All Users | Enter phone or email to request a 6-digit login code (OTP) |
| `/verify-otp` | Verify Code | All Users | Enter the 6-digit code printed in the backend terminal |
| `/onboarding/*` | Onboarding Wizard | New Users | Setup profile for Students, Blue-Collar Workers, Employers, NGOs, etc. |
| `/dashboard` | Main Dashboard | Logged-in Users | View profile summary, skill score, and recommended jobs |
| `/assessment` | Skill Assessment | Job Seekers | Take adaptive AI-generated skill quizzes |
| `/gap-analysis` | Gap Analysis | Job Seekers | See what skills you need to learn for your dream job |
| `/resume-analysis`| Resume Checker | Job Seekers | Upload PDF resume to get instant feedback and improvements |
| `/jobs` | Job Listings | Job Seekers | Search and filter available jobs |
| `/admin` | Admin Portal | Admins | Add, edit, or delete job listings |

---

## 📁 Frontend Folder Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI parts (buttons, dialogs, layout, sidebar)
│   ├── constants/      # App constants (roles, user types)
│   ├── hooks/          # Custom React hooks (auth, network, UI state)
│   ├── modules/        # Main feature modules (assessment, gap analysis, jobs, profile)
│   ├── pages/          # Full-page components (auth, dashboard views, onboarding)
│   ├── services/       # API call functions (talking to backend)
│   ├── store/          # Global state management with Zustand
│   ├── types/          # TypeScript data type definitions
│   ├── App.tsx         # Main router and page route definitions
│   ├── main.tsx        # React root mount file
│   └── index.css       # Global styling and Tailwind CSS rules
├── public/             # Static public assets (images, icons)
├── package.json        # Project dependencies and run scripts
├── vite.config.ts      # Vite build configuration
└── tailwind.config.ts  # Tailwind styling configuration
```

---

## 🛠️ Available Terminal Commands

- `npm run dev` — Starts the local development server (with hot-reload).
- `npm run build` — Checks TypeScript types and builds the production version into the `dist/` folder.
- `npm run preview` — Locally tests the built production bundle.
- `npm run lint` — Checks code for formatting and syntax issues.

---

## ❓ Common Problems and Fixes

- **Error: `Failed to fetch` or Network Errors on Login**
  - Make sure the backend server is running on `http://localhost:8000`.
  - Check `VITE_API_BASE_URL` in `frontend/.env` is set to `http://localhost:8000`.

- **Where do I get the OTP login code?**
  - Check the terminal console where the **backend** is running. The 6-digit code is printed there in plain text.

- **Error: `Port 5173 is already in use`**
  - Vite will automatically offer to use the next port (e.g. `http://localhost:5174`). You can accept it by typing `y`.
