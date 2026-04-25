"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="px-5 pb-4 pt-6 safe-top">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t("app.name")}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {t("app.tagline")}
          </p>
        </div>
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-primary shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
          aria-label="Location"
        >
          <MapPin size={20} />
        </button>
      </div>
    </header>
  );
}
