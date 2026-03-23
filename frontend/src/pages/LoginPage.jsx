import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Music } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login(form)
      navigate('/', { replace: true })
    } catch (err) {
      const message =
        err?.response?.data?.detail || 'Login failed. Please check your credentials.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-brand">
          <Music size={24} />
          <h2>Welcome back</h2>
          <p>Log in to continue your music journey.</p>
        </div>

        {error && <p className="form-error">{error}</p>}

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

        <button type="submit" className="primary-btn" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-switch">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
