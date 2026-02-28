'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Building2, FileText, Scale, BookOpen, MessageSquare, X } from 'lucide-react';

type CategoryKey = '세법' | '판례' | '예규' | '해석';

const categories: { key: CategoryKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: '세법', label: '세법', icon: FileText },
  { key: '판례', label: '판례', icon: Scale },
  { key: '예규', label: '예규', icon: BookOpen },
  { key: '해석', label: '해석', icon: MessageSquare },
];

const sampleResults: Record<CategoryKey, Array<{
  id: string;
  reference: string;
  title: string;
  date: string;
  relevance: number;
  summary: string;
}>> = {
  세법: [
    {
      id: '1',
      reference: '소득세법 제70조',
      title: '종합소득 과세표준 확정신고',
      date: '2024-01-01',
      relevance: 98,
      summary: '해당 과세기간의 종합소득금액이 있는 거주자는 그 종합소득 과세표준을 그 과세기간의 다음 연도 5월 1일부터 5월 31일까지 납세지 관할 세무서장에게 신고하여야 한다.',
    },
    {
      id: '2',
      reference: '부가가치세법 제48조',
      title: '예정신고와 납부',
      date: '2024-01-01',
      relevance: 95,
      summary: '사업자는 각 예정신고기간에 대한 과세표준과 세액을 그 예정신고기간이 끝난 후 25일 이내에 사업장 관할 세무서장에게 신고하여야 한다.',
    },
    {
      id: '3',
      reference: '법인세법 제60조',
      title: '과세표준 등의 신고',
      date: '2024-01-01',
      relevance: 90,
      summary: '내국법인은 각 사업연도의 종료일이 속하는 달의 말일부터 3개월 이내에 그 사업연도의 소득에 대한 법인세의 과세표준과 세액을 납세지 관할 세무서장에게 신고하여야 한다.',
    },
  ],
  판례: [
    {
      id: '4',
      reference: '대법원 2023두12345',
      title: '양도소득세 1세대 1주택 비과세 요건 해석',
      date: '2023-09-15',
      relevance: 96,
      summary: '1세대 1주택 비과세 규정에서 보유기간 2년의 기산점은 취득일부터 기산하며, 일시적 2주택 상태에서의 처분기한은 신규주택 취득일부터 3년으로 해석함이 타당하다.',
    },
    {
      id: '5',
      reference: '대법원 2022두56789',
      title: '사업소득과 기타소득의 구분 기준',
      date: '2023-06-20',
      relevance: 92,
      summary: '소득의 원인이 되는 행위의 반복성, 계속성, 영리목적 유무 등을 종합적으로 고려하여 사업소득과 기타소득을 구분하여야 한다.',
    },
  ],
  예규: [
    {
      id: '6',
      reference: '서면-2024-법규소득-0123',
      title: '재택근무 시 비과세 식대 적용 여부',
      date: '2024-03-10',
      relevance: 94,
      summary: '재택근무를 하는 근로자에게 지급하는 월 20만원 이내의 식사대는 소득세법 시행령 제17조의2에 따라 비과세 근로소득으로 한다.',
    },
    {
      id: '7',
      reference: '서면-2024-법규부가-0456',
      title: '전자상거래 간이과세자 세금계산서 발급 의무',
      date: '2024-02-28',
      relevance: 89,
      summary: '전자상거래를 영위하는 간이과세자가 직전 연도 공급대가 합계액이 4,800만원 이상인 경우 세금계산서 발급 의무가 있다.',
    },
  ],
  해석: [
    {
      id: '8',
      reference: '기획재정부 소득세제과-789',
      title: '가상자산 과세 시행 관련 해석',
      date: '2024-05-15',
      relevance: 93,
      summary: '가상자산 소득에 대한 과세는 기타소득으로 분류하며, 연간 250만원을 초과하는 소득에 대해 20%의 세율로 분리과세한다.',
    },
    {
      id: '9',
      reference: '기획재정부 재산세제과-321',
      title: '다주택자 양도세 중과 한시 완화 해석',
      date: '2024-04-20',
      relevance: 88,
      summary: '조정대상지역 내 다주택자의 양도소득세 중과세율 적용을 한시적으로 배제하는 규정의 적용 시기 및 요건에 대한 해석이다.',
    },
  ],
};

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('세법');
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedResult, setSelectedResult] = useState<typeof sampleResults['세법'][0] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  const results = sampleResults[activeCategory];

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
            <h1 className="text-lg font-bold text-gray-900">세법/판례 검색</h1>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="세법, 판례, 예규, 해석 통합 검색 (예: 종합소득세 신고 기한)"
              className="w-full pl-12 pr-28 py-4 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              검색
            </button>
          </form>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat.key
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasSearched && (
            <p className="text-sm text-gray-500 mb-6">
              &quot;{searchQuery}&quot; 검색 결과 {results.length}건 ({activeCategory} 분류)
            </p>
          )}

          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-primary-50 text-primary-600">
                      {activeCategory}
                    </span>
                    <span className="text-sm font-mono text-gray-500">{result.reference}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-xs text-gray-500">관련도 {result.relevance}%</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{result.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{result.date}</span>
                  <button
                    onClick={() => setSelectedResult(result)}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    상세보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-primary-50 text-primary-600">
                  {activeCategory}
                </span>
                <span className="text-sm font-mono text-gray-500">{selectedResult.reference}</span>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">{selectedResult.title}</h3>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${selectedResult.relevance}%` }} />
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">관련도 {selectedResult.relevance}%</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-medium text-gray-500 mb-2">조문 내용</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedResult.summary}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>기준일: {selectedResult.date}</span>
                <span>출처: 국세청 법령정보</span>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
              <button onClick={() => setSelectedResult(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                닫기
              </button>
              <a
                href="/chat"
                className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors text-center"
              >
                AI 상담 연결
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
