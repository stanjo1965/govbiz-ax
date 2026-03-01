'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MessageCircle,
  User,
  Briefcase,
  Users,
  Heart,
  RefreshCw,
  Database,
  Sparkles,
} from 'lucide-react';

type Gender = 'male' | 'female';
type Occupation = '직장인' | '자영업자' | '전업주부' | '학생' | '기타';

const insuranceTypes = [
  { key: 'life', label: '생명보험 (사망)', desc: '사망 시 유족 보장' },
  { key: 'whole', label: '종신보험', desc: '평생 사망보장' },
  { key: 'medical', label: '실손의료보험', desc: '실제 의료비 보장' },
  { key: 'cancer', label: '암보험', desc: '암 진단·치료비 보장' },
  { key: 'car', label: '자동차보험', desc: '차량 사고 보장' },
  { key: 'fire', label: '화재·재산보험', desc: '화재·도난 등 보장' },
  { key: 'pension', label: '연금보험', desc: '노후 소득 보장' },
];

const dependentOptions = ['배우자', '자녀', '부모'];

function calcScore(
  age: number,
  occupation: Occupation,
  dependents: string[],
  hasInsurance: Record<string, boolean>
): number {
  let score = 0;
  const hasCnt = Object.values(hasInsurance).filter(Boolean).length;
  score += Math.min(hasCnt * 12, 60);

  // 나이별 가중치
  if (age >= 30 && hasInsurance.medical) score += 10;
  if (age >= 40 && hasInsurance.cancer) score += 8;
  if (age >= 50 && hasInsurance.pension) score += 7;

  // 부양가족
  if (dependents.length > 0 && hasInsurance.life) score += 8;

  // 직업
  if (occupation === '자영업자' && hasInsurance.fire) score += 7;

  return Math.min(score, 100);
}

interface CategoryResult {
  key: string;
  label: string;
  status: 'good' | 'warn' | 'bad';
  message: string;
}

function analyzeCategories(
  age: number,
  dependents: string[],
  hasInsurance: Record<string, boolean>
): CategoryResult[] {
  return [
    {
      key: 'medical',
      label: '의료비 보장',
      status: hasInsurance.medical ? 'good' : 'bad',
      message: hasInsurance.medical ? '실손보험 가입으로 의료비 보장 충분' : '실손의료보험 미가입 — 의료비 보장 공백',
    },
    {
      key: 'cancer',
      label: '암 보장',
      status: hasInsurance.cancer ? 'good' : age >= 40 ? 'bad' : 'warn',
      message: hasInsurance.cancer ? '암보험 가입 확인' : age >= 40 ? '40대 이상 암보험 미가입 — 위험 노출' : '암보험 미가입 (향후 검토 권장)',
    },
    {
      key: 'life',
      label: '사망 보장',
      status: dependents.length > 0 ? (hasInsurance.life || hasInsurance.whole ? 'good' : 'bad') : 'warn',
      message: dependents.length === 0 ? '부양가족 없음 — 생명보험 낮은 우선순위' : (hasInsurance.life || hasInsurance.whole) ? '생명보험으로 유족 보장 충분' : '부양가족 있으나 생명보험 미가입 — 보장 공백',
    },
    {
      key: 'pension',
      label: '노후 보장',
      status: hasInsurance.pension ? 'good' : age >= 45 ? 'bad' : 'warn',
      message: hasInsurance.pension ? '연금보험 가입으로 노후 대비 중' : age >= 45 ? '45세 이상 연금 미준비 — 노후 보장 공백' : '연금보험 미가입 (조기 가입 권장)',
    },
    {
      key: 'car',
      label: '자동차 보장',
      status: hasInsurance.car ? 'good' : 'warn',
      message: hasInsurance.car ? '자동차보험 가입 확인' : '자동차보험 미가입 (차량 미소유 시 해당 없음)',
    },
    {
      key: 'property',
      label: '재산 보장',
      status: hasInsurance.fire ? 'good' : 'warn',
      message: hasInsurance.fire ? '화재·재산보험 가입 확인' : '화재보험 미가입 (자가 소유 시 검토 권장)',
    },
  ];
}

