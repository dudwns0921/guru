import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { Textarea } from '@/shared/components/ui/textarea'
import ReviewStars from './RenderStars'

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void
  submitting: boolean
}

function ReviewForm({ onSubmit, submitting }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [comment, setComment] = useState<string>('')

  return (
    <form
      className="mb-8 p-6 rounded-xl border border-border bg-muted dark:bg-background shadow"
      onSubmit={e => {
        e.preventDefault()
        onSubmit(rating, comment)
        setComment('')
        setRating(5)
      }}
    >
      <h3 className="text-2xl font-bold mb-6 text-main dark:text-main">리뷰 작성하기</h3>
      <div className="mb-6">
        <label className="block mb-2 font-medium text-main dark:text-main">별점</label>
        <ReviewStars
          value={rating}
          setValue={setRating}
          hoverValue={hoverRating}
          setHoverValue={setHoverRating}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium text-main dark:text-main">코멘트</label>
        <Textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          rows={3}
          placeholder="후기를 남겨주세요"
          className="resize-none text-main dark:text-main bg-white dark:bg-background border border-border rounded-lg p-3"
        />
      </div>
      <Button
        type="submit"
        disabled={submitting || rating < 1 || rating > 5 || comment.trim().length === 0}
        className="w-full py-3 text-lg bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
      >
        {submitting ? '작성 중...' : '리뷰 등록'}
      </Button>
    </form>
  )
}

export default ReviewForm
