'use client';

import { useState, useCallback } from 'react';
import { ChatContainer } from '@govbiz/chat-ui';
import type { ChatMessage } from '@govbiz/chat-ui';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const quickQuestions = [
  { label: '실손보험 청구', query: '실손보험 청구 절차와 필요한 서류를 알려주세요' },
  { label: '보험 중복 확인', query: '보험 중복 가입 여부를 확인하는 방법이 궁금합니다' },
  { label: '보험금 미지급', query: '보험사가 보험금 지급을 거절하거나 지연할 때 어떻게 해야 하나요?' },
  { label: '보험 해지 절차', query: '보험을 해지하면 환급금은 얼마나 받을 수 있나요?' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '안녕하세요! 금융위원회·금융감독원 AI 보험 안내 어시스턴트입니다.\n\n보험 약관 해석, 청구 절차, 보장 공백 진단, 보험 분쟁 해결 방법 등 다양한 보험 관련 질문에 중립적이고 정확한 정보를 제공해 드립니다.\n\n⚠️ 본 서비스는 특정 보험 상품을 판매하거나 추천하지 않습니다.\n보험 분쟁 발생 시 금융감독원(1332)으로 연락하세요.\n\n아래 주제를 선택하거나, 궁금한 내용을 자유롭게 질문해 주세요.',
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
          m.id === assistantMessage.id ? { ...m, isStreaming: false } : m
        )
      );
    } catch {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도하거나, 금융감독원(1332)으로 직접 문의해 주세요.',
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
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900">AI 보험 상담</h1>
            <p className="text-xs text-gray-500">보험 약관 · 청구 절차 · 권리 구제 안내</p>
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
                className="px-4 py-2 text-sm bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50"
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
            placeholder="예: 실손보험 청구 절차가 어떻게 되나요?"
          />
        </div>
      </div>
    </div>
  );
}
