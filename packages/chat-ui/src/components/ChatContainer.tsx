"use client";
import * as React from "react";
import { cn } from "@govbiz/krds-ui";
import type { ChatContainerProps } from "../types";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { MessageSquare } from "lucide-react";

function ChatContainer({
  messages,
  onSend,
  isLoading = false,
  placeholder,
  title,
  subtitle,
  className,
  showSources = true,
}: ChatContainerProps) {
  return (
    <div className={cn("flex h-full flex-col bg-white rounded-lg border border-gray-200 shadow-sm", className)}>
      {(title || subtitle) && (
        <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
            <MessageSquare className="h-4 w-4 text-primary-600" />
          </div>
          <div>
            {title && <h2 className="text-sm font-semibold text-gray-900">{title}</h2>}
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>
      )}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        showSources={showSources}
        className="flex-1"
      />
      <ChatInput
        onSend={onSend}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </div>
  );
}

export { ChatContainer };
