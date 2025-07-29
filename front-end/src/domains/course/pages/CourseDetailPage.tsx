import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCourseById } from '../api/courseApi'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { getBadgeColor } from '@/utils/badgeColors'
import CourseDetailSkeleton from '../components/CourseDetailSkeleton'

function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const [tab, setTab] = useState<'intro' | 'review'>('intro')
  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courseDetail', courseId],
    queryFn: () => fetchCourseById(parseInt(courseId!)),
    enabled: !!courseId,
  })

  if (isLoading) return <CourseDetailSkeleton />
  if (error || !course)
    return <div className="text-main dark:text-main">강의 정보를 불러올 수 없습니다.</div>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* 배너: 썸네일 이미지 + 제목 */}
      <div className="relative mb-8">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="w-full h-56 object-cover rounded-xl"
        />
        <h1 className="absolute left-0 bottom-0 w-full bg-black/50 text-white dark:text-main text-4xl font-bold px-6 py-4 rounded-b-xl">
          {course.title}
        </h1>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex gap-2 mb-6 border-b border-border">
        {[
          { key: 'intro', label: '강좌 소개' },
          { key: 'review', label: '강좌 후기' },
        ].map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key as 'intro' | 'review')}
            className={`relative px-4 py-2 text-lg font-medium transition-colors duration-200
              ${tab === key ? 'text-main dark:text-main' : 'text-sub dark:text-sub hover:text-main dark:hover:text-main'}
            `}
            style={{ border: 'none', background: 'none' }}
          >
            {label}
            <span
              className={`absolute left-0 -bottom-[1px] w-full h-0.5 rounded transition-all duration-200
                ${tab === key ? 'bg-main dark:bg-main' : 'bg-transparent'}
              `}
            />
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      {tab === 'intro' ? (
        <div>
          <p className="text-lg text-sub dark:text-sub mb-6">{course.description}</p>
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-main dark:text-main">강의자 :</span>{' '}
              <span className="text-main dark:text-main">{course.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-main dark:text-main">태그 :</span>{' '}
              <span className="flex flex-wrap gap-1">
                {course.tags?.map((tag, idx) => (
                  <Badge key={idx} className={`text-xs ${getBadgeColor(tag)}`}>
                    {tag}
                  </Badge>
                ))}
              </span>
            </div>
          </div>
          <Button
            className="w-full mt-8 py-4 text-xl bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
            size="lg"
          >
            수강 신청하기
          </Button>
        </div>
      ) : (
        <div>
          {/* 강좌 후기 탭 내용: 추후 구현 */}
          <div className="text-sub dark:text-sub text-center py-8">아직 후기가 없습니다.</div>
        </div>
      )}
    </div>
  )
}

export default CourseDetailPage
