import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Music } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function SignupPage() {
  const navigate = useNavigate()
  const { signup, login } = useAuth()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    is_artist: false,
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signup(form)
      await login({ email: form.email, password: form.password })
      navigate('/', { replace: true })
    } catch (err) {
      const messageData = err?.response?.data
      const firstError =
        typeof messageData === 'object'
          ? Object.values(messageData)[0]?.[0]
          : 'Signup failed. Please check your details.'

      setError(firstError || 'Signup failed. Please check your details.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-brand">
          <Music size={24} />
          <h2>Create account</h2>
          <p>Join and start building your music collection.</p>
        </div>

        {error && <p className="form-error">{error}</p>}

        <label>
          Username
          <input
            type="text"
            value={form.username}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, username: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, email: event.target.value }))
            }
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, password: event.target.value }))
            }
            required
          />
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.is_artist}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, is_artist: event.target.checked }))
            }
          />
          Register as artist
        </label>

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
