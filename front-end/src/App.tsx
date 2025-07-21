// App.tsx
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import { getServerUrl } from './util/app'
import type { ServerResponseMap } from './types/server'

// 1. QueryClient 인스턴스 생성
const queryClient = new QueryClient()

// 2. 데이터를 불러오는 함수 (axios 사용)
const fetchPing = async () => {
  const response = await axios.get<ServerResponseMap['/ping-proxy']>(getServerUrl() + '/ping-proxy')
  if (response.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return response.data
}

// 3. 컴포넌트
function PingComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['ping'],
    queryFn: fetchPing,
  })

  if (isLoading) return <div>Loading...</div>
  if (error instanceof Error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div>{data?.fastApiMessage}</div>
      <div>{data?.server}</div>
    </div>
  )
}

// 4. App 루트
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PingComponent />
    </QueryClientProvider>
  )
}

export default App
