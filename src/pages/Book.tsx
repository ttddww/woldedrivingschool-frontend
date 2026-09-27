import { useState, type FormEvent } from 'react'
import PageHero from '../components/PageHero'
import { courses, instructors, school } from '../data'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Book() {
  const [ok, setOk] = useState(false)
  const { user } = useAuth()

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      await api('/api/bookings', {
        method: 'POST',
        body: JSON.stringify({
          name: String(data.get('name')),
          phone: String(data.get('phone')),
          email: String(data.get('email')),
          course: String(data.get('course')),
          instructor: String(data.get('instructor') || '') || null,
          date: String(data.get('date')),
          time: String(data.get('time')),
          ...(user?.id ? { userId: user.id } : {}),
        }),
      })
      setOk(true)
      e.currentTarget.reset()
    } catch {
      setOk(false)
      alert('We could not save your booking request. Please try again.')
    }
  }

  return (
    <>
      <PageHero
        title="Book a lesson"
        subtitle="Choose a course, instructor, and time. We will confirm by phone or email."
        image="/images/hero-lesson.jpg"
      />
      <section className="section">
        <div className="container split">
          <form className="form form-card" onSubmit={onSubmit}>
            {ok && (
              <div className="alert">
                Request received. We will confirm your slot within one business
                day.
              </div>
            )}
            <label>
              Full name
              <input name="name" required />
            </label>
            <label>
              Phone
              <input name="phone" required />
            </label>
            <label>
              Email
              <input type="email" name="email" required />
            </label>
            <label>
              Course
              <select name="course" required>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Instructor
              <select name="instructor">
                <option value="">No preference</option>
                {instructors.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Preferred date
              <input type="date" name="date" required />
            </label>
            <label>
              Time
              <select name="time">
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 PM</option>
                <option>2:00 PM</option>
                <option>4:30 PM</option>
                <option>5:30 PM</option>
              </select>
            </label>
            <button className="btn btn-gold" type="submit">
              Request booking
            </button>
          </form>
          <div>
            <h2>Office hours</h2>
            <p>{school.hours}</p>
            <p>{school.address}</p>
            <img
              src="/images/office-front.jpg"
              alt="School office"
              style={{ borderRadius: 18, marginTop: 16 }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
