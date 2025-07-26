import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './shared/components/Layout'
import HomePage from './shared/pages/HomePage'
import { LoginPage } from './domains/auth/pages/LoginPage'
import { RegisterPage } from './domains/auth/pages/RegisterPage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/guru">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
