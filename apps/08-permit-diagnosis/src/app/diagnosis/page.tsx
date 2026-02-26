'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Scale,
  Building2,
  Clock,
  Banknote,
  ChevronDown,
  ChevronUp,
  Download,
  MessageSquare,
  Globe,
} from 'lucide-react';

const parcelInfo = {
  address: '세종특별자치시 도담동 100',
  landCategory: '대',
  area: 330.5,
  officialPrice: 1250000,
  zoning: '제1종일반주거지역',
  district: '도시지역',
  useDistrict: '없음',
  landUseStatus: '나대지',
};

const zoningAnalysis = {
  mainZone: '제1종일반주거지역',
  district: '도시지역',
  useDistrict: '없음',
  buildingCoverageRatio: '60% 이하',
  floorAreaRatio: '200% 이하',
  maxFloors: '4층 이하',
  allowedUses: [
    '단독주택',
    '다세대주택 (4층 이하)',
    '제1종 근린생활시설',
    '교육연구시설 (학교)',
    '노유자시설',
  ],
  restrictedUses: [
    '공동주택 (아파트)',
    '제2종 근린생활시설 (일부)',
    '판매시설',
    '공장',
    '위험물저장 및 처리시설',
  ],
};

const buildabilityResult = {
  status: 'green' as const,
  label: '건축 가능',
  summary: '해당 필지는 제1종일반주거지역으로, 4층 이하 단독주택 건축이 가능합니다.',
  details: [
    { item: '건폐율 검토', status: 'pass', note: '60% 이하 충족 가능' },
    { item: '용적률 검토', status: 'pass', note: '200% 이하 충족 가능' },
    { item: '높이제한 검토', status: 'pass', note: '4층 이하 충족 가능' },
    { item: '일조권 사선제한', status: 'warning', note: '북측 인접대지 확인 필요' },
    { item: '도로 접도 요건', status: 'pass', note: '4m 이상 도로 접함' },
    { item: '주차장 설치 기준', status: 'pass', note: '대당 주차면적 확보 가능' },
  ],
};

const applicableLaws = [
  { name: '국토의 계획 및 이용에 관한 법률', articles: '제76조, 제77조, 제78조' },
  { name: '건축법', articles: '제11조, 제44조, 제55조, 제56조, 제58조, 제60조, 제61조' },
  { name: '건축법 시행령', articles: '제80조, 제86조' },
  { name: '주차장법', articles: '제19조' },
  { name: '하수도법', articles: '제27조' },
  { name: '소방시설 설치 및 관리에 관한 법률', articles: '제6조' },
];

const permitChecklist = [
  { step: 1, name: '건축허가 신청', required: true, completed: false },
  { step: 2, name: '건축 심의 (해당 시)', required: false, completed: false },
  { step: 3, name: '교통영향평가 (해당 시)', required: false, completed: false },
  { step: 4, name: '환경영향평가 (해당 시)', required: false, completed: false },
  { step: 5, name: '소방 동의', required: true, completed: false },
  { step: 6, name: '상하수도 인입 신청', required: true, completed: false },
  { step: 7, name: '착공신고', required: true, completed: false },
  { step: 8, name: '사용승인', required: true, completed: false },
];

const estimatedTimeCost = {
  duration: '약 4~6개월',
  durationDetail: '건축허가 신청부터 허가 취득까지 예상 소요기간',
  costs: [
    { item: '건축허가 수수료', amount: '약 10만원' },
    { item: '설계비', amount: '약 3,000~5,000만원' },
    { item: '인지세/증지대', amount: '약 5만원' },
    { item: '각종 부담금', amount: '사업 규모에 따라 상이' },
  ],
};

function getStatusIcon(status: string) {
  switch (status) {
    case 'pass': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    case 'fail': return <XCircle className="w-4 h-4 text-red-500" />;
    default: return null;
  }
}

