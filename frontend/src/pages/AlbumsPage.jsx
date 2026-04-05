import { useEffect, useState } from 'react'
import { Disc3 } from 'lucide-react'
import { getAlbums } from '../api/album.api'
import AlbumCard from '../components/AlbumCard'
import '../App.css'

function AlbumsPage() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getAlbums()
      .then((data) => { if (mounted) setAlbums(data) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <section className="tracks-page">
      <header className="tracks-page__header">
        <div className="tracks-page__header-left">
          <h2>Albums</h2>
          {!loading && (
            <span className="favorites-page__count">{albums.length} albums</span>
          )}
        </div>
      </header>

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
      ) : albums.length ? (
        <div className="fav-grid">
          {albums.map((album) => <AlbumCard key={album.id} album={album} />)}
        </div>
      ) : (
        <div className="fav-empty">
          <div className="fav-empty__icon"><Disc3 size={22} /></div>
          <p>No albums found.</p>
        </div>
      )}
    </section>
  )
}

export default AlbumsPage