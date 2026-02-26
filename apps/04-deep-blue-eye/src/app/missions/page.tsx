'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Eye,
  ChevronLeft,
  Plus,
  Clock,
  Radio,
  Users,
  MapPin,
  Target,
  Shield,
  Search as SearchIcon,
  LifeBuoy,
  Navigation,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';

interface Mission {
  id: number;
  name: string;
  type: 'patrol' | 'search' | 'rescue';
  typeLabel: string;
  droneAssigned: string;
  status: 'active' | 'standby' | 'completed';
  statusLabel: string;
  startTime: string;
  area: string;
  objectives: string[];
  personnel: string[];
  description: string;
}

const missions: Mission[] = [
  {
    id: 1,
    name: '인천항 정기순찰 A-12',
    type: 'patrol',
    typeLabel: '순찰',
    droneAssigned: '드론 #1',
    status: 'active',
    statusLabel: '진행 중',
    startTime: '08:00',
    area: '인천항 외항 및 진입수로',
    objectives: ['불법조업 감시', '통항질서 확인', '해양오염 모니터링'],
    personnel: ['김경위', '이순경', '박순경'],
    description: '인천항 외항 일대 정기 순찰 임무. 최근 불법조업 신고 증가 구역 집중 감시.',
  },
  {
    id: 2,
    name: '부산 영도 수색작전',
    type: 'search',
    typeLabel: '수색',
    droneAssigned: '드론 #2',
    status: 'active',
    statusLabel: '진행 중',
    startTime: '10:30',
    area: '부산 영도구 태종대 해역',
    objectives: ['실종 어선 수색', '해상 잔해물 확인', '생존자 탐색'],
    personnel: ['최경감', '정경위', '한순경', '오순경'],
    description: '어제 20시경 통신 두절된 어선 "동해호" 수색. 마지막 AIS 위치 기준 반경 5해리 수색.',
  },
  {
    id: 3,
    name: '여수 유류유출 대응',
    type: 'rescue',
    typeLabel: '구조',
    droneAssigned: '드론 #3',
    status: 'active',
    statusLabel: '긴급 대응',
    startTime: '11:45',
    area: '여수 광양만 일대',
    objectives: ['유류유출 범위 확인', '오염 확산 경로 추적', '방제 작업 지원'],
    personnel: ['박경감', '송경위', '윤순경', '강순경', '조해양환경요원'],
    description: '광양만 내 유류유출 의심 신고 접수. AI 영상분석으로 유막 범위 확인 및 확산 예측 지원.',
  },
  {
    id: 4,
    name: '속초 동해안 야간순찰',
    type: 'patrol',
    typeLabel: '순찰',
    droneAssigned: '드론 #4',
    status: 'standby',
    statusLabel: '대기 중',
    startTime: '20:00 (예정)',
    area: '속초~양양 동해안 EEZ',
    objectives: ['야간 불법조업 감시', '외국 어선 침범 감시', '해상 안전 점검'],
    personnel: ['이경위', '김순경'],
    description: '동해안 EEZ 내 야간 불법조업 집중 감시 임무. 적외선 카메라 활용 예정.',
  },
  {
    id: 5,
    name: '제주 서귀포 정기순찰',
    type: 'patrol',
    typeLabel: '순찰',
    droneAssigned: '드론 #6',
    status: 'completed',
    statusLabel: '완료',
    startTime: '06:00 ~ 12:00',
    area: '서귀포항 및 중문 해역',
    objectives: ['레저활동 안전감시', '통항질서 확인'],
    personnel: ['나경위', '허순경'],
    description: '서귀포항 일대 주간 정기순찰 완료. 특이사항 없음.',
  },
];

function getTypeIcon(type: string) {
  switch (type) {
    case 'patrol': return Shield;
    case 'search': return SearchIcon;
    case 'rescue': return LifeBuoy;
    default: return Target;
  }
}

