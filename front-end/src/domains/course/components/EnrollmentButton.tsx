import { Button } from '@/shared/components/ui/button'

interface EnrollButtonProps {
  isEnrollmentLoading: boolean
  isEnrolled?: { enrolled: boolean }
  onClick?: () => void
  error?: boolean
}

function EnrollButton({ isEnrollmentLoading, isEnrolled, onClick, error }: EnrollButtonProps) {
  if (isEnrollmentLoading) {
    return (
      <Button
        className="w-full mt-8 py-4 text-xl bg-brand-600 text-white rounded-lg"
        size="lg"
        disabled
      >
        확인 중...
      </Button>
    )
  }
  if (error) {
    return (
      <>
        <Button
          className="w-full mt-8 py-4 text-xl bg-brand-600 text-white rounded-lg"
          size="lg"
          disabled
        >
          수강신청 여부 확인 실패
        </Button>
        <div className="text-red-500 mt-2 text-center text-sm">
          수강신청 여부를 확인할 수 없습니다. 잠시 후 다시 시도해주세요.
        </div>
      </>
    )
  }
  if (isEnrolled) {
    return (
      <Button
        className="w-full mt-8 py-4 text-xl bg-brand-600 text-white rounded-lg"
        size="lg"
        disabled={isEnrolled.enrolled}
        onClick={onClick}
      >
        {isEnrolled.enrolled ? '이미 수강 신청됨' : '수강 신청하기'}
      </Button>
    )
  }
  return null
}

export default EnrollButton
