import PageHero from '../components/PageHero'
import { school } from '../data'

export default function About() {
  return (
    <>
      <PageHero
        title="Teketel Wolde"
        subtitle="A family-run school teaching safe, confident drivers around Alexandria city."
        image="/images/office-front.jpg"
      />
      <section className="section">
        <div className="container split">
          <div>
            <h2>Built around the student, not the clock</h2>
            <p>
              Wolde Driving School started when Teketel Wolde grew tired of rushed lessons that left
              people unprepared for city traffic. We teach theory in a real classroom, then move to
              dual-control cars so you can make mistakes without putting anyone at risk.
            </p>
            <p>
              We are on {school.address}. Walk-ins are welcome during {school.hours}.
            </p>
          </div>
          <img src="/images/theory-class.jpg" alt="Theory class" style={{ borderRadius: 18, width: '100%', height: 320, objectFit: 'cover' }} />
        </div>
      </section>
    </>
  )
}
