"use client";

import { Bell, MapPin, Info, Shield, HelpCircle, ChevronRight, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/settings/LanguageSelector";

export default function SettingsPage() {
  const { t } = useLanguage();

  const settingsItems = [
    { icon: Bell, titleKey: "settings.notifications", descKey: "settings.notifications.desc" },
    { icon: MapPin, titleKey: "settings.locations", descKey: "settings.locations.desc" },
    { icon: Shield, titleKey: "settings.privacy", descKey: "" },
    { icon: HelpCircle, titleKey: "settings.help", descKey: "" },
    { icon: Info, titleKey: "settings.about", descKey: "settings.version" },
  ];

  return (
    <div className="flex flex-col pb-28">
      {/* Header */}
      <header className="px-5 pb-6 pt-6">
        <h1 className="text-2xl font-bold text-foreground">
          {t("settings.title")}
        </h1>
      </header>

      {/* Profile Card */}
      <div className="px-5 mb-6">
        <div className="premium-card p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-button">
            <User size={28} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">Lidia Alemu</h2>
            <p className="text-sm text-muted-foreground">lidia@example.com</p>
          </div>
          <ChevronRight size={20} className="text-muted-foreground" />
        </div>
      </div>

      {/* Language Selector - Most prominent */}
      <div className="px-5 mb-6">
        <LanguageSelector />
      </div>

      {/* Other Settings */}
      <div className="px-5">
        <div className="premium-card overflow-hidden divide-y divide-border/50">
          {settingsItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors btn-press text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Icon size={20} className="text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{t(item.titleKey)}</h3>
                  {item.descKey && (
                    <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                  )}
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
