import { useEffect, useState } from 'react'
import { getPlaylists } from '../api/playlist.api'

function PlaylistsPage() {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getPlaylists()
      .then((data) => {
        if (mounted) {
          setPlaylists(data)
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>Playlists</h2>
          <p>Explore public and personal playlists.</p>
        </div>
      </header>

      {loading ? <p>Loading playlists...</p> : null}

      <div className="playlist-list">
        {playlists.map((playlist) => (
          <article key={playlist.id} className="playlist-card">
            <h4>{playlist.name}</h4>
            <p>{playlist.description || 'No description provided.'}</p>
            <small>{playlist.is_public ? 'Public' : 'Private'}</small>
          </article>
        ))}
      </div>
    </section>
  )
}

export default PlaylistsPage
