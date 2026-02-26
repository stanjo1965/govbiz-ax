'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Activity,
  AlertTriangle,
  Bell,
  Clock,
  ChevronRight,
  AlertOctagon,
  Package,
  Pill,
  HeartPulse,
  Sparkles,
  Lightbulb,
  RefreshCw,
  CheckCircle,
  XCircle,
} from 'lucide-react';

interface SafetyAlert {
  id: number;
  type: 'recall' | 'warning' | 'info';
  category: string;
  title: string;
  description: string;
  date: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
}

interface DailyTip {
  id: number;
  title: string;
  content: string;
  icon: typeof Lightbulb;
  color: string;
}

const todayAlerts: SafetyAlert[] = [
  {
    id: 1,
    type: 'recall',
    category: '식품',
    title: '수입 건강기능식품 "슈퍼파워 에너지" 긴급 회수',
    description: '비허가 의약품 성분(실데나필) 검출. 해당 제품 섭취 즉시 중단 및 구매처 반품 요청.',
    date: '2024.11.15 09:00',
    severity: 'critical',
    source: '식품의약품안전처 위해식품 차단 통합시스템',
  },
  {
    id: 2,
    type: 'recall',
    category: '의약품',
    title: '○○제약 감기약 일부 로트 자진 회수',
    description: 'LOT-2024-0815~0822 생산분 용출시험 부적합. 해당 로트 제품 복용 중단 권고.',
    date: '2024.11.15 10:30',
    severity: 'high',
    source: '의약품안전나라',
  },
  {
    id: 3,
    type: 'warning',
    category: '화장품',
    title: '온라인 판매 미등록 미백크림 주의보',
    description: '수은 함유 미등록 미백크림 온라인 유통 확인. 피부 자극, 중금속 중독 위험. SNS 구매 자제 권고.',
    date: '2024.11.15 11:00',
    severity: 'high',
    source: '식품의약품안전처 화장품정책과',
  },
  {
    id: 4,
    type: 'warning',
    category: '의료기기',
    title: '가정용 혈당측정기 정확도 주의보',
    description: '일부 미인증 수입 혈당측정기 정확도 미달 확인. 의료기기 인허가 확인 후 사용 권고.',
    date: '2024.11.15 13:00',
    severity: 'medium',
    source: '한국의료기기안전정보원',
  },
  {
    id: 5,
    type: 'info',
    category: '식품',
    title: '겨울철 노로바이러스 식중독 주의',
    description: '겨울철 굴 등 어패류 생식 자제, 손씻기 등 개인위생 철저. 구토, 설사 시 즉시 의료기관 방문.',
    date: '2024.11.15 14:00',
    severity: 'medium',
    source: '식품안전나라',
  },
];

const dailyTips: DailyTip[] = [
  {
    id: 1,
    title: '의약품 올바른 보관법',
    content: '대부분의 의약품은 직사광선을 피해 서늘하고 건조한 곳에 보관하세요. 욕실이나 주방은 습기가 많아 부적합합니다. 어린이 손이 닿지 않는 곳에 보관하세요.',
    icon: Pill,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: 2,
    title: '식품 유통기한 vs 소비기한',
    content: '2023년부터 소비기한 표시제가 시행되었습니다. 소비기한은 유통기한보다 긴 경우가 많으며, 적절한 보관 조건에서 안전하게 섭취할 수 있는 기한입니다.',
    icon: Package,
    color: 'bg-green-50 text-green-600',
  },
  {
    id: 3,
    title: '화장품 사용기한 확인하기',
    content: '개봉 후 사용기한(PAO)을 확인하세요. 뚜껑 열린 용기 아이콘과 숫자(예: 12M)는 개봉 후 12개월 이내 사용을 의미합니다.',
    icon: Sparkles,
    color: 'bg-purple-50 text-purple-600',
  },
];

const recallStats = {
  today: 3,
  thisWeek: 12,
  thisMonth: 47,
};

