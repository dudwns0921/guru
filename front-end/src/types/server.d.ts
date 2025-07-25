export type ServerResponseMap = {
  courses: Course[]
}

export interface Course {
  id: number
  title: string
  description?: string
  instructor: string
  price: number
  thumbnailUrl: string
  tags: string[]
  createdAt: string
}
