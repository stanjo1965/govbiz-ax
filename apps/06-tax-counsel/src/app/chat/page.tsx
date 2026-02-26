'use client';

import { useState, useCallback } from 'react';
import { ChatContainer } from '@govbiz/chat-ui';
import type { ChatMessage } from '@govbiz/chat-ui';
import { Building2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const quickQuestions = [
  { label: '종합소득세', query: '종합소득세 신고 방법과 기한을 알려주세요' },
  { label: '부가가치세', query: '부가가치세 신고 절차와 납부 방법이 궁금합니다' },
  { label: '양도소득세', query: '양도소득세 계산 방법과 비과세 요건을 알려주세요' },
  { label: '연말정산', query: '연말정산 공제 항목과 간소화 서비스 이용법을 알려주세요' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '안녕하세요! AI 국세상담 챗봇입니다.\n\n세금 신고, 납부, 세법 해석, 공제 요건 등 다양한 세무 관련 질문에 답변드릴 수 있습니다.\n\n아래 주제를 선택하거나, 궁금한 내용을 자유롭게 질문해 주세요.',
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) throw new Error('AI 응답 실패');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        createdAt: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantMessage.content += chunk;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: assistantMessage.content }
                : m
            )
          );
        }
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, isStreaming: false }
            : m
        )
      );
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">AI 국세상담</h1>
            <p className="text-xs text-gray-500">세금 신고 · 세법 안내 · 공제 상담</p>
          </div>
        </div>
      </header>

      {/* Quick Question Buttons */}
      {messages.length <= 1 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q.label}
                onClick={() => handleSendMessage(q.query)}
                disabled={isLoading}
                className="px-4 py-2 text-sm bg-primary-50 text-primary-600 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors disabled:opacity-50"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <ChatContainer
            messages={messages}
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="예: 종합소득세 신고 기한이 언제인가요?"
          />
        </div>
      </div>
    </div>
  );
}
