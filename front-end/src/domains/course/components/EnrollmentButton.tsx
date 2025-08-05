import { Button } from '@/shared/components/ui/button'

interface EnrollButtonProps {
  isEnrolled: boolean // 수강 여부
  onClick: () => void // 수강 신청 콜백
  onCancel: () => void // 수강 취소 콜백
  isLoading?: boolean // 로딩 상태
  error?: Error | null // 에러 상태
}

function EnrollButton({ isEnrolled, onClick, onCancel, isLoading, error }: EnrollButtonProps) {
  if (isLoading) {
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

  return (
    <Button
      className={`w-full mt-8 py-4 text-xl rounded-lg ${
        isEnrolled ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-600 hover:bg-brand-700'
      } text-white transition-colors`}
      size="lg"
      onClick={isEnrolled ? onCancel : onClick}
    >
      {isEnrolled ? '수강 취소' : '수강 신청하기'}
    </Button>
  )
}

export default EnrollButton
