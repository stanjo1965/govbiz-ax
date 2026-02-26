'use client';

import { useState, useCallback } from 'react';
import { ChatContainer } from '@govbiz/chat-ui';
import type { ChatMessage } from '@govbiz/chat-ui';
import { Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const quickButtons = [
  { label: '민원접수', message: '민원 접수 방법에 대해 알려주세요.' },
  { label: '분실물조회', message: '분실물을 조회하고 싶습니다.' },
  { label: '교통법규', message: '교통법규에 대해 질문이 있습니다.' },
  { label: '신고안내', message: '신고 절차와 방법을 안내해 주세요.' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요! 경찰청 AI 시민 상담 서비스입니다.\n\n민원 접수, 분실물 조회, 교통법규 안내, 각종 신고 절차 등 경찰 서비스에 관한 궁금한 점을 편하게 질문해 주세요.\n\n무엇을 도와드릴까요?',
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
      <header className="bg-navy-500 text-white px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-navy-200 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">시민 AI 상담</h1>
            <p className="text-xs text-navy-200">경찰 서비스 민원 안내 및 상담</p>
          </div>
        </div>
      </header>

      {/* Quick Buttons */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
          {quickButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleSendMessage(btn.message)}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-1.5 bg-navy-50 text-navy-600 text-sm rounded-full hover:bg-navy-100 transition-colors disabled:opacity-50"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <ChatContainer
            messages={messages}
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="예: 분실물 조회 방법을 알려주세요"
          />
        </div>
      </div>
    </div>
  );
}
