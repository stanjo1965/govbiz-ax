import Link from 'next/link';
import { Shield, MessageCircle, Search, FileText, Phone, Car, AlertTriangle, BarChart3, Clock, CheckCircle } from 'lucide-react';

const services = [
  {
    href: '/chat',
    icon: MessageCircle,
    title: '시민 챗봇',
    description: 'AI 상담원과 대화하며 경찰 민원을 간편하게 해결하세요',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '/lost-found',
    icon: Search,
    title: '분실물 AI 탐색',
    description: 'AI 이미지 분석으로 분실물을 빠르게 찾아드립니다',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    href: '/report',
    icon: FileText,
    title: '공익신고',
    description: '교통위반, 불법주정차 등 공익을 위한 신고를 접수하세요',
    color: 'bg-green-50 text-green-600',
  },
  {
    href: '/chat',
    icon: Phone,
    title: '182 콜센터 어드바이저',
    description: 'AI가 182 콜센터 상담을 보조하여 신속한 안내를 제공합니다',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    href: '/traffic',
    icon: Car,
    title: '교통위반 조회',
    description: '교통위반 이력 및 과태료 납부 현황을 조회하세요',
    color: 'bg-red-50 text-red-600',
  },
];

const stats = [
  { label: '민원처리', value: '89만건', icon: BarChart3 },
  { label: '분실물 매칭률', value: '78%', icon: CheckCircle },
  { label: '응답시간 단축', value: '65%', icon: Clock },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Government Header */}
      <header className="bg-navy-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">
                경찰청 | 모두의 경찰관
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/chat" className="text-sm text-navy-200 hover:text-white transition-colors">시민상담</Link>
              <Link href="/lost-found" className="text-sm text-navy-200 hover:text-white transition-colors">분실물</Link>
              <Link href="/report" className="text-sm text-navy-200 hover:text-white transition-colors">공익신고</Link>
              <Link href="/traffic" className="text-sm text-navy-200 hover:text-white transition-colors">교통위반</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-500 to-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">AI 기반 스마트 경찰 서비스</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI 기반 모두의 경찰관
          </h2>
          <p className="text-lg md:text-xl text-navy-200 mb-8 max-w-2xl mx-auto">
            시민을 위한 스마트 경찰 서비스
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-navy-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              시민 상담 시작하기
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center justify-center gap-2 bg-navy-400 text-white px-6 py-3 rounded-lg font-semibold border border-navy-300 hover:bg-navy-300 transition-colors"
            >
              <FileText className="w-5 h-5" />
              공익신고 하기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-50 text-navy-500 mb-3">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-navy-500 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            주요 서비스
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={`${service.href}-${index}`}
                href={service.href}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-navy-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-navy-500 mb-2">
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

      {/* Emergency Notice */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-red-800 mb-1">
                긴급 상황 시 112 신고
              </h4>
              <p className="text-sm text-red-600">
                생명이 위급하거나 범죄가 진행 중인 긴급 상황에서는 즉시 112에 신고해 주세요.
                본 서비스는 긴급 신고를 대체하지 않습니다.
              </p>
              <div className="mt-3">
                <a
                  href="tel:112"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  112 긴급 신고
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p className="mb-2">경찰청 | AI 기반 모두의 경찰관 서비스</p>
            <p className="text-gray-500">
              서울특별시 서대문구 통일로 97 | 민원상담 182 | 긴급신고 112
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
