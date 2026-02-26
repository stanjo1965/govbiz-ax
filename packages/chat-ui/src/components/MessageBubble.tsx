"use client";
import * as React from "react";
import { cn } from "@govbiz/krds-ui";
import type { ChatMessage } from "../types";
import { SourceCitation } from "./SourceCitation";

interface MessageBubbleProps {
  message: ChatMessage;
  showSources?: boolean;
}

function MessageBubble({ message, showSources = true }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3",
        isUser
          ? "bg-primary-500 text-white rounded-br-md"
          : "bg-gray-100 text-gray-900 rounded-bl-md"
      )}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
        {message.isStreaming && (
          <span className="inline-block w-1.5 h-4 ml-0.5 bg-current animate-pulse" />
        )}
        {showSources && message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200/20">
            {message.sources.map((source, i) => (
              <SourceCitation key={i} title={source.title} url={source.url} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { MessageBubble };
