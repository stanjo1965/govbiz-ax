import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI 국민보험 안내',
  description: '금융위원회·금융감독원 AI 보험 안내 서비스 - 보험 포트폴리오 진단, 상품 비교, 청구 가이드를 제공하는 공공 보험 정보 플랫폼',
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
