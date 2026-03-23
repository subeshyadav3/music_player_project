import { Clock3, Play, Star, UserRound } from 'lucide-react'
import { usePlayer } from '../contexts/PlayerContext'
import { formatDuration } from '../utils/format'

function TrackCard({ track, tracks = [], index = 0 }) {
  const { setQueueAndPlay } = usePlayer()

  const totalPlays = track?.stats?.total_plays ?? 0

  return (
    <article className="track-card">
      <div className="track-head">
        <h4>{track.title}</h4>
        <button
          type="button"
          className="icon-btn"
          onClick={() => setQueueAndPlay(tracks, index)}
        >
          <Play size={16} />
        </button>
      </div>

      <div className="track-meta">
        <span>
          <UserRound size={14} />
          {track.artist_name || 'Unknown Artist'}
        </span>
        <span>
          <Clock3 size={14} />
          {formatDuration(track.duration)}
        </span>
        <span>
          <Star size={14} />
          {totalPlays} plays
        </span>
      </div>
    </article>
  )
}

export default TrackCard
