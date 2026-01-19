import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'jukebox-highlights'

export default function useHighlights() {
  const [highlights, setHighlights] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  // Persist to localStorage whenever highlights change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights))
    } catch {
      // Ignore storage errors
    }
  }, [highlights])

  // Toggle a track's highlight status
  // Key format: "slot-trackNumber" e.g. "42-3"
  const toggleHighlight = useCallback((slot, trackNumber) => {
    const key = `${slot}-${trackNumber}`
    setHighlights(prev => {
      const updated = { ...prev }
      if (updated[key]) {
        delete updated[key]
      } else {
        updated[key] = true
      }
      return updated
    })
  }, [])

  // Check if a track is highlighted
  const isHighlighted = useCallback((slot, trackNumber) => {
    return !!highlights[`${slot}-${trackNumber}`]
  }, [highlights])

  // Get all highlighted track keys
  const getHighlightedTracks = useCallback(() => {
    return Object.keys(highlights)
  }, [highlights])

  return {
    highlights,
    toggleHighlight,
    isHighlighted,
    getHighlightedTracks
  }
}
