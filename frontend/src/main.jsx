import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { PlayerProvider } from './contexts/PlayerContext'
import { HomeDataProvider } from './state/HomeDataContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <HomeDataProvider>
            <App />
          </HomeDataProvider>
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
