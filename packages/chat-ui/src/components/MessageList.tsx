"use client";
import * as React from "react";
import { cn } from "@govbiz/krds-ui";
import type { ChatMessage } from "../types";
import { MessageBubble } from "./MessageBubble";
import { StreamingIndicator } from "./StreamingIndicator";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  showSources?: boolean;
  className?: string;
}

function MessageList({ messages, isLoading = false, showSources = true, className }: MessageListProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className={cn("flex-1 overflow-y-auto p-4 space-y-4", className)}>
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
          대화를 시작해보세요
        </div>
      )}
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} showSources={showSources} />
      ))}
      {isLoading && <StreamingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}

export { MessageList };
