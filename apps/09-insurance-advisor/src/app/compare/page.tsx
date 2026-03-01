'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  Search,
  X,
  MessageCircle,
  ChevronRight,
  Star,
} from 'lucide-react';

type Category = 'all' | 'medical' | 'cancer' | 'life' | 'car';
type SortKey = 'premium' | 'coverage' | 'rating';

interface InsuranceProduct {
  id: number;
  insurer: string;
  name: string;
  category: Category;
  categoryLabel: string;
  monthlyPremium: number;
  coverageScore: number;
  rating: 'A' | 'B' | 'C' | 'D';
  ratingLabel: string;
  features: string[];
  coverageDetails: string[];
  minAge: number;
  maxAge: number;
  notes: string;
}

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'medical', label: '실손의료' },
  { key: 'cancer', label: '암보험' },
  { key: 'life', label: '생명보험' },
  { key: 'car', label: '자동차보험' },
];

const sampleProducts: InsuranceProduct[] = [
  {
    id: 1,
    insurer: '삼성화재',
    name: '애니핏 실손의료보험',
    category: 'medical',
    categoryLabel: '실손의료',
    monthlyPremium: 28000,
    coverageScore: 95,
    rating: 'A',
    ratingLabel: '우수',
    features: ['입원비 100% 보장', '통원 30만원', '도수치료 포함'],
    coverageDetails: ['입원의료비: 급여 90%·비급여 80%', '통원의료비: 30만원 한도', '처방조제비: 5만원 한도'],
    minAge: 0,
    maxAge: 65,
    notes: '갱신형 | 5년 단위 갱신',
  },
  {
    id: 2,
    insurer: '한화생명',
    name: '암케어 통합보험',
    category: 'cancer',
    categoryLabel: '암보험',
    monthlyPremium: 45000,
    coverageScore: 92,
    rating: 'A',
    ratingLabel: '우수',
    features: ['암 진단금 3,000만원', '항암치료비 지원', '요양급여 포함'],
    coverageDetails: ['일반암 진단금: 3,000만원', '소액암: 300만원', '항암치료: 1,000만원 한도', '요양급여: 월 50만원'],
    minAge: 15,
    maxAge: 60,
    notes: '비갱신형 | 80세 만기',
  },
  {
    id: 3,
    insurer: 'KB손해보험',
    name: 'KB 착한 실손보험',
    category: 'medical',
    categoryLabel: '실손의료',
    monthlyPremium: 22000,
    coverageScore: 88,
    rating: 'A',
    ratingLabel: '우수',
    features: ['급여 90% 보장', '합리적 보험료', '간편 청구'],
    coverageDetails: ['입원의료비: 급여 90%', '통원의료비: 20만원 한도', '처방조제비: 3만원 한도'],
    minAge: 0,
    maxAge: 60,
    notes: '갱신형 | 1년 단위 갱신',
  },
  {
    id: 4,
    insurer: '교보생명',
    name: '교보 종신보험 플러스',
    category: 'life',
    categoryLabel: '생명보험',
    monthlyPremium: 120000,
    coverageScore: 90,
    rating: 'A',
    ratingLabel: '우수',
    features: ['사망보험금 1억', '재해사망 2배 지급', '연금전환 가능'],
    coverageDetails: ['사망보험금: 1억원', '재해사망: 2억원', '80세 이후 연금 전환 가능', '납입기간 20년'],
    minAge: 15,
    maxAge: 55,
    notes: '비갱신형 | 종신',
  },
  {
    id: 5,
    insurer: 'DB손해보험',
    name: 'DB다이렉트 자동차보험',
    category: 'car',
    categoryLabel: '자동차보험',
    monthlyPremium: 38000,
    coverageScore: 87,
    rating: 'B',
    ratingLabel: '양호',
    features: ['대물 무한보장', '긴급출동 무료', '블랙박스 할인'],
    coverageDetails: ['대인배상: 무한', '대물배상: 무한', '자기신체사고: 3천만원', '자기차량손해: 차량가액'],
    minAge: 18,
    maxAge: 75,
    notes: '1년 단위 갱신 | 마일리지 할인',
  },
  {
    id: 6,
    insurer: '현대해상',
    name: '굿앤굿 암보험',
    category: 'cancer',
    categoryLabel: '암보험',
    monthlyPremium: 38000,
    coverageScore: 85,
    rating: 'B',
    ratingLabel: '양호',
    features: ['암 진단금 2,000만원', '방사선 치료 포함', '합리적 보험료'],
    coverageDetails: ['일반암 진단금: 2,000만원', '소액암: 200만원', '방사선 치료: 500만원', '입원일당: 3만원'],
    minAge: 15,
    maxAge: 65,
    notes: '갱신형 | 10년 단위 갱신',
  },
  {
    id: 7,
    insurer: '메리츠화재',
    name: '메리츠 운전자보험',
    category: 'car',
    categoryLabel: '자동차보험',
    monthlyPremium: 42000,
    coverageScore: 82,
    rating: 'B',
    ratingLabel: '양호',
    features: ['사고 처리비 지원', '면허취소 위로금', '변호사 선임비'],
    coverageDetails: ['교통사고 처리비: 2,000만원', '면허취소 위로금: 100만원', '변호사 선임비: 300만원'],
    minAge: 18,
    maxAge: 70,
    notes: '비갱신형 | 운전자 특화',
  },
  {
    id: 8,
    insurer: '한화생명',
    name: '한화 100세 정기보험',
    category: 'life',
    categoryLabel: '생명보험',
    monthlyPremium: 65000,
    coverageScore: 78,
    rating: 'B',
    ratingLabel: '양호',
    features: ['사망보험금 5,000만원', '낮은 보험료', '정기형'],
    coverageDetails: ['사망보험금: 5,000만원', '재해사망: 5,000만원', '납입기간 10년 또는 20년'],
    minAge: 15,
    maxAge: 60,
    notes: '비갱신형 | 100세 만기',
  },
];

function getRatingStyle(rating: string) {
  switch (rating) {
    case 'A': return { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' };
    case 'B': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
    case 'C': return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
    case 'D': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
    default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
  }
}

export default function ComparePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [sortKey, setSortKey] = useState<SortKey>('premium');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<InsuranceProduct | null>(null);

  const filtered = sampleProducts
    .filter((p) => activeCategory === 'all' || p.category === activeCategory)
    .filter((p) =>
      searchQuery === '' ||
      p.name.includes(searchQuery) ||
      p.insurer.includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortKey === 'premium') return a.monthlyPremium - b.monthlyPremium;
      if (sortKey === 'coverage') return b.coverageScore - a.coverageScore;
      return a.rating.localeCompare(b.rating);
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-14">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-bold text-gray-900">보험 상품 비교</h1>
          </div>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="보험사명, 상품명으로 검색"
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="premium">보험료 낮은순</option>
              <option value="coverage">보장 넓은순</option>
              <option value="rating">등급 높은순</option>
            </select>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span>개 상품
          </p>
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            본 서비스는 중립적 정보 제공만 합니다. 특정 상품을 추천하지 않습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((product) => {
            const ratingStyle = getRatingStyle(product.rating);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-emerald-200 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {product.categoryLabel}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded border ${ratingStyle.bg} ${ratingStyle.text} ${ratingStyle.border}`}>
                        {product.rating}등급 {product.ratingLabel}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.insurer}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-emerald-600">
                      {product.monthlyPremium.toLocaleString()}원
                    </p>
                    <p className="text-xs text-gray-400">월 보험료</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.features.map((f) => (
                    <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Star className="w-3.5 h-3.5 text-amber-400" />
                    <span>보장점수 {product.coverageScore}점</span>
                    <span>·</span>
                    <span>{product.notes}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs text-emerald-600 font-medium hover:text-emerald-700 flex items-center gap-0.5"
                  >
                    상세보기 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-400 mt-1">다른 키워드로 검색하거나 카테고리를 변경해 보세요.</p>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {selectedProduct && (() => {
        const ratingStyle = getRatingStyle(selectedProduct.rating);
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
                <h2 className="text-base font-bold text-gray-900">상품 상세 정보</h2>
                <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{selectedProduct.categoryLabel}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded border ${ratingStyle.bg} ${ratingStyle.text} ${ratingStyle.border}`}>
                        {selectedProduct.rating}등급
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-500">{selectedProduct.insurer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-600">{selectedProduct.monthlyPremium.toLocaleString()}원</p>
                    <p className="text-xs text-gray-400">월 보험료</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-semibold text-gray-500 mb-2">보장 내용</p>
                  <ul className="space-y-1.5">
                    {selectedProduct.coverageDetails.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-emerald-500 font-bold shrink-0">·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-400 mb-1">가입 연령</p>
                    <p className="font-semibold text-gray-700">{selectedProduct.minAge}~{selectedProduct.maxAge}세</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-400 mb-1">보장 점수</p>
                    <p className="font-semibold text-emerald-600">{selectedProduct.coverageScore}점</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-gray-400 mb-1">등급</p>
                    <p className={`font-semibold ${ratingStyle.text}`}>{selectedProduct.rating}등급</p>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium">{selectedProduct.notes}</p>
                  <p className="text-xs text-amber-600 mt-1">※ 본 정보는 참고용이며, 정확한 내용은 해당 보험사에 확인하세요.</p>
                </div>
              </div>
              <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
                <button onClick={() => setSelectedProduct(null)} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  닫기
                </button>
                <Link
                  href="/chat"
                  className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors text-center flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  AI 상담 연결
                </Link>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
