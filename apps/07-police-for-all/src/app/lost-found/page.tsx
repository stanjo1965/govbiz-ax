'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Upload, Search, MapPin, Calendar, Tag, CheckCircle, Clock, X } from 'lucide-react';

type Category = '전체' | '전자기기' | '지갑/가방' | '귀금속' | '의류' | '기타';

interface FoundItem {
  id: string;
  name: string;
  category: string;
  similarity: number;
  location: string;
  foundDate: string;
  status: '보관중' | '인도완료' | '폐기예정';
  imageUrl?: string;
}

const categories: Category[] = ['전체', '전자기기', '지갑/가방', '귀금속', '의류', '기타'];

const sampleItems: FoundItem[] = [
  {
    id: '1',
    name: '갤럭시 S24 울트라 (블랙)',
    category: '전자기기',
    similarity: 94,
    location: '서울 강남구 역삼동 파출소',
    foundDate: '2026-02-24',
    status: '보관중',
  },
  {
    id: '2',
    name: '검정색 가죽 장지갑',
    category: '지갑/가방',
    similarity: 87,
    location: '서울 종로구 종로3가 지구대',
    foundDate: '2026-02-23',
    status: '보관중',
  },
  {
    id: '3',
    name: '에어팟 프로 2세대 (화이트)',
    category: '전자기기',
    similarity: 82,
    location: '서울 마포구 홍대입구역 유실물센터',
    foundDate: '2026-02-22',
    status: '보관중',
  },
  {
    id: '4',
    name: '금반지 (14K, 각인 있음)',
    category: '귀금속',
    similarity: 76,
    location: '서울 서초구 서초파출소',
    foundDate: '2026-02-20',
    status: '인도완료',
  },
  {
    id: '5',
    name: '베이지색 트렌치코트 (M사이즈)',
    category: '의류',
    similarity: 71,
    location: '서울 송파구 잠실파출소',
    foundDate: '2026-02-19',
    status: '보관중',
  },
  {
    id: '6',
    name: '갈색 크로스백 (브랜드 로고)',
    category: '지갑/가방',
    similarity: 68,
    location: '서울 영등포구 여의도지구대',
    foundDate: '2026-02-18',
    status: '폐기예정',
  },
];

function getSimilarityColor(similarity: number): string {
  if (similarity >= 90) return 'text-green-600 bg-green-50';
  if (similarity >= 80) return 'text-blue-600 bg-blue-50';
  if (similarity >= 70) return 'text-orange-600 bg-orange-50';
  return 'text-gray-600 bg-gray-50';
}

function getStatusStyle(status: FoundItem['status']): string {
  switch (status) {
    case '보관중': return 'text-blue-700 bg-blue-50 border-blue-200';
    case '인도완료': return 'text-green-700 bg-green-50 border-green-200';
    case '폐기예정': return 'text-red-700 bg-red-50 border-red-200';
  }
}

function getStatusIcon(status: FoundItem['status']) {
  switch (status) {
    case '보관중': return Clock;
    case '인도완료': return CheckCircle;
    case '폐기예정': return Calendar;
  }
}

export default function LostFoundPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = sampleItems.filter((item) => {
    const matchCategory = selectedCategory === '전체' || item.category === selectedCategory;
    const matchQuery = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleClearPreview = () => {
    setPreview(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-navy-500 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/" className="text-navy-200 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">분실물 AI 탐색</h1>
            <p className="text-xs text-navy-200">AI 이미지 분석 기반 분실물 매칭</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Upload Area */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">분실물 이미지 업로드</h2>
          <p className="text-sm text-gray-500 mb-6">분실한 물품의 사진을 업로드하면 AI가 유사한 습득물을 찾아드립니다.</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-navy-400 transition-colors cursor-pointer"
          >
            {preview ? (
              <div className="relative inline-block">
                <img
                  src={preview}
                  alt="미리보기"
                  className="max-h-48 max-w-full mx-auto rounded-lg object-contain"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); handleClearPreview(); }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                <p className="text-xs text-gray-500 mt-3">{fileName}</p>
                <p className="text-xs text-navy-500 mt-1 font-medium">클릭하여 다른 이미지로 변경</p>
              </div>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm font-medium text-gray-700 mb-1">클릭하여 이미지를 업로드하세요</p>
                <p className="text-xs text-gray-400">JPG, PNG, WEBP (최대 10MB)</p>
              </>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Text Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="분실물 이름으로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              />
            </div>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-navy-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Found Items List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            AI 매칭 결과 <span className="text-sm font-normal text-gray-500">({filteredItems.length}건)</span>
          </h3>
          {filteredItems.map((item) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Image Placeholder */}
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Search className="w-8 h-8 text-gray-300" />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-semibold text-gray-900 truncate">{item.name}</h4>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusStyle(item.status)}`}>
                        <StatusIcon className="w-3 h-3" />
                        {item.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="inline-flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        {item.category}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.foundDate}
                      </span>
                    </div>
                  </div>

                  {/* Similarity */}
                  <div className="flex-shrink-0 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full font-bold text-lg ${getSimilarityColor(item.similarity)}`}>
                      {item.similarity}%
                    </div>
                    <p className="text-xs text-gray-400 mt-1">유사도</p>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">검색 조건에 맞는 분실물이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
