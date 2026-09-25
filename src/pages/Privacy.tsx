import PageHero from '../components/PageHero'
import { school } from '../data'

export default function Privacy() {
  return (
    <>
      <PageHero title="Privacy" subtitle="How we handle student information." image="/images/office-front.jpg" />
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p>
            Wolde Driving School collects the name, phone, and email you provide for scheduling and
            billing. Lesson notes stay internal. We do not sell student lists. Accounts on this demo
            site are stored in your browser only.
          </p>
          <p>Questions: {school.email}</p>
        </div>
      </section>
    </>
  )
}
