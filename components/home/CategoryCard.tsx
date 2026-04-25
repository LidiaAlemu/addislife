"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: string;
}

export function CategoryCard({
  title,
  description,
  icon: Icon,
  href,
  color = "bg-primary",
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-[var(--radius-lg)] bg-card p-4 shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-card-hover)] active:scale-[0.98]"
    >
      <div
        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] ${color} text-primary-foreground`}
      >
        <Icon size={24} />
      </div>
      <h3 className="font-semibold text-card-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
