'use client';

import { useState, useCallback } from 'react';
import { ChatContainer } from '@govbiz/chat-ui';
import type { ChatMessage } from '@govbiz/chat-ui';
import { Landmark, ArrowLeft, Globe, Accessibility, Eye, Ear } from 'lucide-react';
import Link from 'next/link';

const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        '안녕하세요! AI 국가유산 해설사입니다.\n\n' +
        '대한민국의 궁궐, 사찰, 성곽, 전통마을 등 다양한 국가유산에 대해 해설해 드립니다.\n\n' +
        '궁금한 유산의 이름을 알려주시면, 역사적 배경, 건축적 특징, 문화적 의미 등을 상세히 설명해 드리겠습니다.\n\n' +
        '무엇이 궁금하신가요?',
      createdAt: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('ko');
  const [accessibilityMode, setAccessibilityMode] = useState<string | null>(null);

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
            language: selectedLang,
            accessibilityMode,
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
    [messages, selectedLang, accessibilityMode]
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
              <Landmark className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">AI 국가유산 해설사</h1>
              <p className="text-xs text-gray-500">
                국가유산 해설 · 관광 안내 · 역사 문화 상담
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
              <Globe className="w-3.5 h-3.5 text-gray-500 ml-1.5" />
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang.code)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    selectedLang === lang.code
                      ? 'bg-white text-primary-600 font-medium shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Accessibility Toggles */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() =>
                  setAccessibilityMode(
                    accessibilityMode === 'visual' ? null : 'visual'
                  )
                }
                className={`p-1.5 rounded-lg transition-colors ${
                  accessibilityMode === 'visual'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title="시각 접근성 모드"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setAccessibilityMode(
                    accessibilityMode === 'audio' ? null : 'audio'
                  )
                }
                className={`p-1.5 rounded-lg transition-colors ${
                  accessibilityMode === 'audio'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title="청각 접근성 모드"
              >
                <Ear className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setAccessibilityMode(
                    accessibilityMode === 'easy' ? null : 'easy'
                  )
                }
                className={`p-1.5 rounded-lg transition-colors ${
                  accessibilityMode === 'easy'
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title="쉬운 해설 모드"
              >
                <Accessibility className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <ChatContainer
            messages={messages}
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="예: 경복궁의 역사에 대해 알려주세요"
          />
        </div>
      </div>
    </div>
  );
}
