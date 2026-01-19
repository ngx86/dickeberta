import React, { useState, useMemo } from 'react'

const SLOT_RANGES = [
  { label: '01–20', start: 1, end: 20 },
  { label: '21–40', start: 21, end: 40 },
  { label: '41–60', start: 41, end: 60 },
  { label: '61–80', start: 61, end: 80 },
  { label: '81–100', start: 81, end: 100 },
]

function ChevronIcon({ open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Navigation({ albums, currentSlot, onSlotChange, onGenreFilter, selectedGenre, highlightCount }) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // Extract unique genres and add Highlights option
  const genres = useMemo(() => {
    const genreSet = new Set(albums.map(a => a.genre))
    return ['All', 'Highlights', ...Array.from(genreSet).sort()]
  }, [albums])

  // Determine which range the current slot falls into
  const activeRange = useMemo(() => {
    return SLOT_RANGES.find(range => currentSlot >= range.start && currentSlot <= range.end)
  }, [currentSlot])

  const handleRangeClick = (range) => {
    // Jump to the first slot in this range
    onSlotChange(range.start)
  }

  const handleInputSubmit = (e) => {
    e.preventDefault()
    const slot = parseInt(inputValue, 10)
    if (slot >= 1 && slot <= 100) {
      onSlotChange(slot)
      setInputValue('')
    }
  }

  return (
    <div className="glass-panel rounded-2xl p-4 w-full max-w-md">
      {/* Mobile Accordion Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full flex items-center justify-between text-left mb-2"
      >
        <span className="text-gray-400 text-sm">
          View quick jump and filters
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Collapsible Content - always visible on lg, toggle on mobile */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        {/* Quick Jump Pills */}
        <div className="mb-4">
          <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2">
            Quick Jump
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {SLOT_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => handleRangeClick(range)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-all
                  ${activeRange?.label === range.label
                    ? 'bg-jukebox-amber text-black'
                    : 'bg-black/50 text-gray-400 hover:bg-jukebox-amber/20 hover:text-jukebox-amber border border-gray-700'}
                `}
              >
                {range.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-center">
            <form onSubmit={handleInputSubmit} className="flex gap-1 flex-1">
              <input
                type="number"
                min="1"
                max="100"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={String(currentSlot).padStart(2, '0')}
                className="flex-1 bg-black/50 border border-gray-700 rounded px-3 py-1.5 text-center text-jukebox-amber font-mono text-sm focus:border-jukebox-amber focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-jukebox-amber/20 text-jukebox-amber rounded hover:bg-jukebox-amber/30 transition-colors text-sm"
              >
                Go
              </button>
            </form>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2 hidden lg:block">
            Current: Slot {String(currentSlot).padStart(2, '0')}
          </div>
        </div>

        {/* Genre Filter */}
        <div>
          <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2">
            Filter by Genre
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => onGenreFilter(e.target.value)}
            className="w-full bg-black/50 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-jukebox-amber focus:outline-none cursor-pointer"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'Highlights'
                  ? `Highlights (${highlightCount})`
                  : genre === 'All'
                    ? 'All'
                    : `${genre} (${albums.filter(a => a.genre === genre).length})`
                }
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
