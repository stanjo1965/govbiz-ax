import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 기반 모두의 경찰관',
  description: '시민을 위한 AI 기반 스마트 경찰 서비스 - 민원상담, 분실물 탐색, 공익신고, 교통위반 조회',
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
