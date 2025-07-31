import axios from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  isTokenExpired,
} from '@/utils/tokens'
import { getServerUrl } from '@/utils/server'

// axios 인스턴스 생성
const api = axios.create({
  baseURL: getServerUrl(),
})

// Request 인터셉터: 모든 요청에 Authorization 헤더 추가
api.interceptors.request.use(
  config => {
    const token = getAccessToken()
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// Response 인터셉터: 토큰 만료 시 자동 갱신
api.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const originalRequest = error.config

    // 401 에러이고 아직 재시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = getRefreshToken()
      if (refreshToken && !isTokenExpired(refreshToken)) {
        try {
          // 리프레시 토큰으로 새 액세스 토큰 발급
          const response = await axios.post(getServerUrl() + 'auth/refresh', {
            refreshToken,
          })

          const { accessToken, refreshToken: newRefreshToken } = response.data
          setTokens(accessToken, newRefreshToken)

          // 실패했던 원래 요청을 새 토큰으로 재시도
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          // 리프레시도 실패 → 로그아웃 처리
          clearTokens()
          window.location.href = '/guru/auth/login'
          return Promise.reject(refreshError)
        }
      } else {
        // 리프레시 토큰이 없거나 만료됨 → 로그아웃
        clearTokens()
        window.location.href = '/guru/auth/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api
