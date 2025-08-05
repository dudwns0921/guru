import { Link } from 'react-router-dom'
import CourseList from '@/domains/course/components/CourseList'
import { useAuth } from '@/domains/auth/hooks/useAuth'
import { fetchCourses } from '@/domains/course/api/courseApi'
import { useQuery } from '@tanstack/react-query'
import { getPersonalizedCourses } from '@/domains/ai/api/aiApi'

function FirstClassMessage() {
  return (
    <div className="text-center py-8 bg-brand-50 dark:bg-brand-100 rounded-lg px-2 sm:px-8">
      <p className="text-lg text-sub mb-4 break-words" style={{ wordBreak: 'keep-all' }}>
        개인화된 학습 경험을 시작하고 싶다면 첫 수업을 시작해보세요!
      </p>
      <button className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
        첫 수업 시작하기
      </button>
    </div>
  )
}

function HomePage() {
  const { isAuthenticated } = useAuth()

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })

  const {
    data: personalizedCourses,
    isLoading: isPersonalizedLoading,
    error: personalizedError,
  } = useQuery({
    queryKey: ['personalizedCourses'],
    queryFn: () => getPersonalizedCourses(),
    enabled: isAuthenticated, // 로그인된 경우에만 호출
  })
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      <div className="flex flex-col gap-16">
        {/* Hero Section */}
        <div className="text-center px-2 py-4 sm:px-8">
          <h1
            className="text-4xl font-bold text-main mb-4 break-words"
            style={{ wordBreak: 'keep-all' }}
          >
            개인화된 학습 경험을 시작하세요
          </h1>
          <p
            className="text-xl text-sub mb-8 max-w-2xl mx-auto break-words"
            style={{ wordBreak: 'keep-all' }}
          >
            AI 기반 추천 시스템으로 당신에게 완벽한 강의를 찾아드립니다
          </p>
        </div>

        {/* Recommended Courses Section */}
        <div className="px-2 sm:px-8">
          <h2
            className="text-3xl font-bold text-center text-main mb-8 break-words"
            style={{ wordBreak: 'keep-all' }}
          >
            추천 강의
          </h2>
          {isAuthenticated ? (
            personalizedCourses && personalizedCourses.length > 0 ? (
              // 로그인된 상태에서 추천 강의가 있는 경우
              <CourseList
                courses={personalizedCourses}
                isLoading={isPersonalizedLoading}
                error={personalizedError}
              />
            ) : (
              // 로그인된 상태에서 추천 강의가 없는 경우
              <FirstClassMessage />
            )
          ) : (
            // 로그인되지 않은 상태
            <div className="text-center py-8 bg-brand-50 dark:bg-brand-100 rounded-lg px-2 sm:px-8">
              <p className="text-lg text-sub mb-4 break-words" style={{ wordBreak: 'keep-all' }}>
                개인화된 강의를 듣고 싶다면 로그인을 해주세요
              </p>
              <Link
                to="/auth/login"
                className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
              >
                로그인
              </Link>
            </div>
          )}
        </div>

        {/* All Courses Section */}
        <div className="px-2 sm:px-8">
          <h2
            className="text-3xl font-bold text-center text-main mb-8 break-words"
            style={{ wordBreak: 'keep-all' }}
          >
            전체 강의
          </h2>
          <CourseList courses={courses} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
