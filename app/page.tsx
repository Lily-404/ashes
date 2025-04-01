"use client"

import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function AshSecret() {
  const [secret, setSecret] = useState("")
  const [isBurning, setIsBurning] = useState(false)
  const [burnCount, setBurnCount] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)  // 默认开启音效

  // Load burn count from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem("ashSecretBurnCount")
    if (savedCount) {
      setBurnCount(Number.parseInt(savedCount, 10))
    }
  }, [])

  // Save burn count to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("ashSecretBurnCount", burnCount.toString())
  }, [burnCount])
  const textRef = useRef<HTMLDivElement>(null)

  const playBurnSound = () => {
    if (soundEnabled) {
      const audio = new Audio("/burn-sound.mp3")
      audio.volume = 0.3  // 可以调整这个值，0是静音，1是最大音量
      audio.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const burnSecret = () => {
    if (!secret.trim() || isBurning) return

    setIsBurning(true)
    setBurnCount((prev) => prev + 1)
    playBurnSound()

    setTimeout(() => {
      setSecret("")
      setIsBurning(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative bg-[#121212]">
      <div className="text-center mb-8">
        <h3 className="text-white text-3xl md:text-4xl font-semibold mb-2">灰烬</h3>
        <p className="text-gray-400 text-sm mb-4">写下秘密，点击焚烧，让它彻底消失</p>
        <p className="text-gray-400 text-sm">已有 {burnCount} 个秘密化为灰烬</p>
      </div>

      <div className="w-full max-w-md relative">
        <textarea
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          disabled={isBurning}
          maxLength={100}
          placeholder="写下你想要释放的秘密..."
          aria-label="写下你的秘密"
          className={`w-full h-28 sm:h-32 bg-[#1414149c] text-white p-3 sm:p-4 rounded-lg border border-gray-600 resize-none focus:outline-none focus:border-white focus:bg-[#ffffff05] transition-all ${
            isBurning ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="absolute bottom-2 right-3 text-xs text-gray-500">{secret.length}/100</div>

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
        aria-label={isBurning ? "焚烧中" : "焚烬秘密"}
        className={`mt-6 px-8 py-3 rounded-lg transition-all duration-300 ${
          secret.trim() && !isBurning
            ? "bg-gradient-to-r from-orange-700 to-red-700 text-white hover:from-orange-600 hover:to-red-600 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            : "bg-[#1414149c] text-gray-400 cursor-not-allowed border border-gray-600"
        }`} 
      >
        {isBurning ? "焚烧中..." : " 焚烬秘密🔥 "}
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

        textarea::placeholder {
          color: #a0a0a0;
        }
      `}</style>
    </div>
  )
}

