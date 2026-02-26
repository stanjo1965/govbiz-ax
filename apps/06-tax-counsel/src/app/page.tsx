import Link from 'next/link';
import {
  MessageCircle,
  Phone,
  UserCheck,
  Search,
  CalendarDays,
  Building2,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

const services = [
  {
    href: '/chat',
    icon: MessageCircle,
    title: '홈택스 AI 챗봇',
    description: 'AI가 세금 관련 질문에 실시간으로 답변합니다',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '#',
    icon: Phone,
    title: '전화상담',
    description: '국세상담센터 126 전화상담 안내',
    color: 'bg-green-50 text-green-600',
  },
  {
    href: '/my-tax',
    icon: UserCheck,
    title: '개인맞춤 상담',
    description: '나의 세금 현황에 맞는 맞춤형 상담 서비스',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    href: '/search',
    icon: Search,
    title: '세법/판례 검색',
    description: '세법, 판례, 예규, 해석 통합 검색 서비스',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    href: '/calendar',
    icon: CalendarDays,
    title: '세금 캘린더',
    description: '주요 세금 신고/납부 기한을 한눈에 확인',
    color: 'bg-teal-50 text-teal-600',
  },
];

const stats = [
  { label: '상담 처리', value: '120만건/년', description: '연간 AI 상담 처리 건수' },
  { label: '응답 정확도', value: '95%', description: 'AI 세무 상담 정확도' },
  { label: '대기시간 단축', value: '82%', description: '기존 대비 대기시간 절감' },
];

const faqs = [
  {
    question: '종합소득세 신고는 어떻게 하나요?',
    description: '종합소득세 신고 대상, 기간, 방법 안내',
    href: '/chat?q=종합소득세+신고+방법',
  },
  {
    question: '부가가치세 신고/납부 절차가 궁금합니다',
    description: '부가가치세 과세기간, 신고기한, 납부방법',
    href: '/chat?q=부가가치세+신고+납부+절차',
  },
  {
    question: '연말정산 간소화 서비스 이용 방법',
    description: '연말정산 시기, 공제항목, 간소화 서비스 이용법',
    href: '/chat?q=연말정산+간소화+서비스',
  },
  {
    question: '양도소득세 계산과 신고 방법',
    description: '양도소득세 과세대상, 세율, 비과세 요건',
    href: '/chat?q=양도소득세+계산+신고',
  },
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
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                AI 국세상담
              </h1>
              <span className="hidden sm:inline text-xs text-gray-400 border-l border-gray-200 pl-3 ml-1">
                국세청
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-500">AI 상담</Link>
              <Link href="/search" className="text-sm text-gray-600 hover:text-primary-500">세법검색</Link>
              <Link href="/calendar" className="text-sm text-gray-600 hover:text-primary-500">세금캘린더</Link>
              <Link href="/my-tax" className="text-sm text-gray-600 hover:text-primary-500">나의 세금</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI와 함께하는 똑똑한 세금 상담
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            복잡한 세금 문제, AI가 쉽고 정확하게 안내합니다.
            24시간 언제든지 세무 상담을 받아보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              AI 상담 시작하기
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold border border-primary-400 hover:bg-primary-800 transition-colors"
            >
              <Search className="w-5 h-5" />
              세법/판례 검색
            </Link>
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
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
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

      {/* Stats Section */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            AI 국세상담 현황
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary-500 mb-2">{stat.value}</p>
                <p className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              <HelpCircle className="inline-block w-6 h-6 mr-2 text-primary-500" />
              자주 묻는 질문
            </h3>
            <Link href="/chat" className="text-sm text-primary-500 hover:text-primary-600 flex items-center gap-1">
              전체보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <Link
                key={faq.question}
                href={faq.href}
                className="group flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-sm text-gray-500">{faq.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 mt-1 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p className="mb-2">국세청 | AI 국세상담 시스템</p>
            <p className="text-gray-500">
              세종특별자치시 국세청로 8-14 | 국세상담센터 126
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
