import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 국세상담 시스템',
  description: 'AI 기반 국세 상담 서비스 - 세법 안내, 판례 검색, 세금 신고 지원을 위한 지능형 세무 상담 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
