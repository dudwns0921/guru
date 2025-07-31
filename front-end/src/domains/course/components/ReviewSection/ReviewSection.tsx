import { useState } from 'react'
import ReviewForm from './ReviewForm'
import type { Review } from '@/domains/review/types/review'
import MyReviewCard from './MyReviewCard'
import ReviewList from './ReviewList'

interface ReviewSectionProps {
  isEnrolled: { enrolled: boolean }
  myReview?: Review | null
  reviews: Review[]
  onSubmit: (rating: number, comment: string) => void
  submitting: boolean
  onUpdate: (id: number, rating: number, comment: string) => void
  onDelete: (id: number) => void
  updating: boolean
  deleting: boolean
}

function ReviewSection({
  isEnrolled,
  myReview,
  reviews,
  onSubmit,
  submitting,
  onUpdate,
  onDelete,
  updating,
  deleting,
}: ReviewSectionProps) {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editRating, setEditRating] = useState<number>(myReview?.rating ?? 5)
  const [editComment, setEditComment] = useState<string>(myReview?.comment ?? '')

  return (
    <div className="max-w-xl mx-auto py-8">
      {/* 리뷰 작성 폼 */}
      {isEnrolled?.enrolled && !myReview && (
        <ReviewForm onSubmit={onSubmit} submitting={submitting} />
      )}

      {/* 내가 작성한 리뷰 카드 */}
      {myReview && (
        <MyReviewCard
          myReview={myReview}
          editMode={editMode}
          setEditMode={setEditMode}
          editRating={editRating}
          setEditRating={setEditRating}
          editComment={editComment}
          setEditComment={setEditComment}
          onUpdate={onUpdate}
          updating={updating}
          onDelete={onDelete}
          deleting={deleting}
        />
      )}

      {/* 리뷰 리스트 */}
      <ReviewList reviews={reviews} />
    </div>
  )
}

export default ReviewSection
