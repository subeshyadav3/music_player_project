import { createContext, useContext, useMemo, useState } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [queue, setQueue] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const currentTrack = currentIndex >= 0 ? queue[currentIndex] : null

  const setQueueAndPlay = (tracks, startIndex = 0) => {
    setQueue(tracks)
    setCurrentIndex(startIndex)
    setIsPlaying(true)
  }

  const playTrack = (track, tracks = null) => {
    if (tracks && tracks.length > 0) {
      const index = tracks.findIndex((item) => item.id === track.id)
      setQueueAndPlay(tracks, index >= 0 ? index : 0)
      return
    }

    setQueue([track])
    setCurrentIndex(0)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (!currentTrack) {
      return
    }
    setIsPlaying((prev) => !prev)
  }

  const playNext = () => {
    if (queue.length === 0) {
      return
    }

    const nextIndex = currentIndex + 1
    if (nextIndex >= queue.length) {
      setIsPlaying(false)
      return
    }

    setCurrentIndex(nextIndex)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const playPrevious = () => {
    if (queue.length === 0 || currentIndex <= 0) {
      return
    }

    setCurrentIndex((prev) => prev - 1)
    setCurrentTime(0)
    setIsPlaying(true)
  }

  const value = useMemo(
    () => ({
      queue,
      currentTrack,
      currentIndex,
      isPlaying,
      volume,
      currentTime,
      duration,
      setQueueAndPlay,
      playTrack,
      togglePlay,
      playNext,
      playPrevious,
      setVolume,
      setCurrentTime,
      setDuration,
      setIsPlaying,
    }),
    [
      queue,
      currentTrack,
      currentIndex,
      isPlaying,
      volume,
      currentTime,
      duration,
    ],
  )

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider')
  }
  return context
}
