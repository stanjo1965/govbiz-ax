import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 기반 통합인허가 사전진단',
  description: '디지털트윈 기반 토지 개발, 건축, 농지전용, 산지전용 등 통합인허가 AI 사전진단 서비스',
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
