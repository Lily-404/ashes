"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Download } from "lucide-react"

const BURN_QUOTES = [
  "在这里倾诉，让火焰带走一切",
  "写下，焚烧，消失",
  "无人知晓的话语，终将化为灰烬",
  "让它随风而逝",
  "没有人会发现你的秘密",
  "真理藏于虚空，让文字归于永寂",
  "火焰像生命一样燃烧，熄灭",
  "时间终将遗忘，让记忆随火而逝",
  "生命中最重要的不是活着，而是我们如何活着",
  "那一年，我把课本和试卷全烧了",
  "每一个灵魂都值得被倾听，即使最终化为尘埃",
  "我们都是西西弗斯，推着自己的巨石走向山顶",
  "反抗即存在，书写即自由",
  "有些话还是需要被燃烧的",
  "烧吧！烧吧！烧吧！",
  "秘密，通向自由的阶梯",
  "黑暗中书写光明，绝望中寻找希望",
  "照顾好你的灵魂，它比身体更重要",
  "我唯一知道的就是我一无所知",
  "像一颗石头落入深渊，它会在黎明中升起",
  "终有一天，我们会像秘密一样燃烧",
  "烧，燃，灭",
] as const


export default function AshSecret() {
  const [secret, setSecret] = useState("")
  const [isBurning, setIsBurning] = useState(false)
  const [burnCount, setBurnCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showShareCard, setShowShareCard] = useState(false)

  // 删除 generateShareLink 和 copyShareLink 函数

  const burnSecret = () => {
    if (!secret.trim() || isBurning) return

    setIsBurning(true)
    setBurnCount((prev) => prev + 1)
    playBurnSound()

    setTimeout(() => {
      setSecret("")
      setIsBurning(false)
      setShowShareCard(true)
    }, 3000)
  }

  const downloadShareCard = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1200
    canvas.height = 630
    
    if (ctx) {
      // 设置背景渐变
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, canvas.width/2
      )
      gradient.addColorStop(0, '#1a1a1a')
      gradient.addColorStop(1, '#121212')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 添加装饰性边框
      ctx.strokeStyle = '#333333'
      ctx.lineWidth = 2
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)
      
      // 添加标题
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 64px "SF Pro Display", -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('灰 烬', canvas.width/2, 160)
      
      // 添加主要文字
      ctx.font = '36px "SF Pro Display", -apple-system, sans-serif'
      ctx.fillStyle = '#ff4500'
      ctx.fillText(`我已将 ${burnCount} 个秘密化为灰烬`, canvas.width/2, canvas.height/2)
      
      // 添加随机引言
      ctx.font = 'italic 28px "SF Pro Display", -apple-system, sans-serif'
      ctx.fillStyle = '#666666'
      ctx.fillText(BURN_QUOTES[Math.floor(Math.random() * BURN_QUOTES.length)], canvas.width/2, canvas.height - 120)
      
      // 添加底部签名
      ctx.font = '24px "SF Pro Display", -apple-system, sans-serif'
      ctx.fillStyle = '#444444'
      const date = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
      ctx.fillText(date, canvas.width/2, canvas.height - 60)
      
      // 下载图片
      const link = document.createElement('a')
      link.download = `灰烬-${date}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  useEffect(() => {
    const savedCount = localStorage.getItem("ashSecretBurnCount")
    if (savedCount) {
      setBurnCount(Number.parseInt(savedCount, 10))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("ashSecretBurnCount", burnCount.toString())
  }, [burnCount])
  const textRef = useRef<HTMLDivElement>(null)

  const playBurnSound = () => {
    if (soundEnabled) {
      const audio = new Audio("/burn-sound.mp3")
      audio.volume = 0.3  // adjust volume（0 - 1）
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const [currentQuote, setCurrentQuote] = useState(() =>
    BURN_QUOTES[Math.floor(Math.random() * BURN_QUOTES.length)]
  )


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote(BURN_QUOTES[Math.floor(Math.random() * BURN_QUOTES.length)])
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative bg-[#121212]">
      <div className="text-center mb-8 w-full max-w-2xl">
        <h3 className="text-gray-200/80 text-3xl md:text-4xl font-semibold mb-2 tracking-wider">灰烬</h3>
        <div className="h-12 flex items-center justify-center overflow-hidden relative quote-mask">
          <div
            key={currentQuote}
            className="text-gray-400 text-base animate-quote-transition absolute inset-x-0 px-8 whitespace-nowrap"
          >
            {currentQuote}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <span className="opacity-60">已有</span>
          <span className="font-mono text-orange-400 tabular-nums">
            {burnCount.toLocaleString()}
          </span>
          <span className="opacity-60">个秘密化为灰烬</span>
        </div>
      </div>

      <div className="w-full max-w-md relative">
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (secret.trim() && !isBurning) {
                burnSecret();
              }
            }
          }}
          disabled={isBurning}
          maxLength={100}
          placeholder="写下你要焚烧的秘密..."
          aria-label="写下你的秘密"
          className={`w-full h-28 sm:h-32 bg-[#1414149c] text-white p-3 sm:p-4 rounded-lg border border-gray-600 resize-none focus:outline-none focus:border-white focus:bg-[#ffffff05] transition-all ${
            isBurning ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">{secret.length}/100</div>
          {showShareCard && (
            <button
              onClick={downloadShareCard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 text-xs rounded hover:bg-gray-600/50 transition-colors"
            >
              <Download size={14} />
              分享卡片
            </button>
          )}
        </div>

        {isBurning && (
          <div
            ref={textRef}
            className="burning-text absolute top-0 left-0 w-full h-full flex items-center justify-center text-center p-4"
          >
            {secret}
          </div>
        )}
      </div>

      <button
        onClick={burnSecret}
        disabled={!secret.trim() || isBurning}
        aria-label={isBurning ? "焚烧中" : "焚烧秘密"}
        className={`mt-6 px-8 py-3 rounded-lg transition-all duration-300 border ${isBurning
          ? "bg-gradient-to-r from-red-600 to-red-700 text-white cursor-not-allowed border-transparent"
          : secret.trim()
            ? "border-red-600 text-red-500 hover:bg-gradient-to-r hover:from-orange-700 hover:to-red-700 hover:text-white"
            : "bg-[#1414149c] text-gray-400 cursor-not-allowed border-gray-600"
          }`}
      >
        {isBurning ? "🔥焚烧中..." : " 焚烧秘密 "}
      </button>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="flex items-center text-gray-400 text-xs hover:text-white transition-colors"
        >
          {soundEnabled ? (
            <>
              <Volume2 size={14} className="mr-1" />
              关闭音效
            </>
          ) : (
            <>
              <VolumeX size={14} className="mr-1" />
              开启音效
            </>
          )}
        </button>
      </div>

      <style jsx global>{`
        body {
          background: radial-gradient(circle at center, #1a1a1a 0%, #121212 100%);
        }

        .burning-text {
          color: white;
          animation: burn 3s forwards;
          pointer-events: none;
          text-shadow: 0 0 8px rgba(255, 69, 0, 0.7);
        }

        @keyframes burn {
          0% {
            opacity: 1;
            transform: translateY(0);
            color: white;
            text-shadow: 0 0 0px rgba(255, 69, 0, 0);
          }
          10% {
            text-shadow: 0 0 5px rgba(255, 69, 0, 0.3);
          }
          40% {
            color: #ff4500;
            text-shadow: 0 0 10px rgba(255, 69, 0, 0.7);
          }
          60% {
            color: #ff8c00;
            text-shadow: 0 0 15px rgba(255, 140, 0, 0.5);
          }
          80% {
            text-shadow: 0 0 10px rgba(128, 128, 128, 0.3);
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
            color: #808080;
            filter: blur(3px);
            text-shadow: 0 0 0px rgba(128, 128, 128, 0);
          }
        }

        @keyframes quote-transition {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            filter: blur(8px);
          }
          20%, 80% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
            filter: blur(8px);
          }
        }

        .animate-quote-transition {
          animation: quote-transition 5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center;
          white-space: pre-wrap;
          word-break: break-word;
          text-align: center;
          line-height: 1.5;
          max-width: 600px;
          margin: 0 auto;
        }

        .quote-mask::before,
        .quote-mask::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          height: 24px;
          pointer-events: none;
          z-index: 1;
        }

        .quote-mask::before {
          top: -2px;
          background: linear-gradient(to bottom, #121212 0%, transparent 100%);
        }

        .quote-mask::after {
          bottom: -2px;
          background: linear-gradient(to top, #121212 0%, transparent 100%);
        }

        @keyframes quote-transition {
          0% {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
            filter: blur(4px);
          }
          20%, 80% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-16px) scale(0.95);
            filter: blur(4px);
          }
        }
      `}</style>
    </div>
  )
}

