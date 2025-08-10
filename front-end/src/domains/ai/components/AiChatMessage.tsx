import type { BaseChatMessage } from '../contexts/AiContext'

// AI 메시지 타입
export interface IAiChatMessage extends BaseChatMessage {
  from: 'ai'
  type: 'chat' | 'recommendations'
  content: string | number[] // type에 따라 content의 타입이 달라짐
  createdAt: Date // 메시지 생성 시간
}

function AiChatMessage({ type, content, createdAt }: IAiChatMessage) {
  // 한국어 시간 형식으로 변환
  const formattedTime = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // 오전/오후 표기
  }).format(createdAt)

  return (
    <div className="flex flex-col items-start space-y-1">
      {/* Guru 표시 */}
      <span className="text-xs text-gray-500 font-semibold">Guru</span>
      <div className="flex items-center space-x-2">
        {/* 메시지 내용 */}
        <div className="relative bg-gray-100 text-black rounded-lg p-3 max-w-xs text-sm">
          {type === 'chat' && typeof content === 'string' ? (
            <span>{content}</span>
          ) : type === 'recommendations' && Array.isArray(content) ? (
            <ul className="list-disc pl-5">
              {content.map(id => (
                <li key={id}>추천 코스 ID: {id}</li>
              ))}
            </ul>
          ) : (
            <span className="text-red-500">알 수 없는 메시지 유형입니다.</span>
          )}
          {/* 말풍선 꼬리 */}
          <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-100"></div>
        </div>
        {/* 메시지 시간 */}
        <span className="text-gray-400 text-xs">{formattedTime}</span>
      </div>
    </div>
  )
}

export default AiChatMessage
