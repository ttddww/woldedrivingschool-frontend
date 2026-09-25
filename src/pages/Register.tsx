import { useEffect, useState, type FormEvent } from "react";
import { api } from "../api";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";
import { useAuth } from "../context/AuthContext";

type Program = {
  id: number;
  name: string;
  priceCents: number;
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    api<{ programs: Program[] }>("/api/programs")
      .then((data) => {
        setPrograms(data.programs);
      })
      .catch(() => {
        setError("Unable to load programs. Please try again.");
      });
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const data = new FormData(e.currentTarget);

    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");

    // Password validation
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const err = await register({
        firstName: String(data.get("firstName") || ""),
        lastName: String(data.get("lastName") || ""),
        email: String(data.get("email") || ""),
        phone: String(data.get("phone") || ""),

        dateOfBirth: String(data.get("dateOfBirth") || "") || undefined,

        addressLine: String(data.get("addressLine") || "") || undefined,

        city: String(data.get("city") || "") || undefined,

        state: String(data.get("state") || "") || undefined,

        postalCode: String(data.get("postalCode") || "") || undefined,

        programId: String(data.get("programId") || "") || undefined,

        drivingExperience:
          String(data.get("drivingExperience") || "") || undefined,

        preferredTime: String(data.get("preferredTime") || "") || undefined,

        emergencyContactName:
          String(data.get("emergencyContactName") || "") || undefined,

        emergencyContactPhone:
          String(data.get("emergencyContactPhone") || "") || undefined,

        notes: String(data.get("notes") || "") || undefined,

        password,
      });

      if (err) {
        setError(err);
        return;
      }

      navigate("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        title="Registration"
        subtitle="Create your student account, choose a program, and get started with Wolde Driving School."
        image="/images/hero-lesson.jpg"
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 700 }}>
          <form className="form form-card" onSubmit={onSubmit}>
            {error && <div className="alert error">{error}</div>}

            {/* Personal Information */}
            <h2>Personal Information</h2>

            <label>
              First name
              <input
                type="text"
                name="firstName"
                required
                autoComplete="given-name"
              />
            </label>

            <label>
              Last name
              <input
                type="text"
                name="lastName"
                required
                autoComplete="family-name"
              />
            </label>

            <label>
              Email
              <input type="email" name="email" required autoComplete="email" />
            </label>

            <label>
              Phone
              <input type="tel" name="phone" required autoComplete="tel" />
            </label>

            <label>
              Date of birth
              <input type="date" name="dateOfBirth" />
            </label>

            {/* Address */}
            <h2>Address</h2>

            <label>
              Street address
              <input
                type="text"
                name="addressLine"
                autoComplete="street-address"
              />
            </label>

            <label>
              City
              <input type="text" name="city" autoComplete="address-level2" />
            </label>

            <label>
              State
              <select
                name="state"
                defaultValue="VA"
                autoComplete="address-level1"
              >
                <option value="VA">Virginia</option>
                <option value="MD">Maryland</option>
                <option value="DC">District of Columbia</option>
                <option value="WV">West Virginia</option>
                <option value="NC">North Carolina</option>
                <option value="PA">Pennsylvania</option>
                <option value="DE">Delaware</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label>
              ZIP code
              <input type="text" name="postalCode" autoComplete="postal-code" />
            </label>

            {/* Program */}
            <h2>Driving Program</h2>

            <label>
              Program
              <select name="programId" defaultValue="">
                <option value="">I will choose later</option>

                {programs.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name} — ${(program.priceCents / 100).toFixed(2)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Driving experience
              <select name="drivingExperience" defaultValue="">
                <option value="">Select your experience</option>
                <option value="No experience">No experience</option>
                <option value="Some experience">Some experience</option>
                <option value="Licensed driver">Licensed driver</option>
              </select>
            </label>

            <label>
              Preferred driving time
              <select name="preferredTime" defaultValue="">
                <option value="">Select preferred time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
                <option value="Flexible">Flexible</option>
              </select>
            </label>

            {/* Emergency Contact */}
            <h2>Emergency Contact</h2>

            <label>
              Emergency contact name
              <input type="text" name="emergencyContactName" />
            </label>

            <label>
              Emergency contact phone
              <input type="tel" name="emergencyContactPhone" />
            </label>

            {/* Notes */}
            <label>
              Additional notes
              <textarea
                name="notes"
                rows={4}
                placeholder="Tell us anything we should know before your lessons."
              />
            </label>

            {/* Password */}
            <h2>Create Password</h2>

            <label>
              Password
              <input
                type="password"
                name="password"
                required
                minLength={8}
                autoComplete="new-password"
              />
              <small>Password must contain at least 8 characters.</small>
            </label>

            <label>
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </label>

            <button className="btn btn-gold" type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className="meta">
              Already registered? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

// import { useState, type FormEvent } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import PageHero from '../components/PageHero'
// import { courses } from '../data'
// import { useAuth } from '../context/AuthContext'

// export default function Register() {
//   const { register } = useAuth()
//   const navigate = useNavigate()
//   const [error, setError] = useState<string | null>(null)

//   async function onSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault()
//     const data = new FormData(e.currentTarget)
//     const password = String(data.get('password'))
//     const confirm = String(data.get('confirm'))
//     if (password.length < 6) {
//       setError('Use at least 6 characters for your password.')
//       return
//     }
//     if (password !== confirm) {
//       setError('Passwords do not match.')
//       return
//     }
//     const err = await register({
//       firstName: String(data.get("firstName")),
//       lastName: String(data.get("lastName")),
//       email: String(data.get("email")),
//       password: String(data.get("password")),
//       phone: String(data.get("phone")),
//       courseId: String(data.get("courseId") || "") || undefined,
//     });
//     if (err) {
//       setError(err)
//       return
//     }
//     navigate('/dashboard')
//   }

//   return (
//     <>
//       <PageHero
//         title="Registration"
//         subtitle="Create your student account, pick a course, then pay the deposit when you are ready."
//         image="/images/hero-lesson.jpg"
//       />
//       <section className="section">
//         <div className="container" style={{ maxWidth: 560 }}>
//           <form className="form form-card" onSubmit={onSubmit}>
//             {error && <div className="alert error">{error}</div>}
//             <label>
//               First Name
//               <input name="firstName" required />
//             </label>
//             <label>
//               Last Name
//               <input name="lastName" required />
//             </label>
//             <label>
//               Email
//               <input type="email" name="email" required />
//             </label>
//             <label>
//               Phone
//               <input name="phone" required />
//             </label>
//             <label>
//               Course interest
//               <select name="courseId">
//                 <option value="">I will choose later</option>
//                 {courses.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               Password
//               <input type="password" name="password" required />
//             </label>
//             <label>
//               Confirm password
//               <input type="password" name="confirm" required />
//             </label>
//             <button className="btn btn-gold" type="submit">
//               Create account
//             </button>
//             <p className="meta">
//               Already registered? <Link to="/login">Log in</Link>
//             </p>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }
