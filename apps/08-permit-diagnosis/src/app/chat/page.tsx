'use client';

import { useState, useCallback } from 'react';
import { ChatContainer } from '@govbiz/chat-ui';
import type { ChatMessage } from '@govbiz/chat-ui';
import { Shield, ArrowLeft, Building2, TreePine, Mountain, MapPin } from 'lucide-react';
import Link from 'next/link';

const quickButtons = [
  { label: '건축허가', icon: Building2, query: '건축허가 절차와 요건에 대해 알려주세요' },
  { label: '토지용도변경', icon: MapPin, query: '토지 용도변경 절차와 조건을 알려주세요' },
  { label: '농지전용', icon: TreePine, query: '농지전용 허가 요건과 절차를 설명해 주세요' },
  { label: '산지전용', icon: Mountain, query: '산지전용 허가 기준과 필요 서류를 안내해 주세요' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '안녕하세요! AI 인허가 상담 어시스턴트입니다.\n\n' +
        '토지 개발, 건축허가, 농지전용, 산지전용 등 각종 인허가 절차에 대해 상담해 드립니다.\n\n' +
        '필지 정보를 알려주시면 해당 토지의 용도지역, 건축 가능 여부, 필요한 인허가 절차를 사전 진단해 드리겠습니다.\n\n' +
        '무엇이 궁금하신가요?',
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(
    async (content: string) => {
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
          content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages]
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">AI 인허가 상담</h1>
              <p className="text-xs text-gray-500">
                건축허가 · 토지용도변경 · 농지전용 · 산지전용
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Buttons */}
      {messages.length <= 1 && (
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-gray-400 mb-2">빠른 상담 주제</p>
            <div className="flex flex-wrap gap-2">
              {quickButtons.map((btn) => (
                <button
                  key={btn.label}
                  onClick={() => handleSendMessage(btn.query)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 text-sm text-gray-700 rounded-full hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-colors disabled:opacity-50"
                >
                  <btn.icon className="w-3.5 h-3.5" />
                  {btn.label}
                </button>
              ))}
            </div>
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
            placeholder="예: 경기도 용인시 수지구 대지 300평에 단독주택 건축이 가능한가요?"
          />
        </div>
      </div>
    </div>
  );
}
