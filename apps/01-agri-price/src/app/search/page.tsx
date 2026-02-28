'use client';

import { useState } from 'react';
import { Search, MapPin, TrendingDown, TrendingUp, X, Store, Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  priceChange: number;
  store: string;
  location: string;
  updatedAt: string;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: '배추', category: '엽경채류', price: 3200, unit: '1포기', priceChange: -5.2, store: '농협하나로마트 세종점', location: '세종시', updatedAt: '10분 전' },
  { id: '2', name: '쌀(20kg)', category: '곡류', price: 52800, unit: '20kg', priceChange: -1.3, store: '이마트 대전점', location: '대전시', updatedAt: '30분 전' },
  { id: '3', name: '삼겹살(국산)', category: '육류', price: 18900, unit: '100g', priceChange: 2.1, store: '홈플러스 세종점', location: '세종시', updatedAt: '15분 전' },
  { id: '4', name: '달걀(30구)', category: '난류', price: 6500, unit: '30구', priceChange: -3.8, store: '농협하나로마트 세종점', location: '세종시', updatedAt: '5분 전' },
  { id: '5', name: '사과(부사)', category: '과일류', price: 2800, unit: '1개', priceChange: -8.5, store: '롯데마트 대전점', location: '대전시', updatedAt: '20분 전' },
  { id: '6', name: '양파', category: '양채류', price: 1200, unit: '1개', priceChange: 1.5, store: '농협하나로마트 세종점', location: '세종시', updatedAt: '25분 전' },
];

const CATEGORIES = ['전체', '곡류', '엽경채류', '양채류', '과일류', '육류', '난류', '수산물'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchesQuery = !query || p.name.includes(query);
    const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-4">상품 검색</h1>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="품목명을 입력하세요 (예: 배추, 사과, 삼겹살)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-sm text-gray-500 mb-4">
          총 <span className="font-semibold text-gray-900">{filteredProducts.length}</span>건의 검색 결과
        </p>

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="w-full text-left bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm hover:border-primary-200 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    {product.store} · {product.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString()}원
                  </p>
                  <p className="text-xs text-gray-400">/ {product.unit}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                <div className={`flex items-center gap-1 text-xs font-medium ${
                  product.priceChange < 0 ? 'text-blue-600' : 'text-red-500'
                }`}>
                  {product.priceChange < 0 ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : (
                    <TrendingUp className="w-3 h-3" />
                  )}
                  전주 대비 {Math.abs(product.priceChange)}%
                  {product.priceChange < 0 ? ' 하락' : ' 상승'}
                </div>
                <span className="text-xs text-gray-400">{product.updatedAt}</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">{selectedProduct.name} 상세 정보</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">분류</span>
                <span className="text-sm font-medium text-gray-900">{selectedProduct.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">현재 가격</span>
                <span className="text-2xl font-bold text-primary-600">
                  {selectedProduct.price.toLocaleString()}원
                  <span className="text-sm font-normal text-gray-400 ml-1">/ {selectedProduct.unit}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">가격 변동</span>
                <span className={`text-sm font-semibold ${selectedProduct.priceChange < 0 ? 'text-blue-600' : 'text-red-500'}`}>
                  {selectedProduct.priceChange < 0 ? '▼' : '▲'} {Math.abs(selectedProduct.priceChange)}% (전주 대비)
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{selectedProduct.store}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{selectedProduct.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">업데이트: {selectedProduct.updatedAt}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedProduct(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                닫기
              </button>
              <button className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors">
                장보기 목록에 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
