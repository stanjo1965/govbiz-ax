'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  AlertTriangle,
  CheckCircle,
  PhoneCall,
  MessageCircle,
  ChevronRight,
  Stethoscope,
  Heart,
  Car,
  Home,
} from 'lucide-react';

type TabKey = 'medical' | 'life' | 'car' | 'fire';

interface ClaimGuide {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  documents: string[];
  steps: { title: string; desc: string }[];
  warnings: string[];
}

const guides: ClaimGuide[] = [
  {
    key: 'medical',
    label: '실손의료보험',
    icon: Stethoscope,
    color: 'text-emerald-600 bg-emerald-50',
    documents: [
      '진료비 영수증 (진료비 세부내역서 포함)',
      '진단서 또는 소견서 (입원의 경우)',
      '처방전 (처방조제비 청구 시)',
      '통원확인서 (외래 청구 시)',
      '입·퇴원확인서 (입원 청구 시)',
    ],
    steps: [
      { title: '진료 후 서류 수령', desc: '의료기관에서 영수증, 진단서 등 필요 서류를 발급받으세요.' },
      { title: '보험사 청구 접수', desc: '보험사 앱, 홈페이지, 고객센터 또는 방문을 통해 청구를 접수하세요.' },
      { title: '서류 제출', desc: '준비한 서류를 스캔/촬영하여 온라인 제출하거나 우편·방문 제출하세요.' },
      { title: '보험금 심사', desc: '보험사가 서류를 검토합니다. 통상 3~10 영업일 소요됩니다.' },
      { title: '보험금 지급', desc: '심사 완료 후 지정 계좌로 보험금이 지급됩니다.' },
    ],
    warnings: [
      '치료 목적이 아닌 미용·성형 시술은 보장되지 않습니다.',
      '비급여 항목 중 일부(도수치료 등)는 별도 한도가 적용될 수 있습니다.',
      '보험 가입 전 발생한 질병은 보장에서 제외됩니다.',
      '청구 시효는 3년으로, 이 기간 내 청구하지 않으면 권리가 소멸됩니다.',
    ],
  },
  {
    key: 'life',
    label: '생명·사망보험',
    icon: Heart,
    color: 'text-red-600 bg-red-50',
    documents: [
      '사망진단서 (사망보험 청구 시)',
      '보험금 청구서 (보험사 양식)',
      '수익자 신분증 사본',
      '수익자 통장 사본',
      '가족관계증명서',
      '피보험자의 사망 사실 확인 서류',
    ],
    steps: [
      { title: '보험사 유선 통보', desc: '사망 또는 보험사고 발생 즉시 보험사 고객센터에 연락하세요.' },
      { title: '서류 목록 확인', desc: '담당자에게 필요 서류 목록을 정확히 안내받으세요.' },
      { title: '서류 준비 및 제출', desc: '안내받은 서류를 준비하여 기간 내에 제출하세요.' },
      { title: '보험금 심사', desc: '사망의 경우 통상 30일 이내 심사가 완료됩니다.' },
      { title: '보험금 지급', desc: '심사 후 수익자 명의 계좌로 보험금이 지급됩니다.' },
    ],
    warnings: [
      '자살은 계약 후 2년이 지나야 보험금 지급 대상이 됩니다.',
      '보험금 청구 시효는 사망일로부터 3년입니다.',
      '수익자가 지정되지 않은 경우 법정상속인에게 지급됩니다.',
      '보험료 미납으로 계약이 실효된 경우 보험금이 지급되지 않을 수 있습니다.',
    ],
  },
  {
    key: 'car',
    label: '자동차보험',
    icon: Car,
    color: 'text-blue-600 bg-blue-50',
    documents: [
      '사고 현장 사진 (차량 손상 및 사고 상황)',
      '상대방 차량 번호 및 보험 정보',
      '경찰 사고 접수증 (경찰 신고 시)',
      '진단서 (인적 피해 발생 시)',
      '수리비 견적서 또는 영수증',
      '교통사고 사실확인원',
    ],
    steps: [
      { title: '사고 현장 안전 조치', desc: '부상자 구호 및 안전한 장소로 이동 후 경찰에 신고하세요.' },
      { title: '보험사 사고 접수', desc: '사고 즉시 보험사 고객센터(24시간)에 사고를 접수하세요.' },
      { title: '현장 조사 및 상담', desc: '보험사 담당자가 현장 조사 및 과실 비율 협의를 진행합니다.' },
      { title: '차량 수리 및 치료', desc: '보험사 지정 공업사에서 수리하거나 의료기관에서 치료를 받으세요.' },
      { title: '보험금 정산', desc: '수리비, 치료비, 대차비 등 항목별로 보험금이 정산됩니다.' },
    ],
    warnings: [
      '사고 후 합의를 서두르지 마세요. 치료 완료 후 합의하는 것이 유리합니다.',
      '음주·무면허 운전 사고는 자기부담금이 크게 증가합니다.',
      '보험 미가입 차량 사고 피해 시 정부보장사업을 이용할 수 있습니다.',
      '과실 비율에 불복 시 금융감독원 또는 분쟁조정위원회에 조정을 신청할 수 있습니다.',
    ],
  },
  {
    key: 'fire',
    label: '화재·재산보험',
    icon: Home,
    color: 'text-orange-600 bg-orange-50',
    documents: [
      '화재사실확인원 (소방서 발급)',
      '피해 물품 목록 및 견적서',
      '현장 사진 (피해 상황)',
      '주택 등기부등본 또는 전세계약서',
      '수리비 영수증 (수리 완료 후)',
      '세입자의 경우: 임대차계약서',
    ],
    steps: [
      { title: '화재 신고 및 안전 확인', desc: '화재 발생 즉시 119 신고 후 대피하세요. 안전 확인 후 사진 촬영하세요.' },
      { title: '소방서 확인서 수령', desc: '소방서에서 화재사실확인원을 발급받으세요.' },
      { title: '보험사 사고 접수', desc: '보험사에 화재 사고를 접수하고 필요 서류를 확인하세요.' },
      { title: '손해사정 조사', desc: '보험사 손해사정사가 현장을 조사하고 피해액을 산정합니다.' },
      { title: '보험금 지급', desc: '손해사정 후 보험금이 지급됩니다. 통상 2~4주 소요됩니다.' },
    ],
    warnings: [
      '화재 발생 후 현장을 임의로 변경하면 손해사정에 불이익이 발생할 수 있습니다.',
      '방화 또는 고의 사고는 보험금 지급이 거절됩니다.',
      '임차인이 화재를 낸 경우 임대인에게 손해배상 책임이 있습니다.',
      '피해액 산정에 이의가 있는 경우 독립 손해사정사를 선임할 수 있습니다.',
    ],
  },
];

