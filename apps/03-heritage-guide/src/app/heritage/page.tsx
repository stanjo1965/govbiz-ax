'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  ArrowLeft,
  MapPin,
  Clock,
  Globe,
  Landmark,
  MessageCircle,
  Filter,
} from 'lucide-react';

const categories = [
  { id: 'all', label: '전체' },
  { id: 'palace', label: '궁궐' },
  { id: 'temple', label: '사찰' },
  { id: 'fortress', label: '성곽' },
  { id: 'tower', label: '탑' },
  { id: 'academy', label: '서원' },
  { id: 'village', label: '전통마을' },
];

const heritageItems = [
  {
    id: 1,
    name: '경복궁',
    nameEn: 'Gyeongbokgung Palace',
    era: '조선시대 (1395)',
    location: '서울특별시 종로구',
    category: 'palace',
    unesco: false,
    description:
      '조선 왕조의 법궁으로, 태조 이성계가 한양으로 천도하면서 건립한 첫 번째 궁궐입니다. 근정전, 경회루, 향원정 등 주요 전각이 있습니다.',
    highlights: ['근정전', '경회루', '향원정', '국립고궁박물관'],
  },
  {
    id: 2,
    name: '석굴암',
    nameEn: 'Seokguram Grotto',
    era: '통일신라 (751)',
    location: '경상북도 경주시',
    category: 'temple',
    unesco: true,
    description:
      '신라 경덕왕 때 김대성이 창건한 석조 인공 석굴 사원으로, 본존불상의 뛰어난 조각 기법은 세계적으로 유래가 없습니다.',
    highlights: ['본존불상', '사천왕상', '십일면관음보살', '팔부중상'],
  },
  {
    id: 3,
    name: '해인사 장경판전',
    nameEn: 'Haeinsa Temple Janggyeong Panjeon',
    era: '고려시대 (1398)',
    location: '경상남도 합천군',
    category: 'temple',
    unesco: true,
    description:
      '팔만대장경을 보관하기 위해 건립된 건물로, 자연 환기와 습도 조절을 위한 과학적인 설계가 돋보입니다.',
    highlights: ['팔만대장경', '수다라장', '법보전', '자연환기 시스템'],
  },
  {
    id: 4,
    name: '수원화성',
    nameEn: 'Hwaseong Fortress',
    era: '조선시대 (1796)',
    location: '경기도 수원시',
    category: 'fortress',
    unesco: true,
    description:
      '정조가 아버지 사도세자의 묘를 옮기면서 축조한 성곽으로, 동서양의 군사 기술을 집약한 근대적 성곽입니다.',
    highlights: ['팔달문', '화홍문', '방화수류정', '서장대'],
  },
  {
    id: 5,
    name: '불국사',
    nameEn: 'Bulguksa Temple',
    era: '통일신라 (528)',
    location: '경상북도 경주시',
    category: 'temple',
    unesco: true,
    description:
      '신라 불교 예술의 정수로, 다보탑과 석가탑 등 뛰어난 석조 문화재를 보유한 한국 불교의 대표 사찰입니다.',
    highlights: ['다보탑', '석가탑', '청운교·백운교', '연화교·칠보교'],
  },
  {
    id: 6,
    name: '종묘',
    nameEn: 'Jongmyo Shrine',
    era: '조선시대 (1394)',
    location: '서울특별시 종로구',
    category: 'palace',
    unesco: true,
    description:
      '조선 왕과 왕비의 신위를 모신 유교 사당으로, 종묘제례와 종묘제례악은 유네스코 인류무형문화유산입니다.',
    highlights: ['정전', '영녕전', '종묘제례', '종묘제례악'],
  },
  {
    id: 7,
    name: '다보탑',
    nameEn: 'Dabotap Pagoda',
    era: '통일신라 (751)',
    location: '경상북도 경주시',
    category: 'tower',
    unesco: false,
    description:
      '불국사 대웅전 앞에 석가탑과 나란히 서 있는 석탑으로, 독특하고 화려한 양식이 돋보이는 국보입니다.',
    highlights: ['국보 제20호', '독특한 석탑 양식', '불국사 경내'],
  },
  {
    id: 8,
    name: '도산서원',
    nameEn: 'Dosan Seowon',
    era: '조선시대 (1574)',
    location: '경상북도 안동시',
    category: 'academy',
    unesco: true,
    description:
      '퇴계 이황 선생을 기리기 위해 건립된 서원으로, 한국 성리학의 중심지 역할을 했습니다.',
    highlights: ['전교당', '도산서당', '역락서재', '천연대'],
  },
  {
    id: 9,
    name: '하회마을',
    nameEn: 'Hahoe Folk Village',
    era: '고려시대~',
    location: '경상북도 안동시',
    category: 'village',
    unesco: true,
    description:
      '풍산 류씨의 집성촌으로, 낙동강이 마을을 감싸 흐르는 독특한 지형에 조선시대 전통 가옥이 잘 보존되어 있습니다.',
    highlights: ['하회별신굿탈놀이', '충효당', '양진당', '부용대'],
  },
];

export default function HeritagePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    return heritageItems.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.name.includes(searchQuery) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.includes(searchQuery) ||
        item.description.includes(searchQuery);
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
                <Landmark className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-base font-bold text-gray-900">국가유산 검색</h1>
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

      {/* Search & Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="유산명, 지역, 키워드로 검색하세요"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary-600 text-white font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            검색 결과 <span className="font-semibold text-gray-900">{filteredItems.length}건</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all group"
            >
              <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center relative">
                <Landmark className="w-14 h-14 text-primary-300 group-hover:text-primary-400 transition-colors" />
                {item.unesco && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    <Globe className="w-3 h-3" />
                    UNESCO
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400">{item.nameEn}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.era}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/chat?heritage=${encodeURIComponent(item.name)}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-primary-50 text-primary-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  AI 해설 듣기
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <Landmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-sm text-gray-500">
              다른 검색어나 카테고리를 선택해 주세요
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
