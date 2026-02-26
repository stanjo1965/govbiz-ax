import Link from 'next/link';
import { ShoppingCart, MapPin, MessageCircle, Receipt, BookOpen, TrendingDown } from 'lucide-react';

const services = [
  {
    href: '/price-map',
    icon: MapPin,
    title: '가격 지도',
    description: '내 주변 농축산물 최저가를 지도에서 확인하세요',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    href: '/search',
    icon: ShoppingCart,
    title: '상품 검색',
    description: '품목별 가격 비교와 최적 구매처를 찾아보세요',
    color: 'bg-green-50 text-green-600',
  },
  {
    href: '/chat',
    icon: MessageCircle,
    title: 'AI 쇼핑 어시스턴트',
    description: 'AI와 대화하며 알뜰 장보기 상담을 받으세요',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    href: '/shopping-list',
    icon: Receipt,
    title: '장보기 목록',
    description: '장보기 목록을 만들고 최적 동선을 추천받으세요',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    href: '/recipes',
    icon: BookOpen,
    title: '절약 레시피',
    description: '제철 식재료 기반 알뜰 레시피를 추천받으세요',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    href: '/trends',
    icon: TrendingDown,
    title: '가격 동향',
    description: '농축산물 가격 추이와 예측 정보를 확인하세요',
    color: 'bg-teal-50 text-teal-600',
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
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                농축산물 알뜰 소비
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/price-map" className="text-sm text-gray-600 hover:text-primary-500">가격지도</Link>
              <Link href="/search" className="text-sm text-gray-600 hover:text-primary-500">상품검색</Link>
              <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-500">AI 상담</Link>
              <Link href="/trends" className="text-sm text-gray-600 hover:text-primary-500">가격동향</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI와 함께하는 알뜰한 장보기
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            전국 농축산물 실시간 가격 비교부터 AI 쇼핑 상담까지,
            똑똑한 소비를 도와드립니다
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
              href="/price-map"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold border border-primary-400 hover:bg-primary-800 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              주변 최저가 찾기
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
                key={service.href}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm">
            <p className="mb-2">농림축산식품부 | 농축산물 알뜰 소비 정보 서비스 플랫폼</p>
            <p className="text-gray-500">
              세종특별자치시 정부세종청사 | 대표전화 1588-0000
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
