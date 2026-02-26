'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  CheckCircle,
  XCircle,
  HelpCircle,
  Shield,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
} from 'lucide-react';

type Verdict = 'true' | 'false' | 'uncertain';

interface FactCheckResult {
  id: number;
  claim: string;
  verdict: Verdict;
  explanation: string;
  sources: { title: string; org: string; url: string }[];
  confidence: number;
  category: string;
  checkedDate: string;
}

const sampleResults: FactCheckResult[] = [
  {
    id: 1,
    claim: '비타민C를 하루 10,000mg 이상 복용하면 감기를 예방할 수 있다',
    verdict: 'false',
    explanation: '과학적 근거가 부족합니다. 비타민C의 1일 상한섭취량은 2,000mg이며, 과량 복용 시 소화기계 부작용(복통, 설사)이 발생할 수 있습니다. 감기 예방 효과에 대한 대규모 임상시험 결과, 일반인에서의 감기 예방 효과는 통계적으로 유의하지 않았습니다.',
    sources: [
      { title: '비타민C 상한섭취량 가이드라인', org: '식품의약품안전처', url: '#' },
      { title: 'Vitamin C for preventing the common cold', org: 'Cochrane Library', url: '#' },
    ],
    confidence: 95,
    category: '의약품',
    checkedDate: '2024.11.15',
  },
  {
    id: 2,
    claim: 'HACCP 인증 식품은 안전성이 검증된 식품이다',
    verdict: 'true',
    explanation: 'HACCP(해썹)은 식품의 원료 관리, 제조, 가공, 조리, 유통의 전 과정에서 위해 요소를 분석하고 중요 관리점을 설정하여 관리하는 과학적 위생관리 체계입니다. 식약처에서 인증하며, 정기적인 심사를 통해 관리됩니다.',
    sources: [
      { title: 'HACCP 인증 기준 및 절차', org: '식품의약품안전처', url: '#' },
      { title: '식품안전관리인증기준 해설서', org: '한국식품안전관리인증원', url: '#' },
    ],
    confidence: 98,
    category: '식품',
    checkedDate: '2024.11.14',
  },
  {
    id: 3,
    claim: '파라벤이 함유된 화장품은 암을 유발한다',
    verdict: 'uncertain',
    explanation: '현재까지의 과학적 연구 결과, 화장품에 허용된 농도의 파라벤이 직접적으로 암을 유발한다는 충분한 근거는 없습니다. 다만, 일부 연구에서 에스트로겐 유사 작용에 대한 우려가 제기되어 지속적인 모니터링이 이루어지고 있습니다. 식약처 허용 기준치 이내 사용은 안전한 것으로 판단됩니다.',
    sources: [
      { title: '화장품 성분 안전성 평가 보고서', org: '식품의약품안전처', url: '#' },
      { title: '파라벤 안전성 재평가', org: '유럽화장품안전위원회(SCCS)', url: '#' },
      { title: '화장품 방부제 사용 가이드', org: '대한화장품협회', url: '#' },
    ],
    confidence: 72,
    category: '화장품',
    checkedDate: '2024.11.13',
  },
  {
    id: 4,
    claim: '처방전 없이 구매한 진통제를 장기 복용해도 안전하다',
    verdict: 'false',
    explanation: 'OTC(일반의약품) 진통제라 하더라도 장기 복용 시 간 손상, 위장관 출혈, 신장 기능 저하 등의 부작용이 발생할 수 있습니다. 아세트아미노펜의 경우 1일 4,000mg 초과 시 간 독성 위험이 있으며, NSAIDs 계열은 위장관 출혈 위험이 증가합니다. 2주 이상 복용 시 의사 상담이 필요합니다.',
    sources: [
      { title: '일반의약품 안전사용 가이드', org: '식품의약품안전처', url: '#' },
      { title: '진통제 장기 복용 주의사항', org: '대한약사회', url: '#' },
    ],
    confidence: 93,
    category: '의약품',
    checkedDate: '2024.11.12',
  },
  {
    id: 5,
    claim: 'KF94 마스크는 0.4마이크로미터 크기의 입자를 94% 이상 차단한다',
    verdict: 'true',
    explanation: 'KF94 등급 마스크는 식약처 의료기기 기준에 따라 평균 0.4um 크기의 입자(파라핀 오일 및 염화나트륨 에어로졸)를 94% 이상 걸러낼 수 있음이 시험을 통해 확인된 제품입니다. 다만, 올바른 착용법을 지켜야 실제 차단 효과를 기대할 수 있습니다.',
    sources: [
      { title: '보건용 마스크 허가 기준', org: '식품의약품안전처', url: '#' },
      { title: '마스크 성능 시험 기준 해설', org: '한국의료기기안전정보원', url: '#' },
    ],
    confidence: 99,
    category: '의료기기',
    checkedDate: '2024.11.11',
  },
];

