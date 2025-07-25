import { useQuery } from '@tanstack/react-query'
import { fetchCourses } from '../api/courseApi'

function CourseList() {
  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })

  if (isLoading) return <div>Loading courses...</div>
  if (error instanceof Error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h2>Courses</h2>
      {courses && courses.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {courses.map(course => (
            <div
              key={course.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '12px',
                }}
                onError={e => {
                  ;(e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/300x200?text=No+Image'
                }}
              />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{course.title}</h3>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                <strong>Instructor:</strong> {course.instructor}
              </p>
              {course.description && (
                <p style={{ margin: '0 0 8px 0', color: '#555', fontSize: '14px' }}>
                  {course.description}
                </p>
              )}
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#007bff',
                }}
              >
                ${Number(course.price).toFixed(2)}
              </p>
              {/* 태그 표시 */}
              <div style={{ margin: '0 0 8px 0' }}>
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#e9ecef',
                      color: '#495057',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      marginRight: '4px',
                      marginBottom: '4px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <small style={{ color: '#999' }}>
                Created: {new Date(course.createdAt).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses available</p>
      )}
    </div>
  )
}

export default CourseList
