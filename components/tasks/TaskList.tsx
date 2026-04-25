"use client";

import { useState } from "react";
import { ClipboardList, Zap, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TaskItem, type Task } from "./TaskItem";

// Demo tasks - will be replaced with real data
const initialTasks: Task[] = [
  {
    id: "1",
    titleEn: "Power Outage Alert - Bole",
    titleAm: "በቦሌ የኤሌክትሪክ መቆራረጥ ሲኖር አሳውቀኝ",
    description: "Monitoring for power outages in your area",
    descriptionAm: "በአካባቢዎ የኃይል መቆራረጥ እየተከታተለ ነው",
    status: "progress",
    lastChecked: "2 mins",
    icon: <Zap size={20} className="text-amber-500" />,
  },
  {
    id: "2",
    titleEn: "Document Ready Notification",
    titleAm: "ሰነድ ዝግጁ ሲሆን አሳውቀኝ",
    description: "Waiting for Immigration Office update",
    descriptionAm: "ከኢሚግሬሽን ቢሮ ማሻሻያ በመጠበቅ ላይ",
    status: "waiting",
    lastChecked: "15 mins",
    icon: <Bell size={20} className="text-blue-500" />,
  },
];

export function TaskList() {
  const { t, language } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleCancel = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "failed" as const } : task
      )
    );
  };

  if (tasks.length === 0) {
    return (
      <div className="premium-card p-8 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ClipboardList size={28} />
        </div>
        <h3 className="font-semibold text-foreground mb-1">{t("tasks.empty")}</h3>
        <p className="text-sm text-muted-foreground">{t("tasks.emptyDesc")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onCancel={handleCancel} language={language} />
      ))}
    </div>
  );
}
