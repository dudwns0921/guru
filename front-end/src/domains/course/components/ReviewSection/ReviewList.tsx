import { Badge } from '@/shared/components/ui/badge'
import { Star } from 'lucide-react'
import type { Review } from '@/types/server'

interface ReviewListProps {
  reviews: Review[]
}

function ReviewListItem({ review }: { review: Review }) {
  return (
    <li className="border-b border-border pb-4">
      <div className="flex items-center gap-2 mb-2">
        <Badge
          variant="secondary"
          className="text-brand-600 dark:text-brand-600 bg-brand-100 dark:bg-brand-900"
        >
          <Star className="w-4 h-4 mr-1" fill="currentColor" /> {review.rating}
        </Badge>
        <span className="text-sm text-main dark:text-main">{review.user.name}</span>
        <span className="text-xs text-sub dark:text-sub ml-2">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="text-main dark:text-main">
        {review.comment || <span className="text-sub dark:text-sub">코멘트 없음</span>}
      </div>
    </li>
  )
}

function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 text-main dark:text-main">작성된 리뷰</h3>
      {reviews.length === 0 ? (
        <div className="text-sub dark:text-sub text-center py-8">아직 작성된 리뷰가 없습니다.</div>
      ) : (
        <ul className="space-y-6">
          {reviews.map(review => (
            <ReviewListItem key={review.id} review={review} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReviewList
