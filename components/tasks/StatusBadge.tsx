"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export type TaskStatus = "waiting" | "progress" | "completed" | "failed";

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  { labelKey: string; className: string }
> = {
  waiting: {
    labelKey: "tasks.status.waiting",
    className: "bg-warning/20 text-warning-foreground",
  },
  progress: {
    labelKey: "tasks.status.progress",
    className: "bg-primary/20 text-primary",
  },
  completed: {
    labelKey: "tasks.status.completed",
    className: "bg-success/20 text-success",
  },
  failed: {
    labelKey: "tasks.status.failed",
    className: "bg-destructive/20 text-destructive",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {t(config.labelKey)}
    </span>
  );
}
