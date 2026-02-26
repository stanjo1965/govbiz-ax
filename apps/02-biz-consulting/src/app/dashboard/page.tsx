'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ArrowLeft,
  TrendingUp,
  Users,
  DollarSign,
  Truck,
  FileText,
  Calendar,
} from 'lucide-react';

const periods = ['일간', '주간', '월간', '분기'] as const;
type Period = (typeof periods)[number];

const summaryStats = [
  {
    label: '매출',
    value: '2,450만원',
    change: '+12.5%',
    positive: true,
    icon: DollarSign,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    label: '고객수',
    value: '1,280명',
    change: '+8.3%',
    positive: true,
    icon: Users,
    color: 'bg-green-50 text-green-600',
  },
  {
    label: '평균단가',
    value: '19,140원',
    change: '-2.1%',
    positive: false,
    icon: TrendingUp,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    label: '배달건수',
    value: '342건',
    change: '+15.7%',
    positive: true,
    icon: Truck,
    color: 'bg-orange-50 text-orange-600',
  },
];

const recentAnalyses = [
  {
    id: 1,
    title: '강남구 상권입지 분석',
    type: '상권입지분석',
    date: '2026-02-25',
    status: '완료',
  },
  {
    id: 2,
    title: '3월 매출 수요 예측',
    type: '수요예측',
    date: '2026-02-24',
    status: '완료',
  },
  {
    id: 3,
    title: '고객 세그먼트 분석',
    type: '고객특성',
    date: '2026-02-23',
    status: '진행중',
  },
  {
    id: 4,
    title: '배달 플랫폼 효율 분석',
    type: '배달최적화',
    date: '2026-02-22',
    status: '완료',
  },
  {
    id: 5,
    title: '2026년 1분기 경영진단',
    type: '경영진단',
    date: '2026-02-20',
    status: '완료',
  },
];

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('월간');

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
              <h1 className="text-lg font-bold text-gray-900">경영 대시보드</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/analysis" className="text-sm text-gray-600 hover:text-primary-500">분석서비스</Link>
              <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-500">AI 상담</Link>
              <Link href="/reports" className="text-sm text-gray-600 hover:text-primary-500">보고서</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Filter Tabs */}
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === period
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {summaryStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              매출 추이
            </h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <div className="text-center">
                <TrendingUp className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  매출 추이 차트
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {selectedPeriod} 기준 데이터
                </p>
              </div>
            </div>
          </div>

          {/* Recent Analysis List */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">최근 분석</h3>
              <Link
                href="/reports"
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                전체보기
              </Link>
            </div>
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-primary-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {analysis.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">
                        {analysis.type}
                      </span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-gray-400">
                        {analysis.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      analysis.status === '완료'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {analysis.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
