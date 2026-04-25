"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { Sparkles } from "lucide-react";

interface ChatContainerProps {
  initialAction?: string;
}

const actionPrompts: Record<string, Record<string, string>> = {
  documents: {
    en: "I need help renewing my documents",
    am: "ሰነዶቼን ለማደስ እርዳታ እፈልጋለሁ",
    om: "Sanadoota koo haaromsuu nan barbaada",
  },
  clinic: {
    en: "I need to find a clinic nearby",
    am: "የቅርብ ክሊኒክ መፈለግ እፈልጋለሁ",
    om: "Kilinika naannoo koo barbaadaa jira",
  },
  transport: {
    en: "I want to compare transport options to get home",
    am: "ወደ ቤት ለመሄድ የትራንስፖርት አማራጮችን ማወዳደር እፈልጋለሁ",
    om: "Filannoo geejjibaa mana gahuu madaaluu barbaada",
  },
  water: {
    en: "I need to order water delivery",
    am: "ውሃ ማዘዝ እፈልጋለሁ",
    om: "Bishaan ajajuu nan barbaada",
  },
  cafe: {
    en: "I want to find a work cafe with WiFi",
    am: "WiFi ያለው የስራ ካፌ መፈለግ እፈልጋለሁ",
    om: "Kaafee hojii WiFi qabu barbaadaa jira",
  },
};

export function ChatContainer({ initialAction }: ChatContainerProps) {
  const { t, language } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const { messages, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      language, // Send current language with every request
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial action from category cards
  useEffect(() => {
    if (initialAction && actionPrompts[initialAction] && !initializedRef.current) {
      initializedRef.current = true;
      const prompt = actionPrompts[initialAction][language] || actionPrompts[initialAction].en;
      append({
        role: "user",
        content: prompt,
      });
    }
  }, [initialAction, append, language]);

  const onSubmit = (content: string) => {
    append({
      role: "user",
      content,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 safe-top">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="font-semibold text-card-foreground">{t("app.name")}</h1>
          <p className="text-xs text-muted-foreground">{t("app.tagline")}</p>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles size={32} />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              {t("home.greeting")}
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSubmit} disabled={isLoading} />
    </div>
  );
}
