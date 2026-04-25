"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi, Zap, Clock, Star, MapPin, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function FeaturedCard() {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();

  const cafeData = {
    name: "Tomoca Coffee",
    nameAm: "ቶሞካ ቡና",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop",
    wifi: "25 Mbps",
    power: true,
    hours: "12:00 AM",
    rating: 4.8,
    location: "Bole, Addis Ababa",
    locationAm: "ቦሌ፣ አዲስ አበባ",
    aiMatch: 96,
    reasons: [
      { en: "Quiet workspace", am: "ጸጥተኛ የሥራ ቦታ" },
      { en: "Strong Wi-Fi", am: "ጠንካራ ዋይፋይ" },
      { en: "Reliable power", am: "አስተማማኝ ኃይል" },
      { en: "Popular among freelancers", am: "በነጻ ሰራተኞች ዘንድ ተወዳጅ" },
    ],
  };

  return (
    <div className="premium-card overflow-hidden">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={cafeData.image}
          alt={cafeData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Save Button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-sm transition-all btn-press hover:scale-105"
        >
          <Heart
            size={18}
            className={isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"}
          />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 shadow-sm">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-foreground">{cafeData.rating}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-4">
        {/* Title & Location */}
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {language === "am" ? cafeData.nameAm : cafeData.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-muted-foreground">
            <MapPin size={14} />
            <span className="text-xs font-medium">
              {language === "am" ? cafeData.locationAm : cafeData.location}
            </span>
          </div>
        </div>

        {/* Info Chips */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-semibold text-foreground">
            <Wifi size={14} className="text-primary" />
            {cafeData.wifi}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-semibold text-foreground">
            <Zap size={14} className="text-success" />
            {t("featured.backup")}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs font-semibold text-foreground">
            <Clock size={14} className="text-primary" />
            {t("featured.openUntil")} {cafeData.hours}
          </div>
        </div>

        {/* AI Trust Layer */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground">
              {t("featured.whyRecommended")}
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10">
              <Sparkles size={12} className="text-primary" />
              <span className="text-xs font-bold text-primary">
                {t("featured.aiMatch")}: {cafeData.aiMatch}%
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cafeData.reasons.map((reason, idx) => (
              <span
                key={idx}
                className="text-xs text-muted-foreground font-medium"
              >
                {language === "am" ? reason.am : reason.en}
                {idx < cafeData.reasons.length - 1 && " • "}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/chat?action=reserve&place=tomoca")}
            className="flex-1 py-3 px-4 rounded-2xl bg-primary text-white text-sm font-semibold shadow-button hover:bg-primary/90 transition-all btn-press"
          >
            {t("featured.reserve")}
          </button>
          <button
            onClick={() => {}}
            className="py-3 px-4 rounded-2xl border-2 border-primary/20 text-primary text-sm font-semibold hover:bg-primary/5 transition-all btn-press"
          >
            {t("featured.map")}
          </button>
        </div>
      </div>
    </div>
  );
}
