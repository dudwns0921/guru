import { Link } from 'react-router-dom'
import CourseList from '@/domains/course/components/CourseList'
import { useAuth } from '@/domains/auth/hooks/useAuth'
import { fetchCourses } from '@/domains/course/api/courseApi'
import { useQuery } from '@tanstack/react-query'
import { getPersonalizedCourses } from '@/domains/ai/api/aiApi'
import type { Course } from '@/domains/course/types/course'

interface FirstClassMessageProps {
  courses: Course[] | undefined
}

function FirstClassMessage({ courses }: FirstClassMessageProps) {
  // 랜덤 코스 ID 생성 함수
  const getRandomCourseId = () => {
    if (!courses || courses.length === 0) return 1 // 기본값
    const randomIndex = Math.floor(Math.random() * courses.length)
    return courses[randomIndex].id
  }

  return (
    <div className="text-center py-8 bg-brand-50 dark:bg-brand-100 rounded-lg px-2 sm:px-8">
      <p className="text-lg text-sub mb-4 break-words" style={{ wordBreak: 'keep-all' }}>
        개인화된 학습 경험을 시작하고 싶다면 첫 수업을 시작해보세요!
      </p>
      <Link
        to={`/course/${getRandomCourseId()}`}
        className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors"
      >
        첫 수업 시작하기
      </Link>
    </div>
  )
}

function LogInMessage() {
  return (
    <div className="text-center py-8 border border-border rounded-lg px-2 sm:px-8">
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
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  })

  const {
    data: personalizedCourses,
    isFetching: isPersonalizedFetching,
    error: personalizedError,
  } = useQuery({
    queryKey: ['personalizedCourses'],
    queryFn: getPersonalizedCourses,
    enabled: isAuthenticated,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
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
            Array.isArray(personalizedCourses) && personalizedCourses.length === 0 ? (
              // 개인화 강의가 없는 경우
              <FirstClassMessage courses={courses} />
            ) : (
              // 개인화 강의가 있는 경우
              <CourseList
                courses={personalizedCourses}
                isLoading={isPersonalizedFetching}
                error={personalizedError}
              />
            )
          ) : (
            // 로그인되지 않은 상태
            <LogInMessage />
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
