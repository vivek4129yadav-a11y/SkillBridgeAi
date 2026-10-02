# Resume Analysis UI Documentation

The Resume Analysis UI provides a premium, interactive experience for users to evaluate and improve their resumes using AI.

## Key Components

### 1. `ResumeUpload.tsx`
- **Purpose**: Handles PDF file selection and target role input.
- **Features**: 
  - File validation (PDF only, 5MB limit).
  - Multi-step progress stepper for backend processing UX.
  - Animated state transitions.

### 2. `ScoreDashboard.tsx` & `ScoreRing.tsx`
- **Purpose**: Visualizes the resume quality scores.
- **Features**:
  - Overall score Ring.
  - ATS Compatibility, Quantification, and Completeness breakdown.
  - Critical issues and missing sections list.

### 3. `SuggestionCards.tsx`
- **Purpose**: Displays AI-generated improvements and summary.
- **Features**:
  - Interactive "Professional Summary" copy tool.
  - "Before/Better" bullet point comparison with rationale.
  - India-specific context flags (e.g. ITI, IT hubs).
  - "Stronger Phrasing" table for skill reframing.

### 4. `BulletImprover.tsx`
- **Purpose**: A point-by-point polisher tool.
- **Features**:
  - Uses Llama 3 via Groq for high-speed refinement.
  - Daily usage rate limiting tracking.
  - One-click copy for improved bullets.

### 5. `ExtractedProfile.tsx`
- **Purpose**: Visualizes the parsed structured data.
- **Features**:
  - Skills matrix (Advanced/Intermediate/Beginner).
  - Experience timeline with achievement vs responsibility balance.
  - Vocational/ITI education detection badges.

## Integration
- **Dashboard**: `ResumeScoreWidget.tsx` provides a high-level overview and a CTA on the main dashboard.
- **Routing**: Accessible at `/resume-analysis`.
- **Service Layer**: `resumeAnalysisService.ts` handles all API communication with the `/api/v1/resume` endpoints.
