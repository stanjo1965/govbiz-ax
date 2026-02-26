import Link from 'next/link';
import {
  Globe,
  Search,
  FileCheck,
  Box,
  MessageSquare,
  FileText,
  MapPin,
  Scale,
  TreePine,
  Mountain,
  Building2,
  ChevronRight,
  Shield,
  BarChart3,
  Clock,
} from 'lucide-react';

const serviceCards = [
  {
    title: '디지털트윈 탐색기',
    description: '3D 지형 모델 기반 필지 탐색 및 개발 가능성 시각화',
    icon: Globe,
    href: '/digital-twin',
    color: 'bg-blue-500',
  },
  {
    title: '토지 검색',
    description: '주소 또는 지번으로 전국 토지 정보 검색 및 조회',
    icon: Search,
    href: '/land-search',
    color: 'bg-emerald-500',
  },
  {
    title: '필지별 사전진단',
    description: 'AI 기반 용도지역, 건축 가능 여부, 필요 인허가 자동 분석',
    icon: FileCheck,
    href: '/diagnosis',
    color: 'bg-amber-500',
  },
  {
    title: '3D 시뮬레이션',
    description: '건축물 배치 및 일조권, 조망권 시뮬레이션 실행',
    icon: Box,
    href: '/digital-twin',
    color: 'bg-purple-500',
  },
  {
    title: '자연어 지도 제어',
    description: '"세종시 도담동 대지 보여줘" 등 음성/텍스트 지도 제어',
    icon: MessageSquare,
    href: '/map',
    color: 'bg-cyan-500',
  },
  {
    title: '진단 보고서',
    description: '인허가 사전진단 결과 PDF 보고서 자동 생성 및 다운로드',
    icon: FileText,
    href: '/diagnosis',
    color: 'bg-rose-500',
  },
];

const stats = [
  { label: '진단 필지', value: '7,800만건', icon: MapPin, color: 'bg-blue-500' },
  { label: '관련 법령', value: '2,400건', icon: Scale, color: 'bg-emerald-500' },
  { label: '진단 정확도', value: '92%', icon: BarChart3, color: 'bg-amber-500' },
];

const quickLinks = [
  {
    title: '토지이용규제',
    description: '용도지역/지구/구역 확인 및 행위제한 사항 조회',
    icon: MapPin,
    href: '/diagnosis',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    title: '건축허가',
    description: '건축법 기반 허가 요건 및 절차 사전 확인',
    icon: Building2,
    href: '/diagnosis',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    title: '농지전용',
    description: '농지법 기반 전용 가능 여부 및 부담금 산정',
    icon: TreePine,
    href: '/diagnosis',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    title: '산지전용',
    description: '산지관리법 기반 전용 허가/신고 요건 확인',
    icon: Mountain,
    href: '/diagnosis',
    color: 'text-purple-600 bg-purple-50',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  통합인허가 사전진단
                </h1>
                <p className="text-xs text-gray-500">국토교통부</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md">
                홈
              </Link>
              <Link href="/digital-twin" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                디지털트윈
              </Link>
              <Link href="/land-search" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                토지 검색
              </Link>
              <Link href="/diagnosis" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                사전진단
              </Link>
              <Link href="/map" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                지도
              </Link>
              <Link href="/chat" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                AI 상담
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                AI 상담
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-700 via-primary-600 to-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-sm mb-6">
              <Globe className="w-4 h-4" />
              <span>디지털트윈 기반 AI 사전진단</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-4">
              AI 기반 통합인허가
              <br />
              사전진단 서비스
            </h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              전국 7,800만 필지에 대한 용도지역, 건축 가능 여부, 필요 인허가 절차를
              AI가 사전 진단합니다. 디지털트윈으로 3D 시뮬레이션까지 한 번에 확인하세요.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/land-search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5" />
                토지 검색 시작
              </Link>
              <Link
                href="/digital-twin"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 text-white font-semibold rounded-lg hover:bg-white/25 transition-colors"
              >
                <Globe className="w-5 h-5" />
                디지털트윈 탐색
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center shrink-0`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Service Cards */}
        <section>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">주요 서비스</h3>
            <p className="text-gray-500">디지털트윈과 AI를 활용한 통합 인허가 사전진단 서비스를 이용하세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all"
              >
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {card.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  바로가기 <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section>
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">인허가 유형별 바로가기</h3>
            <p className="text-gray-500">주요 인허가 유형별로 빠르게 사전진단을 시작하세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary-200 transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${link.color}`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {link.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">이용 안내</h3>
            <p className="text-gray-500">3단계로 간편하게 인허가 사전진단을 받으세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-500" />
              </div>
              <div className="text-sm font-medium text-primary-500 mb-2">Step 1</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">토지 검색</h4>
              <p className="text-sm text-gray-500">주소 또는 지번으로 대상 필지를 검색합니다</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileCheck className="w-8 h-8 text-amber-500" />
              </div>
              <div className="text-sm font-medium text-amber-500 mb-2">Step 2</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">AI 사전진단</h4>
              <p className="text-sm text-gray-500">AI가 법령 기반 인허가 가능 여부를 자동 진단합니다</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="text-sm font-medium text-emerald-500 mb-2">Step 3</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">보고서 확인</h4>
              <p className="text-sm text-gray-500">진단 결과 보고서를 확인하고 다운로드합니다</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm">
            <p className="text-gray-300 mb-1">
              국토교통부 | AI 기반 통합인허가 사전진단 시스템
            </p>
            <p className="text-gray-500 text-xs">
              세종특별자치시 도움6로 11 국토교통부 | 대표전화 1599-0001
            </p>
            <p className="text-gray-600 text-xs mt-2">
              본 서비스의 진단 결과는 참고용이며, 최종 인허가 판단은 관할 행정기관의 정식 심사를 통해 결정됩니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
