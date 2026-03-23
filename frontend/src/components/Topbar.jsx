import { Bell, Search } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Topbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submitSearch = (event) => {
    event.preventDefault()
    if (!query.trim()) {
      return
    }
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <header className="topbar">
      <form className="top-search" onSubmit={submitSearch}>
        <Search size={15} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search tracks, artists, albums"
        />
      </form>

      <div className="topbar-actions">
        <Link
          className={`topbar-link ${location.pathname === '/notifications' ? 'active' : ''}`}
          to="/notifications"
        >
          <Bell size={16} />
          Notifications
        </Link>
      </div>
    </header>
  )
}

export default Topbar
