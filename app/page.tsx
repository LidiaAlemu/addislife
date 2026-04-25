"use client";

import { HomeHeader } from "@/components/home/HomeHeader";
import { AIPromptBar } from "@/components/home/AIPromptBar";
import { FeaturedCard } from "@/components/home/FeaturedCard";
import { QuickActions } from "@/components/home/QuickActions";
import { TrendingWidgets } from "@/components/home/TrendingWidgets";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6 pb-28">
      <HomeHeader />
      <div className="px-5">
        <AIPromptBar />
      </div>
      <div className="px-5">
        <FeaturedCard />
      </div>
      <div className="px-5">
        <QuickActions />
      </div>
      <div className="px-5">
        <TrendingWidgets />
      </div>
    </div>
  );
}
