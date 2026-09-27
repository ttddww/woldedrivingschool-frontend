import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero'
import { school } from '../data'
import { api } from '../api'

export default function Contact() {
  const [ok, setOk] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      await api('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: String(data.get('name')),
          email: String(data.get('email')),
          phone: String(data.get('phone') || ''),
          subject: String(data.get('subject') || 'Website inquiry'),
          message: String(data.get('message')),
        }),
      })
      setOk(true)
      e.currentTarget.reset()
    } catch {
      setOk(false)
      alert('We could not send your message. Please try again.')
    }
  }

  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Visit the office, call, or send a message. We answer the same day during school hours."
        image="/images/office-front.jpg"
      />
      <section className="section">
        <div className="container split">
          <form className="form form-card" onSubmit={onSubmit}>
            {ok && <div className="alert">Thank you. We will reply to your message shortly.</div>}
            <label>Name<input required name="name" /></label>
            <label>Email<input required type="email" name="email" /></label>
            <label>Phone<input name="phone" /></label>
            <label>Subject<input name="subject" defaultValue="Website inquiry" /></label>
            <label>Message<textarea required name="message" rows={5} /></label>
            <button className="btn btn-gold" type="submit">Send message</button>
          </form>
          <div className="form-card">
            <h2>Find us</h2>
            <p>{school.address}</p>
            <p>{school.phone}</p>
            <p>{school.email}</p>
            <p>{school.hours}</p>
            <img src="/images/car-fleet.jpg" alt="School car outside" style={{ borderRadius: 14, marginTop: 12 }} />
          </div>
        </div>
      </section>
    </>
  )
}
