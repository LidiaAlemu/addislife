"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export type TaskStatus = "waiting" | "progress" | "completed" | "failed";

interface StatusBadgeProps {
  status: TaskStatus;
}

const statusConfig: Record<
  TaskStatus,
  { labelKey: string; dotColor: string; bgColor: string; textColor: string }
> = {
  waiting: {
    labelKey: "tasks.status.waiting",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
  progress: {
    labelKey: "tasks.status.progress",
    dotColor: "bg-success",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  completed: {
    labelKey: "tasks.status.completed",
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  failed: {
    labelKey: "tasks.status.failed",
    dotColor: "bg-red-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.bgColor} ${config.textColor}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {t(config.labelKey)}
    </span>
  );
}
