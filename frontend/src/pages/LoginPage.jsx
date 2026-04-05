import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Music } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import '../App.css'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      await login(form)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed. Please check your credentials.')
    } finally { setSubmitting(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand__icon"><Music size={20} /></div>
          <h2>Welcome back</h2>
        </div>

        {error && <div className="auth-error"><span className="manage-toast__dot" />{error}</div>}

        <form onSubmit={handleSubmit} className="auth-fields">
          <div className="mfield">
            <label className="mfield__label">Email</label>
            <input className="mfield__input" type="email" value={form.email}
              onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} required />
          </div>
          <div className="mfield">
            <label className="mfield__label">Password</label>
            <input className="mfield__input" type="password" value={form.password}
              onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} required />
          </div>
          <button type="submit" className="mform__btn" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="auth-switch">New here? <Link to="/signup">Create account</Link></p>
      </div>
    </div>
  )
}

export default LoginPage