import CourseCard from '@/domains/course/components/CourseCard'
import { Button } from '@/shared/components/ui/button'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getMyEnrollments } from '@/domains/enrollment/api/enrollmentApi'
import { useAuth } from '@/domains/auth/hooks/useAuth'
import type { Enrollment } from '@/types/server'
import { deleteMe } from '../api/userApi'

function MyPage() {
  const { user, logout } = useAuth()
  const { data: enrollments = [] } = useQuery<Enrollment[]>({
    queryKey: ['enrollments', user?.id],
    queryFn: () => getMyEnrollments(),
    enabled: !!user?.id,
  })

  const deleteMeMutation = useMutation({
    mutationFn: deleteMe,
  })

  const handledeleteMe = () => {
    if (window.confirm('정말로 회원탈퇴 하시겠습니까?')) {
      deleteMeMutation.mutate(undefined, {
        onSuccess: () => {
          alert('회원탈퇴가 완료되었습니다.')
          logout() // 로그아웃 처리
          window.location.href = '/guru/auth/login' // 로그인 페이지로 리다이렉트
        },
        onError: error => {
          console.error('회원탈퇴 실패:', error)
          alert('회원탈퇴에 실패했습니다. 다시 시도해주세요.')
        },
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-main dark:text-main">마이페이지</h1>
      <div className="flex flex-col gap-8 mb-16">
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-brand-700 dark:text-brand-400">
            수강 내역
          </h2>
          {enrollments.length === 0 ? (
            <div className="text-sub dark:text-sub py-8">수강한 강의가 없습니다.</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrollments.map(enrollment => (
                <li key={enrollment.id}>
                  <CourseCard course={enrollment.course} noPrice />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-brand-700 dark:text-brand-400">
            추천 강의
          </h2>
          {/* 추천 강의 데이터로 교체 필요 */}
          <div className="text-sub dark:text-sub py-8">추천 강의가 없습니다.</div>
        </section>
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          className="py-3 px-6 text-base font-semibold bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 rounded-lg transition-colors"
          onClick={handledeleteMe}
          disabled={deleteMeMutation.isPending}
        >
          {deleteMeMutation.isPending ? '탈퇴 중...' : '회원 탈퇴'}
        </Button>
      </div>
    </div>
  )
}

export default MyPage
