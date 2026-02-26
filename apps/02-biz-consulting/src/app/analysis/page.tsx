'use client';

import Link from 'next/link';
import {
  Briefcase,
  ArrowLeft,
  MapPin,
  TrendingUp,
  Users,
  Truck,
  UtensilsCrossed,
  Stethoscope,
  ShieldCheck,
  Calculator,
  Target,
  ArrowRight,
} from 'lucide-react';

const analysisServices = [
  {
    icon: MapPin,
    title: '상권입지분석',
    description:
      '빅데이터 기반 상권 분석으로 최적의 창업 입지를 추천합니다. 유동인구, 경쟁업체, 임대료 등 핵심 지표를 종합 분석합니다.',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'hover:border-blue-300',
  },
  {
    icon: TrendingUp,
    title: '수요예측',
    description:
      'AI 모델을 활용한 매출 및 수요 변동 예측 분석을 제공합니다. 계절성, 트렌드, 외부 요인을 반영한 정밀 예측을 수행합니다.',
    color: 'bg-green-50 text-green-600',
    borderColor: 'hover:border-green-300',
  },
  {
    icon: Users,
    title: '고객특성',
    description:
      '주요 고객층의 연령, 성별, 소비 패턴을 분석합니다. 타겟 마케팅 전략과 고객 맞춤 서비스 방안을 제안합니다.',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'hover:border-purple-300',
  },
  {
    icon: Truck,
    title: '배달최적화',
    description:
      '배달 플랫폼별 성과를 분석하고 배달 효율을 최적화합니다. 배달 반경, 시간대별 주문 패턴, 수수료 구조를 분석합니다.',
    color: 'bg-orange-50 text-orange-600',
    borderColor: 'hover:border-orange-300',
  },
  {
    icon: UtensilsCrossed,
    title: '메뉴트렌드',
    description:
      '최신 외식 트렌드와 인기 메뉴를 분석합니다. 경쟁업체 메뉴 비교, 신메뉴 제안, 가격 전략을 수립합니다.',
    color: 'bg-pink-50 text-pink-600',
    borderColor: 'hover:border-pink-300',
  },
  {
    icon: Stethoscope,
    title: '경영진단',
    description:
      '현재 경영 상태를 종합적으로 진단합니다. 매출, 비용, 인력, 마케팅 등 주요 영역별 개선 방안을 제시합니다.',
    color: 'bg-teal-50 text-teal-600',
    borderColor: 'hover:border-teal-300',
  },
  {
    icon: ShieldCheck,
    title: '생존예측',
    description:
      '업종별 생존율을 예측하고 리스크 요인을 분석합니다. 폐업 위험도를 사전에 파악하고 대응 전략을 수립합니다.',
    color: 'bg-red-50 text-red-600',
    borderColor: 'hover:border-red-300',
  },
  {
    icon: Calculator,
    title: '재무진단',
    description:
      '매출 및 비용 구조를 상세 분석하고 재무 건전성을 진단합니다. 손익분기점, 현금 흐름, 비용 절감 방안을 제시합니다.',
    color: 'bg-amber-50 text-amber-600',
    borderColor: 'hover:border-amber-300',
  },
  {
    icon: Target,
    title: '경영전략',
    description:
      'AI 기반 맞춤형 경영 전략을 수립합니다. 차별화 전략, 마케팅 계획, 성장 로드맵 등 종합적인 전략을 제안합니다.',
    color: 'bg-indigo-50 text-indigo-600',
    borderColor: 'hover:border-indigo-300',
  },
];

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gray-900">
                AI 분석 서비스
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-primary-500">대시보드</Link>
              <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-500">AI 상담</Link>
              <Link href="/reports" className="text-sm text-gray-600 hover:text-primary-500">보고서</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            9대 AI 분석 서비스
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            소상공인의 창업부터 경영까지 데이터 기반의 맞춤 분석을
            제공합니다. 원하시는 분석을 선택하여 시작하세요.
          </p>
        </div>

        {/* Analysis Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisServices.map((service) => (
            <div
              key={service.title}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${service.borderColor} hover:shadow-md transition-all group`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                {service.description}
              </p>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors group-hover:gap-3">
                분석 시작
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
