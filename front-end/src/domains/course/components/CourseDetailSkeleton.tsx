import { Skeleton } from '@/shared/components/ui/skeleton'

function CourseDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      {/* 썸네일 + 제목 스켈레톤 */}
      <div className="relative mb-8">
        <Skeleton className="w-full h-56 rounded-xl" />
      </div>
      {/* 탭 스켈레톤 */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="w-24 h-8" />
        <Skeleton className="w-24 h-8" />
      </div>
      {/* 내용 스켈레톤 */}
      <div className="space-y-4">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-full h-12 mt-8" />
      </div>
    </div>
  )
}

export default CourseDetailSkeleton
