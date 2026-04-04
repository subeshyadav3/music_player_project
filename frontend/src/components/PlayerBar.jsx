import { useEffect, useRef } from 'react'
import { SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'
import { usePlayer } from '../contexts/PlayerContext'
import { formatDuration } from '../utils/format'
import { playTrackRequest } from '../api/track.api'
import { toMediaUrl } from '../utils/media'

function PlayerBar() {
  const audioRef = useRef(null)
  const playedTrackRef = useRef(null)

  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
  } = usePlayer()

  useEffect(() => {
    if (!audioRef.current) {
      return
    }
    audioRef.current.volume = volume
  }, [volume])

  useEffect(() => {
    const player = audioRef.current
    if (!player || !currentTrack) {
      return
    }

    player.src = 'http://127.0.0.1:8000/media/tracks/default.mp3'
    player
      .play()
      .then(async () => {
        if (playedTrackRef.current !== currentTrack.id) {
          playedTrackRef.current = currentTrack.id
          try {
            await playTrackRequest(currentTrack.id)
          } catch {
            // Intentionally ignored.
          }
        }
      })
      .catch(() => {
        // Playback can fail without user gesture in some browsers.
      })
  }, [currentTrack])

  useEffect(() => {
    const player = audioRef.current
    if (!player || !currentTrack) {
      return
    }

    if (isPlaying) {
      player.play().catch(() => {})
    } else {
      player.pause()
    }
  }, [isPlaying, currentTrack])

  const handleSeek = (event) => {
    const nextTime = Number(event.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = nextTime
    }
    setCurrentTime(nextTime)
  }

  if (!currentTrack) {
    return (
      <div className="player-bar empty-player">
        <p>Select a track to start listening.</p>
      </div>
    )
  }

  return (
    <div className="player-bar">
      <audio
        ref={audioRef}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onEnded={playNext}
      />

      <div className="player-main">
        <div className="current-track-info">
          <strong>{currentTrack.title}</strong>
          <span>{currentTrack.artist_name || 'Unknown Artist'}</span>
        </div>

        <div className="player-controls">
          <button type="button" className="icon-btn" onClick={playPrevious}>
            <SkipBack size={16} />
          </button>
          <button type="button" className="play-btn" onClick={togglePlay}>
            {isPlaying ? <FaPauseCircle size={30} /> : <FaPlayCircle size={30} />}
          </button>
          <button type="button" className="icon-btn" onClick={playNext}>
            <SkipForward size={16} />
          </button>
        </div>

        <div className="player-progress">
          <span>{formatDuration(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={Math.min(currentTime, duration || 0)}
            onChange={handleSeek}
          />
          <span>{formatDuration(duration)}</span>
        </div>

        <div className="volume-control">
          <Volume2 size={16} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerBar
