'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  Search,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Package,
  Pill,
  HeartPulse,
  Sparkles,
  Filter,
  ChevronRight,
  X,
} from 'lucide-react';

type Category = 'all' | 'food' | 'drug' | 'device' | 'cosmetic';

interface Product {
  id: number;
  name: string;
  category: Category;
  categoryLabel: string;
  manufacturer: string;
  approvalStatus: 'approved' | 'pending' | 'recalled';
  safetyGrade: 'A' | 'B' | 'C' | 'D';
  description: string;
  approvalNo: string;
}

const categories: { key: Category; label: string; icon: typeof Package }[] = [
  { key: 'all', label: '전체', icon: Search },
  { key: 'food', label: '식품', icon: Package },
  { key: 'drug', label: '의약품', icon: Pill },
  { key: 'device', label: '의료기기', icon: HeartPulse },
  { key: 'cosmetic', label: '화장품', icon: Sparkles },
];

const sampleProducts: Product[] = [
  {
    id: 1,
    name: '비타민C 1000mg 정제',
    category: 'drug',
    categoryLabel: '의약품',
    manufacturer: '한국제약(주)',
    approvalStatus: 'approved',
    safetyGrade: 'A',
    description: '아스코르브산 함유 비타민 보충제. 식약처 허가 완료.',
    approvalNo: '202400123',
  },
  {
    id: 2,
    name: '유기농 현미 시리얼',
    category: 'food',
    categoryLabel: '식품',
    manufacturer: '(주)자연식품',
    approvalStatus: 'approved',
    safetyGrade: 'A',
    description: '유기가공식품 인증 현미 기반 시리얼. HACCP 인증 시설 제조.',
    approvalNo: '2024-FD-0456',
  },
  {
    id: 3,
    name: '고보습 페이셜 크림',
    category: 'cosmetic',
    categoryLabel: '화장품',
    manufacturer: '뷰티랩코리아',
    approvalStatus: 'approved',
    safetyGrade: 'B',
    description: '히알루론산, 세라마이드 함유 보습 크림. 기능성 화장품 보고.',
    approvalNo: 'COS-2024-789',
  },
  {
    id: 4,
    name: '자동혈압계 BP-200',
    category: 'device',
    categoryLabel: '의료기기',
    manufacturer: '메디텍(주)',
    approvalStatus: 'approved',
    safetyGrade: 'A',
    description: '가정용 자동 전자 혈압계. 의료기기 2등급 인허가 완료.',
    approvalNo: '수허 24-1234',
  },
  {
    id: 5,
    name: '어린이 해열진통제 시럽',
    category: 'drug',
    categoryLabel: '의약품',
    manufacturer: '안전제약(주)',
    approvalStatus: 'approved',
    safetyGrade: 'B',
    description: '이부프로펜 함유 어린이용 해열진통제. 복용량 주의 필요.',
    approvalNo: '202300987',
  },
  {
    id: 6,
    name: '수입 건강기능식품 X',
    category: 'food',
    categoryLabel: '식품',
    manufacturer: 'Global Health Inc.',
    approvalStatus: 'recalled',
    safetyGrade: 'D',
    description: '비허가 성분 검출로 판매 중지 및 회수 조치. 섭취 중단 권고.',
    approvalNo: '미등록',
  },
  {
    id: 7,
    name: '미백 기능성 에센스',
    category: 'cosmetic',
    categoryLabel: '화장품',
    manufacturer: '(주)스킨사이언스',
    approvalStatus: 'pending',
    safetyGrade: 'C',
    description: '나이아신아마이드 함유 미백 에센스. 기능성 심사 진행 중.',
    approvalNo: '심사중',
  },
  {
    id: 8,
    name: '체외진단시약 키트',
    category: 'device',
    categoryLabel: '의료기기',
    manufacturer: '바이오진단(주)',
    approvalStatus: 'approved',
    safetyGrade: 'A',
    description: '코로나19 자가검사키트. 체외진단의료기기 허가 제품.',
    approvalNo: '체허 23-5678',
  },
];

function getSafetyGradeStyle(grade: string) {
  switch (grade) {
    case 'A': return { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
    case 'B': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' };
    case 'C': return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' };
    case 'D': return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
    default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' };
  }
}

function getApprovalStyle(status: string) {
  switch (status) {
    case 'approved': return { icon: CheckCircle, label: '허가', color: 'text-green-600' };
    case 'pending': return { icon: AlertTriangle, label: '심사중', color: 'text-amber-600' };
    case 'recalled': return { icon: AlertTriangle, label: '회수', color: 'text-red-600' };
    default: return { icon: CheckCircle, label: '미확인', color: 'text-gray-600' };
  }
}

export default function SearchPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              <h1 className="text-lg font-bold text-gray-900">제품 안전 조회</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="제품명, 성분명, 제조사명으로 통합 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
              <Search className="w-4 h-4" />
              검색
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span>개 제품 검색됨
          </p>
          <button className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
            <Filter className="w-4 h-4" />
            필터
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const gradeStyle = getSafetyGradeStyle(product.safetyGrade);
            const approvalInfo = getApprovalStyle(product.approvalStatus);
            const ApprovalIcon = approvalInfo.icon;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-green-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {product.categoryLabel}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded border ${gradeStyle.bg} ${gradeStyle.text} ${gradeStyle.border}`}>
                        안전등급 {product.safetyGrade}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.manufacturer}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div className={`w-14 h-14 rounded-xl ${gradeStyle.bg} flex items-center justify-center`}>
                      <span className={`text-2xl font-bold ${gradeStyle.text}`}>{product.safetyGrade}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <ApprovalIcon className={`w-3.5 h-3.5 ${approvalInfo.color}`} />
                      <span className={approvalInfo.color}>{approvalInfo.label}</span>
                    </span>
                    <span>허가번호: {product.approvalNo}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="text-xs text-green-600 font-medium hover:text-green-700 flex items-center gap-0.5"
                  >
                    상세보기 <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">검색 결과가 없습니다</p>
            <p className="text-sm text-gray-400 mt-1">다른 키워드로 검색하거나 카테고리를 변경해 보세요.</p>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (() => {
        const gradeStyle = getSafetyGradeStyle(selectedProduct.safetyGrade);
        const approvalInfo = getApprovalStyle(selectedProduct.approvalStatus);
        const ApprovalIcon = approvalInfo.icon;
        return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">제품 상세 정보</h2>
                <button onClick={() => setSelectedProduct(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">{selectedProduct.categoryLabel}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{selectedProduct.manufacturer}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl ${gradeStyle.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-2xl font-bold ${gradeStyle.text}`}>{selectedProduct.safetyGrade}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedProduct.description}</p>
                <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg text-sm">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">허가 상태</p>
                    <p className={`font-medium flex items-center gap-1 ${approvalInfo.color}`}>
                      <ApprovalIcon className="w-3.5 h-3.5" />{approvalInfo.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">허가번호</p>
                    <p className="font-mono text-gray-700 text-xs">{selectedProduct.approvalNo}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">안전등급</p>
                    <span className={`inline-block px-2 py-0.5 rounded border text-xs font-medium ${gradeStyle.bg} ${gradeStyle.text} ${gradeStyle.border}`}>
                      {selectedProduct.safetyGrade}등급
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-gray-200">
                <button onClick={() => setSelectedProduct(null)} className="w-full px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  닫기
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
