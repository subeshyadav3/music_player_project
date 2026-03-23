import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getTracks, getTrendingTracks } from '../api/track.api'
import { getAlbums } from '../api/album.api'
import { getArtists } from '../api/artist.api'

const HomeDataContext = createContext(null)

export function HomeDataProvider({ children }) {
  const [tracks, setTracks] = useState([])
  const [trendingTracks, setTrendingTracks] = useState([])
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      setLoading(true)
      try {
        const [tracksData, trendingData, albumsData, artistsData] = await Promise.all([
          getTracks(),
          getTrendingTracks('week', 8),
          getAlbums(),
          getArtists(),
        ])

        if (!mounted) {
          return
        }

        setTracks(tracksData)
        setTrendingTracks(trendingData)
        setAlbums(albumsData)
        setArtists(artistsData)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      mounted = false
    }
  }, [])

  const value = useMemo(
    () => ({ tracks, trendingTracks, albums, artists, loading }),
    [tracks, trendingTracks, albums, artists, loading],
  )

  return <HomeDataContext.Provider value={value}>{children}</HomeDataContext.Provider>
}

export function useHomeData() {
  const context = useContext(HomeDataContext)
  if (!context) {
    throw new Error('useHomeData must be used within HomeDataProvider')
  }
  return context
}
