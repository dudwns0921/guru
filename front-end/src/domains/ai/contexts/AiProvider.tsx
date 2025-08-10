import React, { useState, useCallback } from 'react'
import { AiContext, type ChatMessage } from './AiContext'

interface AiProviderProps {
  children: React.ReactNode
}

export const AiProvider: React.FC<AiProviderProps> = ({ children }) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]) // 메시지 배열

  // 메시지 추가 메서드
  const pushMessage = useCallback((message: ChatMessage) => {
    setChatMessages(prevMessages => [...prevMessages, message])
  }, [])

  return <AiContext.Provider value={{ chatMessages, pushMessage }}>{children}</AiContext.Provider>
}
