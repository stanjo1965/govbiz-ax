'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  Ship,
  Search,
  ChevronLeft,
  MapPin,
  Clock,
  Flag,
  Filter,
  Anchor,
  Navigation,
} from 'lucide-react';

interface Vessel {
  id: number;
  name: string;
  nameEn: string;
  type: string;
  typeLabel: string;
  mmsi: string;
  registration: string;
  flag: string;
  lastPosition: string;
  lastSeen: string;
  speed: string;
  heading: string;
  status: 'normal' | 'warning' | 'danger' | 'inactive';
  statusLabel: string;
  tonnage: string;
  length: string;
  owner: string;
}

const vessels: Vessel[] = [
  {
    id: 1,
    name: '동해호',
    nameEn: 'DONGHAE',
    type: 'fishing',
    typeLabel: '어선',
    mmsi: '440123456',
    registration: 'BS-1234',
    flag: '대한민국',
    lastPosition: '35.1796N, 129.0756E',
    lastSeen: '2분 전',
    speed: '5.2 kts',
    heading: '045',
    status: 'normal',
    statusLabel: '정상 운항',
    tonnage: '99톤',
    length: '24.5m',
    owner: '동해수산(주)',
  },
  {
    id: 2,
    name: '인천스타',
    nameEn: 'INCHEON STAR',
    type: 'cargo',
    typeLabel: '화물선',
    mmsi: '440234567',
    registration: 'IC-5678',
    flag: '대한민국',
    lastPosition: '37.4563N, 126.7052E',
    lastSeen: '1분 전',
    speed: '12.3 kts',
    heading: '270',
    status: 'normal',
    statusLabel: '정상 운항',
    tonnage: '3,500톤',
    length: '89.2m',
    owner: '한진해운(주)',
  },
  {
    id: 3,
    name: '목포진주',
    nameEn: 'MOKPO JINJU',
    type: 'fishing',
    typeLabel: '어선',
    mmsi: '440345678',
    registration: 'MP-9012',
    flag: '대한민국',
    lastPosition: '34.7854N, 126.3812E',
    lastSeen: '15분 전',
    speed: '0.0 kts',
    heading: '-',
    status: 'warning',
    statusLabel: '정박 중 (미보고)',
    tonnage: '45톤',
    length: '18.3m',
    owner: '목포수협',
  },
  {
    id: 4,
    name: '부산드래곤',
    nameEn: 'BUSAN DRAGON',
    type: 'cargo',
    typeLabel: '화물선',
    mmsi: '440456789',
    registration: 'BS-3456',
    flag: '대한민국',
    lastPosition: '35.0956N, 129.0312E',
    lastSeen: '3분 전',
    speed: '8.7 kts',
    heading: '180',
    status: 'normal',
    statusLabel: '정상 운항',
    tonnage: '5,200톤',
    length: '112.5m',
    owner: '현대글로비스',
  },
  {
    id: 5,
    name: '제주바다',
    nameEn: 'JEJU BADA',
    type: 'fishing',
    typeLabel: '어선',
    mmsi: '440567890',
    registration: 'JJ-7890',
    flag: '대한민국',
    lastPosition: '33.2401N, 126.5698E',
    lastSeen: '45분 전',
    speed: '0.0 kts',
    heading: '-',
    status: 'danger',
    statusLabel: 'AIS 신호 끊김',
    tonnage: '30톤',
    length: '15.7m',
    owner: '제주어협',
  },
  {
    id: 6,
    name: '여수글로리',
    nameEn: 'YEOSU GLORY',
    type: 'tanker',
    typeLabel: '유조선',
    mmsi: '440678901',
    registration: 'YS-2345',
    flag: '대한민국',
    lastPosition: '34.7356N, 127.7412E',
    lastSeen: '5분 전',
    speed: '10.1 kts',
    heading: '315',
    status: 'normal',
    statusLabel: '정상 운항',
    tonnage: '8,100톤',
    length: '135.8m',
    owner: 'SK해운(주)',
  },
];

function getStatusStyle(status: string) {
  switch (status) {
    case 'normal': return 'bg-green-100 text-green-700 border-green-200';
    case 'warning': return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'danger': return 'bg-red-100 text-red-700 border-red-200';
    case 'inactive': return 'bg-gray-100 text-gray-500 border-gray-200';
    default: return 'bg-gray-100 text-gray-500 border-gray-200';
  }
}

function getTypeStyle(type: string) {
  switch (type) {
    case 'fishing': return 'bg-blue-50 text-blue-600';
    case 'cargo': return 'bg-teal-50 text-teal-600';
    case 'tanker': return 'bg-purple-50 text-purple-600';
    default: return 'bg-gray-50 text-gray-600';
  }
}

export default function VesselsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredVessels = vessels.filter((vessel) => {
    const matchesSearch =
      searchQuery === '' ||
      vessel.name.includes(searchQuery) ||
      vessel.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vessel.mmsi.includes(searchQuery) ||
      vessel.registration.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      typeFilter === 'all' || vessel.type === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-4">
            <Link href="/" className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <Eye className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold">Deep Blue Eye</span>
            </Link>
            <div className="h-5 w-px bg-navy-700" />
            <h1 className="text-sm font-medium">선박 조회</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="선박명, MMSI 번호, 등록번호로 검색..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">전체 선종</option>
                <option value="fishing">어선</option>
                <option value="cargo">화물선</option>
                <option value="tanker">유조선</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-500 mt-4">
            총 <span className="font-semibold text-gray-700">{filteredVessels.length}</span>척 검색됨
          </p>
        </div>

        {/* Vessel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVessels.map((vessel) => (
            <div
              key={vessel.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-primary-300 transition-all"
            >
              {/* Card Header */}
              <div className="px-5 py-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Ship className="w-5 h-5 text-navy-600" />
                      <h3 className="text-base font-bold text-gray-900">{vessel.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 ml-7">{vessel.nameEn}</p>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusStyle(vessel.status)}`}>
                    {vessel.statusLabel}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${getTypeStyle(vessel.type)}`}>
                    {vessel.typeLabel}
                  </span>
                  <span className="text-xs text-gray-500">{vessel.tonnage} | {vessel.length}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Anchor className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-400">등록번호:</span>
                    <span className="font-mono">{vessel.registration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Navigation className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-400">MMSI:</span>
                    <span className="font-mono">{vessel.mmsi}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Flag className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-400">국적:</span>
                    <span>{vessel.flag}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="text-gray-400">위치:</span>
                    <span className="font-mono text-xs">{vessel.lastPosition}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{vessel.lastSeen}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {vessel.speed} | 방위 {vessel.heading}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVessels.length === 0 && (
          <div className="text-center py-16">
            <Ship className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">검색 결과가 없습니다</p>
            <p className="text-gray-400 text-sm mt-1">다른 검색어로 다시 시도해 주세요</p>
          </div>
        )}
      </main>
    </div>
  );
}
