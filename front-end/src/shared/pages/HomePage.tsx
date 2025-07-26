import { Link } from 'react-router-dom'
import CourseList from '@/domains/course/components/CourseList'

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-main mb-4">개인화된 학습 경험을 시작하세요</h1>
          <p className="text-xl text-sub mb-8 max-w-2xl mx-auto">
            AI 기반 추천 시스템으로 당신에게 완벽한 강의를 찾아드립니다
          </p>
        </div>

        {/* Recommended Courses Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-main mb-8">추천 강의</h2>

          {/* Login Prompt */}
          <div className="text-center py-8 bg-brand-50 dark:bg-brand-100 rounded-lg">
            <p className="text-lg text-sub mb-4">개인화된 강의를 듣고 싶다면 로그인을 해주세요</p>
            <Link
              to="/auth/login"
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
            >
              로그인
            </Link>
          </div>
        </div>

        {/* All Courses Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-main mb-8">전체 강의</h2>
          <CourseList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
