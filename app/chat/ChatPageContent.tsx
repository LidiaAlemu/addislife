"use client";

import { useSearchParams } from "next/navigation";
import { ChatContainer } from "@/components/chat/ChatContainer";

export function ChatPageContent() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action") ?? undefined;

  return <ChatContainer initialAction={action} />;
}
