import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 기반 소상공인 창업·경영 컨설팅',
  description: '소상공인을 위한 AI 기반 경영 분석 및 맞춤형 컨설팅 솔루션',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
