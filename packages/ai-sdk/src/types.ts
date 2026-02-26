export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  tools?: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  sources?: Source[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface Source {
  title: string;
  url?: string;
  content?: string;
  score?: number;
}

export interface GuardrailResult {
  safe: boolean;
  reason?: string;
  filtered?: string;
}
