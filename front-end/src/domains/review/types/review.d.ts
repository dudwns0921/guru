export interface Review {
  id: number
  rating: number
  comment: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string
    email: string
    createdAt: string
  }
  course: {
    id: number
    title: string
  }
}

export interface CreateReviewDto {
  courseId: number
  rating: number
  comment?: string
}

export interface UpdateReviewDto {
  rating: number
  comment?: string
}

export type GetReviewsByCourseResponse = Review[]

export interface CheckMyReviewResponse {
  hasReview: boolean
  review: Review | null
}

export type UpdateReviewResponse = Review

export type DeleteReviewResponse = { success: boolean }
