// JWT 토큰을 디코딩해서 payload 정보 가져오기
import { jwtDecode } from 'jwt-decode'

// JWT 토큰을 디코딩해서 payload 정보 가져오기
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('토큰 디코딩 실패:', error)
    return null
  }
}

// 토큰이 만료되었는지 확인
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token)
  if (!decoded || !decoded.exp) return true

  const currentTime = Date.now() / 1000
  return decoded.exp < currentTime
}

// 로컬스토리지에 토큰 저장
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

// 로컬스토리지에서 토큰 가져오기
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken')
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken')
}

// 토큰 삭제 (로그아웃)
export const clearTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

// 유효한 액세스 토큰이 있는지 확인
export const hasValidAccessToken = (): boolean => {
  const token = getAccessToken()
  return token ? !isTokenExpired(token) : false
}
