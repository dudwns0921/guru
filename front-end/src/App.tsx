import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './shared/components/Layout'
import HomePage from './shared/pages/HomePage'
import { LoginPage } from './domains/auth/pages/LoginPage'
import { RegisterPage } from './domains/auth/pages/RegisterPage'
import { AuthProvider } from './domains/auth/contexts/AuthProvider'
import CourseDetailPage from './domains/course/pages/CourseDetailPage'
import ProtectedRoute from './shared/components/ProtectedRoute'
import MyPage from './domains/user/pages/MyPage'
import ChatFloatingButton from './domains/ai/components/ChatFloatingButton'
import ChatComponent from './domains/ai/components/ChatComponent'
import { AiProvider } from './domains/ai/contexts/AiProvider'

const queryClient = new QueryClient()

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false) // 채팅창 열림 상태 관리

  const toggleChat = () => {
    setIsChatOpen(prev => !prev) // 버튼 클릭 시 상태 토글
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AiProvider>
          <BrowserRouter basename="/guru/">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="auth/login" element={<LoginPage />} />
                <Route path="auth/register" element={<RegisterPage />} />
                <Route
                  path="course/:courseId"
                  element={
                    <ProtectedRoute>
                      <CourseDetailPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="my"
                  element={
                    <ProtectedRoute>
                      <MyPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
            {/* 플로팅 버튼 또는 ChatComponent 조건부 렌더링 */}
            {!isChatOpen && <ChatFloatingButton onClick={toggleChat} />}
            {isChatOpen && (
              <div className="fixed bottom-4 right-4 z-50 shadow-lg rounded-lg w-80">
                <ChatComponent toggleChat={toggleChat} />
              </div>
            )}
          </BrowserRouter>
        </AiProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
