import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '농축산물 알뜰 소비 플랫폼',
  description: 'AI 기반 농축산물 가격 비교 및 알뜰 소비 정보 서비스',
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
