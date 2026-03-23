import { useMemo, useState } from 'react'
import { Disc3, Flame, Mic2, Search } from 'lucide-react'
import TrackCard from '../components/TrackCard'
import AlbumCard from '../components/AlbumCard'
import ArtistCard from '../components/ArtistCard'
import { useHomeData } from '../state/useHomeData'

function HomePage() {
  const { tracks, trendingTracks, albums, artists, loading } = useHomeData()
  const [search, setSearch] = useState('')

  const filteredTracks = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) {
      return tracks
    }

    return tracks.filter((track) => {
      const title = track.title?.toLowerCase() || ''
      const artist = track.artist_name?.toLowerCase() || ''
      const album = track.album_title?.toLowerCase() || ''
      return title.includes(query) || artist.includes(query) || album.includes(query)
    })
  }, [tracks, search])

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>Discover</h2>
          <p>Find trending tracks and continue listening.</p>
        </div>
        <label className="search-box">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by title, artist or album"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </header>

      {loading ? <p>Loading tracks...</p> : null}

      {!loading ? (
        <>
          <div className="section-title">
            <Flame size={16} />
            <h3>Trending this week</h3>
          </div>
          <div className="track-grid">
            {trendingTracks.map((track, index) => (
              <TrackCard
                key={`trending-${track.id}`}
                track={track}
                tracks={trendingTracks}
                index={index}
              />
            ))}
          </div>

          <div className="section-title">
            <Disc3 size={16} />
            <h3>Albums</h3>
          </div>
          <div className="card-grid">
            {albums.slice(0, 8).map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>

          <div className="section-title">
            <Mic2 size={16} />
            <h3>Featured artists</h3>
          </div>
          <div className="card-grid">
            {artists.slice(0, 8).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>

          <div className="section-title all-tracks-title">
            <h3>All tracks</h3>
            <span>{filteredTracks.length} songs</span>
          </div>

          <div className="track-grid">
            {filteredTracks.map((track, index) => (
              <TrackCard
                key={track.id}
                track={track}
                tracks={filteredTracks}
                index={index}
              />
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

export default HomePage
