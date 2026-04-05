import { useEffect, useState } from 'react'
import { Users } from 'lucide-react'
import { getArtists } from '../api/artist.api'
import ArtistCard from '../components/ArtistCard'
import '../App.css'

function ArtistsPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getArtists()
      .then((data) => { if (mounted) setArtists(data) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [])

  return (
    <section className="tracks-page">
      <header className="tracks-page__header">
        <div className="tracks-page__header-left">
          <h2>Artists</h2>
          {!loading && (
            <span className="favorites-page__count">{artists.length} artists</span>
          )}
        </div>
      </header>

      {loading ? (
        <div className="fav-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="pl-skeleton" key={i}>
              <div className="pl-skeleton-art" style={{ borderRadius: '50%' }} />
              <div className="pl-skeleton-body">
                <div className="pl-skeleton-line" style={{ width: '60%' }} />
                <div className="pl-skeleton-line" style={{ width: '35%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : artists.length ? (
        <div className="fav-grid">
          {artists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      ) : (
        <div className="fav-empty">
          <div className="fav-empty__icon"><Users size={22} /></div>
          <p>No artists found.</p>
        </div>
      )}
    </section>
  )
}

export default ArtistsPage