import { useAuth } from '@/domains/auth/hooks/useAuth'
import { MessageCircle } from 'lucide-react'

interface ChatFloatingButtonProps {
  onClick: () => void
}

function ChatFloatingButton({ onClick }: ChatFloatingButtonProps) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return null
  }
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onClick}
        className="bg-brand-500 text-white p-3 rounded-full shadow-lg hover:bg-brand-700 transition-colors"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  )
}

export default ChatFloatingButton
