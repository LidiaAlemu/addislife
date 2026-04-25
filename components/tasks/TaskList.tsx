"use client";

import { useState } from "react";
import { ClipboardList, FileText, Car, Droplets } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TaskItem, type Task } from "./TaskItem";

// Demo tasks - will be replaced with real data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Passport Renewal",
    description: "Waiting for appointment confirmation at Immigration Office",
    status: "waiting",
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    icon: <FileText size={20} />,
  },
  {
    id: "2",
    title: "Ride to Bole",
    description: "Comparing prices from Ride, Feres, and ZayRide",
    status: "progress",
    createdAt: new Date(Date.now() - 300000), // 5 mins ago
    icon: <Car size={20} />,
  },
  {
    id: "3",
    title: "Water Delivery",
    description: "20L order from Aqua Addis - delivered successfully",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    icon: <Droplets size={20} />,
  },
];

export function TaskList() {
  const { t } = useLanguage();
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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <ClipboardList size={32} />
        </div>
        <p className="text-muted-foreground">{t("tasks.empty")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onCancel={handleCancel} />
      ))}
    </div>
  );
}
