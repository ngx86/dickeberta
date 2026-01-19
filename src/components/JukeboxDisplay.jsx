import React from 'react'

export default function JukeboxDisplay({ slotNumber, trackNumber }) {
  // Format as SSTT (slot 2 digits, track 2 digits)
  const formatCode = () => {
    if (!slotNumber || !trackNumber) {
      return '----'
    }
    const slot = String(slotNumber).padStart(2, '0')
    const track = String(trackNumber).padStart(2, '0')
    return `${slot}${track}`
  }

  const code = formatCode()
  const hasSelection = slotNumber && trackNumber

  return (
    <div className="glass-panel rounded-2xl p-6 text-center">
      <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
        Jukebox Code
      </div>

      {/* LCD Display Container */}
      <div className="relative bg-black rounded-lg p-4 border border-gray-800 overflow-hidden">
        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
          }}
        />

        {/* LCD Background (shows all segments dimly) */}
        <div className="lcd-background text-5xl md:text-6xl select-none" aria-hidden="true">
          8888
        </div>

        {/* LCD Active Display */}
        <div
          className={`
            lcd-display text-5xl md:text-6xl text-jukebox-amber absolute inset-0
            flex items-center justify-center
            ${hasSelection ? 'animate-pulse-glow' : ''}
          `}
          style={{ padding: '1rem' }}
        >
          {code}
        </div>
      </div>

      {/* Helper text */}
      <div className="mt-3 text-xs text-gray-500">
        {hasSelection ? (
          <span>
            Slot <span className="text-jukebox-amber">{String(slotNumber).padStart(2, '0')}</span>
            {' / '}
            Track <span className="text-jukebox-amber">{String(trackNumber).padStart(2, '0')}</span>
          </span>
        ) : (
          <span>Select a track to see the code</span>
        )}
      </div>
    </div>
  )
}
