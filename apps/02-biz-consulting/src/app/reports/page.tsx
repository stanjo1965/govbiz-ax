'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ArrowLeft,
  FileText,
  Download,
  Search,
  Filter,
  X,
  Check,
} from 'lucide-react';

const sampleReports = [
  {
    id: 1,
    businessName: '행복한 김밥집',
    analysisType: '상권입지분석',
    title: '강남구 역삼동 상권 입지 분석 보고서',
    date: '2026-02-25',
    status: '완료' as const,
  },
  {
    id: 2,
    businessName: '맛있는 치킨',
    analysisType: '수요예측',
    title: '2026년 3월 매출 수요 예측 보고서',
    date: '2026-02-24',
    status: '완료' as const,
  },
  {
    id: 3,
    businessName: '커피하우스',
    analysisType: '고객특성',
    title: '주요 고객 세그먼트 분석 보고서',
    date: '2026-02-23',
    status: '진행중' as const,
  },
  {
    id: 4,
    businessName: '한솥도시락',
    analysisType: '배달최적화',
    title: '배달 플랫폼 최적화 분석 보고서',
    date: '2026-02-22',
    status: '완료' as const,
  },
  {
    id: 5,
    businessName: '청년피자',
    analysisType: '메뉴트렌드',
    title: '2026년 상반기 메뉴 트렌드 분석 보고서',
    date: '2026-02-21',
    status: '완료' as const,
  },
  {
    id: 6,
    businessName: '나무카페',
    analysisType: '경영진단',
    title: '2026년 1분기 종합 경영진단 보고서',
    date: '2026-02-20',
    status: '진행중' as const,
  },
  {
    id: 7,
    businessName: '골목식당',
    analysisType: '생존예측',
    title: '업종별 생존율 예측 분석 보고서',
    date: '2026-02-19',
    status: '완료' as const,
  },
  {
    id: 8,
    businessName: '행복한 김밥집',
    analysisType: '재무진단',
    title: '2025년 연간 재무 진단 보고서',
    date: '2026-02-18',
    status: '완료' as const,
  },
  {
    id: 9,
    businessName: '맛있는 치킨',
    analysisType: '경영전략',
    title: '2026년 성장 전략 수립 보고서',
    date: '2026-02-17',
    status: '완료' as const,
  },
];

const analysisTypes = [
  '전체', '상권입지분석', '수요예측', '고객특성', '배달최적화',
  '메뉴트렌드', '경영진단', '생존예측', '재무진단', '경영전략',
];

export default function ReportsPage() {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('전체');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredReports = sampleReports.filter((r) => {
    const matchQuery = !query || r.title.includes(query) || r.businessName.includes(query);
    const matchType = filterType === '전체' || r.analysisType === filterType;
    return matchQuery && matchType;
  });

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
                컨설팅 보고서
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/analysis" className="text-sm text-gray-600 hover:text-primary-500">분석서비스</Link>
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-primary-500">대시보드</Link>
              <Link href="/chat" className="text-sm text-gray-600 hover:text-primary-500">AI 상담</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="보고서 검색..."
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 bg-white border rounded-lg text-sm transition-colors ${
                filterOpen || filterType !== '전체'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4" />
              {filterType === '전체' ? '필터' : filterType}
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                {analysisTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => { setFilterType(type); setFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between transition-colors ${
                      filterType === type
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                    {filterType === type && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-4">보고서명</div>
            <div className="col-span-2">사업장</div>
            <div className="col-span-2">분석 유형</div>
            <div className="col-span-2">날짜</div>
            <div className="col-span-1">상태</div>
            <div className="col-span-1 text-right">다운로드</div>
          </div>

          <div className="divide-y divide-gray-50">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
              >
                {/* Report Title */}
                <div className="sm:col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary-500" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {report.title}
                  </span>
                </div>

                {/* Business Name */}
                <div className="sm:col-span-2">
                  <span className="text-sm text-gray-600">
                    {report.businessName}
                  </span>
                </div>

                {/* Analysis Type */}
                <div className="sm:col-span-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-600">
                    {report.analysisType}
                  </span>
                </div>

                {/* Date */}
                <div className="sm:col-span-2">
                  <span className="text-sm text-gray-500">{report.date}</span>
                </div>

                {/* Status */}
                <div className="sm:col-span-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      report.status === '완료'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-yellow-50 text-yellow-600'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>

                {/* Download */}
                <div className="sm:col-span-1 text-right">
                  <button
                    className={`p-1.5 rounded-lg transition-colors ${
                      report.status === '완료'
                        ? 'text-gray-400 hover:text-primary-500 hover:bg-primary-50'
                        : 'text-gray-200 cursor-not-allowed'
                    }`}
                    disabled={report.status !== '완료'}
                    title={
                      report.status === '완료'
                        ? '보고서 다운로드'
                        : '분석 진행중'
                    }
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination hint */}
        <div className="flex justify-center mt-6">
          <p className="text-sm text-gray-400">
            {filteredReports.length !== sampleReports.length
              ? `${filteredReports.length}건 검색됨 (전체 ${sampleReports.length}건)`
              : `총 ${sampleReports.length}건의 보고서`}
          </p>
        </div>
      </main>
    </div>
  );
}
