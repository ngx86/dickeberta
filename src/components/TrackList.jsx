import React from 'react'

function StarIcon({ filled }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className={`w-4 h-4 ${filled ? 'text-jukebox-amber' : 'text-gray-600'}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  )
}

export default function TrackList({ tracks, selectedTrack, onTrackSelect, albumSlot, isHighlighted, onToggleHighlight }) {
  const handleStarClick = (e, track) => {
    e.stopPropagation()
    onToggleHighlight(albumSlot, track.number)
  }

  return (
    <div className="max-h-64 overflow-y-auto pr-2">
      {tracks.map((track) => {
        const highlighted = isHighlighted(albumSlot, track.number)
        return (
          <div
            key={track.number}
            className={`
              track-item w-full text-left py-2 px-3 rounded-md mb-1 flex items-center gap-3
              ${selectedTrack?.number === track.number
                ? 'selected bg-jukebox-amber/20 border-l-jukebox-amber'
                : 'hover:bg-white/5'}
            `}
          >
            <button
              onClick={(e) => handleStarClick(e, track)}
              className="flex-shrink-0 hover:scale-110 transition-transform"
              title={highlighted ? 'Remove from highlights' : 'Add to highlights'}
            >
              <StarIcon filled={highlighted} />
            </button>
            <button
              onClick={() => onTrackSelect(track)}
              className="flex-1 flex items-center gap-3 min-w-0"
            >
              <span className="text-jukebox-amber font-mono text-sm w-6 text-right flex-shrink-0">
                {String(track.number).padStart(2, '0')}
              </span>
              <span className="flex-1 text-white text-sm truncate">
                {track.title}
              </span>
              {track.duration && (
                <span className="text-gray-500 text-xs font-mono flex-shrink-0">
                  {track.duration}
                </span>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
