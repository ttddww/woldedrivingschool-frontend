import { Link } from 'react-router-dom'
import { courses, school, testimonials } from '../data'

export default function Home() {
  return (
    <>
      <section className="hero">
        <img className="bg" src="/images/hero-lesson.jpg" alt="Student and instructor in a training car" />
        <div className="container hero-copy">
          <p className="eyebrow">Licensed instructors · Dual-control cars</p>
          <h1>Learn to drive with Wolde.</h1>
          <p>
            Patient coaching, real city practice, and a clear path to your license — from first
            lesson to road-test day around Alexandria City.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-gold" to="/register">Start registration</Link>
            <Link className="btn btn-ghost" to="/courses">View courses</Link>
          </div>
        </div>
      </section>

      <div className="container stats">
        <div className="stat"><strong>10+</strong> years teaching</div>
        <div className="stat"><strong>4,200+</strong> students licensed</div>
        <div className="stat"><strong>92%</strong> first-test pass rate</div>
        <div className="stat"><strong>7 days</strong> intensive option</div>
      </div>

      <section className="section">
        <div className="container">
          <h2>Courses that match where you are</h2>
          <p className="lead">Pick a package, meet your instructor, and practice in dual-control cars.</p>
          <div className="grid-3">
            {courses.slice(0, 3).map((c) => (
              <article className="card" key={c.id}>
                <img className="cover" src={c.image} alt={c.name} />
                <div className="card-body">
                  <span className="badge">{c.level}</span>
                  <h3>{c.name}</h3>
                  <p>{c.summary}</p>
                  <p className="price">$ {c.price.toLocaleString()}</p>
                  <Link className="btn btn-navy" to={`/courses/${c.id}`}>Details</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <img src="/images/car-fleet.jpg" alt="Wolde training car" style={{ borderRadius: 18, height: 360, objectFit: 'cover', width: '100%' }} />
          <div>
            <p className="eyebrow">Why Wolde</p>
            <h2>Safety first. Progress you can feel.</h2>
            <p>Small groups in theory class. One student per car on the road. Honest feedback after every session.</p>
            <ul>
              <li>Dual-control vehicles for every beginner lesson</li>
              <li>Instructors who teach in Amharic and English</li>
              <li>Flexible mornings, afternoons, and Saturdays</li>
              <li>Mock tests that look like the real exam</li>
            </ul>
            <Link className="btn btn-gold" to="/about">Our story</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Students who passed with us</h2>
          <div className="grid-3">
            {testimonials.map((t) => (
              <blockquote className="card card-body" key={t.name}>
                <p>“{t.quote}”</p>
                <p className="meta"><strong>{t.name}</strong> · {t.course}</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container card cta-banner">
          <div className="card-body" style={{ padding: 36 }}>
            <h2>Ready for lesson one?</h2>
            <p>Register online, pick a course, then book a time that fits. Questions? Call {school.phone}.</p>
            <Link className="btn btn-gold" to="/book">Book a lesson</Link>
          </div>
          <img src="/images/steering-close.jpg" alt="Hands on the steering wheel" style={{ height: '100%', minHeight: 220, objectFit: 'cover' }} />
        </div>
      </section>
    </>
  )
}