export default function ClaimGuidePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('medical');
  const guide = guides.find((g) => g.key === activeTab)!;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-14">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-bold text-gray-900">보험 청구 가이드</h1>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {guides.map((g) => (
              <button
                key={g.key}
                onClick={() => setActiveTab(g.key)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === g.key
                    ? 'border-emerald-600 text-emerald-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <g.icon className="w-4 h-4" />
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Tab Title */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${guide.color}`}>
            <guide.icon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">{guide.label} 청구 가이드</h2>
            <p className="text-sm text-gray-500">단계별 청구 절차와 주의사항을 확인하세요</p>
          </div>
        </div>

        {/* 준비 서류 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            준비 서류
          </h3>
          <ul className="space-y-2">
            {guide.documents.map((doc, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-sm text-gray-700">{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 청구 절차 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            청구 절차
          </h3>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-emerald-100" />
            <div className="space-y-6">
              {guide.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 relative">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 relative z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{step.title}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
          <h3 className="text-base font-bold text-amber-800 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            주의사항
          </h3>
          <ul className="space-y-2">
            {guide.warnings.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                <ChevronRight className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* 분쟁 발생 시 */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-red-500" />
            분쟁 발생 시 연락처
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:1332"
              className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors"
            >
              <PhoneCall className="w-8 h-8 text-red-500 shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-700">금융감독원</p>
                <p className="text-lg font-bold text-red-600">1332</p>
                <p className="text-xs text-red-500">금융소비자보호처 (무료)</p>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
              <ShieldCheck className="w-8 h-8 text-gray-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-gray-700">금융분쟁조정위원회</p>
                <p className="text-sm font-semibold text-gray-600">금감원 내 운영</p>
                <p className="text-xs text-gray-500">서면 조정 신청 가능</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI 상담 CTA */}
        <div className="text-center">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            AI에게 청구 관련 질문하기
          </Link>
        </div>
      </main>
    </div>
  );
}
