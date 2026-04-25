"use client";

import { useRouter } from "next/navigation";
import { Coffee, Shield, Calendar, Cloud, TrafficCone, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function TrendingWidgets() {
  const router = useRouter();
  const { t } = useLanguage();

  const trendingItems = [
    {
      icon: Coffee,
      labelKey: "trending.workCafes",
      color: "text-amber-600",
      bg: "bg-amber-50",
      query: "Best work cafes in Addis",
    },
    {
      icon: Shield,
      labelKey: "trending.safeRoutes",
      color: "text-green-600",
      bg: "bg-green-50",
      query: "Safe routes for women",
    },
    {
      icon: Calendar,
      labelKey: "trending.events",
      color: "text-purple-600",
      bg: "bg-purple-50",
      query: "Weekend events in Addis",
    },
  ];

  const utilityItems = [
    {
      icon: Cloud,
      label: "24°C",
      sublabel: t("utility.sunny"),
      color: "text-sky-500",
    },
    {
      icon: TrafficCone,
      label: t("utility.moderate"),
      sublabel: t("utility.traffic"),
      color: "text-amber-500",
    },
    {
      icon: Zap,
      label: t("utility.stable"),
      sublabel: t("utility.power"),
      color: "text-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Trending in Addis */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
          {t("home.trendingInAddis")}
        </h2>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-5 px-5">
          {trendingItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => router.push(`/chat?q=${encodeURIComponent(item.query)}`)}
                className="flex-shrink-0 premium-card p-4 flex items-center gap-3 min-w-[180px] transition-all btn-press"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
                >
                  <Icon size={20} className={item.color} />
                </div>
                <span className="text-sm font-semibold text-foreground text-left">
                  {t(item.labelKey)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Utility */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">
          {t("home.dailyUtility")}
        </h2>
        <div className="premium-card p-4">
          <div className="flex justify-between">
            {utilityItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                  <Icon size={22} className={item.color} />
                  <span className="text-sm font-bold text-foreground">{item.label}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {item.sublabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
