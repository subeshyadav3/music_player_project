import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BadgeCheck, MapPin, Music2, Users } from 'lucide-react'
import { getArtist } from '../api/artist.api'
import { followUser, isFollowingUser, unfollowUser } from '../api/user.api'
import { useHomeData } from '../state/useHomeData'

function ArtistDetailPage() {
  const { id } = useParams()
  const artistId = Number(id)
  const { tracks, albums } = useHomeData()

  const [artist, setArtist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFollowing, setIsFollowing] = useState(false)

  const artistTracks = useMemo(
    () => tracks.filter((track) => track.artist === artistId),
    [tracks, artistId],
  )

  const artistAlbums = useMemo(
    () => albums.filter((album) => album.artist === artistId),
    [albums, artistId],
  )

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getArtist(artistId)
        if (!mounted) return
        setArtist(data)
        if (data.user?.id) {
          const following = await isFollowingUser(data.user.id)
          if (mounted) setIsFollowing(following)
        }
      } catch (err) {
        if (mounted) setError('Could not load artist.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (!Number.isNaN(artistId)) {
      load()
    }

    return () => {
      mounted = false
    }
  }, [artistId])

  const handleFollowToggle = async () => {
    if (!artist?.user?.id) return
    try {
      if (isFollowing) {
        await unfollowUser(artist.user.id)
        setIsFollowing(false)
      } else {
        await followUser(artist.user.id)
        setIsFollowing(true)
      }
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <section className="page-section">
        <p>Loading artist...</p>
      </section>
    )
  }

  if (error || !artist) {
    return (
      <section className="page-section">
        <p className="form-error">{error || 'Artist not found.'}</p>
      </section>
    )
  }

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>{artist.stage_name}</h2>
          <p>{artist.description}</p>
        </div>
        <button type="button" className="ghost-btn" onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </header>

      <div className="artist-meta">
        <span>
          <MapPin size={14} />
          {artist.country}
        </span>
        <span>
          <Users size={14} />
          {artist.user?.followers_count ?? 0} followers
        </span>
        {artist.verified ? (
          <span>
            <BadgeCheck size={14} /> Verified
          </span>
        ) : null}
      </div>

      <div className="section-title">
        <Music2 size={16} />
        <h3>Tracks</h3>
      </div>

      <ul className="simple-list">
        {artistTracks.map((track) => (
          <li key={track.id}>
            <Link to={`/tracks/${track.id}`}>{track.title}</Link>
          </li>
        ))}
      </ul>

      <div className="section-title">
        <Music2 size={16} />
        <h3>Albums</h3>
      </div>

      <ul className="simple-list">
        {artistAlbums.map((album) => (
          <li key={album.id}>
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ArtistDetailPage
