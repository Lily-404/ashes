'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // 防止服务端渲染与客户端不一致
  }

  return (
    <NextThemesProvider 
      {...props}
      attribute="class" // 显式设置类名属性
      disableTransitionOnChange // 禁用主题切换时的过渡效果
    >
      {children}
    </NextThemesProvider>
  )
}
