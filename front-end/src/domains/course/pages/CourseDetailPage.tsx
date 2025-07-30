import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchCourseById, checkEnrollment, enrollInCourse } from '../api/courseApi'
import {
  fetchReviewsByCourse,
  fetchMyReview,
  createReview,
  updateReview,
  deleteReview,
} from '@/domains/review/api/reviewApi'
import CourseDetailSkeleton from '../components/CourseDetailSkeleton'
import ReviewSection from '../components/ReviewSection/ReviewSection'
import type { Review, CheckMyReviewResponse, EnrollmentCheckResponse } from '@/types/server'
import { Badge } from '@/shared/components/ui/badge'
import { getBadgeColor } from '@/utils/badgeColors'
import EnrollButton from '../components/EnrollmentButton'

function CourseDetailPage() {
  const queryClient = useQueryClient()
  const { courseId } = useParams<{ courseId: string }>()
  const [tab, setTab] = useState<'intro' | 'review'>('intro')

  // 강좌 정보
  const {
    data: course,
    isLoading: isCourseLoading,
    error: courseError,
  } = useQuery({
    queryKey: ['courseDetail', courseId],
    queryFn: () => fetchCourseById(parseInt(courseId!)),
    enabled: !!courseId,
  })

  // 수강신청 여부
  const { data: isEnrolled, isLoading: isEnrollmentLoading } = useQuery<EnrollmentCheckResponse>({
    queryKey: ['checkEnrollment', courseId],
    queryFn: () => checkEnrollment(parseInt(courseId!)),
    enabled: !!courseId,
  })

  // 코스별 리뷰 목록
  const { data: reviews = [], refetch: refetchReviews } = useQuery<Review[]>({
    queryKey: ['reviewsByCourse', courseId],
    queryFn: () => fetchReviewsByCourse(parseInt(courseId!)),
    enabled: !!courseId,
  })

  // 내가 작성한 리뷰 확인
  const { data: myReviewData, refetch: refetchMyReview } = useQuery<CheckMyReviewResponse>({
    queryKey: ['myReview', courseId],
    queryFn: () => fetchMyReview(parseInt(courseId!)),
    enabled: !!courseId,
  })

  // 수강신청
  const enrollMutation = useMutation({
    mutationFn: (courseId: number) => enrollInCourse(courseId),
    onSuccess: () => {
      alert('수강 신청이 완료되었습니다!')
      queryClient.invalidateQueries({ queryKey: ['checkEnrollment', courseId] })
    },
    onError: () => {
      alert('수강 신청에 실패했습니다.')
    },
  })
  // 리뷰 등록
  const reviewMutation = useMutation({
    mutationFn: (data: { rating: number; comment?: string }) =>
      createReview({
        courseId: parseInt(courseId!),
        rating: data.rating,
        comment: data.comment,
      }),
    onSuccess: () => {
      alert('리뷰가 등록되었습니다!')
      refetchReviews()
      refetchMyReview()
    },
    onError: () => {
      alert('리뷰 등록에 실패했습니다.')
    },
  })

  // 리뷰 수정
  const updateMutation = useMutation({
    mutationFn: (data: { id: number; rating: number; comment: string }) =>
      updateReview(data.id, { rating: data.rating, comment: data.comment }),
    onSuccess: () => {
      refetchReviews()
      refetchMyReview()
    },
    onError: () => {
      alert('리뷰 수정에 실패했습니다.')
    },
  })

  // 리뷰 삭제
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      alert('리뷰가 삭제되었습니다!')
      refetchReviews()
      refetchMyReview()
    },
    onError: () => {
      alert('리뷰 삭제에 실패했습니다.')
    },
  })

  if (isCourseLoading) return <CourseDetailSkeleton />
  if (courseError || !course)
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
          <EnrollButton
            isEnrollmentLoading={isEnrollmentLoading}
            isEnrolled={isEnrolled}
            onClick={() => enrollMutation.mutate(course.id)}
            error={isEnrollmentLoading === false && isEnrolled === undefined}
          />
        </div>
      ) : (
        <div>
          <ReviewSection
            isEnrolled={isEnrolled ?? { enrolled: false }}
            myReview={myReviewData?.review}
            reviews={reviews}
            onSubmit={(rating, comment) => reviewMutation.mutate({ rating, comment })}
            submitting={reviewMutation.isPending}
            onUpdate={(id, rating, comment) => updateMutation.mutate({ id, rating, comment })}
            updating={updateMutation.isPending}
            onDelete={id => deleteMutation.mutate(id)}
            deleting={deleteMutation.isPending}
          />
        </div>
      )}
    </div>
  )
}

export default CourseDetailPage
