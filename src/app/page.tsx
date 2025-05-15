'use client'

import { useState } from 'react'
import { Container, Button, Form, Alert, Spinner } from 'react-bootstrap'

export default function Home() {
  const [response1, setResponse1] = useState('')
  const [response2, setResponse2] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValid = (text: string) => text.trim().split(/\s+/).length >= 20

  const handleSubmit = async () => {
    if (!isValid(response1) || !isValid(response2)) {
      setError('Both responses must be at least 20 words.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response1, response2 })
      })

      const data = await res.json()
      setResult(data)
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted && result) {
    return (
      <Container className="py-4">
        <h3>Today's Alignment Score: {result.score}/100</h3>
        <p>
          <strong>Summary:</strong> {result.summary}
        </p>
        <p>
          <strong>Flag:</strong> {result.flag || 'None'}
        </p>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1>Daily Reflection</h1>
      <Form.Group className="mb-3">
        <Form.Label>1. Describe one decision you made today that reflects your personal values.</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={response1}
          onChange={e => setResponse1(e.target.value)}
          isInvalid={!!response1 && !isValid(response1)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>2. Where did you face resistance today, and how did you respond?</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={response2}
          onChange={e => setResponse2(e.target.value)}
          isInvalid={!!response2 && !isValid(response2)}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={handleSubmit} disabled={!isValid(response1) || !isValid(response2) || loading}>
        {loading ? <Spinner size="sm" animation="border" /> : 'Submit Reflection'}
      </Button>
    </Container>
  )
}
