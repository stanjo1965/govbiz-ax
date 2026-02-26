import Link from 'next/link';
import {
  Eye,
  Ship,
  AlertTriangle,
  Radio,
  Siren,
  Plus,
  Search,
  PlayCircle,
  Monitor,
  Map,
  ClipboardList,
  Anchor,
  ShieldAlert,
  Droplets,
  Activity,
  ChevronRight,
} from 'lucide-react';

const stats = [
  { label: '활성 드론', value: '12대', icon: Radio, color: 'bg-blue-500' },
  { label: '모니터링 해역', value: '24개', icon: Map, color: 'bg-cyan-500' },
  { label: '탐지 이벤트', value: '47건', icon: Eye, color: 'bg-amber-500' },
  { label: '금일 출동', value: '3건', icon: Siren, color: 'bg-red-500' },
];

const feeds = [
  {
    id: 1,
    label: '드론 #1 - 인천항',
    status: '정상',
    statusColor: 'bg-green-500',
    vessels: 8,
    area: '인천항 외항',
  },
  {
    id: 2,
    label: '드론 #2 - 부산항',
    status: '경고',
    statusColor: 'bg-amber-500',
    vessels: 15,
    area: '부산항 남외항',
  },
  {
    id: 3,
    label: '드론 #3 - 여수항',
    status: '정상',
    statusColor: 'bg-green-500',
    vessels: 5,
    area: '여수 광양항',
  },
  {
    id: 4,
    label: '드론 #4 - 속초 근해',
    status: '위험',
    statusColor: 'bg-red-500',
    vessels: 3,
    area: '속초 동해안',
  },
];

const alerts = [
  {
    id: 1,
    type: '불법조업 감지',
    icon: ShieldAlert,
    location: '인천 옹진군 해역',
    time: '14:32',
    severity: 'high',
    description: '미등록 어선 2척 불법조업 의심 행위 탐지',
  },
  {
    id: 2,
    type: '표류선박 발견',
    icon: Anchor,
    location: '부산 기장군 근해',
    time: '13:15',
    severity: 'medium',
    description: '엔진 정지 추정 소형 어선 1척 표류 중',
  },
  {
    id: 3,
    type: '유류유출 의심',
    icon: Droplets,
    location: '여수 광양만',
    time: '11:48',
    severity: 'high',
    description: '해상 유막 탐지 - 약 200m 범위 확산 중',
  },
  {
    id: 4,
    type: '과속 선박',
    icon: Activity,
    location: '속초항 진입수로',
    time: '10:22',
    severity: 'low',
    description: '속력제한구역 내 화물선 1척 초과 속력 운항',
  },
  {
    id: 5,
    type: '안전장비 미착용',
    icon: AlertTriangle,
    location: '제주 서귀포 해역',
    time: '09:05',
    severity: 'medium',
    description: '소형 레저보트 탑승자 구명조끼 미착용 감지',
  },
];

const quickActions = [
  { label: '임무 생성', href: '/missions', icon: Plus, color: 'bg-primary-500 hover:bg-primary-600' },
  { label: '선박 조회', href: '/vessels', icon: Search, color: 'bg-navy-700 hover:bg-navy-800' },
  { label: '리플레이', href: '/monitoring', icon: PlayCircle, color: 'bg-gray-600 hover:bg-gray-700' },
];

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'high': return 'border-l-red-500 bg-red-50';
    case 'medium': return 'border-l-amber-500 bg-amber-50';
    case 'low': return 'border-l-blue-500 bg-blue-50';
    default: return 'border-l-gray-300 bg-gray-50';
  }
}

function getSeverityBadge(severity: string) {
  switch (severity) {
    case 'high': return 'bg-red-100 text-red-700';
    case 'medium': return 'bg-amber-100 text-amber-700';
    case 'low': return 'bg-blue-100 text-blue-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function getSeverityLabel(severity: string) {
  switch (severity) {
    case 'high': return '긴급';
    case 'medium': return '주의';
    case 'low': return '참고';
    default: return '일반';
  }
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-navy-950 border-b border-navy-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Deep Blue Eye
                </h1>
                <p className="text-xs text-navy-300">해양경찰청 해상안전 AI 모니터링</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-white bg-navy-800 rounded-md">
                대시보드
              </Link>
              <Link href="/monitoring" className="px-3 py-2 text-sm text-navy-300 hover:text-white hover:bg-navy-800 rounded-md transition-colors">
                <Monitor className="w-4 h-4 inline mr-1" />실시간 모니터링
              </Link>
              <Link href="/vessels" className="px-3 py-2 text-sm text-navy-300 hover:text-white hover:bg-navy-800 rounded-md transition-colors">
                <Ship className="w-4 h-4 inline mr-1" />선박 조회
              </Link>
              <Link href="/missions" className="px-3 py-2 text-sm text-navy-300 hover:text-white hover:bg-navy-800 rounded-md transition-colors">
                <ClipboardList className="w-4 h-4 inline mr-1" />임무 관리
              </Link>
              <Link href="/map" className="px-3 py-2 text-sm text-navy-300 hover:text-white hover:bg-navy-800 rounded-md transition-colors">
                <Map className="w-4 h-4 inline mr-1" />해역 지도
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">시스템 정상</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex items-center gap-4"
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors ${action.color}`}
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Video Feeds Grid - spans 2 columns */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">실시간 모니터링 피드</h2>
              <Link href="/monitoring" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                전체 보기 <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {feeds.map((feed) => (
                <Link
                  key={feed.id}
                  href="/monitoring"
                  className="group bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-600 transition-colors"
                >
                  {/* Video Placeholder */}
                  <div className="relative aspect-video bg-gradient-to-br from-navy-900 to-gray-800 flex items-center justify-center">
                    <div className="text-center">
                      <Ship className="w-12 h-12 text-navy-600 mx-auto mb-2" />
                      <p className="text-xs text-navy-500">영상 피드 연결 중...</p>
                    </div>
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${feed.statusColor}`} />
                      <span className="text-xs font-medium text-white bg-black/50 px-2 py-0.5 rounded">
                        {feed.status}
                      </span>
                    </div>
                    {/* REC indicator */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs font-medium text-red-400">REC</span>
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Monitor className="w-10 h-10 text-cyan-400" />
                    </div>
                  </div>
                  {/* Feed Info */}
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{feed.label}</p>
                      <span className="text-xs text-gray-400">{feed.area}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">탐지 선박: {feed.vessels}척</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Alerts - spans 1 column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">최근 알림</h2>
              <span className="text-xs text-gray-400">금일 {alerts.length}건</span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 rounded-lg p-4 ${getSeverityColor(alert.severity)}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <alert.icon className="w-4 h-4 text-gray-700 shrink-0" />
                      <span className="text-sm font-semibold text-gray-900">{alert.type}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeverityBadge(alert.severity)}`}>
                        {getSeverityLabel(alert.severity)}
                      </span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1.5">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-navy-800 mt-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm">
            <p className="text-navy-400 mb-1">해양경찰청 | 해상안전 AI Deep Blue Eye 모니터링 시스템</p>
            <p className="text-navy-600 text-xs">
              인천광역시 연수구 해돋이로 130 해양경찰청 | 대표전화 122
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
