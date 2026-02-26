import { streamText } from 'ai';
import { createAIClient, systemPrompts } from '@govbiz/ai-sdk';

const client = createAIClient();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: client.model,
    system: systemPrompts.bizConsulting,
    messages,
  });
  return result.toDataStreamResponse();
}
