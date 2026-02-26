'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Landmark,
  MapPin,
  Globe,
  Clock,
  MessageCircle,
  Filter,
  Map,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';

const typeFilters = [
  { id: 'all', label: '전체' },
  { id: 'palace', label: '궁궐' },
  { id: 'temple', label: '사찰' },
  { id: 'fortress', label: '성곽' },
  { id: 'tower', label: '탑' },
  { id: 'academy', label: '서원' },
  { id: 'village', label: '전통마을' },
  { id: 'nature', label: '자연유산' },
];

const regionFilters = [
  { id: 'all', label: '전국' },
  { id: 'seoul', label: '서울' },
  { id: 'gyeonggi', label: '경기' },
  { id: 'gangwon', label: '강원' },
  { id: 'chungnam', label: '충남' },
  { id: 'gyeongbuk', label: '경북' },
  { id: 'gyeongnam', label: '경남' },
  { id: 'jeonnam', label: '전남' },
  { id: 'jeju', label: '제주' },
];

const heritageMarkers = [
  {
    id: 1,
    name: '경복궁',
    type: 'palace',
    region: 'seoul',
    lat: 37.5796,
    lng: 126.977,
    unesco: false,
    era: '조선시대 (1395)',
    address: '서울 종로구 사직로 161',
  },
  {
    id: 2,
    name: '창덕궁',
    type: 'palace',
    region: 'seoul',
    lat: 37.5794,
    lng: 126.991,
    unesco: true,
    era: '조선시대 (1405)',
    address: '서울 종로구 율곡로 99',
  },
  {
    id: 3,
    name: '종묘',
    type: 'palace',
    region: 'seoul',
    lat: 37.5743,
    lng: 126.9941,
    unesco: true,
    era: '조선시대 (1394)',
    address: '서울 종로구 종로 157',
  },
  {
    id: 4,
    name: '수원화성',
    type: 'fortress',
    region: 'gyeonggi',
    lat: 37.2879,
    lng: 127.0076,
    unesco: true,
    era: '조선시대 (1796)',
    address: '경기도 수원시 팔달구 정조로 910',
  },
  {
    id: 5,
    name: '불국사',
    type: 'temple',
    region: 'gyeongbuk',
    lat: 35.7904,
    lng: 129.332,
    unesco: true,
    era: '통일신라 (528)',
    address: '경북 경주시 불국로 385',
  },
  {
    id: 6,
    name: '석굴암',
    type: 'temple',
    region: 'gyeongbuk',
    lat: 35.7956,
    lng: 129.349,
    unesco: true,
    era: '통일신라 (751)',
    address: '경북 경주시 석굴암로 873-243',
  },
  {
    id: 7,
    name: '해인사 장경판전',
    type: 'temple',
    region: 'gyeongnam',
    lat: 35.802,
    lng: 128.0988,
    unesco: true,
    era: '고려시대 (1398)',
    address: '경남 합천군 가야면 해인사길 122',
  },
  {
    id: 8,
    name: '하회마을',
    type: 'village',
    region: 'gyeongbuk',
    lat: 36.5397,
    lng: 128.5185,
    unesco: true,
    era: '고려시대~',
    address: '경북 안동시 풍천면 하회종가길 40',
  },
  {
    id: 9,
    name: '도산서원',
    type: 'academy',
    region: 'gyeongbuk',
    lat: 36.7289,
    lng: 128.833,
    unesco: true,
    era: '조선시대 (1574)',
    address: '경북 안동시 도산면 도산서원길 154',
  },
  {
    id: 10,
    name: '성산일출봉',
    type: 'nature',
    region: 'jeju',
    lat: 33.4589,
    lng: 126.9425,
    unesco: true,
    era: '약 5,000년 전',
    address: '제주 서귀포시 성산읍 성산리',
  },
  {
    id: 11,
    name: '공산성',
    type: 'fortress',
    region: 'chungnam',
    lat: 36.4622,
    lng: 127.1258,
    unesco: true,
    era: '백제시대',
    address: '충남 공주시 웅진로 280',
  },
  {
    id: 12,
    name: '남한산성',
    type: 'fortress',
    region: 'gyeonggi',
    lat: 37.4796,
    lng: 127.1835,
    unesco: true,
    era: '조선시대 (1624)',
    address: '경기도 광주시 남한산성면',
  },
];

