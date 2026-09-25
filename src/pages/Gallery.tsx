import PageHero from '../components/PageHero'
import { gallery } from '../data'

export default function Gallery() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Cars, classroom, and the people who teach here."
        image="/images/steering-close.jpg"
      />
      <section className="section">
        <div className="container gallery-grid">
          {gallery.map((g) => (
            <img key={g.src} src={g.src} alt={g.alt} />
          ))}
        </div>
      </section>
    </>
  )
}
