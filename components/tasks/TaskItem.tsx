"use client";

import { Pencil } from "lucide-react";
import { StatusBadge, type TaskStatus } from "./StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";

export interface Task {
  id: string;
  titleEn: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  status: TaskStatus;
  lastChecked: string;
  icon?: React.ReactNode;
}

interface TaskItemProps {
  task: Task;
  onCancel?: (taskId: string) => void;
  language: Language;
}

export function TaskItem({ task, onCancel, language }: TaskItemProps) {
  const { t } = useLanguage();
  const isRunning = task.status === "progress";

  return (
    <div className="premium-card p-4 space-y-3">
      {/* Header Row */}
      <div className="flex items-start gap-3">
        {/* Icon with pulse effect for running tasks */}
        {task.icon && (
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-muted">
            {task.icon}
            {isRunning && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground leading-tight">
            {language === "am" ? task.titleAm : task.titleEn}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {language === "am" ? task.descriptionAm : task.description}
          </p>
        </div>
      </div>

      {/* Status Row */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-3">
          <StatusBadge status={task.status} />
          <span className="text-xs text-muted-foreground">
            {t("tasks.checked")} {task.lastChecked} {t("tasks.ago")}
          </span>
        </div>

        <button
          onClick={() => onCancel?.(task.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-primary hover:bg-primary/10 transition-all btn-press"
        >
          <Pencil size={14} />
          {t("tasks.edit")}
        </button>
      </div>
    </div>
  );
}
