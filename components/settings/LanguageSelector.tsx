"use client";

import { Check, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageSelector() {
  const { language, setLanguage, t, languages } = useLanguage();

  return (
    <div className="premium-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            {t("settings.language")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t("settings.language.desc")}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-left transition-all btn-press ${
              language === lang.code
                ? "bg-primary text-white shadow-button"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <div>
              <span className="font-semibold">{lang.nativeName}</span>
              {lang.nativeName !== lang.name && (
                <span className={`ml-2 text-sm ${language === lang.code ? "text-white/80" : "text-muted-foreground"}`}>
                  ({lang.name})
                </span>
              )}
            </div>
            {language === lang.code && <Check size={18} />}
          </button>
        ))}
      </div>
    </div>
  );
}
