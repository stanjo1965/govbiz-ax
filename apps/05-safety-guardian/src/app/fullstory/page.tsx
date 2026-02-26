'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ArrowLeft,
  Search,
  BookOpen,
  Leaf,
  Factory,
  Truck,
  User,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface LifecycleStage {
  id: string;
  title: string;
  icon: typeof Leaf;
  color: string;
  bgColor: string;
  borderColor: string;
  status: 'safe' | 'caution' | 'info';
  summary: string;
  details: string[];
  checkpoints: string[];
}

const lifecycleStages: LifecycleStage[] = [
  {
    id: 'raw',
    title: '원료',
    icon: Leaf,
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    status: 'safe',
    summary: '원료 수급 및 품질 검사 단계',
    details: [
      '원료 원산지: 국내산 (전라북도 익산시)',
      '원료 검사일: 2024.09.15',
      '잔류농약 검사: 적합 (52개 항목 전항목 불검출)',
      '중금속 검사: 적합 (납, 카드뮴, 비소, 수은 기준치 이내)',
      '미생물 검사: 적합',
    ],
    checkpoints: [
      'GMP 인증 원료 공급업체',
      '잔류농약 52개 항목 전수 검사',
      '중금속 4종 정밀 분석 완료',
    ],
  },
  {
    id: 'manufacturing',
    title: '제조',
    icon: Factory,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-300',
    status: 'safe',
    summary: '제조 공정 및 품질 관리 단계',
    details: [
      '제조시설: HACCP 인증 시설',
      '제조일자: 2024.10.01',
      '제조 LOT: LOT-2024-1001-A',
      '품질검사 결과: 전 항목 적합',
      '제조환경: 클린룸 Class 10000 준수',
    ],
    checkpoints: [
      'HACCP 인증 시설에서 제조',
      '공정 중 3회 품질 검사 수행',
      '제조환경 온습도 실시간 모니터링',
    ],
  },
  {
    id: 'distribution',
    title: '유통',
    icon: Truck,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-300',
    status: 'caution',
    summary: '유통 경로 및 보관 조건 관리',
    details: [
      '유통경로: 제조사 → 중앙물류센터 → 소매점',
      '보관온도: 상온(15~25도C) 보관',
      '유통기한: 2026.09.30',
      '유통 이력 추적: 가능 (바코드 기반)',
      '콜드체인 유지: 해당 없음',
    ],
    checkpoints: [
      '유통기한 잔여 18개월',
      '보관 온도 조건 준수 확인 필요',
      '유통 이력 추적 시스템 등록 완료',
    ],
  },
  {
    id: 'usage',
    title: '사용',
    icon: User,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    status: 'caution',
    summary: '올바른 사용법 및 주의사항',
    details: [
      '1일 섭취량: 1정 (1,000mg)',
      '섭취 방법: 물과 함께 섭취',
      '섭취 시 주의사항: 과량 섭취 시 복통, 설사 가능',
      '상호작용: 항응고제 복용 시 전문가 상담 권고',
      '보관법: 직사광선을 피하고 서늘한 곳에 보관',
    ],
    checkpoints: [
      '1일 권장 섭취량 준수 필요',
      '의약품 병용 시 전문가 상담 필요',
      '개봉 후 습기 차단 보관 필수',
    ],
  },
  {
    id: 'disposal',
    title: '폐기',
    icon: Trash2,
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-300',
    status: 'info',
    summary: '올바른 폐기 및 환경 영향',
    details: [
      '폐기 방법: 일반 생활폐기물로 분류',
      '포장재: 분리배출 (PTP 포장 - 기타 플라스틱)',
      '환경 영향: 저위험',
      '유효기한 경과 제품: 복용 금지, 약국 수거함 이용',
      '대량 폐기 시: 전문 폐기물 처리업체 위탁',
    ],
    checkpoints: [
      '유효기한 경과 제품 복용 금지',
      '약국 폐의약품 수거함 이용 권장',
      '포장재 분리배출 준수',
    ],
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'safe': return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'caution': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    case 'info': return <Info className="w-4 h-4 text-blue-600" />;
    default: return null;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'safe': return { label: '안전', color: 'text-green-600 bg-green-50' };
    case 'caution': return { label: '주의', color: 'text-amber-600 bg-amber-50' };
    case 'info': return { label: '정보', color: 'text-blue-600 bg-blue-50' };
    default: return { label: '', color: '' };
  }
}

export default function FullStoryPage() {
  const [expandedStage, setExpandedStage] = useState<string | null>('raw');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStage = (id: string) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

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
              <BookOpen className="w-5 h-5 text-green-600" />
              <h1 className="text-lg font-bold text-gray-900">풀스토리 AI</h1>
              <span className="text-xs text-gray-500 hidden sm:inline">- 제품 전주기 정보</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">제품 라이프사이클 조회</h2>
          <p className="text-sm text-gray-500 mb-4">제품명 또는 바코드를 입력하면 원료부터 폐기까지 전 과정을 보여드립니다.</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="제품명, 바코드 번호 입력"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button className="bg-green-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
              조회
            </button>
          </div>
        </div>

        {/* Sample Product Info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">비타민C 1000mg 정제</h3>
              <p className="text-sm text-gray-500">한국제약(주) | 허가번호: 202400123</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                  안전등급 A
                </span>
                <span className="text-xs font-medium text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 허가 완료
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Heading */}
        <div className="flex items-center gap-2 mb-6">
          <h3 className="text-lg font-bold text-gray-900">제품 라이프사이클 타임라인</h3>
          <span className="text-xs text-gray-400">원료 → 제조 → 유통 → 사용 → 폐기</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-4">
            {lifecycleStages.map((stage, index) => {
              const isExpanded = expandedStage === stage.id;
              const statusInfo = getStatusLabel(stage.status);

              return (
                <div key={stage.id} className="relative pl-16">
                  {/* Timeline dot */}
                  <div className={`absolute left-4 top-5 w-7 h-7 rounded-full ${stage.bgColor} border-2 ${stage.borderColor} flex items-center justify-center z-10`}>
                    <stage.icon className={`w-3.5 h-3.5 ${stage.color}`} />
                  </div>

                  {/* Stage Card */}
                  <div className={`bg-white rounded-xl border ${isExpanded ? stage.borderColor : 'border-gray-200'} transition-all`}>
                    <button
                      onClick={() => toggleStage(stage.id)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{stage.title}</span>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{stage.summary}</p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className={`px-4 pb-4 border-t ${stage.borderColor}`}>
                        {/* Details */}
                        <div className="mt-4 space-y-2">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">상세 정보</h4>
                          {stage.details.map((detail, i) => (
                            <p key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                              {detail}
                            </p>
                          ))}
                        </div>

                        {/* Safety Checkpoints */}
                        <div className="mt-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                            <Shield className="w-4 h-4 text-green-600" />
                            안전 체크포인트
                          </h4>
                          {stage.checkpoints.map((checkpoint, i) => (
                            <p key={i} className="text-sm text-gray-600 flex items-start gap-2 mb-1">
                              {getStatusIcon(stage.status)}
                              <span>{checkpoint}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
