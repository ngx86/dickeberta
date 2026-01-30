import { useState, useEffect } from 'react'
import splashImage from '../assets/splash-screen.webp'

const ECHO_COUNT = 7

export default function SplashScreen({ onComplete }) {
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 3200)
    const doneTimer = setTimeout(() => onComplete(), 4000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[9999] bg-jukebox-dark flex items-center justify-center overflow-hidden"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Ambient amber glow */}
      <div className="splash-glow absolute rounded-full" style={{ width: '60vmin', height: '60vmin' }} />

      {/* Shockwave rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={`ring-${i}`}
          className="splash-ring absolute"
          style={{
            width: '35vmin',
            height: '35vmin',
            animationDelay: `${0.6 + i * 1}s`,
          }}
        />
      ))}

      {/* Echo layers - continuous outward pulse */}
      {Array.from({ length: ECHO_COUNT }, (_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (1.5 + i * 1.5)}deg)`,
          }}
        >
          <img
            src={splashImage}
            alt=""
            className="splash-echo object-contain"
            style={{
              width: '35vmin',
              height: '35vmin',
              animationDelay: `${i * 0.4}s`,
            }}
          />
        </div>
      ))}

      {/* Center image with fade-in */}
      <div className="splash-center-enter relative z-10">
        <img
          src={splashImage}
          alt="Jukebox"
          className="splash-breathe object-contain drop-shadow-[0_0_40px_rgba(255,149,0,0.5)]"
          style={{ width: '35vmin', height: '35vmin' }}
        />
      </div>
    </div>
  )
}
