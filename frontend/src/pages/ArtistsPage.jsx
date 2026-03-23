import { useEffect, useState } from 'react'
import { getArtists } from '../api/artist.api'
import ArtistCard from '../components/ArtistCard'

function ArtistsPage() {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    getArtists()
      .then((data) => {
        if (mounted) {
          setArtists(data)
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
          <h2>Artists</h2>
          <p>Discover artists and their profiles.</p>
        </div>
      </header>

      {loading ? <p>Loading artists...</p> : null}
      <div className="card-grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </section>
  )
}

export default ArtistsPage
