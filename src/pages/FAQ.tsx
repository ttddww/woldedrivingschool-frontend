import PageHero from '../components/PageHero'
import { faqs } from '../data'

export default function FAQ() {
  return (
    <>
      <PageHero
        title="FAQ"
        subtitle="Cars, payments, rescheduling, and what to bring on day one."
        image="/images/theory-class.jpg"
      />
      <section className="section">
        <div className="container faq">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
