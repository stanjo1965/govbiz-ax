'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  ChevronLeft,
  Layers,
  Map as MapIcon,
  Ship,
  Shield,
  Cloud,
  ChevronRight,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Compass,
  Navigation,
  Anchor,
  Info,
  X,
  Radio,
  AlertTriangle,
} from 'lucide-react';

interface LayerConfig {
  id: string;
  label: string;
  icon: typeof MapIcon;
  enabled: boolean;
  color: string;
}

interface AreaInfo {
  name: string;
  type: string;
  coordinates: string;
  status: string;
  vessels: number;
  lastEvent: string;
}

const initialLayers: LayerConfig[] = [
  { id: 'chart', label: '해도 (전자해도)', icon: MapIcon, enabled: true, color: 'text-blue-500' },
  { id: 'ais', label: '선박 AIS', icon: Ship, enabled: true, color: 'text-cyan-500' },
  { id: 'surveillance', label: '감시구역', icon: Shield, enabled: true, color: 'text-red-500' },
  { id: 'weather', label: '기상정보', icon: Cloud, enabled: false, color: 'text-amber-500' },
  { id: 'drone', label: '드론 비행경로', icon: Radio, enabled: true, color: 'text-green-500' },
  { id: 'alerts', label: '사고/경보', icon: AlertTriangle, enabled: false, color: 'text-orange-500' },
];

