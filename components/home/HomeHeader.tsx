"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function HomeHeader() {
  const { language, setLanguage, t } = useLanguage();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting.morning");
    if (hour < 17) return t("greeting.afternoon");
    return t("greeting.evening");
  };

  const languages = [
    { code: "en", label: "EN" },
    { code: "am", label: "አማ" },
    { code: "om", label: "OR" },
  ] as const;

  return (
    <header className="px-5 pt-6 pb-2">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()}, Lidia
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Language Switcher Pill */}
        <div className="flex items-center rounded-full bg-white/80 p-1 shadow-sm">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all btn-press ${
                language === lang.code
                  ? "bg-primary text-white shadow-button"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
