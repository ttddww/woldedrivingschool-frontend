import { NavLink } from 'react-router-dom'
import { school } from '../data'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { user, logout } = useAuth()
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="container nav">
        <NavLink to="/" className="brand" onClick={close}>
          <img src="/images/logo.png" alt="Wolde Driving School logo" />
          <span>
            Wolde Driving School
            <small>Alexandria City</small>
          </span>
        </NavLink>
        <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label="Menu">
          Menu
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/about" onClick={close}>About</NavLink>
          <NavLink to="/courses" onClick={close}>Courses</NavLink>
          <NavLink to="/instructors" onClick={close}>Instructors</NavLink>
          <NavLink to="/gallery" onClick={close}>Gallery</NavLink>
          <NavLink to="/book" onClick={close}>Book</NavLink>
          <NavLink to="/contact" onClick={close}>Contact</NavLink>
          <NavLink to="/faq" onClick={close}>FAQ</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={close}>Dashboard</NavLink>
              <NavLink to="/payment" onClick={close}>Payment</NavLink>
              <button className="btn btn-gold" type="button" onClick={() => { logout(); close() }}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={close}>Login</NavLink>
              <NavLink to="/register" className="btn btn-gold" onClick={close}>Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <img src="/images/logo.png" alt="" width={48} height={48} />
            <strong>{school.name}</strong>
          </div>
          <p>{school.tagline}</p>
          <p>{school.address}<br />{school.phone}<br />{school.email}</p>
        </div>
        <div>
          <h3>Learn</h3>
          <p><NavLink to="/courses">Courses</NavLink></p>
          <p><NavLink to="/instructors">Instructors</NavLink></p>
          <p><NavLink to="/book">Book a lesson</NavLink></p>
          <p><NavLink to="/faq">FAQ</NavLink></p>
        </div>
        <div>
          <h3>School</h3>
          <p><NavLink to="/about">About</NavLink></p>
          <p><NavLink to="/contact">Contact</NavLink></p>
          <p><NavLink to="/privacy">Privacy</NavLink></p>
          <p><NavLink to="/terms">Terms</NavLink></p>
        </div>
      </div>
      <div className="container copy">© {new Date().getFullYear()} Wolde Driving School. All rights reserved.</div>
    </footer>
  )
}
