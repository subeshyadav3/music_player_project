import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CalendarDays, Disc3, Music2 } from 'lucide-react'
import { getAlbum } from '../api/album.api'
import { useHomeData } from '../state/useHomeData'

function AlbumDetailPage() {
  const { id } = useParams()
  const albumId = Number(id)
  const { tracks } = useHomeData()

  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const albumTracks = useMemo(
    () => tracks.filter((track) => track.album === albumId),
    [tracks, albumId],
  )

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getAlbum(albumId)
        if (mounted) setAlbum(data)
      } catch (err) {
        if (mounted) setError('Could not load album.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (!Number.isNaN(albumId)) {
      load()
    }

    return () => {
      mounted = false
    }
  }, [albumId])

  if (loading) {
    return (
      <section className="page-section">
        <p>Loading album...</p>
      </section>
    )
  }

  if (error || !album) {
    return (
      <section className="page-section">
        <p className="form-error">{error || 'Album not found.'}</p>
      </section>
    )
  }

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>{album.title}</h2>
          <p>
            <Disc3 size={14} />
            <Link to={`/artists/${album.artist}`}>{album.artist_name}</Link>
          </p>
        </div>
        {album.release_date ? (
          <div>
            <CalendarDays size={14} />
            <span>{album.release_date}</span>
          </div>
        ) : null}
      </header>

      <div className="section-title">
        <Music2 size={16} />
        <h3>Tracks</h3>
      </div>

      <ul className="simple-list">
        {albumTracks.map((track) => (
          <li key={track.id}>
            <Link to={`/tracks/${track.id}`}>{track.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AlbumDetailPage
