import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import useAi from '../hooks/useAi'
import AiChatMessage from './AiChatMessage'
import UserChatMessage from './UserChatMessage'
import { Send, X } from 'lucide-react' // lucide-react의 Send와 X 아이콘 추가
import { postChat } from '../api/aiApi'

function ChatComponent({ toggleChat }: { toggleChat: () => void }) {
  const { chatMessages, pushMessage } = useAi()
  const [inputValue, setInputValue] = useState('') // 입력 값 상태 관리

  // useMutation을 사용하여 postChat API 호출
  const mutation = useMutation<
    { type: 'chat' | 'recommendations'; content: string | number[] },
    Error,
    string
  >({
    mutationFn: postChat,
    onSuccess: data => {
      // AI 응답 메시지 추가
      pushMessage({
        id: Date.now().toString(),
        from: 'ai',
        type: data.type,
        content: data.content,
        createdAt: new Date(),
      })
    },
    onError: e => {
      console.error(e)
      // 오류 메시지를 AI 메시지로 추가
      pushMessage({
        id: Date.now().toString(),
        from: 'ai',
        type: 'chat',
        content: '메시지 전송 중 오류가 발생했습니다. 다시 시도해 주세요.',
        createdAt: new Date(),
      })
    },
  })

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return // 빈 입력 방지

    // 사용자 메시지 추가
    pushMessage({
      id: Date.now().toString(),
      from: 'user',
      content: inputValue,
      createdAt: new Date(),
    })

    // AI 메시지 요청
    mutation.mutate(inputValue)

    setInputValue('') // 입력 필드 초기화
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage() // 엔터 키로 메시지 전송
    }
  }

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
      {/* 채팅 헤더 */}
      <div className="text-black flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-semibold">AI 채팅 상담</h2>
        <button onClick={toggleChat} className="text-black hover:text-gray-600">
          <X className="h-5 w-5" /> {/* X 아이콘 */}
        </button>
      </div>

      {/* 채팅 메시지 영역 */}
      <div className="text-white p-4 space-y-2 h-80 overflow-y-auto">
        {chatMessages.map((message, index) => {
          if (message.from === 'user') {
            return (
              <div key={index} className="text-right">
                {/* 사용자 메시지 오른쪽 정렬 */}
                <UserChatMessage {...message} />
              </div>
            )
          } else {
            return (
              <div key={index} className="text-left">
                {/* AI 메시지 왼쪽 정렬 */}
                <AiChatMessage {...message} />
              </div>
            )
          }
        })}
      </div>

      {/* 입력 영역 */}
      <div className="bg-white p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)} // 입력 값 업데이트
            onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
            placeholder="Type your message..."
            className="flex-1 text-gray-800 focus:outline-none"
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            disabled={mutation.isPending} // 로딩 중 버튼 비활성화
            onClick={handleSendMessage}
            className={`flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
              mutation.isPending
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-brand-500 text-white hover:bg-brand-700'
            }`}
          >
            <Send className="h-5 w-5" /> {/* lucide-react의 Send 아이콘 */}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