function getSeverityStyle(severity: string) {
  switch (severity) {
    case 'critical': return { bg: 'bg-red-50', border: 'border-l-red-600', badge: 'bg-red-100 text-red-700', label: '긴급' };
    case 'high': return { bg: 'bg-orange-50', border: 'border-l-orange-500', badge: 'bg-orange-100 text-orange-700', label: '높음' };
    case 'medium': return { bg: 'bg-amber-50', border: 'border-l-amber-500', badge: 'bg-amber-100 text-amber-700', label: '보통' };
    case 'low': return { bg: 'bg-blue-50', border: 'border-l-blue-500', badge: 'bg-blue-100 text-blue-700', label: '낮음' };
    default: return { bg: 'bg-gray-50', border: 'border-l-gray-400', badge: 'bg-gray-100 text-gray-700', label: '-' };
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'recall': return <AlertOctagon className="w-4 h-4 text-red-600" />;
    case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-600" />;
    case 'info': return <Bell className="w-4 h-4 text-blue-600" />;
    default: return null;
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'recall': return '회수';
    case 'warning': return '주의';
    case 'info': return '안내';
    default: return '';
  }
}

export default function DailyCheckPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'recall' | 'warning' | 'info'>('all');

  const filteredAlerts = todayAlerts.filter(
    (alert) => activeTab === 'all' || alert.type === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" />
                <h1 className="text-lg font-bold text-gray-900">일일 안전체크</h1>
                <span className="text-xs text-gray-500 hidden sm:inline">- 라이프센스 AI</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500">마지막 업데이트: 14:00</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Recall Stats Banner */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <AlertOctagon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">회수/리콜 현황</h2>
                <p className="text-red-200 text-sm">식의약품 안전 경보 모니터링</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{recallStats.today}건</p>
                <p className="text-xs text-red-200">오늘</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{recallStats.thisWeek}건</p>
                <p className="text-xs text-red-200">이번 주</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{recallStats.thisMonth}건</p>
                <p className="text-xs text-red-200">이번 달</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Alerts Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Filter */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[
                  { key: 'all' as const, label: '전체' },
                  { key: 'recall' as const, label: '회수/리콜' },
                  { key: 'warning' as const, label: '주의보' },
                  { key: 'info' as const, label: '안내' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" />
                새로고침
              </button>
            </div>

            {/* Alerts List */}
            <div className="space-y-3">
              {filteredAlerts.map((alert) => {
                const severityStyle = getSeverityStyle(alert.severity);

                return (
                  <div
                    key={alert.id}
                    className={`bg-white rounded-xl border border-gray-200 border-l-4 ${severityStyle.border} p-5 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(alert.type)}
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${severityStyle.badge}`}>
                          {severityStyle.label}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {alert.category}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          {getTypeLabel(alert.type)}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{alert.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1.5">{alert.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{alert.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">출처: {alert.source}</span>
                      <button className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center gap-0.5">
                        상세보기 <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Safety Score */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                오늘의 안전 점수
              </h3>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 border-4 border-green-500">
                  <span className="text-3xl font-bold text-green-600">92</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">전체적으로 안전한 상태입니다</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: '식품 안전', score: 95, color: 'bg-green-500' },
                  { label: '의약품 안전', score: 88, color: 'bg-blue-500' },
                  { label: '화장품 안전', score: 92, color: 'bg-purple-500' },
                  { label: '의료기기 안전', score: 90, color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.score}점</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Checklist */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" />
                오늘의 안전 체크리스트
              </h3>
              <div className="space-y-3">
                {[
                  { text: '복용 중인 약 유효기한 확인', done: true },
                  { text: '냉장고 식품 소비기한 점검', done: true },
                  { text: '사용 중인 화장품 리콜 여부 확인', done: false },
                  { text: '가정용 의료기기 배터리 확인', done: false },
                  { text: '오늘의 안전 알림 확인', done: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-300 shrink-0" />
                    )}
                    <span className={`text-sm ${item.done ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Tips */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                오늘의 안전 팁
              </h3>
              <div className="space-y-4">
                {dailyTips.map((tip) => (
                  <div key={tip.id} className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-1.5">
                      <tip.icon className={`w-4 h-4 ${tip.color.split(' ')[1]}`} />
                      <span className="text-sm font-semibold text-gray-900">{tip.title}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
