'use client';

import Link from 'next/link';
import { useState } from 'react';
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
  X,
  CheckCircle,
  AlertCircle,
  BarChart2,
  Loader2,
} from 'lucide-react';

type AnalysisService = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  borderColor: string;
  inputs: { label: string; placeholder: string; type?: string }[];
  resultKey: string;
};

const analysisServices: AnalysisService[] = [
  {
    icon: MapPin,
    title: '상권입지분석',
    description: '빅데이터 기반 상권 분석으로 최적의 창업 입지를 추천합니다. 유동인구, 경쟁업체, 임대료 등 핵심 지표를 종합 분석합니다.',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'hover:border-blue-300',
    inputs: [
      { label: '지역', placeholder: '예: 서울 마포구 홍대입구' },
      { label: '업종', placeholder: '예: 카페, 치킨집, 편의점' },
    ],
    resultKey: 'location',
  },
  {
    icon: TrendingUp,
    title: '수요예측',
    description: 'AI 모델을 활용한 매출 및 수요 변동 예측 분석을 제공합니다.',
    color: 'bg-green-50 text-green-600',
    borderColor: 'hover:border-green-300',
    inputs: [
      { label: '업종', placeholder: '예: 분식집' },
      { label: '월 평균 매출', placeholder: '예: 3,500만원', type: 'text' },
    ],
    resultKey: 'demand',
  },
  {
    icon: Users,
    title: '고객특성',
    description: '주요 고객층의 연령, 성별, 소비 패턴을 분석합니다.',
    color: 'bg-purple-50 text-purple-600',
    borderColor: 'hover:border-purple-300',
    inputs: [
      { label: '지역', placeholder: '예: 강남구 역삼동' },
      { label: '업종', placeholder: '예: 헬스장' },
    ],
    resultKey: 'customer',
  },
  {
    icon: Truck,
    title: '배달최적화',
    description: '배달 플랫폼별 성과를 분석하고 배달 효율을 최적화합니다.',
    color: 'bg-orange-50 text-orange-600',
    borderColor: 'hover:border-orange-300',
    inputs: [
      { label: '업종', placeholder: '예: 피자 가게' },
      { label: '월 배달 주문 건수', placeholder: '예: 800건' },
    ],
    resultKey: 'delivery',
  },
  {
    icon: UtensilsCrossed,
    title: '메뉴트렌드',
    description: '최신 외식 트렌드와 인기 메뉴를 분석합니다.',
    color: 'bg-pink-50 text-pink-600',
    borderColor: 'hover:border-pink-300',
    inputs: [
      { label: '업종/메뉴 카테고리', placeholder: '예: 한식 백반' },
    ],
    resultKey: 'menu',
  },
  {
    icon: Stethoscope,
    title: '경영진단',
    description: '현재 경영 상태를 종합적으로 진단합니다.',
    color: 'bg-teal-50 text-teal-600',
    borderColor: 'hover:border-teal-300',
    inputs: [
      { label: '업종', placeholder: '예: 미용실' },
      { label: '월 매출', placeholder: '예: 1,200만원' },
      { label: '월 고정비', placeholder: '예: 700만원' },
    ],
    resultKey: 'management',
  },
  {
    icon: ShieldCheck,
    title: '생존예측',
    description: '업종별 생존율을 예측하고 리스크 요인을 분석합니다.',
    color: 'bg-red-50 text-red-600',
    borderColor: 'hover:border-red-300',
    inputs: [
      { label: '업종', placeholder: '예: 치킨 프랜차이즈' },
      { label: '창업 예정 지역', placeholder: '예: 경기 수원시' },
      { label: '예상 창업 자금', placeholder: '예: 5,000만원' },
    ],
    resultKey: 'survival',
  },
  {
    icon: Calculator,
    title: '재무진단',
    description: '매출 및 비용 구조를 상세 분석하고 재무 건전성을 진단합니다.',
    color: 'bg-amber-50 text-amber-600',
    borderColor: 'hover:border-amber-300',
    inputs: [
      { label: '월 매출', placeholder: '예: 2,000만원' },
      { label: '월 재료비', placeholder: '예: 600만원' },
      { label: '월 인건비', placeholder: '예: 500만원' },
      { label: '월 임대료', placeholder: '예: 200만원' },
    ],
    resultKey: 'finance',
  },
  {
    icon: Target,
    title: '경영전략',
    description: 'AI 기반 맞춤형 경영 전략을 수립합니다.',
    color: 'bg-indigo-50 text-indigo-600',
    borderColor: 'hover:border-indigo-300',
    inputs: [
      { label: '업종', placeholder: '예: 네일샵' },
      { label: '현재 고민', placeholder: '예: 매출 정체, 신규 고객 유치 어려움' },
    ],
    resultKey: 'strategy',
  },
];

// 분석 결과 mock 데이터
const mockResults: Record<string, React.ReactNode> = {
  location: (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        <span className="font-semibold text-gray-900">상권 점수: 78점 / 100점</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: '유동인구', value: '일 평균 12,400명', status: 'good' },
          { label: '경쟁 업체 수', value: '반경 500m 내 8개', status: 'warn' },
          { label: '평균 임대료', value: '3.3㎡당 18만원', status: 'warn' },
          { label: '배후 세대', value: '3,200세대', status: 'good' },
        ].map((item) => (
          <div key={item.label} className={`rounded-lg p-3 ${item.status === 'good' ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className={`text-sm font-semibold mt-0.5 ${item.status === 'good' ? 'text-green-700' : 'text-yellow-700'}`}>{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-700 mb-1">AI 추천</p>
        <p className="text-sm text-blue-600">유동인구가 풍부하나 경쟁이 높습니다. 차별화된 메뉴와 SNS 마케팅 강화를 권장합니다. 임대료 협상 여지를 확인하세요.</p>
      </div>
    </div>
  ),
  demand: (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '다음 달 예측 매출', value: '+4.2%', sub: '↑ 상승 전망' },
          { label: '성수기', value: '11~12월', sub: '연말 특수' },
          { label: '비수기', value: '2~3월', sub: '사전 대비 필요' },
        ].map((item) => (
          <div key={item.label} className="bg-green-50 rounded-lg p-3 text-center">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-sm font-bold text-green-700 mt-1">{item.value}</p>
            <p className="text-xs text-green-600">{item.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-gray-700 mb-2">월별 수요 지수 (최근 6개월)</p>
        <div className="flex items-end gap-1 h-16">
          {[65, 72, 68, 80, 85, 90].map((v, i) => (
            <div key={i} className="flex-1 bg-green-400 rounded-t" style={{ height: `${v}%` }} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          {['9월', '10월', '11월', '12월', '1월', '2월'].map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>
    </div>
  ),
  customer: (
    <div className="space-y-4">
      <div className="bg-purple-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-purple-700 mb-2">주요 고객층</p>
        <div className="space-y-2">
          {[
            { label: '20~30대 직장인', pct: 42 },
            { label: '30~40대 주부', pct: 28 },
            { label: '10~20대 학생', pct: 18 },
            { label: '기타', pct: 12 },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-purple-700">{item.pct}%</span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full">
                <div className="h-2 bg-purple-400 rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-700 mb-1">AI 인사이트</p>
        <p className="text-sm text-blue-600">20~30대 직장인 비중이 높습니다. 점심·저녁 피크타임 서비스 강화와 모바일 예약 시스템 도입을 권장합니다.</p>
      </div>
    </div>
  ),
  delivery: (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: '플랫폼 수수료율', value: '평균 12.5%', status: 'warn' },
          { label: '최적 배달 반경', value: '2.5km', status: 'good' },
          { label: '피크 주문 시간', value: '18:00~20:00', status: 'good' },
          { label: '월 절감 가능액', value: '약 34만원', status: 'good' },
        ].map((item) => (
          <div key={item.label} className={`rounded-lg p-3 ${item.status === 'good' ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className={`text-sm font-semibold mt-0.5 ${item.status === 'good' ? 'text-green-700' : 'text-yellow-700'}`}>{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-orange-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-orange-700 mb-1">최적화 제안</p>
        <ul className="text-sm text-orange-600 space-y-1 list-disc list-inside">
          <li>배달의민족 단건배달 전환 시 수수료 2.3%p 절감</li>
          <li>자체 배달앱 구축으로 장기적 비용 절감 가능</li>
          <li>오후 6~8시 집중 운영으로 효율 극대화</li>
        </ul>
      </div>
    </div>
  ),
  menu: (
    <div className="space-y-4">
      <div className="bg-pink-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-pink-700 mb-2">트렌드 분석 결과</p>
        <div className="space-y-2">
          {[
            { menu: '건강식 한식 (저나트륨)', trend: '↑ 급상승', color: 'text-green-600' },
            { menu: '가성비 한 끼 세트', trend: '↑ 상승', color: 'text-green-600' },
            { menu: '비건·채식 옵션', trend: '→ 신규 수요', color: 'text-blue-600' },
            { menu: '전통 백반 정식', trend: '→ 유지', color: 'text-gray-500' },
          ].map((item) => (
            <div key={item.menu} className="flex justify-between items-center text-sm">
              <span className="text-gray-700">{item.menu}</span>
              <span className={`font-semibold text-xs ${item.color}`}>{item.trend}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-700 mb-1">신메뉴 제안</p>
        <p className="text-sm text-blue-600">저나트륨 건강 정식(9,500원)과 1인 소용량 세트(7,000원) 추가를 권장합니다. 점심 매출 20% 향상 기대됩니다.</p>
      </div>
    </div>
  ),
  management: (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold text-gray-900">경영 건강도: 보통 (58점)</span>
      </div>
      <div className="space-y-2">
        {[
          { area: '매출 성장성', score: 65, status: 'good' },
          { area: '비용 구조', score: 48, status: 'warn' },
          { area: '고객 만족도', score: 72, status: 'good' },
          { area: '인력 운영', score: 55, status: 'warn' },
          { area: '마케팅 효과', score: 40, status: 'bad' },
        ].map((item) => (
          <div key={item.area}>
            <div className="flex justify-between text-xs mb-0.5">
              <span className="text-gray-600">{item.area}</span>
              <span className={`font-semibold ${item.status === 'good' ? 'text-green-600' : item.status === 'warn' ? 'text-yellow-600' : 'text-red-500'}`}>{item.score}점</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className={`h-2 rounded-full ${item.status === 'good' ? 'bg-green-400' : item.status === 'warn' ? 'bg-yellow-400' : 'bg-red-400'}`} style={{ width: `${item.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
  survival: (
    <div className="space-y-4">
      <div className="bg-red-50 rounded-lg p-4 text-center">
        <p className="text-xs text-gray-500 mb-1">3년 생존 예측 확률</p>
        <p className="text-3xl font-bold text-red-600">62%</p>
        <p className="text-xs text-red-500 mt-1">업종 평균(54%) 대비 +8%p</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold text-gray-700">주요 리스크 요인</p>
        {[
          { risk: '높은 경쟁 밀도', level: '높음' },
          { risk: '원재료 가격 변동성', level: '중간' },
          { risk: '임대료 상승 가능성', level: '중간' },
        ].map((item) => (
          <div key={item.risk} className="flex justify-between items-center bg-gray-50 rounded p-2 text-sm">
            <span className="text-gray-700">{item.risk}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded ${item.level === '높음' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{item.level}</span>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-blue-700 mb-1">생존율 향상 전략</p>
        <p className="text-sm text-blue-600">단골 고객 관리 프로그램 도입 시 생존율 +12%p 향상 예측됩니다.</p>
      </div>
    </div>
  ),
  finance: (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: '영업이익률', value: '35%', status: 'good' },
          { label: '손익분기 매출', value: '1,420만원', status: 'good' },
          { label: '재료비 비율', value: '30%', status: 'good' },
          { label: '인건비 비율', value: '25%', status: 'warn' },
        ].map((item) => (
          <div key={item.label} className={`rounded-lg p-3 ${item.status === 'good' ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${item.status === 'good' ? 'text-green-700' : 'text-yellow-700'}`}>{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-amber-700 mb-1">재무 개선 포인트</p>
        <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
          <li>인건비 25%는 업종 평균 대비 3%p 높음 → 파트타임 조정 검토</li>
          <li>월 순이익 약 700만원 → 6개월 이상 운영 자금 비축 권장</li>
        </ul>
      </div>
    </div>
  ),
  strategy: (
    <div className="space-y-4">
      <div className="bg-indigo-50 rounded-lg p-3">
        <p className="text-xs font-semibold text-indigo-700 mb-2">AI 맞춤 전략 3가지</p>
        <div className="space-y-3">
          {[
            { no: '01', title: '단골 고객 락인', desc: '멤버십 포인트 제도 도입으로 재방문율 40% 향상 목표' },
            { no: '02', title: 'SNS 바이럴 마케팅', desc: '인스타그램 릴스 주 3회 업로드로 신규 유입 월 +80명 기대' },
            { no: '03', title: '오프피크 할인 운영', desc: '평일 오후 2~5시 15% 할인으로 비수기 매출 보완' },
          ].map((item) => (
            <div key={item.no} className="flex gap-3">
              <span className="w-6 h-6 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{item.no}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export default function AnalysisPage() {
  const [selected, setSelected] = useState<AnalysisService | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const openModal = (service: AnalysisService) => {
    setSelected(service);
    setFormValues({});
    setResult(false);
    setLoading(false);
  };

  const closeModal = () => {
    setSelected(null);
    setResult(false);
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 1800);
  };

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
              <h1 className="text-lg font-bold text-gray-900">AI 분석 서비스</h1>
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
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">9대 AI 분석 서비스</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            소상공인의 창업부터 경영까지 데이터 기반의 맞춤 분석을 제공합니다. 원하시는 분석을 선택하여 시작하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analysisServices.map((service) => (
            <div
              key={service.title}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${service.borderColor} hover:shadow-md transition-all group cursor-pointer`}
              onClick={() => openModal(service)}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">{service.description}</p>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors group-hover:gap-3">
                분석 시작
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* 분석 모달 */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selected.color}`}>
                  <selected.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selected.title}</h3>
                  <p className="text-xs text-gray-500">분석 조건을 입력하세요</p>
                </div>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {!result ? (
                <>
                  {/* 입력 폼 */}
                  <div className="space-y-4 mb-6">
                    {selected.inputs.map((input) => (
                      <div key={input.label}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{input.label}</label>
                        <input
                          type={input.type ?? 'text'}
                          placeholder={input.placeholder}
                          value={formValues[input.label] ?? ''}
                          onChange={(e) => setFormValues((v) => ({ ...v, [input.label]: e.target.value }))}
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        AI 분석 중...
                      </>
                    ) : (
                      <>
                        <BarChart2 className="w-4 h-4" />
                        분석 시작
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* 분석 결과 */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-gray-700">분석이 완료되었습니다</span>
                    </div>
                    {mockResults[selected.resultKey]}
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => { setResult(false); setLoading(false); }}
                      className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      다시 분석
                    </button>
                    <Link
                      href="/chat"
                      className="flex-1 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-semibold text-center hover:bg-primary-600"
                      onClick={closeModal}
                    >
                      AI 상담 연결
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
