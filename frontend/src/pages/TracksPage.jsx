import { useMemo, useState } from 'react'
import { ListMusic, Search } from 'lucide-react'
import TrackCard from '../components/TrackCard'
import { useHomeData } from '../state/useHomeData'
import '../App.css'

function TracksPage() {
  const { tracks, loading } = useHomeData()
  const [search, setSearch] = useState('')

  const filteredTracks = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return tracks
    return tracks.filter((t) =>
      [t.title, t.artist_name, t.album_title].some((v) => v?.toLowerCase().includes(q))
    )
  }, [tracks, search])

  return (
    <section className="tracks-page">
      <header className="tracks-page__header">
        <div className="tracks-page__header-left">
          <h2>Tracks</h2>
          {!loading && (
            <span className="favorites-page__count">{filteredTracks.length} songs</span>
          )}
        </div>
        <label className="tracks-search">
          <Search size={13} />
          <input
            type="search"
            placeholder="Search title, artist or album…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </header>

      {loading ? (
        <div className="fav-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="pl-skeleton" key={i}>
              <div className="pl-skeleton-art" />
              <div className="pl-skeleton-body">
                <div className="pl-skeleton-line" style={{ width: '70%' }} />
                <div className="pl-skeleton-line" style={{ width: '45%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : filteredTracks.length ? (
        <div className="fav-grid">
          {filteredTracks.map((track, index) => (
            <TrackCard key={track.id} track={track} tracks={filteredTracks} index={index} />
          ))}
        </div>
      ) : (
        <div className="fav-empty">
          <div className="fav-empty__icon"><ListMusic size={22} /></div>
          <p>No tracks matched your search.</p>
        </div>
      )}
    </section>
  )
}

export default TracksPage