import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Globe } from "lucide-react";

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggle = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-all text-sm font-medium border border-transparent hover:border-indigo-300"
      title={language === "en" ? "Switch to Hindi" : "English में बदलें"}
    >
      <Globe className={`w-4 h-4 text-indigo-500 transition-transform ${language === "hi" ? "rotate-180" : ""}`} />
      <span>{language === "en" ? "EN" : "HI"}</span>
    </button>
  );
};
