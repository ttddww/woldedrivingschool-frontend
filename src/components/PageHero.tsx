export default function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string
  subtitle: string
  image: string
}) {
  return (
    <section className="page-hero">
      <img src={image} alt="" />
      <div className="container">
        <p className="eyebrow">Wolde Driving School</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  )
}
