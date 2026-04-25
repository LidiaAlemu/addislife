import { Suspense } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";
import { ChatPageContent } from "./ChatPageContent";

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatContainer />}>
      <ChatPageContent />
    </Suspense>
  );
}
