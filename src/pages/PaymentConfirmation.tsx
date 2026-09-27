import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { api } from '../api'

type Payment = {
  id: number
  amount: number
  currency: string
  status: string
  provider: string
  programName: string | null
  createdAt: string
}

export default function PaymentConfirmation() {
  const [searchParams] = useSearchParams()
  const [payment, setPayment] = useState<Payment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const paypal = searchParams.get('paypal')
    const orderId = searchParams.get('token')
    const paymentId = searchParams.get('payment_id')

    if (paypal === 'cancelled') {
      setError('Your PayPal payment was cancelled. No payment was completed.')
      setLoading(false)
      return
    }

    if (sessionId) {
      api<{ payment: Payment }>(`/api/payments/session/${encodeURIComponent(sessionId)}`)
        .then((data) => {
          if (data.payment.status === 'paid') setPayment(data.payment)
          else setError('Your payment is still being processed. Please check your dashboard shortly.')
        })
        .catch((err) => setError(err instanceof Error ? err.message : 'Unable to verify your payment.'))
        .finally(() => setLoading(false))
      return
    }

    if (paypal === 'success' && orderId) {
      api<{ payment: Payment }>('/api/payments/paypal/capture', {
        method: 'POST',
        body: JSON.stringify({ orderId }),
      })
        .then((data) => {
          if (data.payment.status === 'paid') setPayment(data.payment)
          else setError('Your PayPal payment was not completed.')
        })
        .catch((err) => setError(err instanceof Error ? err.message : 'Unable to complete your PayPal payment.'))
        .finally(() => setLoading(false))
      return
    }

    if (paymentId) {
      api<{ payments: Payment[] }>('/api/payments/me')
        .then((data) => {
          const found = data.payments.find((item) => String(item.id) === paymentId)
          if (found?.status === 'paid') setPayment(found)
          else setError('Payment details could not be found.')
        })
        .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load payment details.'))
        .finally(() => setLoading(false))
      return
    }

    setError('No payment confirmation information was provided.')
    setLoading(false)
  }, [searchParams])

  return (
    <>
      <PageHero
        title="Payment Confirmation"
        subtitle="Thank you. Here is your payment confirmation."
        image="/images/office-front.jpg"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="form-card">
            {loading && <div className="alert">Confirming your payment…</div>}

            {!loading && payment && (
              <>
                <div className="alert">Payment confirmed successfully.</div>
                <h2 style={{ marginTop: 24 }}>Thank you for your payment!</h2>
                <p>Your payment has been received and your Wolde Driving School account has been updated.</p>

                <div className="grid-2" style={{ marginTop: 24 }}>
                  <div>
                    <strong>Course</strong>
                    <p>{payment.programName || 'Driving program'}</p>
                  </div>
                  <div>
                    <strong>Amount paid</strong>
                    <p>{payment.currency.toUpperCase()} {payment.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <strong>Payment method</strong>
                    <p>{payment.provider === 'paypal' ? 'PayPal' : 'Card / Stripe'}</p>
                  </div>
                  <div>
                    <strong>Status</strong>
                    <p>Paid</p>
                  </div>
                </div>

                <p className="meta" style={{ marginTop: 20 }}>
                  A payment confirmation has also been sent to your account email when available.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
                  <Link className="btn btn-gold" to="/dashboard">Go to dashboard</Link>
                  <Link className="btn" to="/courses">View courses</Link>
                </div>
              </>
            )}

            {!loading && error && (
              <>
                <div className="alert error">{error}</div>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
                  <Link className="btn btn-gold" to="/payment">Return to payment</Link>
                  <Link className="btn" to="/dashboard">Go to dashboard</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
