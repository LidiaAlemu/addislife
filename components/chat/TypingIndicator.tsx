"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function TypingIndicator() {
  const { t } = useLanguage();

  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Sparkles size={16} />
      </div>
      <div className="rounded-2xl rounded-bl-md bg-card px-4 py-3 shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{t("chat.thinking")}</p>
      </div>
    </div>
  );
}
