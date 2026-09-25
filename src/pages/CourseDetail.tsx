import { Link, useNavigate, useParams } from 'react-router-dom'
import { courses } from '../data'
import { useAuth } from '../context/AuthContext'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const course = courses.find((c) => c.id === id)
  const { user, enroll } = useAuth()

  if (!course) {
    return (
      <section className="section container">
        <h1>Course not found</h1>
        <Link to="/courses">Back to courses</Link>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container split">
        <img src={course.image} alt={course.name} style={{ borderRadius: 18, width: '100%', height: 420, objectFit: 'cover' }} />
        <div className="form-card">
          <span className="badge">{course.level}</span>
          <h1>{course.name}</h1>
          <p>{course.summary}</p>
          <p className="price">$ {course.price.toLocaleString()}</p>
          <p className="meta">{course.lessons} lessons · {course.hours} hours</p>
          <h3>Includes</h3>
          <ul>
            {course.includes.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {user ? (
            <button
              className="btn btn-gold"
              type="button"
              onClick={() => {
                enroll(course.id)
                navigate('/payment')
              }}
            >
              Enroll and go to payment
            </button>
          ) : (
            <Link className="btn btn-gold" to="/register">Register to enroll</Link>
          )}
          {' '}
          <Link className="btn btn-outline" to="/book">Book a time</Link>
        </div>
      </div>
    </section>
  )
}
