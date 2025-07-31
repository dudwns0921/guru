import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './shared/components/Layout'
import HomePage from './shared/pages/HomePage'
import { LoginPage } from './domains/auth/pages/LoginPage'
import { RegisterPage } from './domains/auth/pages/RegisterPage'
import { AuthProvider } from './domains/auth/contexts/AuthProvider'
import CourseDetailPage from './domains/course/pages/CourseDetailPage'
import ProtectedRoute from './shared/components/ProtectedRoute'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
