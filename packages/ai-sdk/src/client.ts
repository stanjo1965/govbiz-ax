import { createAnthropic } from "@ai-sdk/anthropic";
import type { LanguageModelV1 } from "ai";

export interface AIClientConfig {
  apiKey?: string;
  baseURL?: string;
  defaultModel?: string;
}

export interface AIClient {
  model: LanguageModelV1;
  getModel: (modelId: string) => LanguageModelV1;
}

export function createAIClient(config: AIClientConfig = {}): AIClient {
  const anthropic = createAnthropic({
    apiKey: config.apiKey || process.env.ANTHROPIC_API_KEY,
    baseURL: config.baseURL,
  });

  const defaultModel = config.defaultModel || "claude-sonnet-4-20250514";

  return {
    model: anthropic(defaultModel),
    getModel: (modelId: string) => anthropic(modelId),
  };
}
