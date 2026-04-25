"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ClipboardList, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { href: "/", icon: Home, labelKey: "nav.home" },
  { href: "/explore", icon: Compass, labelKey: "nav.explore" },
  { href: "/tasks", icon: ClipboardList, labelKey: "nav.tasks" },
  { href: "/settings", icon: User, labelKey: "nav.profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 safe-bottom">
      <div className="glass mx-auto flex h-16 max-w-md items-center justify-around rounded-[28px] px-2 shadow-card">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-5 py-2 transition-premium btn-press ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-2xl bg-primary/10" />
              )}
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                className="relative z-10 transition-all"
              />
              <span className="relative z-10 text-[10px] font-semibold tracking-wide">
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
