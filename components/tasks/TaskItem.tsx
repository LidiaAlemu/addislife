"use client";

import { X } from "lucide-react";
import { StatusBadge, type TaskStatus } from "./StatusBadge";
import { useLanguage } from "@/contexts/LanguageContext";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  icon?: React.ReactNode;
}

interface TaskItemProps {
  task: Task;
  onCancel?: (taskId: string) => void;
}

export function TaskItem({ task, onCancel }: TaskItemProps) {
  const { t } = useLanguage();
  const canCancel = task.status === "waiting" || task.status === "progress";

  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-card p-4 shadow-[var(--shadow-card)]">
      {/* Icon */}
      {task.icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {task.icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-card-foreground truncate">
            {task.title}
          </h3>
          <StatusBadge status={task.status} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {task.description}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {formatRelativeTime(task.createdAt)}
        </p>
      </div>

      {/* Cancel button */}
      {canCancel && onCancel && (
        <button
          onClick={() => onCancel(task.id)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          aria-label={t("tasks.cancel")}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
