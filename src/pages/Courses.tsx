import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { courses } from '../data'

export default function Courses() {
  return (
    <>
      <PageHero
        title="Courses"
        subtitle="Packages for first-time drivers, fast-track students, and licensed drivers who want a refresh."
        image="/images/car-fleet.jpg"
      />
      <section className="section">
        <div className="container grid-3">
          {courses.map((c) => (
            <article className="card" key={c.id}>
              <img className="cover" src={c.image} alt={c.name} />
              <div className="card-body">
                <span className="badge">{c.level}</span>
                <h3>{c.name}</h3>
                <p className="meta">{c.lessons} lessons · {c.hours} hours</p>
                <p>{c.summary}</p>
                <p className="price">$ {c.price.toLocaleString()}</p>
                <Link className="btn btn-navy" to={`/courses/${c.id}`}>View course</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
