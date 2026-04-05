import { useMemo, useState } from 'react'
import { Disc3, Flame, Mic2, Search, ListMusic, Music2, TrendingUp, Users } from 'lucide-react'
import TrackCard from '../components/TrackCard'
import AlbumCard from '../components/AlbumCard'
import ArtistCard from '../components/ArtistCard'
import { useHomeData } from '../state/useHomeData'
import '../App.css'

function HomePage() {
  const { tracks, trendingTracks, albums, artists, loading } = useHomeData()
  const [search, setSearch] = useState('')

  const filteredTracks = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return tracks
    return tracks.filter((t) =>
      [t.title, t.artist_name, t.album_title].some((v) => v?.toLowerCase().includes(q))
    )
  }, [tracks, search])

  const totals = useMemo(() => ({
    tracks: tracks.length,
    trending: trendingTracks.length,
    albums: albums.length,
    artists: artists.length,
    plays: tracks.reduce((s, t) => s + (t.stats?.total_plays ?? t.play_count ?? 0), 0),
  }), [tracks, trendingTracks, albums, artists])

  const stats = [
    { label: 'Tracks', value: totals.tracks, icon: <ListMusic size={14} /> },
    { label: 'Trending', value: totals.trending, icon: <TrendingUp size={14} /> },
    { label: 'Albums', value: totals.albums, icon: <Disc3 size={14} /> },
    { label: 'Artists', value: totals.artists, icon: <Users size={14} /> },
    { label: 'Total plays', value: totals.plays.toLocaleString(), icon: <Music2 size={14} /> },
  ]

  return (
    <section className="home-page">

      {/* Header */}
      <header className="home-header">
        <div className="home-header__left">
          <span className="tdetail-eyebrow">Platform overview</span>
          <h2>Discover</h2>
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

      {/* Stats */}
      <div className="home-stats">
        {stats.map((s) => (
          <div className="home-stat" key={s.label}>
            <div className="home-stat__icon">{s.icon}</div>
            <strong>{s.value}</strong>
            <small>{s.label}</small>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="fav-grid" style={{ marginTop: 32 }}>
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
      ) : (
        <>
          {/* Trending */}
          <div className="home-section">
            <div className="home-section__head">
              <Flame size={14} /><h3>Trending this week</h3>
            </div>
            {trendingTracks.length ? (
              <div className="fav-grid">
                {trendingTracks.map((track, i) => (
                  <TrackCard key={`trending-${track.id}`} track={track} tracks={trendingTracks} index={i} />
                ))}
              </div>
            ) : (
              <p className="artist-empty">No trending tracks available yet.</p>
            )}
          </div>

          {/* Albums */}
          <div className="home-section">
            <div className="home-section__head">
              <Disc3 size={14} /><h3>Albums</h3>
            </div>
            <div className="fav-grid">
              {albums.slice(0, 8).map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>

          {/* Artists */}
          <div className="home-section">
            <div className="home-section__head">
              <Mic2 size={14} /><h3>Featured artists</h3>
            </div>
            <div className="fav-grid">
              {artists.slice(0, 8).map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>

          {/* All tracks */}
          <div className="home-section">
            <div className="home-section__head">
              <ListMusic size={14} /><h3>All tracks</h3>
              <span className="artist-section__count">{filteredTracks.length}</span>
            </div>
            {filteredTracks.length ? (
              <div className="fav-grid">
                {filteredTracks.map((track, i) => (
                  <TrackCard key={track.id} track={track} tracks={filteredTracks} index={i} />
                ))}
              </div>
            ) : (
              <p className="artist-empty">No tracks matched your search.</p>
            )}
          </div>
        </>
      )}
    </section>
  )
}

export default HomePage