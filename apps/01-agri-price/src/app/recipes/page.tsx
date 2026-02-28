'use client';

import { useState } from 'react';
import { Clock, Users, Sparkles, ArrowLeft, ChefHat, X, Flame } from 'lucide-react';
import Link from 'next/link';

interface Recipe {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  servings: number;
  difficulty: '쉬움' | '보통' | '어려움';
  ingredients: { name: string; amount: string; isSeasonalDeal: boolean }[];
  steps: string[];
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
      { name: '배추', amount: '1/4포기', isSeasonalDeal: true },
      { name: '된장', amount: '2큰술', isSeasonalDeal: false },
      { name: '두부', amount: '1/2모', isSeasonalDeal: false },
      { name: '대파', amount: '1/2대', isSeasonalDeal: true },
    ],
    steps: [
      '배추를 한입 크기로 썰어둡니다.',
      '냄비에 물 600ml를 끓이고 된장을 풀어줍니다.',
      '배추와 두부를 넣고 10분간 끓입니다.',
      '대파를 송송 썰어 마지막에 넣고 2분 더 끓입니다.',
      '간을 보고 부족하면 소금으로 조절합니다.',
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
      { name: '사과', amount: '1개', isSeasonalDeal: true },
      { name: '양배추', amount: '150g', isSeasonalDeal: false },
      { name: '요거트', amount: '3큰술', isSeasonalDeal: false },
    ],
    steps: [
      '사과는 씨를 제거하고 얇게 슬라이스합니다.',
      '양배추는 채 썰어 냉수에 담가둡니다.',
      '요거트에 꿀 1작은술, 레몬즙을 섞어 드레싱을 만듭니다.',
      '재료를 그릇에 담고 드레싱을 뿌려 완성합니다.',
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
      { name: '양파', amount: '1개', isSeasonalDeal: true },
      { name: '달걀', amount: '2개', isSeasonalDeal: true },
      { name: '밥', amount: '2공기', isSeasonalDeal: false },
      { name: '간장', amount: '1큰술', isSeasonalDeal: false },
    ],
    steps: [
      '양파를 잘게 다집니다.',
      '달군 팬에 기름을 두르고 양파를 볶아 반투명해지도록 합니다.',
      '달걀을 풀어 넣고 스크램블합니다.',
      '밥을 넣고 간장을 뿌려 섞으며 볶습니다.',
      '소금, 후추로 간을 맞춥니다.',
    ],
    estimatedCost: 2800,
    savingsPercent: 42,
    tags: ['볶음', '제철', '간편식'],
  },
];

const difficultyColor = {
  '쉬움': 'text-green-600 bg-green-50',
  '보통': 'text-amber-600 bg-amber-50',
  '어려움': 'text-red-600 bg-red-50',
};

export default function RecipesPage() {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
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
            <button
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="text-left bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-primary-200 transition-all"
            >
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
                  <span className={`px-1.5 py-0.5 rounded text-xs ${difficultyColor[recipe.difficulty]}`}>
                    {recipe.difficulty}
                  </span>
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
            </button>
          ))}
        </div>
      </main>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-lg font-bold text-gray-900">{selectedRecipe.title}</h2>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-5">
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />{selectedRecipe.cookTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />{selectedRecipe.servings}인분
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />{selectedRecipe.difficulty}
                </span>
                <span className="ml-auto text-green-600 font-semibold">
                  {selectedRecipe.savingsPercent}% 절약
                </span>
              </div>

              <p className="text-sm text-gray-600">{selectedRecipe.description}</p>

              {/* Ingredients */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">재료</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing) => (
                    <div
                      key={ing.name}
                      className={`flex items-center justify-between p-2.5 rounded-lg ${
                        ing.isSeasonalDeal ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      <span className={`text-sm font-medium ${ing.isSeasonalDeal ? 'text-blue-700' : 'text-gray-700'}`}>
                        {ing.name}{ing.isSeasonalDeal && ' ↓'}
                      </span>
                      <span className="text-sm text-gray-500">{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">조리 순서</h3>
                <ol className="space-y-3">
                  {selectedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Cost */}
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">예상 재료비</span>
                  <span className="text-xl font-bold text-green-700">
                    약 {selectedRecipe.estimatedCost.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-full px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
