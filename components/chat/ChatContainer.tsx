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

const actionPrompts: Record<string, string> = {
  documents: "I need help renewing my documents",
  clinic: "I need to find a clinic nearby",
  transport: "I want to compare transport options to get home",
  water: "I need to order water delivery",
  cafe: "I want to find a work cafe with WiFi",
};

export function ChatContainer({ initialAction }: ChatContainerProps) {
  const { t } = useLanguage();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat({
    api: "/api/chat",
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
      append({
        role: "user",
        content: actionPrompts[initialAction],
      });
    }
  }, [initialAction, append]);

  const handleSendMessage = (content: string) => {
    handleInputChange({ target: { value: content } } as React.ChangeEvent<HTMLInputElement>);
    // Small delay to ensure state updates
    setTimeout(() => {
      const form = document.createElement("form");
      handleSubmit({ preventDefault: () => {} } as React.FormEvent<HTMLFormElement>);
    }, 0);
  };

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
