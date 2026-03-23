import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UI_STRINGS, Language, StringKey } from "../i18n/strings";
import axios from "axios";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: StringKey) => string;
  translateDynamic: (text: string) => Promise<string>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const { language } = get();
        return UI_STRINGS[language][key] || UI_STRINGS.en[key] || key;
      },
      translateDynamic: async (text) => {
        const { language } = get();
        if (language === "en") return text;
        
        try {
          const response = await axios.post(`${API_BASE_URL}/translate`, {
            text,
            target_lang: "hi"
          });
          return response.data.translated_text;
        } catch (error) {
          console.error("Translation error:", error);
          return text;
        }
      }
    }),
    {
      name: "language-storage",
    }
  )
);
