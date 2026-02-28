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
  X,
  CheckCircle,
  Loader2,
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

  // Slider states
  const [terrainScale, setTerrainScale] = useState(1);
  const [buildingOpacity, setBuildingOpacity] = useState(100);
  const [sunHour, setSunHour] = useState(12);

  // Toolbar toast
  const [toolbarToast, setToolbarToast] = useState('');
  const showToolbarToast = (msg: string) => {
    setToolbarToast(msg);
    setTimeout(() => setToolbarToast(''), 2000);
  };

  // Simulation modal
  const [showSimModal, setShowSimModal] = useState(false);
  const [simRunning, setSimRunning] = useState(false);
  const [simDone, setSimDone] = useState(false);

  const handleRunSimulation = () => {
    setSimRunning(true);
    setSimDone(false);
    setTimeout(() => {
      setSimRunning(false);
      setSimDone(true);
    }, 2500);
  };

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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-400">지형 과장</label>
                  <span className="text-xs text-cyan-400 font-mono">{terrainScale}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={terrainScale}
                  onChange={(e) => setTerrainScale(Number(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-gray-400">건물 투명도</label>
                  <span className="text-xs text-cyan-400 font-mono">{buildingOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={buildingOpacity}
                  onChange={(e) => setBuildingOpacity(Number(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">일조 시간</label>
                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <input
                    type="range"
                    min="6"
                    max="18"
                    value={sunHour}
                    onChange={(e) => setSunHour(Number(e.target.value))}
                    className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-xs text-cyan-400 font-mono w-8 text-right">{sunHour}시</span>
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
              <p className="text-sm text-gray-500 mb-2">
                CesiumJS / Three.js 기반 3D 지형 및 건물 뷰어가 여기에 표시됩니다
              </p>
              <p className="text-xs text-gray-600 mb-4">
                지형 과장: {terrainScale}x · 건물 투명도: {buildingOpacity}% · 일조: {sunHour}시
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
            <button
              onClick={() => showToolbarToast('확대되었습니다.')}
              className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              title="확대"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToolbarToast('축소되었습니다.')}
              className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              title="축소"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToolbarToast('시점을 회전했습니다.')}
              className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              title="회전"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToolbarToast('전체 화면으로 전환했습니다.')}
              className="w-10 h-10 bg-gray-800/90 border border-gray-600 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              title="전체 화면"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Toolbar Toast */}
          {toolbarToast && (
            <div className="absolute top-4 right-16 bg-gray-900/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
              {toolbarToast}
            </div>
          )}

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
                  <button
                    onClick={() => { setShowSimModal(true); setSimDone(false); setSimRunning(false); }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-cyan-600 text-white text-xs font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                  >
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

      {/* Simulation Modal */}
      {showSimModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white">3D 시뮬레이션</h2>
              </div>
              {!simRunning && (
                <button onClick={() => setShowSimModal(false)} className="p-1 hover:bg-gray-700 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-xl text-sm">
                <p className="text-gray-300 font-medium mb-1">{selectedParcel.address}</p>
                <p className="text-gray-400 text-xs">
                  용도지역: {selectedParcel.zoning} · 면적: {selectedParcel.area} m²
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-gray-700 rounded-lg text-center">
                  <p className="text-gray-400 mb-1">지형 과장</p>
                  <p className="text-cyan-400 font-bold">{terrainScale}x</p>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg text-center">
                  <p className="text-gray-400 mb-1">건물 투명도</p>
                  <p className="text-cyan-400 font-bold">{buildingOpacity}%</p>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg text-center">
                  <p className="text-gray-400 mb-1">일조 시간</p>
                  <p className="text-cyan-400 font-bold">{sunHour}시</p>
                </div>
              </div>

              {simDone && (
                <div className="p-4 bg-green-900/30 border border-green-700 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <p className="text-sm font-semibold text-green-300">시뮬레이션 완료</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-400">건폐율 충족</p>
                      <p className="text-green-400 font-medium">52.3% (기준 60% 이하)</p>
                    </div>
                    <div>
                      <p className="text-gray-400">용적률 충족</p>
                      <p className="text-green-400 font-medium">178.5% (기준 200% 이하)</p>
                    </div>
                    <div>
                      <p className="text-gray-400">일조 시간</p>
                      <p className="text-green-400 font-medium">동지 기준 4.2시간</p>
                    </div>
                    <div>
                      <p className="text-gray-400">이격거리</p>
                      <p className="text-green-400 font-medium">기준 적합</p>
                    </div>
                  </div>
                </div>
              )}

              {simRunning && (
                <div className="flex items-center justify-center gap-3 py-4">
                  <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                  <p className="text-sm text-cyan-300">3D 시뮬레이션 분석 중...</p>
                </div>
              )}
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-700">
              <button
                onClick={() => setShowSimModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-600 rounded-lg text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              >
                닫기
              </button>
              <button
                onClick={handleRunSimulation}
                disabled={simRunning}
                className="flex-1 px-4 py-2.5 bg-cyan-600 text-white rounded-lg text-sm font-semibold hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
              >
                {simRunning ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />분석 중...</>
                ) : (
                  <><Play className="w-4 h-4" />{simDone ? '재실행' : '시뮬레이션 실행'}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
