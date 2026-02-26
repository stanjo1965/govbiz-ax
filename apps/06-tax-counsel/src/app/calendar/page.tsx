'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, ChevronLeft, ChevronRight, Bell, CalendarDays } from 'lucide-react';

const taxDeadlines = [
  {
    month: 1,
    day: 25,
    title: '부가가치세 확정신고 (2기)',
    description: '전년도 7~12월분 부가가치세 확정신고 및 납부',
    type: '신고/납부',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    month: 1,
    day: 31,
    title: '면세사업자 사업장 현황신고',
    description: '면세사업자 전년도 수입금액 등 사업장 현황신고',
    type: '신고',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  {
    month: 2,
    day: 28,
    title: '연말정산 환급 신청',
    description: '근로소득 연말정산 환급세액 조기 환급 신청',
    type: '환급',
    color: 'bg-green-50 text-green-600 border-green-200',
  },
  {
    month: 3,
    day: 31,
    title: '법인세 신고',
    description: '12월 결산법인 법인세 과세표준 신고 및 납부',
    type: '신고/납부',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    month: 4,
    day: 25,
    title: '부가가치세 예정신고 (1기)',
    description: '1~3월분 부가가치세 예정신고 및 납부',
    type: '신고/납부',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    month: 5,
    day: 31,
    title: '종합소득세 확정신고',
    description: '전년도 종합소득에 대한 과세표준 확정신고 및 납부',
    type: '신고/납부',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    month: 6,
    day: 30,
    title: '성실신고확인서 제출',
    description: '성실신고확인 대상 사업자 종합소득세 신고 및 납부',
    type: '신고/납부',
    color: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  {
    month: 7,
    day: 25,
    title: '부가가치세 확정신고 (1기)',
    description: '1~6월분 부가가치세 확정신고 및 납부',
    type: '신고/납부',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    month: 7,
    day: 31,
    title: '재산세 납부 (1기)',
    description: '주택분 재산세 1/2 납부',
    type: '납부',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    month: 8,
    day: 31,
    title: '종합소득세 중간예납',
    description: '종합소득세 중간예납세액 납부',
    type: '납부',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    month: 9,
    day: 30,
    title: '재산세 납부 (2기)',
    description: '주택분 재산세 나머지 1/2 및 토지분 납부',
    type: '납부',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    month: 10,
    day: 25,
    title: '부가가치세 예정신고 (2기)',
    description: '7~9월분 부가가치세 예정신고 및 납부',
    type: '신고/납부',
    color: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    month: 11,
    day: 30,
    title: '종합소득세 중간예납 납부',
    description: '종합소득세 중간예납세액 납부 기한',
    type: '납부',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
  {
    month: 12,
    day: 31,
    title: '종합부동산세 납부',
    description: '종합부동산세 납부 기한',
    type: '납부',
    color: 'bg-purple-50 text-purple-600 border-purple-200',
  },
];

const monthNames = [
  '1월', '2월', '3월', '4월', '5월', '6월',
  '7월', '8월', '9월', '10월', '11월', '12월',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const displayMonth = currentMonth + 1;

  const monthDeadlines = taxDeadlines.filter((d) => d.month === displayMonth);
  const deadlineDays = new Set(monthDeadlines.map((d) => d.day));

  const upcomingDeadlines = taxDeadlines
    .filter((d) => {
      const deadlineDate = new Date(currentYear, d.month - 1, d.day);
      return deadlineDate >= today;
    })
    .slice(0, 5);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

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
            <h1 className="text-lg font-bold text-gray-900">세금 캘린더</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {currentYear}년 {monthNames[currentMonth]}
                </h2>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, i) => (
                  <div
                    key={day}
                    className={`text-center text-sm font-medium py-2 ${
                      i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-500'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const isToday =
                    day === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear();
                  const isDeadline = day !== null && deadlineDays.has(day);
                  const dayOfWeek = index % 7;

                  return (
                    <div
                      key={index}
                      className={`relative h-12 flex items-center justify-center rounded-lg text-sm ${
                        day === null
                          ? ''
                          : isToday
                          ? 'bg-primary-500 text-white font-bold'
                          : isDeadline
                          ? 'bg-red-50 text-red-600 font-semibold'
                          : dayOfWeek === 0
                          ? 'text-red-400 hover:bg-gray-50'
                          : dayOfWeek === 6
                          ? 'text-blue-400 hover:bg-gray-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      } ${day !== null ? 'cursor-pointer' : ''}`}
                    >
                      {day}
                      {isDeadline && !isToday && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Monthly Deadlines */}
              {monthDeadlines.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    {monthNames[currentMonth]} 주요 세금 일정
                  </h3>
                  <div className="space-y-3">
                    {monthDeadlines.map((deadline, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${deadline.color}`}
                      >
                        <div className="text-center min-w-[3rem]">
                          <p className="text-lg font-bold">{deadline.day}</p>
                          <p className="text-xs">{monthNames[currentMonth]}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="font-semibold text-sm">{deadline.title}</h4>
                            <span className="text-xs px-1.5 py-0.5 bg-white/50 rounded">
                              {deadline.type}
                            </span>
                          </div>
                          <p className="text-xs opacity-80">{deadline.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {monthDeadlines.length === 0 && (
                <div className="mt-6 pt-6 border-t border-gray-100 text-center py-8">
                  <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">{monthNames[currentMonth]}에는 주요 세금 일정이 없습니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Deadlines Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-primary-500" />
                <h3 className="text-lg font-bold text-gray-900">다가오는 일정</h3>
              </div>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline, index) => {
                  const deadlineDate = new Date(currentYear, deadline.month - 1, deadline.day);
                  const daysUntil = Math.ceil(
                    (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <div className="bg-gray-100 rounded-lg p-2 text-center min-w-[3rem]">
                        <p className="text-xs text-gray-500">{deadline.month}월</p>
                        <p className="text-lg font-bold text-gray-900">{deadline.day}</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 mb-0.5">
                          {deadline.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">{deadline.description}</p>
                        <span
                          className={`text-xs font-medium ${
                            daysUntil <= 7
                              ? 'text-red-500'
                              : daysUntil <= 30
                              ? 'text-orange-500'
                              : 'text-gray-400'
                          }`}
                        >
                          {daysUntil === 0
                            ? 'D-Day'
                            : daysUntil > 0
                            ? `D-${daysUntil}`
                            : '기한 경과'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">범례</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-600">신고/납부 기한</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-gray-600">납부 기한</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-600">환급 관련</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-primary-500" />
                  <span className="text-gray-600">오늘</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