export default function MapPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const filteredMarkers = useMemo(() => {
    return heritageMarkers.filter((marker) => {
      const matchesType = selectedType === 'all' || marker.type === selectedType;
      const matchesRegion =
        selectedRegion === 'all' || marker.region === selectedRegion;
      const matchesSearch =
        searchQuery === '' ||
        marker.name.includes(searchQuery) ||
        marker.address.includes(searchQuery);
      return matchesType && matchesRegion && matchesSearch;
    });
  }, [selectedType, selectedRegion, searchQuery]);

  const selectedItem = selectedMarker
    ? heritageMarkers.find((m) => m.id === selectedMarker)
    : null;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-50">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Map className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base font-bold text-gray-900">국가유산 지도</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/heritage"
                className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <Landmark className="w-4 h-4" />
                목록 보기
              </Link>
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                AI 해설
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={`bg-white border-r border-gray-200 flex flex-col transition-all ${
            sidebarExpanded ? 'w-96' : 'w-12'
          }`}
        >
          {sidebarExpanded ? (
            <>
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-900">유산 목록</h2>
                  <button
                    onClick={() => setSidebarExpanded(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <ChevronDown className="w-4 h-4 rotate-90" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="유산 검색"
                    className="w-full pl-8 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Type Filter */}
                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1.5">
                    <Layers className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500">유형</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {typeFilters.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedType(f.id)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          selectedType === f.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Region Filter */}
                <div>
                  <div className="flex items-center gap-1 mb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-500">지역</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {regionFilters.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSelectedRegion(f.id)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          selectedRegion === f.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Marker List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-2 py-1">
                    {filteredMarkers.length}개 유산 표시
                  </p>
                  {filteredMarkers.map((marker) => (
                    <button
                      key={marker.id}
                      onClick={() => setSelectedMarker(marker.id)}
                      className={`w-full text-left p-3 rounded-lg mb-1 transition-colors ${
                        selectedMarker === marker.id
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {marker.name}
                            </h3>
                            {marker.unesco && (
                              <Globe className="w-3 h-3 text-blue-600" />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {marker.address}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                            <span>{marker.era}</span>
                          </div>
                        </div>
                        <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => setSidebarExpanded(true)}
              className="p-3 text-gray-500 hover:text-gray-700"
            >
              <ChevronUp className="w-5 h-5 -rotate-90" />
            </button>
          )}
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Map Placeholder */}
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center relative">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map Placeholder Content */}
            <div className="text-center z-10">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Map className="w-10 h-10 text-primary-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">
                지도 영역
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                Naver Maps API 연동 예정
              </p>
              <p className="text-xs text-gray-400">
                좌측 목록에서 유산을 선택하면 위치가 표시됩니다
              </p>
            </div>

            {/* Simulated Markers */}
            {filteredMarkers.map((marker) => {
              const x = ((marker.lng - 126) / 5) * 100;
              const y = ((38 - marker.lat) / 6) * 100;
              return (
                <button
                  key={marker.id}
                  onClick={() => setSelectedMarker(marker.id)}
                  className={`absolute transition-all ${
                    selectedMarker === marker.id
                      ? 'z-20 scale-125'
                      : 'z-10 hover:scale-110'
                  }`}
                  style={{
                    left: `${Math.max(5, Math.min(95, x))}%`,
                    top: `${Math.max(5, Math.min(95, y))}%`,
                  }}
                  title={marker.name}
                >
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full shadow-md text-xs font-medium whitespace-nowrap ${
                      selectedMarker === marker.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    <MapPin className="w-3 h-3" />
                    {marker.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Item Detail Panel */}
          {selectedItem && (
            <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-30">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-gray-900">
                      {selectedItem.name}
                    </h3>
                    {selectedItem.unesco && (
                      <span className="inline-flex items-center gap-0.5 bg-blue-50 text-blue-700 text-xs font-medium px-1.5 py-0.5 rounded">
                        <Globe className="w-3 h-3" />
                        UNESCO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedItem.address}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  x
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {selectedItem.era}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedItem.lat.toFixed(4)}, {selectedItem.lng.toFixed(4)}
                </span>
              </div>
              <Link
                href={`/chat?heritage=${encodeURIComponent(selectedItem.name)}`}
                className="w-full inline-flex items-center justify-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                AI 해설 듣기
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
