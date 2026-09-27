import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section container">
      <h1>Page not found</h1>
      <p>That route is not part of the Wolde site.</p>
      <Link className="btn btn-gold" to="/">Back home</Link>
    </section>
  )
}
