import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '해상안전 AI Deep Blue Eye',
  description: '항공 채증영상 기반 AI 해상 안전 모니터링 시스템',
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
