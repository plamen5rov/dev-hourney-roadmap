import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'

interface ToastProps {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (visible) {
      setShow(true)
      const timer = setTimeout(() => setShow(false), 2500)
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!show) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-bg-elevated border border-border-default rounded-full shadow-lg">
        <Check className="w-4 h-4 text-accent-primary" />
        <span className="text-text-primary text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
