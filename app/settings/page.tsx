"use client";

import { Bell, MapPin, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/settings/LanguageSelector";
import { SettingsSection } from "@/components/settings/SettingsSection";

export default function SettingsPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="px-5 pb-4 pt-6 safe-top">
        <h1 className="text-2xl font-bold text-foreground">
          {t("settings.title")}
        </h1>
      </header>

      {/* Settings Content */}
      <div className="flex flex-col gap-4 px-5">
        {/* Language Selector - Most prominent */}
        <LanguageSelector />

        {/* Other Settings */}
        <SettingsSection
          icon={Bell}
          title={t("settings.notifications")}
          description={t("settings.notifications.desc")}
        />

        <SettingsSection
          icon={MapPin}
          title={t("settings.locations")}
          description={t("settings.locations.desc")}
        />

        <SettingsSection
          icon={Info}
          title={t("settings.about")}
          description={t("settings.version")}
        />
      </div>
    </div>
  );
}
