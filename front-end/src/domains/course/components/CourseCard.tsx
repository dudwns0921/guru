import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import type { Course } from '@/types/server'

interface CourseCardProps {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
      </div>

      <CardHeader className="pb-4">
        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
        <CardDescription>
          <strong>Instructor:</strong> {course.instructor}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {course.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{course.description}</p>
        )}

        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="text-2xl font-bold text-primary">
          ₩{Number(course.price).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard
