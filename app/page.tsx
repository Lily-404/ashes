"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, Download } from "lucide-react"

const BURN_QUOTES = [
  "在这里倾诉，让火焰带走一切",
  "写下，焚烧，消失",
  "无人听闻的低语，终将融于炽热",
  "让它随风而逝",
  "没有人会发现你的秘密",
  "让风与火一同埋葬你的过往",
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
  "燃起，烧尽，归寂",
  "秘密是锁，火焰是钥匙",
  "有些秘密，生来只为被烈焰吞没",
] as const


// 在文件顶部添加导入
import Notification from "./components/Notification"

// 在组件内添加状态
export default function AshSecret() {
  const [secret, setSecret] = useState("")
  const [isBurning, setIsBurning] = useState(false)
  const [burnCount, setBurnCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showShareCard, setShowShareCard] = useState(false)

  // 删除 generateShareLink 和 copyShareLink 函数

  const [notification, setNotification] = useState({ message: '', show: false })

  const burnSecret = () => {
    if (!secret.trim() || isBurning) return

    setIsBurning(true)
    setBurnCount((prev) => {
      const newCount = prev + 1
      // 里程碑检查
      if (newCount === 1) {
        setTimeout(() => setNotification({
          message: '第一个秘密已化为灰烬，愿你从此轻装前行',
          show: true
        }), 3100)
      } else if (newCount === 5) {
        setTimeout(() => setNotification({
          message: '五个秘密已随风而逝，愿你渐渐放下过往',
          show: true
        }), 3100)
      } else if (newCount === 10) {
        setTimeout(() => setNotification({
          message: '十个秘密已随风而逝，愿你所愿渐渐安宁',
          show: true
        }), 3100)
      } else if (newCount === 50) {
        setTimeout(() => setNotification({
          message: '五十个故事已成过往，愿你未来不再有遗憾',
          show: true
        }), 3100)
      } else if (newCount === 100) {
        setTimeout(() => setNotification({
          message: '百个心事已付诸一炬，愿此后心如明月',
          show: true
        }), 3100)
      } else if (newCount === 365) {
        setTimeout(() => setNotification({
          message: '三百六十五个秘密，如同经历了一年的四季轮回。愿你的人生，如同新生',
          show: true
        }), 3100)
      } else if (newCount === 500) {
        setTimeout(() => setNotification({
          message: '五百个故事已成云烟，感谢你一直以来的信任。愿你余生欢喜，不负韶华',
          show: true
        }), 3100)
      }
      return newCount
    })
    playBurnSound()

    setTimeout(() => {
      setSecret("")
      setIsBurning(false)
    }, 3000)
  }

  const downloadShareCard = async () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1080
    canvas.height = 1380
    
    if (ctx) {
      // 绘制完整背景，不进行圆角裁切
      ctx.fillStyle = '#121212'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 加载背景图片
      const loadBackgroundImage = () => {
        return new Promise((resolve) => {
          const bgImage = new Image()
          bgImage.onload = () => resolve(bgImage)
          bgImage.onerror = () => resolve(null) // 图片加载失败时继续处理
          bgImage.src = '/placeholder.jpg' // 使用项目中的背景图
        })
      }
      
      // 等待背景图片加载
      const bgImage = await loadBackgroundImage()
      
      // 如果背景图片加载成功，绘制背景图片
      if (bgImage) {
        // 绘制背景图片并添加暗色叠加以确保文字可读性
        ctx.globalAlpha = 0.3 // 降低图片不透明度
        ctx.drawImage(bgImage as HTMLImageElement, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1.0
        
        // 添加暗色渐变叠加层以增强文字可读性
        const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height)
        overlay.addColorStop(0, 'rgba(18, 18, 18, 0.7)')
        overlay.addColorStop(0.5, 'rgba(18, 18, 18, 0.8)')
        overlay.addColorStop(1, 'rgba(18, 18, 18, 0.9)')
        ctx.fillStyle = overlay
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      // 创建背景渐变 - 使用更深邃的紫色调，作为背景图片的补充
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.2
      )
      gradient.addColorStop(0, 'rgba(45, 27, 78, 0.7)')
      gradient.addColorStop(0.4, 'rgba(26, 15, 46, 0.7)')
      gradient.addColorStop(0.8, 'rgba(15, 7, 33, 0.7)')
      gradient.addColorStop(1, 'rgba(8, 4, 21, 0.7)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 添加星空效果
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.5
        const opacity = Math.random() * 0.5 + 0.1
        
        // 创建星星的光芒效果
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
        
        // 随机添加十字形光芒
        if (Math.random() > 0.7) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(x - radius * 2, y)
          ctx.lineTo(x + radius * 2, y)
          ctx.moveTo(x, y - radius * 2)
          ctx.lineTo(x, y + radius * 2)
          ctx.stroke()
        }
      }

      // 添加烟雾效果
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 60 + 20
        const opacity = Math.random() * 0.03
        
        const smokeGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        smokeGradient.addColorStop(0, `rgba(255, 69, 0, ${opacity})`)
        smokeGradient.addColorStop(1, 'rgba(255, 69, 0, 0)')
        
        ctx.fillStyle = smokeGradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // 添加内边框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 2
      const borderRadius = 24
      drawRoundedRect(ctx, 40, 40, canvas.width - 80, canvas.height - 80, borderRadius)
      ctx.stroke()

      // 添加装饰性内框
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      drawRoundedRect(ctx, 60, 60, canvas.width - 120, canvas.height - 120, 20)
      ctx.stroke()

      // 添加标题
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
      ctx.font = 'bold 88px "SF Pro Display", -apple-system, sans-serif'
      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(255, 69, 0, 0.3)'
      ctx.shadowBlur = 25
      ctx.fillText('灰 烬', canvas.width/2, canvas.height/3)
      ctx.shadowBlur = 0

      // 添加焚烧数量
      const gradient2 = ctx.createLinearGradient(
        canvas.width/2 - 150, 
        canvas.height/2, 
        canvas.width/2 + 150, 
        canvas.height/2
      )
      gradient2.addColorStop(0, '#ff4500')
      gradient2.addColorStop(1, '#ff6b00')
      ctx.fillStyle = gradient2
      ctx.font = 'bold 120px "SF Pro Display", -apple-system, sans-serif'
      ctx.shadowColor = 'rgba(255, 69, 0, 0.3)'
      ctx.shadowBlur = 30
      ctx.fillText(burnCount.toLocaleString(), canvas.width/2, canvas.height/2)
      ctx.shadowBlur = 0

      // 添加说明文字
      ctx.font = '42px "SF Pro Display", -apple-system, sans-serif'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.fillText('个秘密已化为灰烬', canvas.width/2, canvas.height/2 + 80)

      // 添加装饰分割线
      const lineY = canvas.height/2 + 150
      const lineGradient = ctx.createLinearGradient(
        canvas.width/2 - 200, lineY,
        canvas.width/2 + 200, lineY
      )
      lineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      lineGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.15)')
      lineGradient.addColorStop(0.5, 'rgba(255, 69, 0, 0.3)')
      lineGradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)')
      lineGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      
      ctx.strokeStyle = lineGradient
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(canvas.width/2 - 200, lineY)
      ctx.lineTo(canvas.width/2 + 200, lineY)
      ctx.stroke()

      // 添加中心装饰点
      ctx.fillStyle = 'rgba(255, 69, 0, 0.3)'
      ctx.beginPath()
      ctx.arc(canvas.width/2, lineY, 4, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.beginPath()
      ctx.arc(canvas.width/2, lineY, 2, 0, Math.PI * 2)
      ctx.fill()

      // 添加随机引言
      ctx.font = 'italic 36px "SF Pro Display", -apple-system, sans-serif'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      const quote = BURN_QUOTES[Math.floor(Math.random() * BURN_QUOTES.length)]
      const maxWidth = canvas.width - 200
      ctx.fillText(quote, canvas.width/2, canvas.height/2 + 200, maxWidth)

      // 添加时间戳
      const { season, timeDesc } = getSeasonAndTime()
      const date = new Date()
      const yearStr = date.getFullYear().toString().split('').map(n => toChineseNum(parseInt(n))).join('')
      const monthStr = toChineseNum(date.getMonth() + 1)
      const dayStr = toChineseNum(date.getDate())
      
      ctx.font = '28px "SF Pro Display", -apple-system, sans-serif'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
      ctx.fillText(`${season}${timeDesc} · ${yearStr}年${monthStr}月${dayStr}日`, canvas.width/2, canvas.height - 80)

      // 下载图片
      const link = document.createElement('a')
      link.download = `灰烬记录-${date.toLocaleDateString()}.png`
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

  // 添加辅助函数
  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
  }

  const getSeasonAndTime = () => {
    const date = new Date()
    const month = date.getMonth() + 1
    const hour = date.getHours()
    
    let season = ''
    if (month >= 3 && month <= 5) season = '春日'
    else if (month >= 6 && month <= 8) season = '夏日'
    else if (month >= 9 && month <= 11) season = '秋日'
    else season = '冬日' // 12、1、2月
    
    let timeDesc = ''
    if (hour >= 23 || hour < 1) timeDesc = '子时'
    else if (hour >= 1 && hour < 5) timeDesc = '深夜'
    else if (hour >= 5 && hour < 7) timeDesc = '晨曦'
    else if (hour >= 7 && hour < 11) timeDesc = '晴朝'
    else if (hour >= 11 && hour < 13) timeDesc = '正午'
    else if (hour >= 13 && hour < 17) timeDesc = '午后'
    else if (hour >= 17 && hour < 19) timeDesc = '傍晚'
    else if (hour >= 19 && hour < 23) timeDesc = '夜幕'
    
    return { season, timeDesc }
  }

  const toChineseNum = (num: number) => {
    const chars = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    if (num <= 10) return chars[num]
    if (num < 20) return '十' + (num > 10 ? chars[num - 10] : '')
    return chars[Math.floor(num/10)] + '十' + (num % 10 ? chars[num % 10] : '')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative bg-[#121212]">
      {/* 添加通知组件 */}
      <Notification 
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

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
          <div className="h-8">
            {burnCount > 0 && (
              <button
                onClick={downloadShareCard}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 text-xs rounded-2xl hover:bg-gray-600/50 transition-colors border border-gray-600/30 hover:border-gray-500/50"
              >
                <Download size={14} />
                留存此刻
              </button>
            )}
          </div>
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

