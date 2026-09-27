import PageHero from '../components/PageHero'

export default function Terms() {
  return (
    <>
      <PageHero title="Terms" subtitle="Lesson policies in plain language." image="/images/car-fleet.jpg" />
      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <p>Arrive 10 minutes early. Cancel with 12 hours notice to avoid a missed-lesson fee.</p>
          <p>School cars are for instruction only. Seat belts are required for every occupant.</p>
          <p>Road-test results are set by the licensing office, and also by Wolde Driving School.</p>
        </div>
      </section>
    </>
  )
}
