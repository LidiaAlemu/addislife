"use client";

import { useRouter } from "next/navigation";
import { Building2, MapPin, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function QuickActions() {
  const router = useRouter();
  const { t } = useLanguage();

  const actions = [
    {
      icon: Building2,
      labelKey: "quick.atm",
      color: "bg-blue-500",
      query: "Find nearest ATM",
    },
    {
      icon: MapPin,
      labelKey: "quick.pharmacy",
      color: "bg-green-500",
      query: "Find nearest pharmacy",
    },
    {
      icon: Car,
      labelKey: "quick.taxi",
      color: "bg-amber-500",
      query: "Get a taxi",
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
        {t("home.nearbyEssentials")}
      </h2>
      <div className="flex gap-3">
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => router.push(`/chat?q=${encodeURIComponent(action.query)}`)}
              className="flex-1 premium-card p-4 flex flex-col items-center gap-2 transition-all btn-press"
            >
              <div
                className={`w-11 h-11 rounded-2xl ${action.color} flex items-center justify-center shadow-sm`}
              >
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-foreground">
                {t(action.labelKey)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