function getVerdictInfo(verdict: Verdict) {
  switch (verdict) {
    case 'true':
      return {
        icon: CheckCircle,
        label: '사실',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-300',
        badgeColor: 'bg-green-100 text-green-700',
      };
    case 'false':
      return {
        icon: XCircle,
        label: '거짓',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        badgeColor: 'bg-red-100 text-red-700',
      };
    case 'uncertain':
      return {
        icon: HelpCircle,
        label: '판단유보',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-300',
        badgeColor: 'bg-amber-100 text-amber-700',
      };
  }
}

export default function FactCheckPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-bold text-gray-900">팩트 AI</h1>
              <span className="text-xs text-gray-500 hidden sm:inline">- 진위 확인</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search / Verify */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">제품 주장 팩트체크</h2>
          <p className="text-sm text-gray-500 mb-4">
            식의약품에 대한 주장이나 광고 문구를 입력하면 AI가 과학적 근거를 기반으로 사실 여부를 검증합니다.
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="검증하고 싶은 주장을 입력하세요 (예: 콜라겐 음료가 피부 주름을 개선한다)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
              검증
            </button>
          </div>
        </div>

        {/* Quick tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-gray-500 mr-1">자주 검증되는 주제:</span>
          {['비타민 효능', '건강기능식품', '화장품 성분', '의약품 부작용', '식품 안전'].map((tag) => (
            <button
              key={tag}
              className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">최근 팩트체크 결과</h3>
          {sampleResults.map((result) => {
            const verdictInfo = getVerdictInfo(result.verdict);
            const VerdictIcon = verdictInfo.icon;

            return (
              <div
                key={result.id}
                className={`bg-white rounded-xl border-l-4 border ${verdictInfo.borderColor} p-5`}
              >
                {/* Claim and Verdict */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {result.category}
                      </span>
                      <span className="text-xs text-gray-400">{result.checkedDate}</span>
                    </div>
                    <p className="font-medium text-gray-900 leading-relaxed">
                      &ldquo;{result.claim}&rdquo;
                    </p>
                  </div>
                  <div className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl ${verdictInfo.bgColor} shrink-0`}>
                    <VerdictIcon className={`w-8 h-8 ${verdictInfo.color}`} />
                    <span className={`text-xs font-bold ${verdictInfo.color}`}>{verdictInfo.label}</span>
                  </div>
                </div>

                {/* Explanation */}
                <div className={`p-3 rounded-lg ${verdictInfo.bgColor} mb-3`}>
                  <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
                </div>

                {/* Confidence */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs text-gray-500">신뢰도:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        result.confidence >= 90 ? 'bg-green-500' :
                        result.confidence >= 70 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700">{result.confidence}%</span>
                </div>

                {/* Sources */}
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs font-semibold text-gray-500 mb-2">출처 및 근거:</p>
                  <div className="space-y-1.5">
                    {result.sources.map((source, i) => (
                      <a
                        key={i}
                        href={source.url}
                        className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        <span>{source.title}</span>
                        <span className="text-gray-400">({source.org})</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">이 결과가 도움이 되었나요?</span>
                  <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">유의사항</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                팩트체크 결과는 AI가 공신력 있는 출처를 기반으로 분석한 참고 정보입니다.
                의약품의 효능/효과 및 안전성에 대한 최종 판단은 반드시 의료 전문가와 상담하시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
