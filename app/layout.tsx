import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "灰烬 - 燃烧你的秘密",
  description: "写下秘密，点击焚烧，让它化为灰烬，彻底消失。一个帮助你释放心理负担的私密空间。",
  keywords: ["灰烬", "秘密", "心理释放", "情感治愈", "私密空间"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "灰烬 - 燃烧你的秘密",
    description: "写下秘密，点击焚烧，让它化为灰烬，彻底消失",
    type: "website",
  },
  generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='90' font-size='90'>🔥</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'