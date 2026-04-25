"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, ClipboardList, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { href: "/", icon: Home, labelKey: "nav.home" },
  { href: "/chat", icon: MessageCircle, labelKey: "nav.chat" },
  { href: "/tasks", icon: ClipboardList, labelKey: "nav.tasks" },
  { href: "/settings", icon: Settings, labelKey: "nav.settings" },
];

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom">
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all"
              />
              <span className="text-xs font-medium">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
