import CourseCard from './CourseCard'
import CourseCardSkeleton from './CourseCardSkeleton'
import type { Course } from '../types/course'

interface CourseListProps {
  courses: Course[] | undefined
  isLoading: boolean
  error: Error | null
}

function CourseList({ courses, isLoading, error }: CourseListProps) {
  // 로딩 상태에서 사용
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error instanceof Error)
    return <div className="text-center p-8 text-red-500">Error: {error.message}</div>

  return (
    <div>
      {courses && courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No courses available</p>
      )}
    </div>
  )
}

export default CourseList
