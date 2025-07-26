import CourseList from '@/domains/course/components/CourseList'

function CoursePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-main mb-8">강의 목록</h1>
      <CourseList />
    </div>
  )
}

export default CoursePage