function getFeasibilityStyle(status: 'green' | 'yellow' | 'red') {
  switch (status) {
    case 'green': return { bg: 'bg-green-50 border-green-200', icon: 'bg-green-500', text: 'text-green-700', badge: 'bg-green-100 text-green-700' };
    case 'yellow': return { bg: 'bg-amber-50 border-amber-200', icon: 'bg-amber-500', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' };
    case 'red': return { bg: 'bg-red-50 border-red-200', icon: 'bg-red-500', text: 'text-red-700', badge: 'bg-red-100 text-red-700' };
  }
}

export default function DiagnosisPage() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    zoning: true,
    buildability: true,
    laws: false,
    permits: true,
    timecost: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const feasibilityStyle = getFeasibilityStyle(buildabilityResult.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/land-search" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <h1 className="text-base font-semibold text-gray-900">필지별 사전진단</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/digital-twin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Globe className="w-3.5 h-3.5" />
                3D 보기
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                AI 상담
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Parcel Info + Feasibility */}
          <div className="lg:col-span-1 space-y-6">
            {/* Parcel Info Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-500" />
                선택 필지 정보
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400">소재지</p>
                  <p className="text-sm font-medium text-gray-900">{parcelInfo.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">지목</p>
                    <p className="text-sm font-medium text-gray-700">{parcelInfo.landCategory}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">면적</p>
                    <p className="text-sm font-medium text-gray-700">{parcelInfo.area.toLocaleString()} m2</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">공시지가</p>
                    <p className="text-sm font-medium text-gray-700">{parcelInfo.officialPrice.toLocaleString()}원/m2</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">용도지역</p>
                    <p className="text-sm font-medium text-gray-700">{parcelInfo.zoning}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">도시/비도시</p>
                    <p className="text-sm font-medium text-gray-700">{parcelInfo.district}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">현황</p>
                    <p className="text-sm font-medium text-gray-700">{parcelInfo.landUseStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Feasibility */}
            <div className={`border rounded-xl p-6 ${feasibilityStyle.bg}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${feasibilityStyle.icon} rounded-full flex items-center justify-center`}>
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${feasibilityStyle.badge}`}>
                    {buildabilityResult.label}
                  </span>
                  <p className="text-sm font-semibold text-gray-900 mt-1">종합 판정</p>
                </div>
              </div>
              <p className={`text-sm leading-relaxed ${feasibilityStyle.text}`}>
                {buildabilityResult.summary}
              </p>
            </div>

            {/* Generate Report Button */}
            <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 transition-colors">
              <Download className="w-5 h-5" />
              상세 보고서 생성
            </button>
          </div>

          {/* Right: Diagnosis Details */}
          <div className="lg:col-span-2 space-y-4">
            {/* Zoning Analysis */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('zoning')}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span className="text-base font-semibold text-gray-900">용도지역/지구 분석</span>
                </div>
                {expandedSections.zoning ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.zoning && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-500 mb-1">용도지역</p>
                      <p className="text-sm font-semibold text-blue-900">{zoningAnalysis.mainZone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">건폐율</p>
                      <p className="text-sm font-semibold text-gray-900">{zoningAnalysis.buildingCoverageRatio}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">용적률</p>
                      <p className="text-sm font-semibold text-gray-900">{zoningAnalysis.floorAreaRatio}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-green-700 mb-2">허용 용도</h4>
                      <ul className="space-y-1.5">
                        {zoningAnalysis.allowedUses.map((use) => (
                          <li key={use} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-red-700 mb-2">제한 용도</h4>
                      <ul className="space-y-1.5">
                        {zoningAnalysis.restrictedUses.map((use) => (
                          <li key={use} className="flex items-center gap-2 text-sm text-gray-700">
                            <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Buildability Check */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('buildability')}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" />
                  <span className="text-base font-semibold text-gray-900">건축 가능 여부</span>
                </div>
                {expandedSections.buildability ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.buildability && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="space-y-2">
                    {buildabilityResult.details.map((detail) => (
                      <div
                        key={detail.item}
                        className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          {getStatusIcon(detail.status)}
                          <span className="text-sm font-medium text-gray-800">{detail.item}</span>
                        </div>
                        <span className="text-xs text-gray-500">{detail.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Applicable Laws */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('laws')}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-purple-500" />
                  <span className="text-base font-semibold text-gray-900">적용 법령</span>
                  <span className="text-xs text-gray-400">{applicableLaws.length}건</span>
                </div>
                {expandedSections.laws ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.laws && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="space-y-2">
                    {applicableLaws.map((law) => (
                      <div key={law.name} className="flex items-start gap-3 py-2 px-3 rounded-lg bg-gray-50">
                        <Scale className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{law.name}</p>
                          <p className="text-xs text-gray-500">{law.articles}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Permit Checklist */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('permits')}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span className="text-base font-semibold text-gray-900">필요 인허가 절차</span>
                </div>
                {expandedSections.permits ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.permits && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="space-y-2">
                    {permitChecklist.map((item) => (
                      <div
                        key={item.step}
                        className="flex items-center gap-3 py-2.5 px-3 rounded-lg bg-gray-50"
                      >
                        <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                          {item.step}
                        </div>
                        <span className="text-sm font-medium text-gray-800 flex-1">{item.name}</span>
                        {item.required ? (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">필수</span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">해당 시</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Estimated Time & Cost */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleSection('timecost')}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-base font-semibold text-gray-900">예상 소요기간/비용</span>
                </div>
                {expandedSections.timecost ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              {expandedSections.timecost && (
                <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                  <div className="mb-4 p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-800">예상 소요기간</span>
                    </div>
                    <p className="text-lg font-bold text-orange-900">{estimatedTimeCost.duration}</p>
                    <p className="text-xs text-orange-600">{estimatedTimeCost.durationDetail}</p>
                  </div>
                  <div className="space-y-2">
                    {estimatedTimeCost.costs.map((cost) => (
                      <div key={cost.item} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-700">{cost.item}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{cost.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              본 사전진단 결과는 AI가 법령 데이터를 기반으로 분석한 참고 자료이며, 법적 효력이 없습니다.
              실제 인허가 가능 여부는 관할 행정기관(시/군/구청)의 정식 심사를 통해 결정됩니다.
              정확한 판단을 위해 관할 기관에 사전 상담을 권장합니다.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
