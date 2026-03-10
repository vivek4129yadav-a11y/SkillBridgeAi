# Component Reference

## Layout

### AppLayout
Wraps all authenticated pages. Renders: `Sidebar + Topbar + <Outlet> + ChatWidget (floating)`.

### Sidebar
- Logo + "SkillBridge AI" branding
- NavLinks: Dashboard, Profile, Jobs (active state highlighted)
- User email + sign out button

### Topbar
- Shows page title based on current route
- MVP badge (visual indicator)

---

## Auth

### AuthPage
Container for auth flow. Switches between LoginForm and OTPVerifyForm.

### LoginForm
- Email input + request OTP button
- Props: `onOTPSent(email)`

### OTPVerifyForm
- 6-digit numeric input (digit-only filter, monospace)
- Props: `email`, `onBack`

---

## Onboarding

### OnboardingPage
Controller — holds current step state, calls API per step, navigates to `/processing` on complete.

### ProgressBar
Props: `current`, `total`. Animated gradient fill.

### Step1_UserType
6 user type selection cards with emoji.

### Step2_Profile
Form: name, age, gender, state (all Indian states), city, education, languages.

### Step3_Preferences
Multi-select career interest chips + salary range + work type + relocate toggle + target roles.

### Step4_Questions
Fetches AI-generated questions (EN/HI toggle). Renders text/MCQ/rating inputs. Submits answers → returns session_id.

### Step5_Submit
Confirmation screen. Shown briefly, user navigated to /processing.

---

## Processing

### ProcessingPage
SSE consumer via `EventSource`. Renders live log lines (terminal style, green text, dark bg). Progress bar fills. Navigates to /dashboard on `status=done`.

---

## Dashboard

### DashboardPage
All-in-one dashboard component. Fetches `/dashboard/summary`. Shows:
- AssessmentBanner (orange) — links to coming soon
- GapAnalysisBanner (blue) — links to coming soon
- Profile Completion widget (SVG circular progress)
- Extracted Skills chips
- Career Paths badges
- Top 3 Job Match cards

---

## Profile

### ProfilePage
- Fetches `/profile/me` + `/profile/completion-score`
- View mode → Edit mode toggle (inline)
- PDF resume upload with extracted skills display

---

## Jobs

### JobsPage
- State + category filter inputs
- Grid of job cards with title, company, location, salary, skill chips

---

## Admin

### AdminPage
- Admin secret input (stored in sessionStorage)
- Jobs table with delete button
- Bulk JSON upload tab (paste JSON array → upload)

---

## Chat

### ChatWidget
- Floating button bottom-right
- Slide-in chat panel (500px height)
- EN/HI language toggle (clears context on switch)
- Streams tokens via Fetch ReadableStream to POST /chat/message
- Auto-scroll to latest message
