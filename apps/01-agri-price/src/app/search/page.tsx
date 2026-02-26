'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, TrendingDown, TrendingUp } from 'lucide-react';

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
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
