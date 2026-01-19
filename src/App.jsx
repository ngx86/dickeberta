import React, { useState, useMemo, useRef, useCallback } from 'react'
import CoverFlow from './components/CoverFlow'
import AlbumDetail from './components/AlbumDetail'
import JukeboxDisplay from './components/JukeboxDisplay'
import Navigation from './components/Navigation'
import useHighlights from './hooks/useHighlights'
import albumsData from './data/albums.json'

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [selectedGenre, setSelectedGenre] = useState('All')
  const swiperRef = useRef(null)
  const { highlights, toggleHighlight, isHighlighted } = useHighlights()

  // Filter albums by genre or highlights
  const filteredAlbums = useMemo(() => {
    if (selectedGenre === 'Highlights') {
      // Filter to albums that have at least one highlighted track
      return albumsData.filter(album =>
        album.tracks.some(track => isHighlighted(album.slot, track.number))
      )
    }
    if (selectedGenre === 'All') {
      return albumsData
    }
    return albumsData.filter(album => album.genre === selectedGenre)
  }, [selectedGenre, highlights, isHighlighted])

  // Current active album
  const currentAlbum = filteredAlbums[activeIndex] || filteredAlbums[0]

  // Handle slide change from coverflow
  const handleSlideChange = useCallback((index) => {
    setActiveIndex(index)
    setSelectedTrack(null) // Reset track selection when album changes
  }, [])

  // Handle quick jump to slot
  const handleSlotChange = useCallback((slot) => {
    const albumIndex = filteredAlbums.findIndex(a => a.slot === slot)
    if (albumIndex !== -1) {
      setActiveIndex(albumIndex)
      if (swiperRef.current) {
        swiperRef.current.slideTo(albumIndex, 300)
      }
      setSelectedTrack(null)
    } else {
      // If slot not in filtered view, find closest
      const closest = filteredAlbums.reduce((prev, curr) =>
        Math.abs(curr.slot - slot) < Math.abs(prev.slot - slot) ? curr : prev
      )
      const closestIndex = filteredAlbums.indexOf(closest)
      setActiveIndex(closestIndex)
      if (swiperRef.current) {
        swiperRef.current.slideTo(closestIndex, 300)
      }
      setSelectedTrack(null)
    }
  }, [filteredAlbums])

  // Handle genre filter change
  const handleGenreFilter = useCallback((genre) => {
    setSelectedGenre(genre)
    setActiveIndex(0)
    setSelectedTrack(null)
    // Let React re-render, then slide to 0
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(0, 0)
      }
    }, 50)
  }, [])

  // Handle track selection
  const handleTrackSelect = useCallback((track) => {
    setSelectedTrack(track)
  }, [])

  return (
    <div className="min-h-screen bg-jukebox-dark flex flex-col">
      {/* Header */}
      <header className="text-center py-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
          Jukebox
        </h1>
        <p className="text-gray-500 text-sm">
          100 Albums Collection
        </p>
      </header>

      {/* Coverflow Section */}
      <section className="flex-shrink-0">
        <CoverFlow
          albums={filteredAlbums}
          activeIndex={activeIndex}
          onSlideChange={handleSlideChange}
          swiperRef={swiperRef}
        />
      </section>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pb-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Navigation */}
          <div>
            <Navigation
              albums={albumsData}
              currentSlot={currentAlbum?.slot || 1}
              onSlotChange={handleSlotChange}
              onGenreFilter={handleGenreFilter}
              selectedGenre={selectedGenre}
              highlightCount={Object.keys(highlights).length}
            />
          </div>

          {/* Center: Album Details */}
          <div className="flex justify-center">
            <AlbumDetail
              album={currentAlbum}
              selectedTrack={selectedTrack}
              onTrackSelect={handleTrackSelect}
              isHighlighted={isHighlighted}
              onToggleHighlight={toggleHighlight}
            />
          </div>

          {/* Right: Jukebox Code */}
          <div>
            <JukeboxDisplay
              slotNumber={selectedTrack ? currentAlbum?.slot : null}
              trackNumber={selectedTrack?.number}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600 text-xs">
        <p>Use arrow keys or swipe to browse albums</p>
      </footer>
    </div>
  )
}
