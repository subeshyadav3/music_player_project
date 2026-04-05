import { useEffect, useMemo, useState } from 'react'
import { BookMarked } from 'lucide-react'
import { apiClient, normalizeListResponse } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import PlaylistCard from '../components/PlaylistCard'
import '../App.css'

function LibraryPage() {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    const fetchPlaylists = async () => {
      setLoading(true); setError('')
      try {
        const response = await apiClient.get('/playlists/')
        if (mounted) setPlaylists(normalizeListResponse(response.data))
      } catch {
        if (mounted) setError('Unable to load playlists right now.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchPlaylists()
    return () => { mounted = false }
  }, [])

  const myPlaylists = useMemo(
    () => playlists.filter((p) => p.user?.id === user?.id),
    [playlists, user?.id],
  )

  return (
    <section className="tracks-page">
      <header className="tracks-page__header">
        <div className="tracks-page__header-left">
          <h2>Your Library</h2>
          {!loading && !error && (
            <span className="favorites-page__count">{myPlaylists.length} playlists</span>
          )}
        </div>
      </header>

      {error && (
        <div className="manage-toast manage-toast--error" style={{ marginBottom: 24 }}>
          <span className="manage-toast__dot" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="fav-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="pl-skeleton" key={i}>
              <div className="pl-skeleton-art" />
              <div className="pl-skeleton-body">
                <div className="pl-skeleton-line" style={{ width: '65%' }} />
                <div className="pl-skeleton-line" style={{ width: '40%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : myPlaylists.length ? (
        <div className="fav-grid">
          {myPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      ) : !error ? (
        <div className="fav-empty">
          <div className="fav-empty__icon"><BookMarked size={22} /></div>
          <p>You don't have any playlists yet.</p>
        </div>
      ) : null}
    </section>
  )
}

export default LibraryPage