import Link from 'next/link';
import {
  MapPin,
  TrendingUp,
  Users,
  Truck,
  UtensilsCrossed,
  Stethoscope,
  ShieldCheck,
  Calculator,
  Target,
  MessageCircle,
  BarChart3,
  Briefcase,
} from 'lucide-react';

const analysisServices = [
  {
    icon: MapPin,
    title: '상권입지분석',
    description: '최적 입지 선정을 위한 상권 데이터 분석',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: TrendingUp,
    title: '수요예측',
    description: 'AI 기반 매출 및 수요 변동 예측 분석',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Users,
    title: '고객특성',
    description: '주요 고객층 분석 및 타겟 마케팅 전략',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Truck,
    title: '배달최적화',
    description: '배달 플랫폼 최적화 및 효율 분석',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: UtensilsCrossed,
    title: '메뉴트렌드',
    description: '최신 메뉴 트렌드 분석 및 신메뉴 제안',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: Stethoscope,
    title: '경영진단',
    description: '현재 경영 상태 종합 진단 및 개선안',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: ShieldCheck,
    title: '생존예측',
    description: '업종별 생존율 예측 및 리스크 분석',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Calculator,
    title: '재무진단',
    description: '매출·비용 구조 분석 및 재무 건전성 진단',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Target,
    title: '경영전략',
    description: 'AI 기반 맞춤형 경영 전략 수립 지원',
    color: 'bg-indigo-50 text-indigo-600',
  },
];

const stats = [
  { label: '분석완료', value: '12,500건' },
  { label: '컨설팅 보고서', value: '8,300건' },
  { label: '매출 증가율', value: '23%' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Government Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                소상공인 창업·경영 컨설팅
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/analysis" className="text-sm text-gray-600 hover:text-primary-500">분석서비스</Link>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-primary-500">대시보드</Link>
              <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-500">AI 상담</Link>
              <Link href="/reports" className="text-sm text-gray-600 hover:text-primary-500">보고서</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI 기반 소상공인 맞춤형 경영 컨설팅
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            상권 분석부터 경영 전략 수립까지, AI가 소상공인의 성공적인
            창업과 경영을 도와드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              AI 컨설팅 시작하기
            </Link>
            <Link
              href="/analysis"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold border border-primary-400 hover:bg-primary-800 transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              분석 서비스 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
            9대 AI 분석 서비스
          </h3>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            소상공인의 창업부터 경영까지, AI가 데이터 기반 맞춤 분석을 제공합니다
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysisServices.map((service) => (
              <Link
                key={service.title}
                href="/analysis"
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p className="mb-2">중소벤처기업부 | 소상공인 창업·경영 컨설팅 플랫폼</p>
            <p className="text-gray-500">
              세종특별자치시 정부세종청사 | 대표전화 1357
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
