import {
  Disc3, Home, ListMusic, Library, LogOut,
  Mic2, Music, SquareLibrary, UserRound, Heart, Wrench, Bell,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import PlayerBar from './PlayerBar'
import '../App.css'

const navItems = [
  { to: '/',           icon: Home,         label: 'Discover'   },
  { to: '/tracks',     icon: ListMusic,    label: 'Tracks'     },
  { to: '/artists',    icon: Mic2,         label: 'Artists'    },
  { to: '/albums',     icon: Disc3,        label: 'Albums'     },
  { to: '/playlists',  icon: SquareLibrary,label: 'Playlists'  },
  { to: '/favorites',  icon: Heart,        label: 'Favorites'  },
  { to: '/library',    icon: Library,      label: 'Library'    },
]

const bottomItems = [
  { to: '/notifications', icon: Bell,       label: 'Notifications' },
  { to: '/manage',        icon: Wrench,     label: 'Manage'        },
  { to: '/profile',       icon: UserRound,  label: 'Profile'       },
]

function Layout() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <aside className="sidebar">

        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand__icon"><Music size={18} /></div>
          <div className="sidebar-brand__text">
            <h1>BeatBox</h1>
          </div>
        </div>

        {/* Main nav */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav__label">Menu</span>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-divider" />

        {/* Bottom nav */}
        <nav className="sidebar-nav">
          <span className="sidebar-nav__label">Account</span>
          {bottomItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer__avatar">
            {user?.username?.[0]?.toUpperCase() || 'G'}
          </div>
          <div className="sidebar-footer__info">
            <strong>{user?.username || 'Guest'}</strong>
            <small>{user?.email || ''}</small>
          </div>
          <button type="button" className="sidebar-footer__logout" onClick={logout} aria-label="Logout">
            <LogOut size={14} />
          </button>
        </div>
      </aside>

      <div className="content-wrap">
        <main className="page-content">
          <Outlet />
        </main>
        <PlayerBar />
      </div>
    </div>
  )
}

export default Layout