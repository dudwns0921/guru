import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { getServerUrl } from './util/app'
import type { ServerResponseMap } from './types/server'
import CourseList from './components/course/CourseList'

// 1. QueryClient 인스턴스 생성
const queryClient = new QueryClient()

// 2. 데이터를 불러오는 함수 (axios 사용)
const fetchPing = async () => {
  const response = await axios.get<ServerResponseMap['ping-proxy']>(getServerUrl() + 'ping-proxy')
  if (response.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return response.data
}

// 3. Ping 컴포넌트
function PingComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ping'],
    queryFn: fetchPing,
  })

  if (isLoading) return <div>Loading...</div>
  if (error instanceof Error) return <div>Error: {error.message}</div>

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef',
      }}
    >
      <h3>Server Status</h3>
      <div>
        <strong>FastAPI:</strong> {data?.fastApiMessage}
      </div>
      <div>
        <strong>Server:</strong> {data?.server}
      </div>
    </div>
  )
}

// 4. App 루트
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Course Management System</h1>
        <PingComponent />
        <CourseList />
      </div>
    </QueryClientProvider>
  )
}

export default App
