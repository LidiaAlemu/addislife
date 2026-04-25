"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

interface SettingsSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export function SettingsSection({
  icon: Icon,
  title,
  description,
  onClick,
}: SettingsSectionProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[var(--radius-lg)] bg-card p-4 text-left shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-card-hover)] active:scale-[0.99]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-card-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <ChevronRight size={20} className="shrink-0 text-muted-foreground" />
    </button>
  );
}