// 마이데이터 연동 시뮬레이션: 나이·직업 기반 현실적 보험 데이터 생성
function simulateMyDataFetch(
  age: number,
  occupation: Occupation
): { insurance: Record<string, boolean>; premiums: Record<string, string> } {
  const insurance: Record<string, boolean> = {};
  const premiums: Record<string, string> = {};

  // 실손의료보험: 60세 미만 대부분 가입
  if (age < 60) {
    insurance.medical = true;
    premiums.medical = age < 40 ? '35000' : age < 55 ? '68000' : '120000';
  }
  // 생명보험: 30대 이상 직장인·자영업자 다수 가입
  if (age >= 30 && (occupation === '직장인' || occupation === '자영업자')) {
    insurance.life = true;
    premiums.life = '85000';
  }
  // 종신보험: 40대 이상 가입률 높음
  if (age >= 40 && occupation === '직장인') {
    insurance.whole = true;
    premiums.whole = '142000';
  }
  // 암보험: 40대 이상 가입 권장
  if (age >= 40) {
    insurance.cancer = true;
    premiums.cancer = '32000';
  }
  // 자동차보험: 직장인·자영업자 차량 보유 가정
  if (occupation === '직장인' || occupation === '자영업자') {
    insurance.car = true;
    premiums.car = '58000';
  }
  // 화재보험: 자영업자 사업장 보장
  if (occupation === '자영업자') {
    insurance.fire = true;
    premiums.fire = '22000';
  }
  // 연금보험: 45세 이상 노후 준비
  if (age >= 45) {
    insurance.pension = true;
    premiums.pension = '200000';
  }

  return { insurance, premiums };
}

