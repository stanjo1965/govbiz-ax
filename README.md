# GovBiz AX — 2026 공공AX 프로젝트 모노레포

> 2026년 공공AX(AI 전환) 프로젝트 8개 과제를 위한 Next.js 15 + Turborepo 모노레포

## 프로젝트 구성

```
govbiz-ax/
├── apps/
│   ├── 01-agri-price/        # ① 농축산물 알뜰 소비 플랫폼          (포트 3001)
│   ├── 02-biz-consulting/    # ② 소상공인 창업·경영 컨설팅           (포트 3002)
│   ├── 03-heritage-guide/    # ③ 국가유산 AI 해설 솔루션             (포트 3003)
│   ├── 04-deep-blue-eye/     # ④ 해상안전 Deep Blue Eye             (포트 3004)
│   ├── 05-safety-guardian/   # ⑤ 식의약품 안전 지킴이 솔루션         (포트 3005)
│   ├── 06-tax-counsel/       # ⑥ AI 국세상담 시스템                  (포트 3006)
│   ├── 07-police-for-all/    # ⑦ 모두의 경찰관                      (포트 3007)
│   └── 08-permit-diagnosis/  # ⑧ 통합인허가 사전진단 서비스           (포트 3008)
└── packages/
    ├── ai-sdk/               # Vercel AI SDK + Claude 통합 레이어
    ├── auth/                 # next-auth v5 인증 모듈
    ├── chat-ui/              # 공통 AI 채팅 UI 컴포넌트
    ├── eslint-config/        # 공유 ESLint 설정
    ├── krds-ui/              # KRDS 기반 UI 컴포넌트 라이브러리
    └── tsconfig/             # 공유 TypeScript 설정
```

## 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | Next.js 15 (App Router) + React 19 |
| 언어 | TypeScript 5.x |
| 스타일 | Tailwind CSS v4 + KRDS 디자인 시스템 |
| AI | Vercel AI SDK + Claude (claude-sonnet-4-20250514) |
| 인증 | next-auth v5 (Auth.js) |
| 빌드 | Turborepo + pnpm workspace |
| DB | PostgreSQL + TimescaleDB / PostGIS / pgvector |

## 시작하기

### 1. 사전 요구사항

- Node.js 20+
- pnpm 10.x (`npm install -g pnpm`)
- Anthropic API Key

### 2. 설치

```bash
git clone <repo-url>
cd govbiz-ax
pnpm install
```

### 3. 환경 변수 설정

```bash
cp .env.example .env.local
# .env.local 파일에서 ANTHROPIC_API_KEY 등 필수 값 입력
```

### 4. 개발 서버 실행

```bash
# 전체 앱 동시 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter @govbiz/agri-price dev        # 농축산물 앱
pnpm --filter @govbiz/biz-consulting dev    # 소상공인 앱
pnpm --filter @govbiz/heritage-guide dev   # 국가유산 앱
pnpm --filter @govbiz/deep-blue-eye dev    # 해상안전 앱
pnpm --filter @govbiz/safety-guardian dev  # 식의약품 앱
pnpm --filter @govbiz/tax-counsel dev      # 국세상담 앱
pnpm --filter @govbiz/police-for-all dev   # 경찰민원 앱
pnpm --filter @govbiz/permit-diagnosis dev # 인허가 앱
```

### 5. 빌드

```bash
# 전체 빌드
pnpm build

# 특정 앱 빌드
pnpm --filter @govbiz/agri-price build
```

## 앱별 주요 기능

### ① 농축산물 알뜰 소비 플랫폼
- 전국 농축산물 실시간 가격 비교
- AI 쇼핑 어시스턴트 (Claude)
- 주변 최저가 가격 지도
- 제철 식재료 절약 레시피 추천
- 장보기 목록 & 최적 동선 안내

### ② 소상공인 창업·경영 컨설팅
- AI 기반 상권 분석 & 업종 추천
- 매출/비용 분석 대시보드
- 경영 전략 AI 컨설팅 채팅
- 맞춤형 경영 보고서 생성

### ③ 국가유산 AI 해설
- 전국 국가유산 검색 & 지도
- AI 문화재 해설 (다국어 지원)
- 테마별 관광 루트 추천
- 역사 스토리텔링 채팅

### ④ 해상안전 Deep Blue Eye
- 항공 채증영상 AI 분석
- 실시간 해상 모니터링 대시보드
- 선박 AIS 데이터베이스
- 불법조업/표류선박 탐지 임무 관리

### ⑤ 식의약품 안전 지킴이
- 식품·의약품 안전 정보 검색
- AI 안전 상담 챗봇
- 일일 안전 점검 알림
- 허위정보 팩트체크

### ⑥ AI 국세상담
- 세법 검색 & AI 해석
- 세금 신고 일정 캘린더
- 나의 세금 대시보드
- 맞춤형 절세 전략 상담

### ⑦ 모두의 경찰관
- AI 경찰 민원 접수 & 안내
- 분실물 신고 & 조회
- 교통법규 위반 조회
- 긴급상황 112 연계

### ⑧ 통합인허가 사전진단
- 필지별 인허가 AI 사전 진단
- 디지털트윈 3D 시뮬레이션
- 용도지역·법령 자동 분석
- 인허가 절차 체크리스트

## 공유 패키지

### `@govbiz/krds-ui`
한국 정부 디자인 시스템(KRDS) 기반 UI 컴포넌트:
- Button, Input, Card, Badge, Skeleton
- Header, Footer (정부 표준)
- Stat (지표 카드)

### `@govbiz/ai-sdk`
Claude AI 통합 레이어:
- `createAIClient()` — Anthropic 클라이언트 팩토리
- `systemPrompts` — 8개 서비스별 시스템 프롬프트

### `@govbiz/chat-ui`
대화형 AI 채팅 컴포넌트:
- `ChatContainer` — 전체 채팅 오케스트레이터
- `MessageBubble` — 스트리밍 지원 메시지 버블
- `ChatInput` — 자동 높이 조절 입력창

### `@govbiz/auth`
next-auth v5 인증:
- JWT 전략 (8시간 세션)
- 역할 기반 접근 제어 (citizen/officer/admin/superadmin)
- `useCurrentUser()`, `useHasRole()` 훅

## 라이선스

이 프로젝트는 2026년 공공AX 프로젝트 개발 목적으로 작성되었습니다.
