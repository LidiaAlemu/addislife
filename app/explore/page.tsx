"use client";

import { useRouter } from "next/navigation";
import { Search, Coffee, Stethoscope, FileText, Droplets, Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ExplorePage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const categories = [
    {
      icon: FileText,
      titleEn: "Government Services",
      titleAm: "የመንግስት አገልግሎቶች",
      descEn: "ID, Passport, Licenses",
      descAm: "መታወቂያ፣ ፓስፖርት፣ ፈቃድ",
      color: "bg-blue-500",
      query: "I need help with government documents",
    },
    {
      icon: Stethoscope,
      titleEn: "Healthcare",
      titleAm: "ጤና አገልግሎት",
      descEn: "Clinics, Pharmacies, Hospitals",
      descAm: "ክሊኒኮች፣ ፋርማሲዎች፣ ሆስፒታሎች",
      color: "bg-green-500",
      query: "Find me a clinic nearby",
    },
    {
      icon: Car,
      titleEn: "Transportation",
      titleAm: "ትራንስፖርት",
      descEn: "Taxi, Ride apps, Routes",
      descAm: "ታክሲ፣ የመኪና መተግበሪያዎች",
      color: "bg-amber-500",
      query: "Get me home fast",
    },
    {
      icon: Coffee,
      titleEn: "Work & Study",
      titleAm: "ስራ እና ጥናት",
      descEn: "Cafes, Co-working, WiFi spots",
      descAm: "ካፌዎች፣ የስራ ቦታዎች፣ ዋይፋይ",
      color: "bg-purple-500",
      query: "Find a work cafe with good wifi",
    },
    {
      icon: Droplets,
      titleEn: "Home Services",
      titleAm: "የቤት አገልግሎቶች",
      descEn: "Water, Cleaning, Repairs",
      descAm: "ውሃ፣ ጽዳት፣ ጥገና",
      color: "bg-cyan-500",
      query: "Order water delivery",
    },
  ];

  return (
    <div className="flex flex-col pb-28">
      {/* Header */}
      <header className="px-5 pb-4 pt-6">
        <h1 className="text-2xl font-bold text-foreground">
          {language === "am" ? "አስስ" : "Explore"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {language === "am" ? "አዲስ አበባን ይወቁ" : "Discover Addis Ababa"}
        </p>
      </header>

      {/* Search Bar */}
      <div className="px-5 mb-6">
        <button
          onClick={() => router.push("/chat")}
          className="w-full premium-card flex items-center gap-3 px-4 py-3.5 text-left"
        >
          <Search size={20} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">
            {language === "am" ? "ፈልግ..." : "Search..."}
          </span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="px-5">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
          {language === "am" ? "ምድቦች" : "Categories"}
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {categories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <button
                key={idx}
                onClick={() => router.push(`/chat?q=${encodeURIComponent(category.query)}`)}
                className="premium-card p-4 flex items-center gap-4 text-left transition-all btn-press"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${category.color} flex items-center justify-center shadow-sm`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    {language === "am" ? category.titleAm : category.titleEn}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "am" ? category.descAm : category.descEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
