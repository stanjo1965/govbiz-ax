import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 기반 국가유산 해설 솔루션',
  description: '대한민국 국가유산을 AI 해설사와 함께 탐험하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
