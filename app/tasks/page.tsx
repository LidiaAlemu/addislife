"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { TaskList } from "@/components/tasks/TaskList";

export default function TasksPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="px-5 pb-4 pt-6 safe-top">
        <h1 className="text-2xl font-bold text-foreground">{t("tasks.title")}</h1>
      </header>

      {/* Task List */}
      <div className="px-5">
        <TaskList />
      </div>
    </div>
  );
}
