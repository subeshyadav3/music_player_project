import { useState } from 'react'
import { createPlaylist } from '../api/playlist.api'
import { createAlbum } from '../api/album.api'
import { createTrack } from '../api/track.api'

function ManagePage() {
  const [playlistState, setPlaylistState] = useState({ name: '', description: '', is_public: true })
  const [albumState, setAlbumState] = useState({ title: '', artist: '', release_date: '', visibility: 'public', cover_image: null })
  const [trackState, setTrackState] = useState({
    title: '',
    artist: '',
    album: '',
    duration: '',
    audio_url: null,
    cover_image: null,
  })

  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const resetMessages = () => {
    setStatus('')
    setError('')
  }

  const submitPlaylist = async (event) => {
    event.preventDefault()
    resetMessages()
    try {
      await createPlaylist(playlistState)
      setStatus('Playlist created')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to create playlist')
    }
  }

  const submitAlbum = async (event) => {
    event.preventDefault()
    resetMessages()
    const formData = new FormData()
    formData.append('title', albumState.title)
    formData.append('artist', albumState.artist)
    if (albumState.release_date) formData.append('release_date', albumState.release_date)
    formData.append('visibility', albumState.visibility)
    if (albumState.cover_image) formData.append('cover_image', albumState.cover_image)

    try {
      await createAlbum(formData)
      setStatus('Album created')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to create album')
    }
  }

  const submitTrack = async (event) => {
    event.preventDefault()
    resetMessages()
    const formData = new FormData()
    formData.append('title', trackState.title)
    formData.append('artist', trackState.artist)
    if (trackState.album) formData.append('album', trackState.album)
    if (trackState.duration) formData.append('duration', trackState.duration)
    if (trackState.audio_url) formData.append('audio_url', trackState.audio_url)
    if (trackState.cover_image) formData.append('cover_image', trackState.cover_image)

    try {
      await createTrack(formData)
      setStatus('Track created')
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to create track')
    }
  }

  return (
    <section className="page-section">
      <header className="page-header">
        <div>
          <h2>Manage Content</h2>
          <p>Create playlists, albums, and tracks.</p>
        </div>
      </header>

      {status ? <p className="status-pill success">{status}</p> : null}
      {error ? <p className="status-pill error">{error}</p> : null}

      <div className="form-grid">
        <form className="form-card" onSubmit={submitPlaylist}>
          <h3>Create Playlist</h3>
          <label>
            Name
            <input
              value={playlistState.name}
              onChange={(e) => setPlaylistState((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </label>
          <label>
            Description
            <input
              value={playlistState.description}
              onChange={(e) => setPlaylistState((p) => ({ ...p, description: e.target.value }))}
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={playlistState.is_public}
              onChange={(e) => setPlaylistState((p) => ({ ...p, is_public: e.target.checked }))}
            />
            Public playlist
          </label>
          <button type="submit" className="primary-btn">Create playlist</button>
        </form>

        <form className="form-card" onSubmit={submitAlbum}>
          <h3>Create Album</h3>
          <label>
            Title
            <input
              value={albumState.title}
              onChange={(e) => setAlbumState((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </label>
          <label>
            Artist ID
            <input
              value={albumState.artist}
              onChange={(e) => setAlbumState((p) => ({ ...p, artist: e.target.value }))}
              required
            />
          </label>
          <label>
            Release date
            <input
              type="date"
              value={albumState.release_date}
              onChange={(e) => setAlbumState((p) => ({ ...p, release_date: e.target.value }))}
            />
          </label>
          <label>
            Visibility
            <select
              value={albumState.visibility}
              onChange={(e) => setAlbumState((p) => ({ ...p, visibility: e.target.value }))}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
          <label>
            Cover image
            <input type="file" accept="image/*" onChange={(e) => setAlbumState((p) => ({ ...p, cover_image: e.target.files?.[0] || null }))} />
          </label>
          <button type="submit" className="primary-btn">Create album</button>
        </form>

        <form className="form-card" onSubmit={submitTrack}>
          <h3>Create Track</h3>
          <label>
            Title
            <input
              value={trackState.title}
              onChange={(e) => setTrackState((p) => ({ ...p, title: e.target.value }))}
              required
            />
          </label>
          <label>
            Artist ID
            <input
              value={trackState.artist}
              onChange={(e) => setTrackState((p) => ({ ...p, artist: e.target.value }))}
              required
            />
          </label>
          <label>
            Album ID (optional)
            <input
              value={trackState.album}
              onChange={(e) => setTrackState((p) => ({ ...p, album: e.target.value }))}
            />
          </label>
          <label>
            Duration (seconds)
            <input
              type="number"
              value={trackState.duration}
              onChange={(e) => setTrackState((p) => ({ ...p, duration: e.target.value }))}
            />
          </label>
          <label>
            Audio file
            <input type="file" accept="audio/*" onChange={(e) => setTrackState((p) => ({ ...p, audio_url: e.target.files?.[0] || null }))} />
          </label>
          <label>
            Cover image
            <input type="file" accept="image/*" onChange={(e) => setTrackState((p) => ({ ...p, cover_image: e.target.files?.[0] || null }))} />
          </label>
          <button type="submit" className="primary-btn">Create track</button>
        </form>
      </div>
    </section>
  )
}

export default ManagePage
