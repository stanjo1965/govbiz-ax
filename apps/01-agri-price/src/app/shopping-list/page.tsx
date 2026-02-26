'use client';

import { useState } from 'react';
import { Plus, Trash2, Check, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  estimatedPrice: number;
  checked: boolean;
  bestStore?: string;
}

export default function ShoppingListPage() {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: '1', name: '배추', quantity: '2포기', estimatedPrice: 6400, checked: false, bestStore: '농협하나로마트' },
    { id: '2', name: '달걀(30구)', quantity: '1팩', estimatedPrice: 6500, checked: false, bestStore: '이마트' },
    { id: '3', name: '삼겹살', quantity: '600g', estimatedPrice: 11340, checked: false, bestStore: '홈플러스' },
    { id: '4', name: '양파', quantity: '5개', estimatedPrice: 6000, checked: true, bestStore: '농협하나로마트' },
  ]);
  const [newItemName, setNewItemName] = useState('');

  const totalEstimate = items.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const remainingEstimate = items
    .filter((item) => !item.checked)
    .reduce((sum, item) => sum + item.estimatedPrice, 0);

  const addItem = () => {
    if (!newItemName.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        name: newItemName.trim(),
        quantity: '1개',
        estimatedPrice: 0,
        checked: false,
      },
    ]);
    setNewItemName('');
  };

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">장보기 목록</h1>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-gray-500">예상 총액 </span>
              <span className="font-bold text-gray-900">{totalEstimate.toLocaleString()}원</span>
            </div>
            <div>
              <span className="text-gray-500">남은 금액 </span>
              <span className="font-bold text-primary-600">{remainingEstimate.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Add Item */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder="품목 추가 (예: 감자)"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            onClick={addItem}
            className="px-4 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* AI Suggestion */}
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">AI 추천</span>
          </div>
          <p className="text-sm text-purple-600">
            농협하나로마트 세종점에서 3개 품목을 한번에 구매하면 약 2,400원 절약할 수 있어요!
          </p>
        </div>

        {/* Item List */}
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 bg-white rounded-lg border p-4 transition-colors ${
                item.checked ? 'border-gray-100 bg-gray-50' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  item.checked
                    ? 'bg-primary-500 border-primary-500'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                {item.checked && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className={`flex-1 ${item.checked ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${item.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                    {item.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">
                    {item.estimatedPrice > 0 ? `${item.estimatedPrice.toLocaleString()}원` : '-'}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{item.quantity}</span>
                  {item.bestStore && (
                    <span className="text-xs text-green-600">최저가: {item.bestStore}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 text-gray-300 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
