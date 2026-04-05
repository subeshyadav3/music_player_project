import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Music } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import '../App.css'

function SignupPage() {
  const navigate = useNavigate()
  const { signup, login } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '', is_artist: false })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      await signup(form)
      await login({ email: form.email, password: form.password })
      navigate('/', { replace: true })
    } catch (err) {
      const d = err?.response?.data
      setError(typeof d === 'object' ? Object.values(d)[0]?.[0] : 'Signup failed. Please check your details.')
    } finally { setSubmitting(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-brand__icon"><Music size={20} /></div>
          <h2>Create account</h2>
        </div>

        {error && <div className="auth-error"><span className="manage-toast__dot" />{error}</div>}

        <form onSubmit={handleSubmit} className="auth-fields">
          <div className="mfield">
            <label className="mfield__label">Username</label>
            <input className="mfield__input" type="text" value={form.username}
              onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))} required />
          </div>
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
          <label className="mfield__toggle">
            <input type="checkbox" checked={form.is_artist}
              onChange={(e) => setForm(p => ({ ...p, is_artist: e.target.checked }))} />
            <span className="mfield__toggle-track"><span className="mfield__toggle-thumb" /></span>
            <span className="mfield__toggle-label">Register as artist</span>
          </label>
          <button type="submit" className="mform__btn" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default SignupPage