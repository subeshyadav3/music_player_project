import { useEffect, useMemo, useState } from 'react'
import { BookMarked } from 'lucide-react'
import { apiClient, normalizeListResponse } from '../api/client'
import { useAuth } from '../contexts/AuthContext'

function LibraryPage() {
  const { user } = useAuth()
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    const fetchPlaylists = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await apiClient.get('/playlists/')
        if (mounted) {
          setPlaylists(normalizeListResponse(response.data))
        }
      } catch {
        if (mounted) {
          setError('Unable to load playlists right now.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchPlaylists()

    return () => {
      mounted = false
    }
  }, [])

  const myPlaylists = useMemo(
    () => playlists.filter((playlist) => playlist.user?.id === user?.id),
    [playlists, user?.id],
  )

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>Your Library</h2>
          <p>Playlists created in your account.</p>
        </div>
      </header>

      {loading ? <p>Loading playlists...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      {!loading && !error ? (
        <div className="playlist-list">
          {myPlaylists.length === 0 ? (
            <div className="empty-card">
              <BookMarked size={18} />
              <p>You do not have playlists yet.</p>
            </div>
          ) : (
            myPlaylists.map((playlist) => (
              <article key={playlist.id} className="playlist-card">
                <h4>{playlist.name}</h4>
                <p>{playlist.description || 'No description provided.'}</p>
                <small>{playlist.is_public ? 'Public' : 'Private'}</small>
              </article>
            ))
          )}
        </div>
      ) : null}
    </section>
  )
}

export default LibraryPage
