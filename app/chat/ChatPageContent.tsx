"use client";

import { useSearchParams } from "next/navigation";
import { ChatContainer } from "@/components/chat/ChatContainer";

export function ChatPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? undefined;

  return <ChatContainer initialQuery={query} />;
}
