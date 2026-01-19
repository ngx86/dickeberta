import React from 'react'
import TrackList from './TrackList'

export default function AlbumDetail({ album, selectedTrack, onTrackSelect, isHighlighted, onToggleHighlight }) {
  if (!album) return null

  return (
    <div className="glass-panel rounded-2xl p-6 max-w-md w-full">
      {/* Album Header */}
      <div className="flex gap-4 mb-6">
        <img
          src={album.coverArtUrl}
          alt={album.album}
          className="w-24 h-24 rounded-lg shadow-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white truncate">{album.album}</h2>
          <p className="text-gray-400 truncate">{album.artist}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="genre-badge text-xs px-2 py-1 rounded-full text-jukebox-amber">
              {album.genre}
            </span>
            <span className="text-gray-500 text-xs">
              Slot #{String(album.slot).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className={album.cdNotes ? 'mb-4' : ''}>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Tracklist
        </h3>
        <TrackList
          tracks={album.tracks}
          selectedTrack={selectedTrack}
          onTrackSelect={onTrackSelect}
          albumSlot={album.slot}
          isHighlighted={isHighlighted}
          onToggleHighlight={onToggleHighlight}
        />
      </div>

      {/* CD Notes - only show if present */}
      {album.cdNotes && (
        <div className="p-3 bg-black/30 rounded-lg border border-gray-700/50">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            CD Notes
          </h4>
          <pre className="text-xs text-gray-400 whitespace-pre-wrap font-sans leading-relaxed max-h-32 overflow-y-auto">
            {album.cdNotes}
          </pre>
        </div>
      )}
    </div>
  )
}
