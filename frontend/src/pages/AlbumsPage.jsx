import { useEffect, useState } from 'react'
import { getAlbums } from '../api/album.api'
import AlbumCard from '../components/AlbumCard'

function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getAlbums()
      .then((data) => {
        if (mounted) {
          setAlbums(data)
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
          <h2>Albums</h2>
          <p>Browse released albums in your platform.</p>
        </div>
      </header>

      {loading ? <p>Loading albums...</p> : null}
      <div className="card-grid">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </section>
  )
}

export default AlbumsPage
