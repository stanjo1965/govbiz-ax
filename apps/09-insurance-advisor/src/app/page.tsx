import Link from 'next/link';
import {
  ShieldCheck,
  MessageCircle,
  ClipboardCheck,
  BarChart3,
  FileText,
  CalendarDays,
  AlertCircle,
  TrendingUp,
  Users,
  AlertTriangle,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';

const stats = [
  { label: '국민 보험 가입률', value: '87.3%', sub: '2024년 금감원 통계', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
  { label: '보장 공백 보유자', value: '34%', sub: '성인 기준 추정치', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
  { label: '연간 보험 분쟁', value: '5.2만건', sub: '2024년 금감원 접수', icon: Users, color: 'text-red-600 bg-red-50' },
  { label: '불완전판매 신고', value: '1.8만건', sub: '2024년 금감원 집계', icon: AlertCircle, color: 'text-orange-600 bg-orange-50' },
];

const services = [
  {
    href: '/chat',
    icon: MessageCircle,
    title: 'AI 보험 상담',
    description: 'AI와 대화하며 보험 약관 해석, 청구 절차, 권리 구제 방법을 안내받으세요.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    href: '/diagnosis',
    icon: ClipboardCheck,
    title: '보험 포트폴리오 진단',
    description: '현재 가입 보험을 분석해 보장 공백, 중복 보험, 과소·과잉 가입 여부를 진단합니다.',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    href: '/compare',
    icon: BarChart3,
    title: '보험 상품 비교',
    description: '실손·암·생명·자동차 보험을 유형별로 비교하고 중립적인 정보를 제공합니다.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '/claim-guide',
    icon: FileText,
    title: '보험 청구 가이드',
    description: '보험 유형별 청구 절차, 준비 서류, 주의사항을 단계별로 안내합니다.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    href: '/calendar',
    icon: CalendarDays,
    title: '보험 캘린더',
    description: '보험료 납부일, 갱신일, 만기일을 캘린더로 관리하고 알림을 확인하세요.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    href: '/chat',
    icon: PhoneCall,
    title: '민원 상담 안내',
    description: '보험사 분쟁, 불완전판매, 보험금 미지급 등 소비자 권리 구제를 안내합니다.',
    color: 'bg-red-50 text-red-600',
  },
];

const faqs = [
  {
    question: '실손보험 청구는 어떻게 하나요?',
    answer: '진료비 영수증, 진단서 등 서류를 준비하여 보험사 앱이나 방문을 통해 청구할 수 있습니다.',
  },
  {
    question: '내 보험에 중복 가입 여부는 어떻게 확인하나요?',
    answer: '보험다모아(insure.or.kr) 또는 금융감독원 금융정보통합조회 서비스를 이용하시면 됩니다.',
  },
  {
    question: '보험사가 보험금 지급을 거절하면 어떻게 해야 하나요?',
    answer: '금융감독원(1332)에 민원을 제기하거나 금융분쟁조정위원회에 조정을 신청할 수 있습니다.',
  },
  {
    question: '보험 해지 시 환급금은 어떻게 계산되나요?',
    answer: '해약환급금은 납입보험료에서 보험사의 사업비와 위험보험료를 제외한 금액입니다. 가입 후 기간이 짧을수록 적습니다.',
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
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">AI 국민보험 안내</h1>
                <p className="text-xs text-gray-500">금융위원회 · 금융감독원</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/diagnosis" className="text-sm text-gray-600 hover:text-emerald-600">보험 진단</Link>
              <Link href="/compare" className="text-sm text-gray-600 hover:text-emerald-600">상품 비교</Link>
              <Link href="/claim-guide" className="text-sm text-gray-600 hover:text-emerald-600">청구 가이드</Link>
              <Link href="/calendar" className="text-sm text-gray-600 hover:text-emerald-600">보험 캘린더</Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                AI 상담
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm mb-6">
            <ShieldCheck className="w-4 h-4" />
            금융위원회 · 금융감독원 공공 서비스
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            내 보험, 제대로 알고 계신가요?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            AI 보험 진단부터 청구 가이드까지, 중립적이고 정확한 보험 정보로
            국민의 권리를 지켜드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diagnosis"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              <ClipboardCheck className="w-5 h-5" />
              무료 보험 진단 받기
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold border border-emerald-400 hover:bg-emerald-400 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              AI 상담 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xs text-gray-400">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">주요 서비스</h3>
            <p className="text-gray-500">국민의 합리적인 보험 생활을 위한 6가지 무료 서비스</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.href + service.title}
                href={service.href}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-emerald-200 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 mb-2 flex items-center gap-1">
                  {service.title}
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">자주 묻는 질문</h3>
            <p className="text-gray-500">보험에 관한 대표적인 궁금증을 해소해 드립니다</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">Q</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">{faq.question}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              더 궁금한 점은 AI에게 질문하기
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-amber-50 border-y border-amber-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-800">보험 분쟁이 발생했나요?</p>
                <p className="text-xs text-amber-700">금융감독원 금융소비자보호처에서 무료로 도움을 받을 수 있습니다.</p>
              </div>
            </div>
            <a
              href="tel:1332"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white text-sm font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              금융감독원 1332
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-semibold text-white">AI 국민보험 안내</span>
              </div>
              <p className="text-sm text-gray-400 max-w-xs">
                금융위원회·금융감독원이 제공하는 중립적 보험 정보 서비스입니다.
                특정 보험사 상품을 판매하거나 추천하지 않습니다.
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-sm font-medium text-gray-200 mb-3">서비스</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/diagnosis" className="hover:text-white">보험 진단</Link></li>
                  <li><Link href="/compare" className="hover:text-white">상품 비교</Link></li>
                  <li><Link href="/claim-guide" className="hover:text-white">청구 가이드</Link></li>
                  <li><Link href="/calendar" className="hover:text-white">보험 캘린더</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200 mb-3">도움</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/chat" className="hover:text-white">AI 상담</Link></li>
                  <li><span>금융감독원 1332</span></li>
                  <li><span>보험다모아</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm">
            <p className="mb-1">금융위원회 | 금융감독원 | AI 국민보험 안내 플랫폼</p>
            <p className="text-gray-500">서울특별시 영등포구 여의대로 38 금융감독원 | 대표전화 1332</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
