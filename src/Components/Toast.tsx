import { useToastStore } from '../store/toastStore'
import { useEffect } from 'react'
import { AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle } from 'react-icons/ai'

const typeStyles = {
  success: 'bg-green-500/90 border-green-400 text-white',
  error: 'bg-red-500/90 border-red-400 text-white',
  info: 'bg-slate-800/90 border-slate-600 text-white',
} as const

const typeIcon = {
  success: AiOutlineCheckCircle,
  error: AiOutlineCloseCircle,
  info: AiOutlineInfoCircle,
} as const

const Toast = () => {
  const { isOpen, message, type, hide } = useToastStore()
  const Icon = typeIcon[type]

  useEffect(() => {
    if (!isOpen) return
    const id = setTimeout(hide, 3000)
    return () => clearTimeout(id)
  }, [isOpen, hide])

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg shadow-black/30 ${typeStyles[type]}`}>
        <Icon className="text-xl" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={hide}
          className="ml-2 text-xs opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default Toast
