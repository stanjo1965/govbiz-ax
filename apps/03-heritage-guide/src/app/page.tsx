import Link from 'next/link';
import {
  MessageCircle,
  Map,
  Globe,
  Accessibility,
  Landmark,
  Search,
  Route,
  MapPin,
  Star,
  Clock,
  Users,
  ChevronRight,
} from 'lucide-react';

const featuredHeritage = [
  {
    name: '경복궁',
    nameEn: 'Gyeongbokgung Palace',
    location: '서울특별시 종로구',
    era: '조선시대 (1395)',
    unesco: false,
    type: '궁궐',
    description: '조선 왕조의 법궁으로, 한국을 대표하는 궁궐 건축의 정수',
  },
  {
    name: '석굴암',
    nameEn: 'Seokguram Grotto',
    location: '경상북도 경주시',
    era: '통일신라 (751)',
    unesco: true,
    type: '사찰',
    description: '세계적으로 유래가 없는 석조 인공 석굴 사원',
  },
  {
    name: '해인사 장경판전',
    nameEn: 'Haeinsa Temple',
    location: '경상남도 합천군',
    era: '고려시대 (1398)',
    unesco: true,
    type: '사찰',
    description: '팔만대장경을 보관하는 세계 유일의 대장경 보관 건물',
  },
  {
    name: '수원화성',
    nameEn: 'Hwaseong Fortress',
    location: '경기도 수원시',
    era: '조선시대 (1796)',
    unesco: true,
    type: '성곽',
    description: '정조의 효심과 실학 정신이 담긴 근대적 성곽',
  },
  {
    name: '종묘',
    nameEn: 'Jongmyo Shrine',
    location: '서울특별시 종로구',
    era: '조선시대 (1394)',
    unesco: true,
    type: '궁궐',
    description: '조선 왕과 왕비의 신위를 모신 유교 사당',
  },
  {
    name: '창덕궁',
    nameEn: 'Changdeokgung Palace',
    location: '서울특별시 종로구',
    era: '조선시대 (1405)',
    unesco: true,
    type: '궁궐',
    description: '자연과 조화를 이룬 한국 궁궐 건축의 걸작',
  },
];

const features = [
  {
    icon: MessageCircle,
    title: 'AI 해설사 채팅',
    description: '유산에 대한 궁금증을 AI 해설사에게 실시간으로 질문하고 답변을 받으세요',
    href: '/chat',
  },
  {
    icon: Route,
    title: '관광 루트 추천',
    description: '지역별, 테마별 맞춤 관광 루트를 AI가 추천해 드립니다',
    href: '/routes',
  },
  {
    icon: Globe,
    title: '4개국어 지원',
    description: '한국어, English, 中文, 日本語로 해설을 제공합니다',
    href: '/chat',
  },
  {
    icon: Accessibility,
    title: '접근성 모드',
    description: '시각장애, 청각장애 등 다양한 접근성 요구를 지원합니다',
    href: '/chat',
  },
];

const stats = [
  { label: '등록 유산', value: '3,800건', icon: Landmark },
  { label: 'AI 해설 제공', value: '2,400건', icon: MessageCircle },
  { label: '이용자 만족도', value: '94%', icon: Star },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header */}
      <div className="bg-gray-800 text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium">대한민국 정부</span>
            <span className="text-gray-400">|</span>
            <span>국가유산청</span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span>로그인</span>
            <span>|</span>
            <span>회원가입</span>
          </div>
        </div>
      </div>

      {/* App Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <Landmark className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gray-900">AI 국가유산 해설</h1>
                <p className="text-[10px] text-gray-500 -mt-0.5">Cultural Heritage AI Guide</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <Link href="/heritage" className="hover:text-primary-600 transition-colors">유산 검색</Link>
              <Link href="/chat" className="hover:text-primary-600 transition-colors">AI 해설</Link>
              <Link href="/routes" className="hover:text-primary-600 transition-colors">추천 경로</Link>
              <Link href="/map" className="hover:text-primary-600 transition-colors">유산 지도</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link
                href="/chat"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                AI 해설 시작
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
              <Landmark className="w-4 h-4" />
              <span>국가유산청 공식 AI 해설 서비스</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              AI 해설사와 함께하는
              <br />
              <span className="text-primary-200">국가유산 여행</span>
            </h2>
            <p className="text-lg text-primary-100 mb-8 leading-relaxed">
              대한민국의 소중한 국가유산을 AI 해설사가 생생하게 안내합니다.
              궁궐, 사찰, 성곽 등 다양한 유산에 대한 심층 해설과
              맞춤형 관광 루트를 경험하세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                AI 해설 시작하기
              </Link>
              <Link
                href="/heritage"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                <Search className="w-5 h-5" />
                유산 검색하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Heritage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">주요 국가유산</h3>
              <p className="text-gray-500 mt-1">대한민국을 대표하는 국가유산을 만나보세요</p>
            </div>
            <Link
              href="/heritage"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1"
            >
              전체보기 <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHeritage.map((item) => (
              <Link
                key={item.name}
                href={`/chat?heritage=${encodeURIComponent(item.name)}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all group"
              >
                <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                  <Landmark className="w-16 h-16 text-primary-300 group-hover:text-primary-400 transition-colors" />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400">{item.nameEn}</p>
                    </div>
                    {item.unesco && (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">
                        <Globe className="w-3 h-3" />
                        UNESCO
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.era}
                    </span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      {item.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">AI 해설 서비스 기능</h3>
            <p className="text-gray-500 mt-2">첨단 AI 기술로 국가유산을 더 깊이 이해하세요</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-gray-50 rounded-xl p-6 hover:bg-primary-50 hover:border-primary-200 border border-gray-200 transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">지금 바로 AI 해설사와 대화를 시작하세요</h3>
          <p className="text-primary-200 mb-8 text-lg">
            궁금한 유산에 대해 질문하면, AI 해설사가 역사, 건축, 문화적 의미를 상세히 알려드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 bg-white text-primary-700 px-8 py-3.5 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              AI 해설 시작하기
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              <Map className="w-5 h-5" />
              유산 지도 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold">AI 국가유산 해설</span>
              </div>
              <p className="text-sm leading-relaxed">
                국가유산청이 제공하는 AI 기반 국가유산 해설 솔루션입니다.
                대한민국의 소중한 유산을 첨단 AI 기술로 더 쉽고 재미있게 만나보세요.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/chat" className="hover:text-white transition-colors">AI 해설</Link></li>
                <li><Link href="/heritage" className="hover:text-white transition-colors">유산 검색</Link></li>
                <li><Link href="/routes" className="hover:text-white transition-colors">추천 경로</Link></li>
                <li><Link href="/map" className="hover:text-white transition-colors">유산 지도</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li><span>전화: 1600-0064</span></li>
                <li><span>이메일: heritage@korea.kr</span></li>
                <li><span>운영시간: 09:00-18:00</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs">
              <span>개인정보처리방침</span>
              <span className="text-gray-700">|</span>
              <span>이용약관</span>
              <span className="text-gray-700">|</span>
              <span>접근성 정책</span>
            </div>
            <p className="text-xs text-gray-500">
              &copy; 국가유산청 (Korea Heritage Service). All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
