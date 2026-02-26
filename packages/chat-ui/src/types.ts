export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
  sources?: { title: string; url?: string; content?: string }[];
  isStreaming?: boolean;
}

export interface ChatContainerProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  showSources?: boolean;
  enableVoice?: boolean;
  enableImageUpload?: boolean;
}
