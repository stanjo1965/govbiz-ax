'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  Ship,
  User,
  Box,
  ChevronLeft,
  Maximize2,
  Camera,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crosshair,
  Monitor,
  Pause,
  Play,
  Volume2,
  Settings,
} from 'lucide-react';

const drones = [
  { id: 'drone-01', label: '드론 #1 - 인천항', status: 'active' },
  { id: 'drone-02', label: '드론 #2 - 부산항', status: 'active' },
  { id: 'drone-03', label: '드론 #3 - 여수항', status: 'active' },
  { id: 'drone-04', label: '드론 #4 - 속초 근해', status: 'warning' },
  { id: 'drone-05', label: '드론 #5 - 목포항', status: 'active' },
  { id: 'drone-06', label: '드론 #6 - 제주항', status: 'inactive' },
];

const detections = [
  {
    id: 1,
    type: '선박',
    icon: Ship,
    label: '화물선 (대형)',
    confidence: 97.2,
    timestamp: '14:32:15',
    position: { x: '32%', y: '45%' },
    details: 'MMSI: 440123456 | 속력: 12.3kts',
  },
  {
    id: 2,
    type: '선박',
    icon: Ship,
    label: '어선 (소형)',
    confidence: 94.8,
    timestamp: '14:32:18',
    position: { x: '68%', y: '30%' },
    details: '미등록 | 속력: 5.1kts',
  },
  {
    id: 3,
    type: '사람',
    icon: User,
    label: '해상 인원',
    confidence: 88.3,
    timestamp: '14:31:52',
    position: { x: '55%', y: '62%' },
    details: '구명조끼 미착용 의심',
  },
  {
    id: 4,
    type: '부유물',
    icon: Box,
    label: '미확인 부유물',
    confidence: 76.1,
    timestamp: '14:30:44',
    position: { x: '22%', y: '72%' },
    details: '크기: 약 2m x 1m',
  },
  {
    id: 5,
    type: '선박',
    icon: Ship,
    label: '레저보트',
    confidence: 92.5,
    timestamp: '14:30:11',
    position: { x: '80%', y: '55%' },
    details: '속력: 18.7kts | 과속 의심',
  },
];

function getTypeColor(type: string) {
  switch (type) {
    case '선박': return 'text-cyan-400 bg-cyan-900/50 border-cyan-700';
    case '사람': return 'text-red-400 bg-red-900/50 border-red-700';
    case '부유물': return 'text-amber-400 bg-amber-900/50 border-amber-700';
    default: return 'text-gray-400 bg-gray-800 border-gray-600';
  }
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return 'text-green-400';
  if (confidence >= 80) return 'text-amber-400';
  return 'text-red-400';
}

