'use client';

import { useState } from 'react';
import { Clock, Users, Sparkles, ArrowLeft, ChefHat } from 'lucide-react';
import Link from 'next/link';

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: '쉬움' | '보통' | '어려움';
  ingredients: { name: string; isSeasonalDeal: boolean }[];
  estimatedCost: number;
  savingsPercent: number;
  tags: string[];
}

const SAMPLE_RECIPES: Recipe[] = [
  {
    id: '1',
    title: '배추된장국',
    description: '제철 배추로 만드는 구수한 된장국. 간단하면서도 영양 만점입니다.',
    cookTime: '20분',
    servings: 4,
    difficulty: '쉬움',
    ingredients: [
      { name: '배추', isSeasonalDeal: true },
      { name: '된장', isSeasonalDeal: false },
      { name: '두부', isSeasonalDeal: false },
      { name: '대파', isSeasonalDeal: true },
    ],
    estimatedCost: 5200,
    savingsPercent: 35,
    tags: ['국/찌개', '제철', '절약'],
  },
  {
    id: '2',
    title: '사과 샐러드',
    description: '시즌 사과 대량 출하 시기! 상큼한 사과 샐러드로 즐겨보세요.',
    cookTime: '10분',
    servings: 2,
    difficulty: '쉬움',
    ingredients: [
      { name: '사과', isSeasonalDeal: true },
      { name: '양배추', isSeasonalDeal: false },
      { name: '요거트', isSeasonalDeal: false },
    ],
    estimatedCost: 3800,
    savingsPercent: 28,
    tags: ['샐러드', '제철', '다이어트'],
  },
  {
    id: '3',
    title: '양파 볶음밥',
    description: '달달한 양파를 듬뿍 넣은 볶음밥. 남은 밥 활용에 딱!',
    cookTime: '15분',
    servings: 2,
    difficulty: '쉬움',
    ingredients: [
      { name: '양파', isSeasonalDeal: true },
      { name: '달걀', isSeasonalDeal: true },
      { name: '밥', isSeasonalDeal: false },
      { name: '간장', isSeasonalDeal: false },
    ],
    estimatedCost: 2800,
    savingsPercent: 42,
    tags: ['볶음', '제철', '간편식'],
  },
];

export default function RecipesPage() {
  const [selectedTag, setSelectedTag] = useState('전체');
  const allTags = ['전체', '제철', '절약', '간편식', '국/찌개', '볶음', '샐러드'];

  const filteredRecipes = selectedTag === '전체'
    ? SAMPLE_RECIPES
    : SAMPLE_RECIPES.filter((r) => r.tags.includes(selectedTag));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">절약 레시피</h1>
            <div className="ml-auto flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded">
              <Sparkles className="w-3 h-3" />
              AI 추천
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Recipe Image Placeholder */}
              <div className="h-40 bg-gradient-to-br from-orange-100 to-yellow-50 flex items-center justify-center">
                <ChefHat className="w-12 h-12 text-orange-300" />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{recipe.title}</h3>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">
                    {recipe.savingsPercent}% 절약
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{recipe.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {recipe.cookTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {recipe.servings}인분
                  </span>
                  <span>{recipe.difficulty}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {recipe.ingredients.map((ing) => (
                    <span
                      key={ing.name}
                      className={`text-xs px-2 py-0.5 rounded ${
                        ing.isSeasonalDeal
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'bg-gray-50 text-gray-500'
                      }`}
                    >
                      {ing.name}
                      {ing.isSeasonalDeal && ' ↓'}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    약 {recipe.estimatedCost.toLocaleString()}원
                  </span>
                  <div className="flex gap-1">
                    {recipe.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-400">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
