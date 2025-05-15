'use client'

import { useState, useRef } from 'react'
import { Container, Button, Form, Alert, Spinner, Card } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/reflectionPage.scss'

export default function Home() {
  const [userResponse1, setuserResponse1] = useState('')
  const [userResponse2, setuserResponse2] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const isValid = (text: string) => text.trim().split(/\s+/).length >= 2 // Replace with 20 in production

  const handleSubmit = async () => {
    if (!isValid(userResponse1) || !isValid(userResponse2)) {
      setError('Both responses must be at least 20 words.')
      return
    }

    setLoading(true)
    setError('')

    fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userResponse1, userResponse2 })
    })
      .then(res => res.json())
      .then(data => {
        setResult(data)
        setSubmitted(true)
      })
      .catch(() => {
        setError('Something went wrong. Try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (submitted && result) {
    return (
      <Container className="py-4">
        {!result.error && (
          <>
            <h3>Today's Alignment Score: {result.score}/100</h3>
            <p>
              <strong>Summary:</strong> {result.summary}
            </p>
            <p>
              <strong>Flag:</strong> {result.flag || 'None'}
            </p>
          </>
        )}
        {result.error && (
          <>
            <h3>Error getting good response from OpenAI.</h3>
            <p>
              <strong>Error:</strong> {result.error}
            </p>
          </>
        )}
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h1 className="mb-5">Daily Reflection</h1>

      <Swiper
        modules={[Pagination, EffectCoverflow]}
        effect="coverflow"
        spaceBetween={30}
        slidesPerView={1}
        className="mb-4"
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        allowTouchMove={false}>
        <SwiperSlide className="reflection-slide">
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="mb-4">Describe one decision you made today that reflects your personal values:</Card.Title>
              <Form.Group className="input-group input-group-outline">
                <Form.Control
                  as="textarea"
                  placeholder="Today I made the following decision..."
                  rows={4}
                  value={userResponse1}
                  onChange={e => setuserResponse1(e.target.value)}
                  isInvalid={!!userResponse1 && !isValid(userResponse1)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </SwiperSlide>

        <SwiperSlide>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="mb-4">Where did you face resistance today, and how did you respond:</Card.Title>
              <Form.Group className="input-group input-group-outline">
                <Form.Control
                  as="textarea"
                  placeholder="Today I faced resistance when... I responded by..."
                  rows={4}
                  value={userResponse2}
                  onChange={e => setuserResponse2(e.target.value)}
                  isInvalid={!!userResponse2 && !isValid(userResponse2)}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </SwiperSlide>
      </Swiper>

      {error && <Alert variant="danger">{error}</Alert>}

      {activeIndex === 0 && (
        <div className="d-flex justify-content-end mt-4">
          <Button variant="primary" onClick={() => swiperRef.current?.slideNext()} disabled={!isValid(userResponse1)}>
            Next <i className="bi bi-chevron-right" />
          </Button>
        </div>
      )}

      {activeIndex === 1 && (
        <div className="d-flex justify-content-between mt-4">
          <Button variant="outline-secondary" onClick={() => swiperRef.current?.slidePrev()}>
            <i className="bi bi-chevron-left" /> Back
          </Button>

          <Button variant="success" onClick={handleSubmit} disabled={!isValid(userResponse1) || !isValid(userResponse2) || loading}>
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              <>
                Submit Reflection <i className="bi bi-chevron-right" />
              </>
            )}
          </Button>
        </div>
      )}
    </Container>
  )
}
