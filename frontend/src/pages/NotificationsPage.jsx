import { BellRing } from 'lucide-react'
import { useMemo } from 'react'
import { useHomeData } from '../state/useHomeData'

function NotificationsPage() {
  const { trendingTracks, albums } = useHomeData()

  const notifications = useMemo(() => {
    const trendItems = trendingTracks.slice(0, 3).map((track) => ({
      id: `trend-${track.id}`,
      text: `${track.title} is trending this week.`,
    }))

    const albumItems = albums.slice(0, 3).map((album) => ({
      id: `album-${album.id}`,
      text: `New album available: ${album.title}`,
    }))

    return [...trendItems, ...albumItems]
  }, [albums, trendingTracks])

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>Notifications</h2>
          <p>Latest updates from your music platform.</p>
        </div>
      </header>

      <div className="notification-list">
        {notifications.length ? (
          notifications.map((item) => (
            <article className="notification-card" key={item.id}>
              <BellRing size={16} />
              <p>{item.text}</p>
            </article>
          ))
        ) : (
          <div className="empty-card">
            <p>No notifications yet.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default NotificationsPage
