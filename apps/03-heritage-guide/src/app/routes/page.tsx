'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Landmark,
  MapPin,
  Clock,
  Route,
  Users,
  Star,
  ChevronRight,
  MessageCircle,
  Mountain,
  Footprints,
} from 'lucide-react';

const regions = [
  { id: 'all', label: '전국' },
  { id: 'seoul', label: '서울' },
  { id: 'gyeonggi', label: '경기' },
  { id: 'gangwon', label: '강원' },
  { id: 'chungnam', label: '충남' },
  { id: 'chungbuk', label: '충북' },
  { id: 'gyeongbuk', label: '경북' },
  { id: 'gyeongnam', label: '경남' },
  { id: 'jeonnam', label: '전남' },
  { id: 'jeonbuk', label: '전북' },
  { id: 'jeju', label: '제주' },
];

const difficultyColors: Record<string, string> = {
  쉬움: 'bg-green-50 text-green-700',
  보통: 'bg-yellow-50 text-yellow-700',
  어려움: 'bg-red-50 text-red-700',
};

const tourRoutes = [
  {
    id: 1,
    name: '서울 궁궐 투어',
    region: 'seoul',
    duration: '1일 (6~7시간)',
    stops: 5,
    difficulty: '쉬움',
    rating: 4.8,
    participants: 12400,
    description:
      '서울의 5대 궁궐을 하루에 둘러보는 코스입니다. 경복궁에서 시작하여 창덕궁, 창경궁, 덕수궁, 경희궁까지 조선 왕조의 역사를 따라갑니다.',
    stops_detail: ['경복궁', '창덕궁', '창경궁', '덕수궁', '경희궁'],
    theme: '궁궐 · 역사',
  },
  {
    id: 2,
    name: '경주 천년고도 탐방',
    region: 'gyeongbuk',
    duration: '2일 (1박2일)',
    stops: 8,
    difficulty: '보통',
    rating: 4.9,
    participants: 8900,
    description:
      '신라 천년의 역사가 살아숨쉬는 경주를 깊이있게 탐방하는 코스입니다. 불국사와 석굴암부터 첨성대, 안압지까지 다양한 유적을 만납니다.',
    stops_detail: ['불국사', '석굴암', '첨성대', '동궁과 월지', '대릉원', '국립경주박물관', '양동마을', '감은사지'],
    theme: '신라 · 불교문화',
  },
  {
    id: 3,
    name: '제주 자연유산 코스',
    region: 'jeju',
    duration: '2일 (1박2일)',
    stops: 6,
    difficulty: '보통',
    rating: 4.7,
    participants: 6500,
    description:
      '유네스코 세계자연유산으로 등재된 제주도의 자연 유산을 탐방하는 코스입니다. 한라산, 성산일출봉, 거문오름 용암동굴계를 포함합니다.',
    stops_detail: ['한라산', '성산일출봉', '만장굴', '거문오름', '천지연폭포', '주상절리대'],
    theme: '자연유산 · 지질',
  },
  {
    id: 4,
    name: '안동 유교문화 탐방',
    region: 'gyeongbuk',
    duration: '1일 (5~6시간)',
    stops: 5,
    difficulty: '쉬움',
    rating: 4.6,
    participants: 4200,
    description:
      '한국 유교문화의 중심지 안동에서 서원과 전통마을을 방문하는 코스입니다. 하회마을의 전통 문화를 직접 체험할 수 있습니다.',
    stops_detail: ['하회마을', '도산서원', '병산서원', '봉정사', '안동 하회별신굿탈놀이'],
    theme: '유교 · 전통문화',
  },
  {
    id: 5,
    name: '수원화성 역사 탐방',
    region: 'gyeonggi',
    duration: '반나절 (3~4시간)',
    stops: 6,
    difficulty: '쉬움',
    rating: 4.7,
    participants: 9800,
    description:
      '정조의 꿈이 담긴 수원화성을 따라 걷는 성곽 투어입니다. 팔달문에서 출발하여 화성을 한 바퀴 돌며 다양한 시설물을 감상합니다.',
    stops_detail: ['팔달문', '화홍문', '방화수류정', '서장대', '화성행궁', '수원화성박물관'],
    theme: '성곽 · 실학',
  },
  {
    id: 6,
    name: '공주·부여 백제 역사 탐방',
    region: 'chungnam',
    duration: '1일 (6~7시간)',
    stops: 7,
    difficulty: '보통',
    rating: 4.5,
    participants: 3800,
    description:
      '백제의 두 수도 공주와 부여를 하루에 탐방하는 코스입니다. 웅진과 사비 시대의 유적을 통해 백제 문화의 우수성을 확인합니다.',
    stops_detail: ['공산성', '무령왕릉', '국립공주박물관', '부소산성', '정림사지', '궁남지', '국립부여박물관'],
    theme: '백제 · 고대사',
  },
];

export default function RoutesPage() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredRoutes =
    selectedRegion === 'all'
      ? tourRoutes
      : tourRoutes.filter((r) => r.region === selectedRegion);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Route className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base font-bold text-gray-900">추천 관광 경로</h1>
            </div>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              AI 해설
            </Link>
          </div>
        </div>
      </header>

      {/* Region Selector */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">지역 선택</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedRegion === region.id
                    ? 'bg-primary-600 text-white font-medium'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            추천 경로 <span className="font-semibold text-gray-900">{filteredRoutes.length}건</span>
          </p>
        </div>

        <div className="space-y-6">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{route.name}</h3>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          difficultyColors[route.difficulty]
                        }`}
                      >
                        {route.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{route.theme}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">{route.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {route.description}
                </p>

                {/* Route Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {route.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Landmark className="w-4 h-4" />
                    {route.stops}개 코스
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {route.participants.toLocaleString()}명 이용
                  </span>
                </div>

                {/* Stops */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">경로 상세</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {route.stops_detail.map((stop, idx) => (
                      <span key={stop} className="flex items-center gap-1.5">
                        <span className="text-sm text-gray-700 font-medium">{stop}</span>
                        {idx < route.stops_detail.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/chat?route=${encodeURIComponent(route.name)}`}
                    className="inline-flex items-center gap-1.5 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    AI 해설 듣기
                  </Link>
                  <Link
                    href="/map"
                    className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    지도로 보기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-16">
            <Footprints className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              해당 지역의 추천 경로가 없습니다
            </h3>
            <p className="text-sm text-gray-500">다른 지역을 선택해 주세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
