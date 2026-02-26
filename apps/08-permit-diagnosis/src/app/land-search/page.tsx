'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  ArrowLeft,
  ChevronRight,
  FileCheck,
  Filter,
  Shield,
} from 'lucide-react';

const sidoOptions = [
  '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
  '대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도',
  '충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도',
  '경상남도', '제주특별자치도',
];

const sigunguMap: Record<string, string[]> = {
  '서울특별시': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구'],
  '경기도': ['수원시', '성남시', '용인시', '고양시', '화성시', '부천시', '안산시', '안양시', '남양주시', '평택시'],
  '세종특별자치시': ['세종시'],
};

const eupmyeondongMap: Record<string, string[]> = {
  '강남구': ['역삼동', '삼성동', '대치동', '논현동', '청담동', '신사동', '압구정동'],
  '수원시': ['영통구', '권선구', '장안구', '팔달구'],
  '용인시': ['수지구', '기흥구', '처인구'],
  '세종시': ['도담동', '아름동', '종촌동', '한솔동', '나성동', '보람동'],
};

const sampleResults = [
  {
    id: 1,
    address: '세종특별자치시 도담동 100',
    jibun: '100',
    landCategory: '대',
    area: 330.5,
    officialPrice: 1250000,
    zoning: '제1종일반주거지역',
  },
  {
    id: 2,
    address: '세종특별자치시 도담동 200-1',
    jibun: '200-1',
    landCategory: '전',
    area: 1652.0,
    officialPrice: 520000,
    zoning: '자연녹지지역',
  },
  {
    id: 3,
    address: '세종특별자치시 도담동 305',
    jibun: '305',
    landCategory: '답',
    area: 998.0,
    officialPrice: 480000,
    zoning: '생산관리지역',
  },
  {
    id: 4,
    address: '세종특별자치시 도담동 410-5',
    jibun: '410-5',
    landCategory: '대',
    area: 210.3,
    officialPrice: 1580000,
    zoning: '제2종일반주거지역',
  },
  {
    id: 5,
    address: '세종특별자치시 도담동 520',
    jibun: '520',
    landCategory: '임야',
    area: 3305.0,
    officialPrice: 85000,
    zoning: '보전관리지역',
  },
];

function getLandCategoryColor(category: string) {
  switch (category) {
    case '대': return 'bg-blue-100 text-blue-700';
    case '전': return 'bg-green-100 text-green-700';
    case '답': return 'bg-cyan-100 text-cyan-700';
    case '임야': return 'bg-emerald-100 text-emerald-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

export default function LandSearchPage() {
  const [searchMode, setSearchMode] = useState<'address' | 'jibun'>('address');
  const [selectedSido, setSelectedSido] = useState('');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [selectedEupmyeondong, setSelectedEupmyeondong] = useState('');
  const [jibunQuery, setJibunQuery] = useState('');
  const [addressQuery, setAddressQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const sigunguOptions = selectedSido ? (sigunguMap[selectedSido] || []) : [];
  const eupmyeondongOptions = selectedSigungu ? (eupmyeondongMap[selectedSigungu] || []) : [];

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <h1 className="text-base font-semibold text-gray-900">토지 검색</h1>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-1 text-sm">
              <Link href="/" className="px-3 py-1.5 text-gray-500 hover:text-gray-700 rounded">홈</Link>
              <Link href="/land-search" className="px-3 py-1.5 text-primary-600 font-medium bg-primary-50 rounded">토지 검색</Link>
              <Link href="/diagnosis" className="px-3 py-1.5 text-gray-500 hover:text-gray-700 rounded">사전진단</Link>
              <Link href="/map" className="px-3 py-1.5 text-gray-500 hover:text-gray-700 rounded">지도</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">필지 검색</h2>

          {/* Search Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSearchMode('address')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                searchMode === 'address'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              주소 검색
            </button>
            <button
              onClick={() => setSearchMode('jibun')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                searchMode === 'jibun'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              지번 검색
            </button>
          </div>

          {searchMode === 'address' ? (
            <>
              {/* Cascading Region Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">시/도</label>
                  <select
                    value={selectedSido}
                    onChange={(e) => {
                      setSelectedSido(e.target.value);
                      setSelectedSigungu('');
                      setSelectedEupmyeondong('');
                    }}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">시/도 선택</option>
                    {sidoOptions.map((sido) => (
                      <option key={sido} value={sido}>{sido}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">시/군/구</label>
                  <select
                    value={selectedSigungu}
                    onChange={(e) => {
                      setSelectedSigungu(e.target.value);
                      setSelectedEupmyeondong('');
                    }}
                    disabled={!selectedSido}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">시/군/구 선택</option>
                    {sigunguOptions.map((sigungu) => (
                      <option key={sigungu} value={sigungu}>{sigungu}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">읍/면/동</label>
                  <select
                    value={selectedEupmyeondong}
                    onChange={(e) => setSelectedEupmyeondong(e.target.value)}
                    disabled={!selectedSigungu}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    <option value="">읍/면/동 선택</option>
                    {eupmyeondongOptions.map((dong) => (
                      <option key={dong} value={dong}>{dong}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address text input */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={addressQuery}
                    onChange={(e) => setAddressQuery(e.target.value)}
                    placeholder="상세 주소를 입력하세요 (예: 도담동 100)"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  검색
                </button>
              </div>
            </>
          ) : (
            /* Jibun Search */
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={jibunQuery}
                  onChange={(e) => setJibunQuery(e.target.value)}
                  placeholder="지번을 입력하세요 (예: 세종특별자치시 도담동 100)"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                검색
              </button>
            </div>
          )}
        </div>

        {/* Results Section */}
        {showResults && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">검색 결과</h3>
                <span className="text-sm text-gray-500">{sampleResults.length}건</span>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-3.5 h-3.5" />
                필터
              </button>
            </div>

            <div className="space-y-3">
              {sampleResults.map((parcel) => (
                <div
                  key={parcel.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary-200 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-base font-semibold text-gray-900">
                          {parcel.address}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getLandCategoryColor(parcel.landCategory)}`}>
                          {parcel.landCategory}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-400">면적</p>
                          <p className="text-sm font-medium text-gray-700">{parcel.area.toLocaleString()} m2</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">공시지가 (원/m2)</p>
                          <p className="text-sm font-medium text-gray-700">{parcel.officialPrice.toLocaleString()}원</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">용도지역</p>
                          <p className="text-sm font-medium text-gray-700">{parcel.zoning}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">지번</p>
                          <p className="text-sm font-medium text-gray-700">{parcel.jibun}</p>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/diagnosis?parcel=${parcel.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors shrink-0"
                    >
                      <FileCheck className="w-4 h-4" />
                      사전진단
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showResults && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium text-gray-500 mb-2">토지를 검색하세요</h3>
            <p className="text-sm text-gray-400">
              주소 또는 지번으로 검색하면 해당 필지의 상세 정보와 사전진단을 받을 수 있습니다
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
