import { Star } from 'lucide-react'

interface ReviewStarsProps {
  value: number
  setValue?: (v: number) => void
  hoverValue?: number | null
  setHoverValue?: (v: number | null) => void
  size?: number
  disabled?: boolean
}

function ReviewStars({
  value,
  setValue,
  hoverValue,
  setHoverValue,
  size = 28,
  disabled = false,
}: ReviewStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(num => (
        <button
          key={num}
          type="button"
          onClick={() => setValue && setValue(num)}
          onMouseEnter={() => setHoverValue && setHoverValue(num)}
          onMouseLeave={() => setHoverValue && setHoverValue(null)}
          className="bg-transparent border-none p-0"
          aria-label={`${num}점`}
          disabled={disabled}
        >
          <Star
            className={`transition-colors`}
            style={{ width: size, height: size }}
            fill={(hoverValue ?? value) >= num ? 'var(--color-brand-600)' : 'none'}
            strokeWidth={1.5}
            color={(hoverValue ?? value) >= num ? 'var(--color-brand-600)' : 'var(--color-sub)'}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-main dark:text-main">{value}점</span>
    </div>
  )
}

export default ReviewStars
