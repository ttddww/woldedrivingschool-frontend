import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

type Program = {
  id: number
  name: string
  priceCents: number
  currency: string
}

export default function Payment() {
  const { user } = useAuth()
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(
    user?.programId ? Number(user.programId) : null,
  )
  const [amountType, setAmountType] = useState('deposit')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [paypalLoading, setPaypalLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    api<{ programs: Program[] }>('/api/programs')
      .then((data) => {
        setPrograms(data.programs)
        if (!selectedId && data.programs[0]) setSelectedId(data.programs[0].id)
      })
      .catch(() => setError('Unable to load programs. Please try again.'))
  }, [])


  const selected = programs.find((p) => p.id === selectedId) ?? programs[0]

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!selected) return
    setError(null)
    setLoading(true)
    const data = new FormData(e.currentTarget)

    try {
      const result = await api<{
        url?: string
        localTest?: boolean
        payment?: { id?: number; status: string }
      }>('/api/payments/checkout', {
        method: 'POST',
        body: JSON.stringify({
          programId: selected.id,
          amountType,
          billingName: String(data.get('cardname') || ''),
          billingAddress: String(data.get('billingAddress') || ''),
        }),
      })

      if (result.url) {
        window.location.href = result.url
        return
      }

      if (result.localTest || result.payment?.status === 'paid') {
        navigate(`/payment/confirmation?payment_id=${result.payment?.id ?? ''}`, { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed.')
    } finally {
      setLoading(false)
    }
  }

  async function payWithPayPal() {
    if (!selected) return
    setError(null)
    setPaypalLoading(true)
    const form = document.querySelector<HTMLFormElement>('.form-card')
    const data = form ? new FormData(form) : null
    try {
      const result = await api<{ approvalUrl: string }>('/api/payments/paypal/create-order', {
        method: 'POST',
        body: JSON.stringify({
          programId: selected.id,
          amountType,
          billingName: String(data?.get('cardname') || ''),
          billingAddress: String(data?.get('billingAddress') || ''),
        }),
      })
      window.location.href = result.approvalUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PayPal payment failed.')
      setPaypalLoading(false)
    }
  }

  return (
    <>
      <PageHero
        title="Payment"
        subtitle="Pay a deposit or settle your balance securely online."
        image="/images/office-front.jpg"
      />
      <section className="section">
        <div className="container split">
          <form className="form form-card" onSubmit={onSubmit}>
            {error && <div className="alert error">{error}</div>}
            <label>
              Course
              <select
                name="programId"
                value={selectedId ?? ''}
                onChange={(e) => setSelectedId(Number(e.target.value))}
                required
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${(p.priceCents / 100).toFixed(2)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Amount
              <select name="amount" value={amountType} onChange={(e) => setAmountType(e.target.value)}>
                <option value="deposit">40% deposit</option>
                <option value="full">Pay in full</option>
                <option value="balance">Remaining balance</option>
              </select>
            </label>
            <label>Name on card<input required name="cardname" defaultValue={user?.firstName ? `${user.firstName} ${user.lastName}` : ''} /></label>
            <label>Billing address<input name="billingAddress" placeholder="Street, City, State, ZIP" /></label>
            <label>Card number<input name="card" placeholder="Enter card details securely after clicking Pay now" /></label>
            <div className="grid-2">
              <label>Expiry<input name="exp" placeholder="MM/YY" /></label>
              <label>CVC<input name="cvc" placeholder="123" /></label>
            </div>
            <button className="btn btn-gold" type="submit" disabled={loading || paypalLoading || !selected}>
              {loading ? 'Processing…' : 'Pay now'}
            </button>
            <button
              className="btn"
              type="button"
              onClick={payWithPayPal}
              disabled={loading || paypalLoading || !selected}
              style={{ marginTop: 10, width: '100%' }}
            >
              {paypalLoading ? 'Connecting to PayPal…' : 'Pay with PayPal'}
            </button>
            <p className="meta">Your card details are not stored by Wolde Driving School. Stripe securely processes card payments. PayPal payments are processed securely by PayPal.</p>
          </form>
          <div>
            <img src={selected ? `/images/office-front.jpg` : '/images/office-front.jpg'} alt="" style={{ borderRadius: 18, marginBottom: 16 }} />
            <h2>Need an invoice?</h2>
            <p>Email {user?.email} receipts can be issued from the office after a successful payment.</p>
            <Link to="/contact">Contact the office</Link>
          </div>
        </div>
      </section>
    </>
  )
}
