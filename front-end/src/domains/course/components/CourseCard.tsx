import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { getBadgeColor } from '@/utils/badgeColors'
import type { Course } from '@/types/server'

interface CourseCardProps {
  course: Course
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <Link to={`/course/${course.id}`} className="block">
      <Card className="overflow-hidden border border-border text-main transition-colors transition-shadow hover:shadow-hover">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-lg line-clamp-2 text-main">{course.title}</CardTitle>
          <CardDescription>
            <strong>Instructor:</strong> {course.instructor}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 text-sub">
          {course.description && <p className="text-sm mb-4 line-clamp-3">{course.description}</p>}

          <div className="flex flex-wrap gap-1 mb-4">
            {course.tags.map((tag, index) => (
              <Badge key={index} className={`text-xs ${getBadgeColor(tag)}`}>
                {tag}
              </Badge>
            ))}
          </div>

          <div className="text-2xl font-bold text-primary text-main">
            ₩{Number(course.price).toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CourseCard
