import { useContext } from 'react'
import { AiContext } from '../contexts/AiContext'

const useAi = () => {
  const context = useContext(AiContext)
  if (context === undefined) {
    throw new Error('useAi must be used within an AiProvider')
  }
  return context
}

export default useAi
