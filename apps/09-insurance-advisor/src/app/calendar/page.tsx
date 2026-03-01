'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  RefreshCw,
  AlertTriangle,
  CalendarDays,
} from 'lucide-react';

type EventType = '납부일' | '갱신일' | '만기일';

interface InsuranceEvent {
  id: number;
  date: string; // YYYY-MM-DD
  type: EventType;
  insurer: string;
  product: string;
  amount?: number;
}

const sampleEvents: InsuranceEvent[] = [
  { id: 1, date: '2026-03-05', type: '납부일', insurer: '삼성화재', product: '애니핏 실손의료보험', amount: 28000 },
  { id: 2, date: '2026-03-10', type: '갱신일', insurer: 'KB손해보험', product: 'KB 착한 실손보험' },
  { id: 3, date: '2026-03-15', type: '납부일', insurer: '한화생명', product: '암케어 통합보험', amount: 45000 },
  { id: 4, date: '2026-03-22', type: '납부일', insurer: 'DB손해보험', product: 'DB다이렉트 자동차보험', amount: 38000 },
  { id: 5, date: '2026-03-28', type: '만기일', insurer: '교보생명', product: '교보 정기보험 (10년)' },
];

const typeStyle: Record<EventType, { bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }> = {
  납부일: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: CreditCard },
  갱신일: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: RefreshCw },
  만기일: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: AlertTriangle },
};

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

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  };

  const monthStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
  const monthEvents = sampleEvents.filter((e) => e.date.startsWith(monthStr));

  const eventsByDay: Record<number, InsuranceEvent[]> = {};
  monthEvents.forEach((e) => {
    const day = parseInt(e.date.split('-')[2]);
    if (!eventsByDay[day]) eventsByDay[day] = [];
    eventsByDay[day].push(e);
  });

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

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
            <h1 className="text-base font-bold text-gray-900">보험 캘린더</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {(Object.entries(typeStyle) as [EventType, typeof typeStyle[EventType]][]).map(([type, style]) => (
            <div key={type} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium ${style.bg} ${style.text} ${style.border}`}>
              <style.icon className="w-3.5 h-3.5" />
              {type}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-bold text-gray-900">
              {currentYear}년 {currentMonth + 1}월
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 border-b border-gray-100">
            {weekdays.map((d, i) => (
              <div
                key={d}
                className={`py-2 text-center text-xs font-semibold ${
                  i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[80px] border-r border-b border-gray-50" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const isToday = today.getFullYear() === currentYear && today.getMonth() === currentMonth && today.getDate() === day;
              const dayEvents = eventsByDay[day] || [];
              const colIdx = (firstDay + day - 1) % 7;

              return (
                <div
                  key={day}
                  className={`min-h-[80px] border-r border-b border-gray-50 p-1.5 ${
                    colIdx === 0 ? 'text-red-400' : colIdx === 6 ? 'text-blue-400' : 'text-gray-700'
                  }`}
                >
                  <div className={`w-7 h-7 flex items-center justify-center text-sm font-medium mb-1 ${
                    isToday ? 'bg-emerald-600 text-white rounded-full' : ''
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.map((e) => {
                      const style = typeStyle[e.type];
                      return (
                        <div
                          key={e.id}
                          className={`text-xs px-1.5 py-0.5 rounded truncate ${style.bg} ${style.text}`}
                          title={`${e.insurer} ${e.product}`}
                        >
                          {e.type}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* This Month Events List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-emerald-600" />
            {currentMonth + 1}월 보험 일정 ({monthEvents.length}건)
          </h3>

          {monthEvents.length === 0 ? (
            <div className="text-center py-8">
              <CalendarDays className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">이달 보험 일정이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {monthEvents
                .sort((a, b) => a.date.localeCompare(b.date))
                .map((event) => {
                  const style = typeStyle[event.type];
                  const EventIcon = style.icon;
                  const dateObj = new Date(event.date);
                  const dateStr = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;

                  return (
                    <div
                      key={event.id}
                      className={`flex items-center justify-between p-4 rounded-xl border ${style.bg} ${style.border}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.bg}`}>
                          <EventIcon className={`w-4 h-4 ${style.text}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
                              {event.type}
                            </span>
                            <span className="text-xs text-gray-500">{dateStr}</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mt-0.5">{event.product}</p>
                          <p className="text-xs text-gray-500">{event.insurer}</p>
                        </div>
                      </div>
                      {event.amount && (
                        <div className="text-right shrink-0">
                          <p className="text-base font-bold text-gray-900">{event.amount.toLocaleString()}원</p>
                          <p className="text-xs text-gray-400">월 보험료</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Monthly Summary */}
        {monthEvents.length > 0 && (
          <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-800">이달 예상 보험료 합계</p>
                <p className="text-xs text-emerald-600 mt-0.5">납부일 기준</p>
              </div>
              <p className="text-2xl font-bold text-emerald-700">
                {monthEvents
                  .filter((e) => e.type === '납부일' && e.amount)
                  .reduce((s, e) => s + (e.amount || 0), 0)
                  .toLocaleString()}원
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
