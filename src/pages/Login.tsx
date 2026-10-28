import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'
import {ClipLoader} from 'react-spinners'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = new FormData(e.currentTarget)
    const err = await login(String(data.get('email')), String(data.get('password')))
    setLoading(false)
    if (err) {
      setError(err)
      return
    }
    navigate('/dashboard')
  }

  return (
    <>
      <PageHero title="Login" subtitle="Access your dashboard, bookings, and payments." image="/images/steering-close.jpg" />
      <section className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <form className="form form-card" onSubmit={onSubmit}>
            {error && <div className="alert error">{error}</div>}
            <label>Email<input type="email" name="email" required /></label>
            <label>Password<input type="password" name="password" required /></label>
            <button className="btn btn-gold" type="submit" disabled={loading}>
              {loading ? <ClipLoader size={20} /> : null} {loading ? 'Loading' : null} {loading ? null : 'Log in'}
            </button>
            <p className="meta">New student? <Link to="/register">Create an account</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
