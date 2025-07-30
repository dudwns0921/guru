import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import { Star } from 'lucide-react'
import type { Review } from '@/types/server'
import ReviewStars from './RenderStars'
import { useState } from 'react'

interface MyReviewCardProps {
  myReview: Review
  editMode: boolean
  setEditMode: (v: boolean) => void
  editRating: number
  setEditRating: (v: number) => void
  editComment: string
  setEditComment: (v: string) => void
  onUpdate: (id: number, rating: number, comment: string) => void
  updating: boolean
  onDelete: (id: number) => void
  deleting: boolean
}

function MyReviewCard({
  myReview,
  editMode,
  setEditMode,
  editRating,
  setEditRating,
  editComment,
  setEditComment,
  onUpdate,
  updating,
  onDelete,
  deleting,
}: MyReviewCardProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  return (
    <div className="mb-8 p-6 rounded-xl border border-brand-600 bg-brand-50 dark:bg-brand-900 shadow">
      <h3 className="text-xl font-bold mb-4 text-brand-600 dark:text-brand-600">
        내가 작성한 리뷰
      </h3>
      {editMode ? (
        <form
          onSubmit={e => {
            e.preventDefault()
            if (onUpdate) onUpdate(myReview.id, editRating, editComment)
            setEditMode(false)
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className="text-brand-600 dark:text-brand-600 bg-brand-100 dark:bg-brand-900"
            >
              <Star className="w-4 h-4 mr-1" fill="currentColor" /> {editRating}
            </Badge>
            <span className="text-sm text-main dark:text-main">{myReview.user.name}</span>
            <span className="text-xs text-sub dark:text-sub ml-2">
              {new Date(myReview.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-main dark:text-main">별점</label>
            <ReviewStars
              value={editRating}
              setValue={setEditRating}
              hoverValue={hoverRating}
              setHoverValue={setHoverRating}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-main dark:text-main">코멘트</label>
            <Textarea
              value={editComment}
              onChange={e => setEditComment(e.target.value)}
              rows={3}
              className="resize-none text-main dark:text-main bg-white dark:bg-background border border-border rounded-lg p-3"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={
                updating || editRating < 1 || editRating > 5 || editComment.trim().length === 0
              }
              className="py-2 px-4 text-base bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
            >
              {updating ? '수정 중...' : '수정 완료'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="py-2 px-4 text-base"
              onClick={() => setEditMode(false)}
            >
              취소
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Badge
              variant="secondary"
              className="text-brand-600 dark:text-brand-600 bg-brand-100 dark:bg-brand-900"
            >
              <Star className="w-4 h-4 mr-1" fill="currentColor" /> {myReview.rating}
            </Badge>
            <span className="text-sm text-main dark:text-main">{myReview.user.name}</span>
            <span className="text-xs text-sub dark:text-sub ml-2">
              {new Date(myReview.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="text-main dark:text-main mb-4">
            {myReview.comment || <span className="text-sub dark:text-sub">코멘트 없음</span>}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              className="py-2 px-4 text-base bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
              onClick={() => {
                setEditMode(true)
                setEditRating(myReview.rating)
                setEditComment(myReview.comment ?? '')
              }}
              disabled={updating}
            >
              {updating ? '수정 중...' : '수정'}
            </Button>
            <Button
              type="button"
              className="py-2 px-4 text-base border border-brand-700 hover:border-brand-600 text-main rounded-lg transition-colors"
              onClick={() => {
                if (window.confirm('정말로 리뷰를 삭제하시겠습니까?')) {
                  onDelete(myReview.id)
                }
              }}
              disabled={deleting}
            >
              {deleting ? '삭제 중...' : '삭제'}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default MyReviewCard
