import { createContext } from 'react'
import type { IUserChatMessage } from '../components/UserChatMessage'
import type { IAiChatMessage } from '../components/AiChatMessage'

// 기본 메시지 타입
export interface BaseChatMessage {
  id: string
  from: 'ai' | 'user'
  createdAt: Date
}

// 최종 메시지 타입
export type ChatMessage = IUserChatMessage | IAiChatMessage

interface AiContextType {
  chatMessages: ChatMessage[] // ChatMessage 배열
  pushMessage: (message: ChatMessage) => void // 메시지 추가 메서드
}

export const AiContext = createContext<AiContextType | undefined>(undefined)
