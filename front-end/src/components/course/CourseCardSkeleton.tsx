import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '../ui/card'

// 로딩 컴포넌트
const CourseCardSkeleton = () => (
  <Card>
    <Skeleton className="aspect-video w-full" />
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
      <Skeleton className="h-8 w-24" />
    </CardContent>
  </Card>
)

export default CourseCardSkeleton
