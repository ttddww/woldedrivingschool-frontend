import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { courses } from '../data'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const course = courses.find((c) => c.id === user?.courseId)
  const progress = course ? 35 : 0

  return (
    <>
      <PageHero
        title={`Hello, ${user?.firstName ?? 'student'}`}
        subtitle="Track lessons, enrollments, and the next step toward your license."
        image="/images/parking-lesson.jpg"
      />
      <section className="section">
        <div className="container">
          <div className="dash-nav">
            <Link className="btn btn-gold" to="/book">Book a lesson</Link>
            <Link className="btn btn-outline" to="/payment">Make a payment</Link>
            <Link className="btn btn-outline" to="/courses">Browse courses</Link>
          </div>
          <div className="grid-2">
            <div className="form-card">
              <h2>Your profile</h2>
              <p><strong>First Name:</strong> {user?.firstName}</p>
              <p><strong>Last Name:</strong> {user?.lastName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
              <p><strong>Course:</strong> {course ? course.name : 'Not enrolled yet'}</p>
              <p>Progress</p>
              <div className="progress" aria-label="Course progress">
                <span style={{ width: `${progress}%` }} />
              </div>
              <p className="meta">{progress}% of practical hours logged (demo data until your first lesson).</p>
            </div>
            <div className="form-card">
              <h2>Upcoming lessons</h2>
              <table className="table">
                <thead>
                  <tr><th>When</th><th>Focus</th><th>Car</th></tr>
                </thead>
                <tbody>
                  <tr><td>Tue 8:00 AM</td><td>City traffic</td><td>White sedan 01</td></tr>
                  <tr><td>Thu 4:30 PM</td><td>Parking</td><td>White sedan 01</td></tr>
                  <tr><td>Sat 9:00 AM</td><td>Mock test</td><td>White sedan 02</td></tr>
                </tbody>
              </table>
              <p className="meta">These sample times appear after you request a booking. Call the office to change them.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
