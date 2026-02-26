'use client';

import { useState } from 'react';
import { MapPin, Navigation, Search, List, Map as MapIcon } from 'lucide-react';
import Link from 'next/link';

interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  cheapItems: string[];
  avgSavings: number;
}

const SAMPLE_STORES: Store[] = [
  { id: '1', name: '농협하나로마트 세종점', address: '세종특별자치시 어진동 123', distance: '0.5km', cheapItems: ['배추', '양파', '달걀'], avgSavings: 15 },
  { id: '2', name: '이마트 에브리데이 세종점', address: '세종특별자치시 보람동 456', distance: '1.2km', cheapItems: ['쌀', '사과', '돼지고기'], avgSavings: 12 },
  { id: '3', name: '롯데슈퍼 세종점', address: '세종특별자치시 나성동 789', distance: '1.8km', cheapItems: ['우유', '라면', '계란'], avgSavings: 8 },
  { id: '4', name: '세종전통시장', address: '세종특별자치시 조치원읍 시장길 10', distance: '3.2km', cheapItems: ['고추', '마늘', '생선'], avgSavings: 22 },
];

export default function PriceMapPage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← 홈
          </Link>
          <h1 className="text-lg font-bold text-gray-900">가격 지도</h1>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
            >
              <MapIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="주소 또는 품목명 검색"
            className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-primary-500">
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 relative">
        {viewMode === 'map' ? (
          /* Map Placeholder */
          <div className="h-full bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">지도 영역</p>
              <p className="text-gray-400 text-xs mt-1">네이버 지도 API 연동 예정</p>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="p-4 space-y-3">
            {SAMPLE_STORES.map((store) => (
              <div
                key={store.id}
                className="bg-white rounded-lg border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{store.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{store.address}</p>
                  </div>
                  <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                    {store.distance}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex gap-1.5 flex-wrap">
                    {store.cheapItems.map((item) => (
                      <span
                        key={item}
                        className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded"
                      >
                        {item} 최저가
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-blue-600 font-medium">
                    평균 {store.avgSavings}% 절약
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
