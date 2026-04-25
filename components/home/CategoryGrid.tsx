"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { CategoryCard } from "./CategoryCard";
import {
  FileText,
  Stethoscope,
  Car,
  Droplets,
  Coffee,
} from "lucide-react";

const categories = [
  {
    titleKey: "category.documents",
    descKey: "category.documents.desc",
    icon: FileText,
    href: "/chat?action=documents",
    color: "bg-primary",
  },
  {
    titleKey: "category.clinic",
    descKey: "category.clinic.desc",
    icon: Stethoscope,
    href: "/chat?action=clinic",
    color: "bg-success",
  },
  {
    titleKey: "category.transport",
    descKey: "category.transport.desc",
    icon: Car,
    href: "/chat?action=transport",
    color: "bg-accent",
  },
  {
    titleKey: "category.water",
    descKey: "category.water.desc",
    icon: Droplets,
    href: "/chat?action=water",
    color: "bg-secondary",
  },
  {
    titleKey: "category.cafe",
    descKey: "category.cafe.desc",
    icon: Coffee,
    href: "/chat?action=cafe",
    color: "bg-warning",
  },
];

export function CategoryGrid() {
  const { t } = useLanguage();

  return (
    <section className="px-5">
      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {t("home.categories")}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.titleKey}
            title={t(category.titleKey)}
            description={t(category.descKey)}
            icon={category.icon}
            href={category.href}
            color={category.color}
          />
        ))}
      </div>
    </section>
  );
}
