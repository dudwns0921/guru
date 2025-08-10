import type { BaseChatMessage } from '../contexts/AiContext'

// 사용자 메시지 타입
export interface IUserChatMessage extends BaseChatMessage {
  from: 'user'
  content: string // 사용자 메시지는 항상 문자열
}

function UserChatMessage({ content, createdAt }: IUserChatMessage) {
  // 한국어 시간 형식으로 변환
  const formattedTime = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 오전/오후 표기
  }).format(createdAt)

  return (
    <div className="flex justify-end items-center space-x-2">
      {/* 메시지 시간 */}
      <span className="text-gray-400 text-xs">{formattedTime}</span>
      {/* 메시지 내용 */}
      <div className="relative bg-gray-200 text-black rounded-lg p-3 max-w-xs text-sm">
        <span>{content}</span>
        {/* 말풍선 꼬리 */}
        <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-200"></div>
      </div>
    </div>
  )
}

export default UserChatMessage
