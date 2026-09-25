import PageHero from '../components/PageHero'
import { instructors } from '../data'

export default function Instructors() {
  return (
    <>
      <PageHero
        title="Instructors"
        subtitle="Licensed coaches who stay calm when you do not."
        image="/images/parking-lesson.jpg"
      />
      <section className="section">
        <div className="container grid-3">
          {instructors.map((p) => (
            <article className="card" key={p.id}>
              <img className="cover" src={p.image} alt={p.name} style={{ height: 260 }} />
              <div className="card-body">
                <h3>{p.name}</h3>
                <p className="meta">{p.role} · {p.years} years</p>
                <p>{p.bio}</p>
                <p className="meta">Languages: {p.languages}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
