'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Search, Car, MapPin, Calendar, CreditCard, AlertTriangle, CheckCircle, Clock, Ban } from 'lucide-react';

interface Violation {
  id: string;
  date: string;
  type: string;
  location: string;
  fineAmount: number;
  status: '미납' | '납부완료' | '이의신청중';
  vehicleNumber: string;
}

const sampleViolations: Violation[] = [
  {
    id: 'TRF-2026-3847',
    date: '2026-02-20',
    type: '신호위반',
    location: '서울 강남구 테헤란로 삼성역 교차로',
    fineAmount: 70000,
    status: '미납',
    vehicleNumber: '12가 3456',
  },
  {
    id: 'TRF-2026-2915',
    date: '2026-01-15',
    type: '속도위반 (20km/h 초과)',
    location: '서울 송파구 올림픽대로 잠실대교 부근',
    fineAmount: 100000,
    status: '미납',
    vehicleNumber: '12가 3456',
  },
  {
    id: 'TRF-2025-8734',
    date: '2025-11-08',
    type: '불법주정차',
    location: '서울 종로구 세종대로 광화문 앞',
    fineAmount: 40000,
    status: '납부완료',
    vehicleNumber: '12가 3456',
  },
  {
    id: 'TRF-2025-6291',
    date: '2025-09-23',
    type: '버스전용차로 위반',
    location: '서울 영등포구 국회대로 여의도 구간',
    fineAmount: 50000,
    status: '이의신청중',
    vehicleNumber: '12가 3456',
  },
];

function getStatusStyle(status: Violation['status']): string {
  switch (status) {
    case '미납': return 'text-red-700 bg-red-50 border-red-200';
    case '납부완료': return 'text-green-700 bg-green-50 border-green-200';
    case '이의신청중': return 'text-orange-700 bg-orange-50 border-orange-200';
  }
}

function getStatusIcon(status: Violation['status']) {
  switch (status) {
    case '미납': return AlertTriangle;
    case '납부완료': return CheckCircle;
    case '이의신청중': return Clock;
  }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원';
}

export default function TrafficPage() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [violations, setViolations] = useState<Violation[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    // Demo: show sample data regardless of input
    setViolations(sampleViolations);
  };

  const totalUnpaid = violations
    .filter((v) => v.status === '미납')
    .reduce((sum, v) => sum + v.fineAmount, 0);

  const totalCount = violations.length;
  const unpaidCount = violations.filter((v) => v.status === '미납').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-500 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-navy-200 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">교통위반 조회</h1>
            <p className="text-xs text-navy-200">교통위반 이력 및 과태료 조회</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">차량번호 조회</h2>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="차량번호 입력 (예: 12가 3456)"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-navy-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-navy-600 transition-colors"
            >
              <Search className="w-4 h-4" />
              조회
            </button>
          </form>
        </div>

        {hasSearched && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy-50 rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5 text-navy-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">총 위반건수</p>
                    <p className="text-xl font-bold text-gray-900">{totalCount}건</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">미납 건수</p>
                    <p className="text-xl font-bold text-red-600">{unpaidCount}건</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">미납 합계</p>
                    <p className="text-xl font-bold text-orange-600">{formatCurrency(totalUnpaid)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Violations List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">위반 내역</h3>
              {violations.map((violation) => {
                const StatusIcon = getStatusIcon(violation.status);
                return (
                  <div
                    key={violation.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Violation Icon */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Ban className="w-6 h-6 text-gray-400" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-base font-semibold text-gray-900">{violation.type}</h4>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusStyle(violation.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            {violation.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {violation.date}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {violation.location}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 font-mono">{violation.id}</p>
                      </div>

                      {/* Fine Amount */}
                      <div className="flex-shrink-0 text-right">
                        <p className={`text-lg font-bold ${
                          violation.status === '미납' ? 'text-red-600' :
                          violation.status === '납부완료' ? 'text-gray-400 line-through' :
                          'text-orange-600'
                        }`}>
                          {formatCurrency(violation.fineAmount)}
                        </p>
                        {violation.status === '미납' && (
                          <button className="mt-2 inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors">
                            <CreditCard className="w-3 h-3" />
                            납부하기
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!hasSearched && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">차량번호를 입력하세요</h3>
            <p className="text-sm text-gray-500">
              차량번호를 입력하면 교통위반 이력과 과태료 납부 현황을 조회할 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
