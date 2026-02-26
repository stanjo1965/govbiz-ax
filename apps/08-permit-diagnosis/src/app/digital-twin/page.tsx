'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Globe,
  Layers,
  Eye,
  EyeOff,
  MapPin,
  Building2,
  Mountain,
  TreePine,
  Satellite,
  Play,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Box,
  Sun,
  ChevronRight,
  Info,
} from 'lucide-react';

const layerOptions = [
  { id: 'satellite', label: '위성영상', icon: Satellite, defaultOn: true },
  { id: 'cadastral', label: '지적도', icon: MapPin, defaultOn: true },
  { id: 'zoning', label: '용도지역', icon: Layers, defaultOn: false },
  { id: 'building', label: '건축물', icon: Building2, defaultOn: true },
  { id: 'terrain', label: '지형', icon: Mountain, defaultOn: true },
  { id: 'vegetation', label: '식생', icon: TreePine, defaultOn: false },
];

const selectedParcel = {
  address: '세종특별자치시 도담동 100',
  area: 330.5,
  zoning: '제1종일반주거지역',
  elevation: '52m',
  slope: '3.2%',
  aspect: '남동향',
  nearestRoad: '도담로 (12m)',
  buildingCoverage: '60% 이하',
  floorAreaRatio: '200% 이하',
};

export default function DigitalTwinPage() {
  const [layers, setLayers] = useState<Record<string, boolean>>(
    Object.fromEntries(layerOptions.map((l) => [l.id, l.defaultOn]))
  );
  const [showPanel, setShowPanel] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'top'>('3d');

  const toggleLayer = (id: string) => {
    setLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 z-10">
        <div className="px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                <h1 className="text-sm font-semibold text-white">디지털트윈 탐색기</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-800 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewMode === '3d' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  3D
                </button>
                <button
                  onClick={() => setViewMode('top')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    viewMode === 'top' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  평면
                </button>
              </div>
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                사전진단
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Layer Controls Sidebar */}
        <aside className="w-56 bg-gray-800 border-r border-gray-700 overflow-y-auto shrink-0">
          <div className="p-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              레이어
            </h2>
            <div className="space-y-1">
              {layerOptions.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    layers[layer.id]
                      ? 'bg-cyan-900/30 text-cyan-300'
                      : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
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

          {/* Terrain/Building Controls */}
          <div className="p-4 border-t border-gray-700">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              지형/건물
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">지형 과장</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  defaultValue="1"
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">건물 투명도</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="100"
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">일조 시간</label>
                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <input
                    type="range"
                    min="6"
                    max="18"
                    defaultValue="12"
                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 w-8 text-right">12시</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* 3D Viewer Area */}
        <div className="flex-1 relative">
          {/* 3D Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Box className="w-12 h-12 text-cyan-500" />
              </div>
              <p className="text-lg font-medium text-gray-300 mb-2">3D 디지털트윈 뷰어</p>
              <p className="text-sm text-gray-500 mb-4">
                CesiumJS / Three.js 기반 3D 지형 및 건물 뷰어가 여기에 표시됩니다
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                <span className="px-2 py-1 bg-gray-800 rounded">마우스 드래그: 회전</span>
                <span className="px-2 py-1 bg-gray-800 rounded">스크롤: 줌</span>
                <span className="px-2 py-1 bg-gray-800 rounded">클릭: 필지 선택</span>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="absolute top-4 right-4 flex flex-col gap-1">
            <button className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              <ZoomOut className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Selected Parcel 3D Info Panel */}
          {showPanel && (
            <div className="absolute bottom-4 left-4 w-80 bg-gray-800/95 backdrop-blur border border-gray-600 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-semibold text-white">선택 필지</span>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-gray-400 hover:text-white text-xs"
                >
                  닫기
                </button>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-400">소재지</p>
                  <p className="text-sm font-medium text-white">{selectedParcel.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400">면적</p>
                    <p className="text-sm text-gray-200">{selectedParcel.area} m2</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">용도지역</p>
                    <p className="text-sm text-gray-200">{selectedParcel.zoning}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">표고</p>
                    <p className="text-sm text-gray-200">{selectedParcel.elevation}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">경사도</p>
                    <p className="text-sm text-gray-200">{selectedParcel.slope}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">향</p>
                    <p className="text-sm text-gray-200">{selectedParcel.aspect}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">접도</p>
                    <p className="text-sm text-gray-200">{selectedParcel.nearestRoad}</p>
                  </div>
                </div>
                <div className="pt-2 flex gap-2">
                  <Link
                    href="/diagnosis"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    사전진단
                  </Link>
                  <button className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-cyan-600 text-white text-xs font-medium rounded-lg hover:bg-cyan-700 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                    시뮬레이션 실행
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Show panel button when hidden */}
          {!showPanel && (
            <button
              onClick={() => setShowPanel(true)}
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-800/90 border border-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Info className="w-4 h-4" />
              필지 정보
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
