export const UI_STRINGS = {
  en: {
    dashboard: "Dashboard",
    job_matches: "Job Matches",
    career_coach: "AI Career Coach",
    skill_assessment: "Skill Assessment",
    my_profile: "My Profile",
    skills: "My Skills",
    recommendations: "Recommendations",
    resume_analysis: "Resume Analysis",
    mock_interview: "Mock Interview",
    logout: "Logout",
    toggle_language: "Translate to Hindi",
    loading: "Loading...",
    error: "Something went wrong",
    career_identity: "Career Identity",
    skill_gaps: "Skill Gaps",
    learning_roadmap: "Learning Roadmap",
    apply_now: "Apply Now",
    start_practice: "Start Interview Practice",
    explore_skills: "Explore Related Skills",
    chatPlaceholder: "How can I help you today?",
    typeMessage: "Type a message..."
  },
  hi: {
    dashboard: "डैशबोर्ड",
    job_matches: "नौकरी के अवसर",
    career_coach: "एआई करियर कोच",
    skill_assessment: "कौशल मूल्यांकन",
    my_profile: "मेरी प्रोफ़ाइल",
    skills: "मेरे कौशल",
    recommendations: "सिफारिशें",
    resume_analysis: "रिज्यूमे विश्लेषण",
    mock_interview: "मॉक इंटरव्यू",
    logout: "लॉगआउट",
    toggle_language: "हिंदी में अनुवाद करें",
    loading: "लोड हो रहा है...",
    error: "कुछ गलत हो गया",
    career_identity: "करियर पहचान",
    skill_gaps: "कौशल अंतर",
    learning_roadmap: "सीखने का रोडमैप",
    apply_now: "अभी आवेदन करें",
    start_practice: "इंटरव्यू अभ्यास शुरू करें",
    explore_skills: "संबंधित कौशल खोजें",
    chatPlaceholder: "आज मैं आपकी कैसे मदद कर सकता हूँ?",
    typeMessage: "एक संदेश लिखिये..."
  }
};

export type Language = "en" | "hi";
export type StringKey = keyof typeof UI_STRINGS.en;
