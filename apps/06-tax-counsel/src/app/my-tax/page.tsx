'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  CreditCard,
  FileCheck,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

const taxSummaryCards = [
  {
    title: '소득세',
    amount: '2,450,000원',
    status: '납부 완료',
    statusColor: 'text-green-600',
    period: '2025년 귀속',
    icon: CreditCard,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: '부가세',
    amount: '1,200,000원',
    status: '신고 예정',
    statusColor: 'text-orange-600',
    period: '2026년 1기',
    icon: FileCheck,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: '법인세',
    amount: '5,800,000원',
    status: '미납',
    statusColor: 'text-red-600',
    period: '2025 사업연도',
    icon: Building2,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

const filingTimeline = [
  {
    date: '2026-01-25',
    title: '부가가치세 확정신고 (2기)',
    status: 'completed' as const,
    description: '전자신고 완료 / 납부세액 1,200,000원',
  },
  {
    date: '2026-02-28',
    title: '연말정산 환급 신청',
    status: 'completed' as const,
    description: '환급예정세액 350,000원',
  },
  {
    date: '2026-03-31',
    title: '법인세 신고',
    status: 'current' as const,
    description: '신고 준비 중 / 예상 납부세액 5,800,000원',
  },
  {
    date: '2026-04-25',
    title: '부가가치세 예정신고 (1기)',
    status: 'upcoming' as const,
    description: '1~3월분 부가가치세 예정신고',
  },
  {
    date: '2026-05-31',
    title: '종합소득세 확정신고',
    status: 'upcoming' as const,
    description: '2025년 귀속 종합소득세 신고',
  },
];

const recommendedActions = [
  {
    title: '법인세 신고 서류 준비',
    description: '3월 31일 법인세 신고 기한이 다가옵니다. 재무제표와 세무조정 서류를 준비하세요.',
    priority: 'high' as const,
    action: '준비 시작',
    href: '/chat?q=법인세+신고+준비+서류',
  },
  {
    title: '전자세금계산서 발급 내역 확인',
    description: '1기 부가세 예정신고를 위해 전자세금계산서 발급/수취 내역을 확인하세요.',
    priority: 'medium' as const,
    action: '내역 확인',
    href: '/chat?q=전자세금계산서+발급+내역+확인',
  },
  {
    title: '세액공제 혜택 점검',
    description: '적용 가능한 세액공제 항목을 AI가 분석해 드립니다. 절세 기회를 놓치지 마세요.',
    priority: 'low' as const,
    action: 'AI 분석',
    href: '/chat?q=세액공제+혜택+분석',
  },
  {
    title: '중간예납 세액 확인',
    description: '올해 종합소득세 중간예납 대상 여부와 예상 세액을 확인하세요.',
    priority: 'low' as const,
    action: '확인하기',
    href: '/chat?q=종합소득세+중간예납+대상+확인',
  },
];

function getStatusIcon(status: 'completed' | 'current' | 'upcoming') {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'current':
      return <AlertCircle className="w-5 h-5 text-orange-500" />;
    case 'upcoming':
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
}

function getPriorityBadge(priority: 'high' | 'medium' | 'low') {
  switch (priority) {
    case 'high':
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600">
          긴급
        </span>
      );
    case 'medium':
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">
          중요
        </span>
      );
    case 'low':
      return (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
          참고
        </span>
      );
  }
}

export default function MyTaxPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-16">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">나의 세금</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tax Payment Summary Cards */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary-500" />
            세금 납부 현황
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taxSummaryCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bgColor}`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <span className={`text-sm font-semibold ${card.statusColor}`}>
                      {card.status}
                    </span>
                  </div>
                  <h3 className="text-sm text-gray-500 mb-1">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{card.amount}</p>
                  <p className="text-xs text-gray-400">{card.period}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Filing Status Timeline */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-primary-500" />
              신고 현황
            </h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="space-y-1">
                {filingTimeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline connector */}
                    <div className="flex flex-col items-center">
                      {getStatusIcon(item.status)}
                      {index < filingTimeline.length - 1 && (
                        <div
                          className={`w-0.5 flex-1 my-1 ${
                            item.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`text-sm font-semibold ${
                            item.status === 'current'
                              ? 'text-orange-600'
                              : item.status === 'completed'
                              ? 'text-gray-900'
                              : 'text-gray-500'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400">{item.date}</span>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          item.status === 'upcoming' ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {item.description}
                      </p>
                      {item.status === 'current' && (
                        <span className="inline-block mt-2 text-xs font-medium px-2.5 py-1 rounded-full bg-orange-50 text-orange-600">
                          진행 중
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recommended Actions */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary-500" />
              추천 조치사항
            </h2>
            <div className="space-y-4">
              {recommendedActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="group flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      {getPriorityBadge(action.priority)}
                      <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary-600">
                        {action.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{action.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary-500 font-medium shrink-0 mt-1">
                    {action.action}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
