import Link from 'next/link';
import {
  Shield,
  Search,
  MessageSquare,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Newspaper,
  Activity,
  ChevronRight,
  Database,
  Users,
  Bell,
} from 'lucide-react';

const aiServices = [
  {
    title: '풀스토리 AI',
    subtitle: '제품 전주기 정보',
    description: '원료부터 폐기까지 제품의 전체 라이프사이클 안전 정보를 AI가 한눈에 보여드립니다.',
    icon: BookOpen,
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    textColor: 'text-green-700',
    href: '/fullstory',
  },
  {
    title: '팩트 AI',
    subtitle: '진위 확인',
    description: '제품의 효능, 성분, 안전성에 대한 주장을 과학적 근거와 인허가 데이터로 검증합니다.',
    icon: CheckCircle,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    href: '/fact-check',
  },
  {
    title: '세이프 AI',
    subtitle: '위해 히스토리',
    description: '제품별 위해 사례, 리콜 이력, 부작용 신고 내역을 분석하여 안전 이력을 제공합니다.',
    icon: AlertTriangle,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    href: '/search',
  },
  {
    title: '라이프센스 AI',
    subtitle: '일일 안전체크',
    description: '매일 업데이트되는 안전 경보, 리콜 알림, 맞춤형 안전 팁을 제공합니다.',
    icon: Activity,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-700',
    href: '/daily-check',
  },
  {
    title: '인포 픽 AI',
    subtitle: '오늘의 안전정보',
    description: '오늘 꼭 알아야 할 식의약품 안전 뉴스와 정보를 AI가 엄선하여 전달합니다.',
    icon: Newspaper,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    href: '/daily-check',
  },
];

const stats = [
  { label: '분석 데이터', value: '9억건+', icon: Database, color: 'bg-green-500' },
  { label: '안전 조회', value: '45만건/일', icon: Users, color: 'bg-blue-500' },
  { label: '위해정보 알림', value: '2,300건', icon: Bell, color: 'bg-amber-500' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-700 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  AI 안전 지킴이
                </h1>
                <p className="text-xs text-gray-500">식품의약품안전처</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md">
                홈
              </Link>
              <Link href="/search" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Search className="w-4 h-4 inline mr-1" />제품 조회
              </Link>
              <Link href="/fullstory" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <BookOpen className="w-4 h-4 inline mr-1" />풀스토리
              </Link>
              <Link href="/fact-check" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <CheckCircle className="w-4 h-4 inline mr-1" />팩트체크
              </Link>
              <Link href="/daily-check" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <Activity className="w-4 h-4 inline mr-1" />안전체크
              </Link>
              <Link href="/chat" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                <MessageSquare className="w-4 h-4 inline mr-1" />AI 상담
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">식품의약품안전처 공식 AI 서비스</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              AI가 지키는<br />식의약품 안전
            </h2>
            <p className="text-lg text-green-100 mb-8 leading-relaxed">
              식품, 의약품, 화장품, 의료기기까지<br className="sm:hidden" />
              인체적용제품의 안전 정보를 AI가 분석하여 알려드립니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/search"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                제품 안전 조회
              </Link>
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500/30 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold hover:bg-green-500/50 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                AI 상담하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 justify-center">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
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

      {/* AI Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">5대 AI 안전 서비스</h3>
          <p className="text-gray-500">인체적용제품의 안전을 위한 AI 기반 종합 정보 서비스</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiServices.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-300 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{service.title}</h4>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${service.lightColor} ${service.textColor}`}>
                      {service.subtitle}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-end mt-4 text-sm text-green-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                자세히 보기 <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Access */}
      <section className="bg-green-50 border-y border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">빠른 안전 조회</h3>
            <p className="text-sm text-gray-500">자주 찾는 안전 정보에 바로 접근하세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '식품 안전 조회', icon: Search, href: '/search?category=food' },
              { label: '의약품 검색', icon: Search, href: '/search?category=drug' },
              { label: '리콜 현황', icon: AlertTriangle, href: '/daily-check' },
              { label: 'AI 안전 상담', icon: MessageSquare, href: '/chat' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-3 bg-white rounded-xl p-5 border border-green-200 hover:border-green-400 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbulb Tip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">알고 계셨나요?</h4>
              <p className="text-green-100 leading-relaxed">
                식품의약품안전처의 AI 안전 지킴이는 9억 건 이상의 안전 데이터를 학습하여,
                제품의 안전성을 실시간으로 분석합니다. 제품 바코드를 촬영하거나 제품명을 입력하면
                해당 제품의 안전 정보를 즉시 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-semibold text-white">식품의약품안전처</span>
            </div>
            <p className="text-gray-400 text-sm mb-1">
              인체적용제품 AI 안전 지킴이 | 식의약품 안전 정보 서비스
            </p>
            <p className="text-gray-500 text-xs">
              충청북도 청주시 흥덕구 오송읍 오송생명2로 187 식품의약품안전처 | 대표전화 1577-1255
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
