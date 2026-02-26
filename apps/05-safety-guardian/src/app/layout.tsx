import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '인체적용제품 AI 안전 지킴이',
  description: 'AI 기반 식품, 의약품, 화장품, 의료기기 안전 정보 조회 및 위해 사례 분석 서비스',
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
