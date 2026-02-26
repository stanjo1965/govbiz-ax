'use client';

import { useState } from 'react';
import { TrendingDown, TrendingUp, Minus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface TrendItem {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  unit: string;
  weekChange: number;
  monthChange: number;
  yearChange: number;
  forecast: 'up' | 'down' | 'stable';
  forecastReason: string;
}

const SAMPLE_TRENDS: TrendItem[] = [
  { id: '1', name: '배추', category: '엽경채류', currentPrice: 3200, unit: '1포기', weekChange: -5.2, monthChange: -12.3, yearChange: -8.1, forecast: 'down', forecastReason: '출하량 증가로 하락 전망' },
  { id: '2', name: '쌀(20kg)', category: '곡류', currentPrice: 52800, unit: '20kg', weekChange: -1.3, monthChange: -2.1, yearChange: 3.5, forecast: 'stable', forecastReason: '수급 안정세 지속 전망' },
  { id: '3', name: '삼겹살', category: '육류', currentPrice: 18900, unit: '100g', weekChange: 2.1, monthChange: 5.3, yearChange: 8.2, forecast: 'up', forecastReason: '명절 수요 증가 전망' },
  { id: '4', name: '달걀(30구)', category: '난류', currentPrice: 6500, unit: '30구', weekChange: -3.8, monthChange: -7.2, yearChange: -15.3, forecast: 'down', forecastReason: '산란계 사육량 회복' },
  { id: '5', name: '사과(부사)', category: '과일류', currentPrice: 2800, unit: '1개', weekChange: -8.5, monthChange: -15.1, yearChange: -22.0, forecast: 'down', forecastReason: '작황 호조로 출하 증가' },
  { id: '6', name: '양파', category: '양채류', currentPrice: 1200, unit: '1개', weekChange: 1.5, monthChange: -3.2, yearChange: -5.8, forecast: 'stable', forecastReason: '수급 안정세 유지 전망' },
];

function ChangeIndicator({ value }: { value: number }) {
  if (value < 0) {
    return (
      <span className="flex items-center gap-0.5 text-blue-600 font-medium">
        <TrendingDown className="w-3 h-3" />
        {Math.abs(value)}%
      </span>
    );
  }
  if (value > 0) {
    return (
      <span className="flex items-center gap-0.5 text-red-500 font-medium">
        <TrendingUp className="w-3 h-3" />
        {value}%
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 text-gray-400">
      <Minus className="w-3 h-3" />
      0%
    </span>
  );
}

export default function TrendsPage() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">가격 동향</h1>
          </div>
          <div className="flex gap-2">
            {[
              { key: 'week' as const, label: '주간' },
              { key: 'month' as const, label: '월간' },
              { key: 'year' as const, label: '연간' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPeriod(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  period === tab.key
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-xs text-blue-600 mb-1">하락 품목</p>
            <p className="text-2xl font-bold text-blue-700">
              {SAMPLE_TRENDS.filter((t) => {
                const change = period === 'week' ? t.weekChange : period === 'month' ? t.monthChange : t.yearChange;
                return change < 0;
              }).length}
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600 mb-1">보합 품목</p>
            <p className="text-2xl font-bold text-gray-700">
              {SAMPLE_TRENDS.filter((t) => t.forecast === 'stable').length}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-xs text-red-600 mb-1">상승 품목</p>
            <p className="text-2xl font-bold text-red-700">
              {SAMPLE_TRENDS.filter((t) => {
                const change = period === 'week' ? t.weekChange : period === 'month' ? t.monthChange : t.yearChange;
                return change > 0;
              }).length}
            </p>
          </div>
        </div>

        {/* Trend List */}
        <div className="space-y-3">
          {SAMPLE_TRENDS.map((item) => {
            const change = period === 'week' ? item.weekChange : period === 'month' ? item.monthChange : item.yearChange;
            return (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-gray-100 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {item.currentPrice.toLocaleString()}원
                    </p>
                    <p className="text-xs text-gray-400">/ {item.unit}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 mr-1">변동</span>
                      <ChangeIndicator value={change} />
                    </div>
                    <div className={`px-2 py-0.5 rounded text-xs ${
                      item.forecast === 'down' ? 'bg-blue-50 text-blue-600' :
                      item.forecast === 'up' ? 'bg-red-50 text-red-500' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      전망: {item.forecast === 'down' ? '하락' : item.forecast === 'up' ? '상승' : '보합'}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{item.forecastReason}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
