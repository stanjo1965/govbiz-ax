'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Search,
  Layers,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  TreePine,
  Mountain,
  Satellite,
  Map,
  ZoomIn,
  ZoomOut,
  Locate,
  MessageSquare,
  X,
  ChevronRight,
  FileCheck,
  Sparkles,
} from 'lucide-react';

const mapLayers = [
  { id: 'basemap', label: '배경지도', icon: Map, defaultOn: true },
  { id: 'satellite', label: '위성영상', icon: Satellite, defaultOn: false },
  { id: 'cadastral', label: '지적도', icon: MapPin, defaultOn: true },
  { id: 'zoning', label: '용도지역', icon: Layers, defaultOn: false },
  { id: 'building', label: '건축물', icon: Building2, defaultOn: false },
  { id: 'forest', label: '산림', icon: TreePine, defaultOn: false },
  { id: 'terrain', label: '지형(등고선)', icon: Mountain, defaultOn: false },
];

const samplePopup = {
  address: '세종특별자치시 도담동 100',
  landCategory: '대',
  area: 330.5,
  zoning: '제1종일반주거지역',
  officialPrice: 1250000,
};

const nlExamples = [
  '세종시 도담동 대지 보여줘',
  '용인시 수지구 주거지역 검색',
  '경기도 화성시 농지 필지 표시',
  '서울 강남구 상업지역 용도지역 켜줘',
];

export default function MapPage() {
  const [layers, setLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(mapLayers.map((l) => [l.id, l.defaultOn]))
  );
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(true);
  const [showNlHint, setShowNlHint] = useState(false);

  const toggleLayer = (id: string) => {
    setLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearch = () => {
    // In production, this would send the query to AI for natural language parsing
    setShowPopup(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-20">
        <div className="px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-primary-600" />
                <h1 className="text-sm font-semibold text-gray-900">GIS 지도</h1>
              </div>
            </div>

            {/* Search Bar with AI hint */}
            <div className="flex-1 max-w-xl mx-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowNlHint(true)}
                  onBlur={() => setTimeout(() => setShowNlHint(false), 200)}
                  placeholder='주소 검색 또는 AI 명령 (예: "세종시 도담동 대지 보여줘")'
                  className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 text-xs font-medium rounded">
                    <Sparkles className="w-3 h-3" />
                    AI
                  </span>
                </div>
              </div>

              {/* NL Examples Dropdown */}
              {showNlHint && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 p-3">
                  <p className="text-xs text-gray-400 mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    자연어로 지도를 제어할 수 있습니다
                  </p>
                  <div className="space-y-1">
                    {nlExamples.map((example) => (
                      <button
                        key={example}
                        onClick={() => {
                          setSearchQuery(example);
                          setShowNlHint(false);
                          handleSearch();
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-md transition-colors"
                      >
                        &quot;{example}&quot;
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Layers className="w-3.5 h-3.5" />
                레이어
              </button>
              <Link
                href="/digital-twin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
              >
                3D 보기
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Layer Controls Sidebar */}
        {showSidebar && (
          <aside className="w-56 bg-white border-r border-gray-200 overflow-y-auto shrink-0 z-10">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  레이어 제어
                </h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1">
                {mapLayers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      layers[layer.id]
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    {layers[layer.id] ? (
                      <Eye className="w-4 h-4 shrink-0" />
                    ) : (
                      <EyeOff className="w-4 h-4 shrink-0" />
                    )}
                    <layer.icon className="w-4 h-4 shrink-0" />
                    <span className="text-left">{layer.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                범례
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-3 bg-yellow-200 border border-yellow-400 rounded-sm" />
                  <span className="text-xs text-gray-600">주거지역</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-3 bg-red-200 border border-red-400 rounded-sm" />
                  <span className="text-xs text-gray-600">상업지역</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-3 bg-blue-200 border border-blue-400 rounded-sm" />
                  <span className="text-xs text-gray-600">공업지역</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-3 bg-green-200 border border-green-400 rounded-sm" />
                  <span className="text-xs text-gray-600">녹지지역</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-3 bg-gray-200 border border-gray-400 rounded-sm" />
                  <span className="text-xs text-gray-600">관리지역</span>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                <Map className="w-10 h-10 text-primary-400" />
              </div>
              <p className="text-lg font-medium text-gray-500 mb-2">2D GIS 지도</p>
              <p className="text-sm text-gray-400 mb-4">
                OpenLayers 기반 GIS 지도가 여기에 표시됩니다
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-white rounded shadow-sm">드래그: 이동</span>
                <span className="px-2 py-1 bg-white rounded shadow-sm">스크롤: 줌</span>
                <span className="px-2 py-1 bg-white rounded shadow-sm">클릭: 필지 정보</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors">
              <Locate className="w-4 h-4" />
            </button>
          </div>

          {/* Parcel Info Popup */}
          {showPopup && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-96 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-10">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary-500" />
                  <span className="text-sm font-semibold text-gray-900">필지 정보</span>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-base font-semibold text-gray-900 mb-3">{samplePopup.address}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">지목</p>
                    <p className="text-sm font-medium text-gray-700">{samplePopup.landCategory}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">면적</p>
                    <p className="text-sm font-medium text-gray-700">{samplePopup.area.toLocaleString()} m2</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">용도지역</p>
                    <p className="text-sm font-medium text-gray-700">{samplePopup.zoning}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">공시지가</p>
                    <p className="text-sm font-medium text-gray-700">{samplePopup.officialPrice.toLocaleString()}원/m2</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/diagnosis"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <FileCheck className="w-4 h-4" />
                    사전진단
                  </Link>
                  <Link
                    href="/digital-twin"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    3D 보기
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* AI Chat Shortcut */}
          <Link
            href="/chat"
            className="absolute bottom-4 right-4 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-600 transition-colors z-10"
            title="AI 인허가 상담"
          >
            <MessageSquare className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