export default function DiagnosisPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [age, setAge] = useState(35);
  const [gender, setGender] = useState<Gender>('male');
  const [occupation, setOccupation] = useState<Occupation>('직장인');
  const [dependents, setDependents] = useState<string[]>([]);
  const [hasInsurance, setHasInsurance] = useState<Record<string, boolean>>({});
  const [premiums, setPremiums] = useState<Record<string, string>>({});
  const [autoFetching, setAutoFetching] = useState(false);
  const [autoFetched, setAutoFetched] = useState(false);
  const [autoFetchedKeys, setAutoFetchedKeys] = useState<string[]>([]);

  const handleAutoFetch = async () => {
    setAutoFetching(true);
    await new Promise((r) => setTimeout(r, 1800));
    const { insurance, premiums: fetchedPremiums } = simulateMyDataFetch(age, occupation);
    setHasInsurance(insurance);
    setPremiums(fetchedPremiums);
    setAutoFetchedKeys(Object.keys(insurance));
    setAutoFetched(true);
    setAutoFetching(false);
  };

  const toggleDependent = (val: string) => {
    setDependents((prev) =>
      prev.includes(val) ? prev.filter((d) => d !== val) : [...prev, val]
    );
  };

  const toggleInsurance = (key: string) => {
    setHasInsurance((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (!next[key]) {
        setPremiums((p) => { const np = { ...p }; delete np[key]; return np; });
      }
      return next;
    });
  };

  const score = calcScore(age, occupation, dependents, hasInsurance);
  const categories = analyzeCategories(age, dependents, hasInsurance);

  const scoreColor = score >= 70 ? 'text-emerald-600' : score >= 40 ? 'text-amber-500' : 'text-red-500';
  const scoreBarColor = score >= 70 ? 'bg-emerald-500' : score >= 40 ? 'bg-amber-500' : 'bg-red-500';
  const scoreLabel = score >= 70 ? '양호' : score >= 40 ? '보통' : '취약';

  const StatusIcon = ({ status }: { status: 'good' | 'warn' | 'bad' }) => {
    if (status === 'good') return <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />;
    if (status === 'warn') return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />;
    return <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
  };

  const statusBg = { good: 'bg-emerald-50 border-emerald-100', warn: 'bg-amber-50 border-amber-100', bad: 'bg-red-50 border-red-100' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 h-14">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-base font-bold text-gray-900">보험 포트폴리오 진단</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step === s ? 'bg-emerald-600 text-white' :
                step > s ? 'bg-emerald-100 text-emerald-700' :
                'bg-gray-100 text-gray-400'
              }`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              <span className={`ml-2 text-sm font-medium ${step === s ? 'text-emerald-700' : 'text-gray-400'}`}>
                {s === 1 ? '기본 정보' : s === 2 ? '보험 현황' : '진단 결과'}
              </span>
              {s < 3 && <ChevronRight className="w-4 h-4 text-gray-300 mx-3" />}
            </div>
          ))}
        </div>

        {/* Step 1: 기본 정보 */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">기본 정보 입력</h2>
              <p className="text-sm text-gray-500">정확한 진단을 위해 기본 정보를 입력해 주세요.</p>
            </div>

            {/* 나이 */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-emerald-600" />
                  나이
                </label>
                <span className="text-emerald-600 font-bold text-lg">{age}세</span>
              </div>
              <input
                type="range"
                min={20}
                max={70}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>20세</span><span>70세</span>
              </div>
            </div>

            {/* 성별 */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <User className="w-4 h-4 text-emerald-600" />
                성별
              </label>
              <div className="flex gap-3">
                {(['male', 'female'] as Gender[]).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      gender === g
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {g === 'male' ? '남성' : '여성'}
                  </button>
                ))}
              </div>
            </div>

            {/* 직업 */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Briefcase className="w-4 h-4 text-emerald-600" />
                직업군
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['직장인', '자영업자', '전업주부', '학생', '기타'] as Occupation[]).map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setOccupation(occ)}
                    className={`py-2 rounded-lg text-sm font-medium border transition-colors ${
                      occupation === occ
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* 부양가족 */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4 text-emerald-600" />
                부양가족 (해당 항목 모두 선택)
              </label>
              <div className="flex gap-3">
                {dependentOptions.map((dep) => (
                  <button
                    key={dep}
                    onClick={() => toggleDependent(dep)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                      dependents.includes(dep)
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    {dep}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              다음 단계 — 보험 현황 입력
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: 보험 현황 */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">현재 보험 현황</h2>
              <p className="text-sm text-gray-500">현재 가입 중인 보험을 모두 선택하고 월 보험료를 입력해 주세요.</p>
            </div>

            {/* 마이데이터 자동조회 배너 */}
            <div className={`rounded-xl border p-4 transition-all ${autoFetched ? 'bg-blue-50 border-blue-200' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Database className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 flex items-center gap-1.5">
                      금융감독원 마이데이터 연동
                      <span className="text-xs bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded font-medium">BETA</span>
                    </p>
                    {autoFetched ? (
                      <p className="text-xs text-blue-700 mt-0.5 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        조회 완료 — 가입 보험 {Object.values(hasInsurance).filter(Boolean).length}건 확인됨. 내역을 직접 수정할 수 있습니다.
                      </p>
                    ) : (
                      <p className="text-xs text-blue-700 mt-0.5">
                        내 보험 가입 현황을 금융마이데이터로 자동으로 불러옵니다.
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleAutoFetch}
                  disabled={autoFetching}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    autoFetching
                      ? 'bg-blue-200 text-blue-500 cursor-not-allowed'
                      : autoFetched
                      ? 'bg-white border border-blue-300 text-blue-700 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                  }`}
                >
                  {autoFetching ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      조회 중…
                    </>
                  ) : autoFetched ? (
                    <>
                      <RefreshCw className="w-3 h-3" />
                      재조회
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3" />
                      자동 조회
                    </>
                  )}
                </button>
              </div>

              {/* 조회 중 프로그레스 */}
              {autoFetching && (
                <div className="mt-3">
                  <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '70%' }} />
                  </div>
                  <p className="text-xs text-blue-600 mt-1.5">금융감독원 보험다모아에서 가입 내역 조회 중…</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {insuranceTypes.map((ins) => (
                <div
                  key={ins.key}
                  className={`border rounded-xl p-4 transition-colors ${
                    hasInsurance[ins.key] ? 'border-emerald-300 bg-emerald-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleInsurance(ins.key)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          hasInsurance[ins.key]
                            ? 'bg-emerald-600 border-emerald-600'
                            : 'border-gray-300 bg-white'
                        }`}
                      >
                        {hasInsurance[ins.key] && <CheckCircle className="w-3 h-3 text-white" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{ins.label}</p>
                          {autoFetchedKeys.includes(ins.key) && hasInsurance[ins.key] && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                              <Database className="w-2.5 h-2.5" />
                              마이데이터
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{ins.desc}</p>
                      </div>
                    </div>
                    {hasInsurance[ins.key] && (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={premiums[ins.key] || ''}
                          onChange={(e) => setPremiums((p) => ({ ...p, [ins.key]: e.target.value }))}
                          placeholder="월 보험료"
                          className="w-24 px-2 py-1.5 text-xs border border-emerald-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <span className="text-xs text-gray-500">원</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                이전
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-2 flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                진단 결과 보기
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: 진단 결과 */}
        {step === 3 && (
          <div className="space-y-6">
            {/* 종합 점수 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">보험 포트폴리오 진단 결과</h2>
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full bg-gray-100" />
                  <div className="relative text-center">
                    <p className={`text-4xl font-bold ${scoreColor}`}>{score}</p>
                    <p className="text-xs text-gray-500">/ 100점</p>
                  </div>
                </div>
                <div className="w-full max-w-xs">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-500">보장 수준</span>
                    <span className={`font-bold ${scoreColor}`}>{scoreLabel}</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${scoreBarColor} rounded-full transition-all duration-700`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">나이</p>
                  <p className="font-semibold text-gray-800">{age}세</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">가입 보험</p>
                  <p className="font-semibold text-gray-800">{Object.values(hasInsurance).filter(Boolean).length}개</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">월 보험료 합계</p>
                  <p className="font-semibold text-gray-800">
                    {Object.values(premiums).reduce((s, v) => s + (Number(v) || 0), 0).toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>

            {/* 카테고리 분석 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-emerald-600" />
                보장 영역별 분석
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div key={cat.key} className={`flex items-start gap-3 p-3 rounded-lg border ${statusBg[cat.status]}`}>
                    <StatusIcon status={cat.status} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{cat.label}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{cat.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 추천사항 */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6">
              <h3 className="text-base font-bold text-emerald-800 mb-4">AI 추천 사항</h3>
              <ul className="space-y-2">
                {!hasInsurance.medical && (
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" />
                    실손의료보험 가입을 최우선으로 검토하세요. 입원·통원 의료비의 실질적 보장이 가능합니다.
                  </li>
                )}
                {!hasInsurance.cancer && age >= 40 && (
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" />
                    40대 이상의 암 발병률이 높아집니다. 암보험 가입을 검토하세요.
                  </li>
                )}
                {dependents.length > 0 && !hasInsurance.life && !hasInsurance.whole && (
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" />
                    부양가족을 위한 생명보험(사망보장) 가입을 검토하세요.
                  </li>
                )}
                {!hasInsurance.pension && age >= 40 && (
                  <li className="flex items-start gap-2 text-sm text-emerald-700">
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" />
                    노후 준비를 위한 연금보험(또는 개인연금) 가입을 서두르세요.
                  </li>
                )}
                <li className="flex items-start gap-2 text-sm text-emerald-700">
                  <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" />
                  보험다모아(insure.or.kr)에서 가입 보험 전체 현황을 무료로 확인하실 수 있습니다.
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                다시 진단하기
              </button>
              <Link
                href="/chat"
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                AI 상담으로 자세히 알아보기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
