"use client";

import { Check, Globe } from "lucide-react";
import { useLanguage, type Language } from "@/contexts/LanguageContext";

export function LanguageSelector() {
  const { language, setLanguage, t, languages } = useLanguage();

  return (
    <div className="rounded-[var(--radius-lg)] bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">
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
            className={`flex items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-left transition-colors ${
              language === lang.code
                ? "bg-primary/10 text-primary"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <div>
              <span className="font-medium">{lang.nativeName}</span>
              {lang.nativeName !== lang.name && (
                <span className="ml-2 text-sm text-muted-foreground">
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