const sampleAreas: AreaInfo[] = [
  {
    name: '인천항 감시구역 A',
    type: '항만 감시구역',
    coordinates: '37.4563N, 126.7052E',
    status: '감시 중',
    vessels: 12,
    lastEvent: '불법조업 의심 (14:32)',
  },
  {
    name: '부산항 진입수로',
    type: '통항 관제구역',
    coordinates: '35.0956N, 129.0312E',
    status: '정상',
    vessels: 24,
    lastEvent: '과속 선박 감지 (10:22)',
  },
  {
    name: '여수 광양만 특별구역',
    type: '환경감시구역',
    coordinates: '34.7356N, 127.7412E',
    status: '경보 발령',
    vessels: 8,
    lastEvent: '유류유출 의심 (11:48)',
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case '감시 중': return 'text-cyan-600 bg-cyan-50';
    case '정상': return 'text-green-600 bg-green-50';
    case '경보 발령': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export default function GISMapPage() {
  const [layers, setLayers] = useState(initialLayers);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedArea, setSelectedArea] = useState<AreaInfo | null>(null);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, enabled: !layer.enabled } : layer
      )
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Bar */}
      <header className="bg-navy-950 border-b border-navy-800 h-12 flex items-center px-4 gap-4 shrink-0 z-10">
        <Link href="/" className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <Eye className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-semibold">Deep Blue Eye</span>
        </Link>
        <div className="h-5 w-px bg-navy-700" />
        <h1 className="text-sm font-medium text-white">해역 지도 (GIS)</h1>
        <div className="flex-1" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-1.5 text-xs text-navy-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-navy-800 transition-colors"
        >
          <Layers className="w-4 h-4" />
          레이어
        </button>
      </header>

      <div className="flex-1 flex relative overflow-hidden">
        {/* Map Placeholder */}
        <div className="flex-1 relative bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#0a1628]">
          {/* Grid lines to simulate map */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4A90D9" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Map Placeholder Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapIcon className="w-24 h-24 text-navy-700 mx-auto mb-4" />
              <p className="text-navy-400 text-lg font-medium mb-1">해역 지도</p>
              <p className="text-navy-600 text-sm">OpenLayers / CesiumJS 연동 영역</p>
              <p className="text-navy-700 text-xs mt-2">전자해도(ENC) + AIS 데이터 오버레이</p>
            </div>
          </div>

          {/* Simulated Vessel Markers */}
          <div className="absolute top-[30%] left-[25%] flex flex-col items-center group cursor-pointer">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Ship className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-cyan-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">인천스타</span>
          </div>
          <div className="absolute top-[55%] left-[60%] flex flex-col items-center group cursor-pointer">
            <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Ship className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-cyan-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">부산드래곤</span>
          </div>
          <div className="absolute top-[40%] left-[75%] flex flex-col items-center group cursor-pointer">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Ship className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-amber-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">목포진주 (경고)</span>
          </div>
          <div className="absolute top-[65%] left-[40%] flex flex-col items-center group cursor-pointer">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
              <Ship className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-red-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">제주바다 (위험)</span>
          </div>

          {/* Simulated Drone Markers */}
          <div className="absolute top-[20%] left-[20%] flex flex-col items-center">
            <div className="w-5 h-5 bg-green-500 rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Radio className="w-3 h-3 text-white -rotate-45" />
            </div>
            <span className="text-xs text-green-400 mt-1">드론#1</span>
          </div>
          <div className="absolute top-[50%] left-[55%] flex flex-col items-center">
            <div className="w-5 h-5 bg-green-500 rounded-sm rotate-45 flex items-center justify-center shadow-lg shadow-green-500/30">
              <Radio className="w-3 h-3 text-white -rotate-45" />
            </div>
            <span className="text-xs text-green-400 mt-1">드론#2</span>
          </div>

          {/* Simulated Surveillance Zone */}
          <div className="absolute top-[25%] left-[15%] w-48 h-32 border-2 border-red-500/30 rounded-lg bg-red-500/5 flex items-start p-2">
            <span className="text-xs text-red-400/60">감시구역 A</span>
          </div>

          {/* Map Controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
              <ZoomIn className="w-5 h-5 text-gray-300" />
            </button>
            <button className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
              <ZoomOut className="w-5 h-5 text-gray-300" />
            </button>
            <button className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
              <Compass className="w-5 h-5 text-gray-300" />
            </button>
            <button className="w-10 h-10 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
              <Maximize2 className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          {/* Coordinates Bar */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-mono text-gray-400 flex items-center gap-3">
            <span><Compass className="w-3 h-3 inline mr-1" />36.0000N, 127.5000E</span>
            <span className="text-gray-600">|</span>
            <span>Zoom: 8</span>
            <span className="text-gray-600">|</span>
            <span>범위: 한반도 전역</span>
          </div>
        </div>

        {/* Layer Controls Sidebar */}
        {sidebarOpen && (
          <aside className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col shrink-0">
            {/* Layer Controls */}
            <div className="px-4 py-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  레이어 제어
                </h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {/* Layer Toggles */}
              <div className="px-4 py-3 space-y-1">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        layer.enabled
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-gray-500 bg-transparent'
                      }`}
                    >
                      {layer.enabled && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <layer.icon className={`w-4 h-4 ${layer.enabled ? layer.color : 'text-gray-500'}`} />
                    <span className={`text-sm ${layer.enabled ? 'text-white' : 'text-gray-500'}`}>
                      {layer.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="px-4 py-2">
                <div className="h-px bg-gray-700" />
              </div>

              {/* Area Info Panel */}
              <div className="px-4 py-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  <Info className="w-3.5 h-3.5 inline mr-1" />감시구역 정보
                </h3>
                <div className="space-y-3">
                  {sampleAreas.map((area, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedArea(selectedArea?.name === area.name ? null : area)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedArea?.name === area.name
                          ? 'bg-gray-700 border-cyan-600'
                          : 'bg-gray-750 border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-white">{area.name}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(area.status)}`}>
                          {area.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <p>{area.type}</p>
                        <p className="font-mono">{area.coordinates}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="flex items-center gap-1">
                            <Ship className="w-3 h-3" />선박 {area.vessels}척
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Area Detail */}
            {selectedArea && (
              <div className="px-4 py-3 border-t border-gray-700 bg-gray-750">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">{selectedArea.name}</h4>
                  <button
                    onClick={() => setSelectedArea(null)}
                    className="p-0.5 hover:bg-gray-600 rounded transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>좌표: {selectedArea.coordinates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Ship className="w-3.5 h-3.5 shrink-0" />
                    <span>관내 선박: {selectedArea.vessels}척</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Anchor className="w-3.5 h-3.5 shrink-0" />
                    <span>구역 유형: {selectedArea.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>최근 이벤트: {selectedArea.lastEvent}</span>
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
