import api from '@/lib/api'
import type {
  Review,
  CreateReviewDto,
  GetReviewsByCourseResponse,
  CheckMyReviewResponse,
  UpdateReviewDto,
} from '@/domains/review/types/review'

// 코스별 리뷰 목록 가져오기
export const fetchReviewsByCourse = async (
  courseId: number,
): Promise<GetReviewsByCourseResponse> => {
  const response = await api.get<Review[]>('review/by-course', {
    params: { courseId },
  })
  if (response.status !== 200) {
    throw new Error(`Failed to fetch reviews for course with ID ${courseId}`)
  }
  return response.data
}

// 내가 해당 코스에 작성한 리뷰 확인
export const fetchMyReview = async (courseId: number): Promise<CheckMyReviewResponse> => {
  const response = await api.get<CheckMyReviewResponse>('review/my', {
    params: { courseId },
  })
  if (response.status !== 200) {
    throw new Error(`Failed to check my review for course with ID ${courseId}`)
  }
  return response.data
}

// 리뷰 작성하기
export const createReview = async (dto: CreateReviewDto): Promise<Review> => {
  const response = await api.post<Review>('review', dto)
  if (response.status !== 201 && response.status !== 200) {
    throw new Error('Failed to create review')
  }
  return response.data
}

// 리뷰 수정하기
export const updateReview = async (reviewId: number, dto: UpdateReviewDto): Promise<Review> => {
  const response = await api.put<Review>(`review/${reviewId}`, dto)
  if (response.status !== 200) {
    throw new Error(`Failed to update review with ID ${reviewId}`)
  }
  return response.data
}

// 리뷰 삭제하기
export const deleteReview = async (reviewId: number): Promise<{ success: boolean }> => {
  const response = await api.delete<{ success: boolean }>(`review/${reviewId}`)
  if (response.status !== 200) {
    throw new Error(`Failed to delete review with ID ${reviewId}`)
  }
  return response.data
}
