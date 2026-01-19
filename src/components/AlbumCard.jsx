import React from 'react'

export default function AlbumCard({ album, isActive }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`
          relative rounded-lg overflow-hidden transition-all duration-300
          ${isActive ? 'shadow-2xl ring-2 ring-jukebox-amber/50' : 'shadow-lg opacity-80'}
        `}
        style={{
          width: isActive ? '280px' : '240px',
          height: isActive ? '280px' : '240px',
        }}
      >
        <img
          src={album.coverArtUrl}
          alt={`${album.album} by ${album.artist}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Slot number badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-jukebox-amber">
          #{String(album.slot).padStart(2, '0')}
        </div>
      </div>

      {/* Album info below cover (only visible on active) */}
      {isActive && (
        <div className="mt-4 text-center max-w-[280px]">
          <h3 className="text-white font-semibold text-lg truncate">{album.album}</h3>
          <p className="text-gray-400 text-sm truncate">{album.artist}</p>
        </div>
      )}
    </div>
  )
}
