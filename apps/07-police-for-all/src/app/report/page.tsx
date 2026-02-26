'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Upload, MapPin, FileText, Eye, EyeOff, Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

type ReportType = '교통위반' | '불법주정차' | '소음공해' | '기타';

interface ReportHistory {
  id: string;
  type: ReportType;
  description: string;
  location: string;
  date: string;
  status: '접수완료' | '처리중' | '처리완료';
  isAnonymous: boolean;
}

const reportTypes: { value: ReportType; label: string; description: string }[] = [
  { value: '교통위반', label: '교통위반', description: '신호위반, 과속, 음주운전 등' },
  { value: '불법주정차', label: '불법주정차', description: '소방차 전용구역, 횡단보도, 교차로 등' },
  { value: '소음공해', label: '소음공해', description: '층간소음, 공사장 소음, 생활소음 등' },
  { value: '기타', label: '기타', description: '기타 공익 신고 사항' },
];

const sampleHistory: ReportHistory[] = [
  {
    id: 'RPT-2026-0142',
    type: '불법주정차',
    description: '소방차 전용구역에 차량 주차',
    location: '서울 강남구 테헤란로 152',
    date: '2026-02-25',
    status: '처리중',
    isAnonymous: false,
  },
  {
    id: 'RPT-2026-0098',
    type: '교통위반',
    description: '스쿨존 내 과속 차량 목격',
    location: '서울 서초구 반포대로 58',
    date: '2026-02-22',
    status: '처리완료',
    isAnonymous: true,
  },
  {
    id: 'RPT-2026-0067',
    type: '소음공해',
    description: '심야시간 공사장 소음',
    location: '서울 마포구 와우산로 94',
    date: '2026-02-18',
    status: '처리완료',
    isAnonymous: false,
  },
];

function getStatusStyle(status: ReportHistory['status']): string {
  switch (status) {
    case '접수완료': return 'text-blue-700 bg-blue-50 border-blue-200';
    case '처리중': return 'text-orange-700 bg-orange-50 border-orange-200';
    case '처리완료': return 'text-green-700 bg-green-50 border-green-200';
  }
}

function getStatusIcon(status: ReportHistory['status']) {
  switch (status) {
    case '접수완료': return Clock;
    case '처리중': return AlertCircle;
    case '처리완료': return CheckCircle;
  }
}

export default function ReportPage() {
  const [selectedType, setSelectedType] = useState<ReportType>('교통위반');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('신고가 접수되었습니다. (데모 모드)');
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
            <h1 className="text-sm font-semibold">공익신고</h1>
            <p className="text-xs text-navy-200">교통위반, 불법주정차 등 공익 신고 접수</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">신고 접수</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Report Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">신고 유형</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {reportTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSelectedType(type.value)}
                        className={`text-left p-4 rounded-lg border-2 transition-all ${
                          selectedType === type.value
                            ? 'border-navy-500 bg-navy-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className={`block text-sm font-semibold ${
                          selectedType === type.value ? 'text-navy-700' : 'text-gray-900'
                        }`}>
                          {type.label}
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">{type.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    발생 장소
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="주소 또는 장소명을 입력하세요"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    상세 내용
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="신고 내용을 상세히 작성해 주세요. (일시, 상황, 차량번호 등)"
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">증거 파일 첨부</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-navy-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">클릭하여 파일을 업로드하세요</p>
                    <p className="text-xs text-gray-400">이미지, 영상 파일 (최대 50MB)</p>
                  </div>
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {isAnonymous ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">익명 신고</p>
                      <p className="text-xs text-gray-500">신고자 정보를 비공개로 처리합니다</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isAnonymous ? 'bg-navy-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isAnonymous ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-navy-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  신고 접수하기
                </button>
              </form>
            </div>
          </div>

          {/* Report History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">신고 내역</h2>
              <div className="space-y-4">
                {sampleHistory.map((report) => {
                  const StatusIcon = getStatusIcon(report.status);
                  return (
                    <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-gray-400">{report.id}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusStyle(report.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {report.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{report.description}</h4>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {report.type}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.date}
                        </div>
                        {report.isAnonymous && (
                          <div className="flex items-center gap-1 text-gray-400">
                            <EyeOff className="w-3 h-3" />
                            익명 신고
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
