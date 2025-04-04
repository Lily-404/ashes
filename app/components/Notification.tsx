"use client"

import { useEffect, useState } from 'react'

interface NotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export default function Notification({ message, isVisible, onClose }: NotificationProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(onClose, 500) // 等待退出动画完成
      }, 4000)
      return () => clearTimeout(timer)
    }
    setIsExiting(false)
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
      isExiting ? 'opacity-0 translate-y-[-1rem]' : 'opacity-100 translate-y-0'
    }`}>
      <div className="bg-[#1a1a1a]/95 backdrop-blur-md text-white/90 px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="text-orange-500 text-lg">✧</span>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  )
}