export default function MonitoringPage() {
  const [selectedDrone, setSelectedDrone] = useState(drones[0].id);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDetection, setSelectedDetection] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('전체');

  const activeDrone = drones.find((d) => d.id === selectedDrone);
  const filteredDetections = activeFilter === '전체'
    ? detections
    : detections.filter((d) => d.type === activeFilter);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <header className="bg-navy-950 border-b border-navy-800 h-12 flex items-center px-4 gap-4">
        <Link href="/" className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <Eye className="w-5 h-5 text-cyan-400" />
          <span className="text-sm font-semibold">Deep Blue Eye</span>
        </Link>
        <div className="h-5 w-px bg-navy-700" />
        <h1 className="text-sm font-medium text-white">실시간 모니터링</h1>
        <div className="flex-1" />

        {/* Drone Selector */}
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-navy-400" />
          <select
            value={selectedDrone}
            onChange={(e) => setSelectedDrone(e.target.value)}
            className="bg-navy-800 border border-navy-600 text-sm text-white rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            {drones.map((drone) => (
              <option key={drone.id} value={drone.id}>
                {drone.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="flex h-[calc(100vh-48px)]">
        {/* Main Video Feed */}
        <div className="flex-1 flex flex-col">
          {/* Video Area */}
          <div className="flex-1 relative bg-gradient-to-br from-navy-950 via-gray-900 to-navy-900">
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-20 h-20 text-navy-700 mx-auto mb-3" />
                <p className="text-navy-500 text-sm">실시간 영상 피드</p>
                <p className="text-navy-600 text-xs mt-1">{activeDrone?.label}</p>
              </div>
            </div>

            {/* AI Detection Overlay Boxes */}
            {detections.map((det) => (
              <button
                key={det.id}
                onClick={() => setSelectedDetection(selectedDetection === det.id ? null : det.id)}
                className={`absolute border-2 rounded-sm transition-all ${
                  selectedDetection === det.id
                    ? 'border-cyan-400 bg-cyan-400/10'
                    : det.type === '사람'
                      ? 'border-red-500/60 bg-red-500/5 hover:bg-red-500/10'
                      : det.type === '부유물'
                        ? 'border-amber-500/60 bg-amber-500/5 hover:bg-amber-500/10'
                        : 'border-cyan-500/60 bg-cyan-500/5 hover:bg-cyan-500/10'
                }`}
                style={{
                  left: det.position.x,
                  top: det.position.y,
                  width: det.type === '선박' ? '120px' : det.type === '사람' ? '50px' : '70px',
                  height: det.type === '선박' ? '60px' : det.type === '사람' ? '50px' : '40px',
                }}
              >
                <span className="absolute -top-5 left-0 text-xs font-mono whitespace-nowrap px-1 bg-black/60 rounded">
                  {det.label} ({det.confidence.toFixed(1)}%)
                </span>
              </button>
            ))}

            {/* Feed Info Overlay */}
            <div className="absolute top-4 left-4 space-y-2">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="font-medium text-red-400">LIVE</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-300">{activeDrone?.label}</span>
                </div>
                <div className="text-gray-400 font-mono">
                  2026-02-26 14:32:21 KST
                </div>
              </div>
            </div>

            {/* Detection Count */}
            <div className="absolute top-4 right-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs">
                <span className="text-gray-400">AI 탐지: </span>
                <span className="text-cyan-400 font-bold">{detections.length}</span>
                <span className="text-gray-400"> 객체</span>
              </div>
            </div>

            {/* Coordinates */}
            <div className="absolute bottom-16 left-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-mono text-gray-400">
                <Crosshair className="w-3 h-3 inline mr-1" />
                37.4563N, 126.7052E | Alt: 150m | Heading: 045
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
            <div className="flex-1 h-1 bg-gray-700 rounded-full">
              <div className="w-full h-full bg-cyan-500 rounded-full" />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                <ZoomIn className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                <ZoomOut className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                <RotateCcw className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                <Volume2 className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Detection Sidebar */}
        <aside className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-white">AI 탐지 결과</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              총 {detections.length}개 객체 탐지
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="px-4 py-2 border-b border-gray-700 flex gap-2">
            {['전체', '선박', '사람', '부유물'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                  activeFilter === filter
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Detection List */}
          <div className="flex-1 overflow-y-auto">
            {filteredDetections.map((det) => (
              <button
                key={det.id}
                onClick={() => setSelectedDetection(selectedDetection === det.id ? null : det.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-700/50 hover:bg-gray-750 transition-colors ${
                  selectedDetection === det.id ? 'bg-gray-700/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${getTypeColor(det.type)}`}>
                    <det.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{det.label}</span>
                      <span className={`text-xs font-mono ${getConfidenceColor(det.confidence)}`}>
                        {det.confidence.toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{det.details}</p>
                    <p className="text-xs text-gray-500 mt-0.5 font-mono">{det.timestamp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Summary */}
          <div className="px-4 py-3 border-t border-gray-700 bg-gray-850">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-700/50 rounded-lg p-2">
                <p className="text-lg font-bold text-cyan-400">3</p>
                <p className="text-xs text-gray-400">선박</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-2">
                <p className="text-lg font-bold text-red-400">1</p>
                <p className="text-xs text-gray-400">사람</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-2">
                <p className="text-lg font-bold text-amber-400">1</p>
                <p className="text-xs text-gray-400">부유물</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