function getTypeStyle(type: string) {
  switch (type) {
    case 'patrol': return 'bg-blue-100 text-blue-700';
    case 'search': return 'bg-amber-100 text-amber-700';
    case 'rescue': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function getStatusStyle(status: string) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-700 border-green-200';
    case 'standby': return 'bg-gray-100 text-gray-600 border-gray-200';
    case 'completed': return 'bg-navy-100 text-navy-700 border-navy-200';
    default: return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}

function getStatusDot(status: string) {
  switch (status) {
    case 'active': return 'bg-green-500 animate-pulse';
    case 'standby': return 'bg-gray-400';
    case 'completed': return 'bg-navy-500';
    default: return 'bg-gray-400';
  }
}

export default function MissionsPage() {
  const [expandedMission, setExpandedMission] = useState<number | null>(1);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMissions = missions.filter(
    (m) => statusFilter === 'all' || m.status === statusFilter
  );

  const activeMissions = missions.filter((m) => m.status === 'active').length;
  const standbyMissions = missions.filter((m) => m.status === 'standby').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-navy-300 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <Eye className="w-5 h-5 text-cyan-400" />
                <span className="text-sm font-semibold">Deep Blue Eye</span>
              </Link>
              <div className="h-5 w-px bg-navy-700" />
              <h1 className="text-sm font-medium">임무 관리</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              임무 생성
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeMissions}</p>
              <p className="text-xs text-gray-500">진행 중 임무</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{standbyMissions}</p>
              <p className="text-xs text-gray-500">대기 중 임무</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Radio className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{missions.length}</p>
              <p className="text-xs text-gray-500">전체 임무</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 mb-6">
          {[
            { value: 'all', label: '전체' },
            { value: 'active', label: '진행 중' },
            { value: 'standby', label: '대기 중' },
            { value: 'completed', label: '완료' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                statusFilter === filter.value
                  ? 'bg-navy-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Mission List */}
        <div className="space-y-4">
          {filteredMissions.map((mission) => {
            const TypeIcon = getTypeIcon(mission.type);
            const isExpanded = expandedMission === mission.id;

            return (
              <div
                key={mission.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Mission Header */}
                <button
                  onClick={() => setExpandedMission(isExpanded ? null : mission.id)}
                  className="w-full px-6 py-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeStyle(mission.type)}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-gray-900">{mission.name}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeStyle(mission.type)}`}>
                        {mission.typeLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Radio className="w-3 h-3" />{mission.droneAssigned}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{mission.startTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{mission.area}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${getStatusStyle(mission.status)}`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(mission.status)}`} />
                      {mission.statusLabel}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="px-6 py-5 border-t border-gray-100 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Description */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">임무 설명</h4>
                        <p className="text-sm text-gray-700">{mission.description}</p>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          <Target className="w-3.5 h-3.5 inline mr-1" />임무 목표
                        </h4>
                        <ul className="space-y-1.5">
                          {mission.objectives.map((obj, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Personnel */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          <Users className="w-3.5 h-3.5 inline mr-1" />투입 인원
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {mission.personnel.map((person, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center px-2.5 py-1 bg-white border border-gray-200 rounded-full text-xs text-gray-700"
                            >
                              {person}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-16">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium">해당 상태의 임무가 없습니다</p>
          </div>
        )}
      </main>

      {/* Create Mission Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">새 임무 생성</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">임무명</label>
                <input
                  type="text"
                  placeholder="임무명을 입력하세요"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">임무 유형</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="patrol">순찰</option>
                    <option value="search">수색</option>
                    <option value="rescue">구조</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">배정 드론</label>
                  <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>드론 #1</option>
                    <option>드론 #2</option>
                    <option>드론 #3</option>
                    <option>드론 #4</option>
                    <option>드론 #5</option>
                    <option>드론 #6</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">작전 해역</label>
                <input
                  type="text"
                  placeholder="작전 해역을 입력하세요"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">임무 설명</label>
                <textarea
                  rows={3}
                  placeholder="임무 목표 및 상세 내용을 입력하세요"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                임무 생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
