"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AIPromptBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Navigate to chat with the query
      router.push(`/chat?q=${encodeURIComponent(query)}`);
    }
  };

  const placeholders = {
    en: "Ask AddisLife anything...",
    am: "ማንኛውንም ነገር ይጠይቁ...",
    om: "AddisLife waa'ee gaafadhaa...",
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className={`premium-card flex items-center gap-3 px-4 py-3.5 transition-all ${
          isFocused ? "glow-input" : ""
        }`}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
          <Sparkles size={16} className="text-primary" />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholders[language]}
          className="flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all btn-press"
          >
            <Mic size={18} />
          </button>
          <button
            type="submit"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shadow-button hover:bg-primary/90 transition-all btn-press"
          >
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Typing indicator when AI would be responding */}
      {isFocused && query.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary typing-dot" />
            </div>
            <span className="text-xs">AddisLife is thinking...</span>
          </div>
        </div>
      )}
    </form>
  );
}
