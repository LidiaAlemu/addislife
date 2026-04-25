"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Greeting() {
  const { t } = useLanguage();

  return (
    <section className="px-5 py-4">
      <Link
        href="/chat"
        className="flex items-center gap-3 rounded-[var(--radius-xl)] bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-card-hover)] active:scale-[0.99]"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles size={24} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-card-foreground">{t("home.greeting")}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {t("chat.placeholder")}
          </p>
        </div>
      </Link>
    </section>
  );
}
