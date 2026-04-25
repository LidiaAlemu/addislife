"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { Sparkles, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatContainerProps {
  initialQuery?: string;
}

export function ChatContainer({ initialQuery }: ChatContainerProps) {
  const { t, language } = useLanguage();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const { messages, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      language,
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial query from search or category cards
  useEffect(() => {
    if (initialQuery && !initializedRef.current) {
      initializedRef.current = true;
      append({
        role: "user",
        content: initialQuery,
      });
    }
  }, [initialQuery, append]);

  const onSubmit = (content: string) => {
    append({
      role: "user",
      content,
    });
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <header className="glass flex items-center gap-3 px-4 py-3 sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors btn-press"
        >
          <ChevronLeft size={22} className="text-foreground" />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-button">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">{t("app.name")}</h1>
            <p className="text-xs text-muted-foreground">{t("app.tagline")}</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 hide-scrollbar">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <Sparkles size={28} />
            </div>
            <h2 className="text-lg font-bold text-foreground">
              {t("chat.welcome")}
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              {t("app.tagline")}
            </p>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={{
              id: message.id,
              role: message.role as "user" | "assistant",
              content: message.content,
              timestamp: message.createdAt ?? new Date(),
            }}
          />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input */}
      <div className="p-4 pb-6">
        <ChatInput onSend={onSubmit} disabled={isLoading} />
      </div>
    </div>
  );
}
