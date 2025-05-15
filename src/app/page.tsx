'use client'

import { useState } from 'react'
import { Container, Button, Form, Alert, Spinner } from 'react-bootstrap'

export default function Home() {
  const [userResponse1, setuserResponse1] = useState('')
  const [userResponse2, setuserResponse2] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isValid = (text: string) => text.trim().split(/\s+/).length >= 2 /* 20 -- replace with 20 in production */

  const handleSubmit = async () => {
    if (!isValid(userResponse1) || !isValid(userResponse2)) {
      setError('Both responses must be at least 20 words.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userResponse1, userResponse2 })
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
              <strong>Error</strong> {result.error}
            </p>
          </>
        )}
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
          value={userResponse1}
          onChange={e => setuserResponse1(e.target.value)}
          isInvalid={!!userResponse1 && !isValid(userResponse1)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>2. Where did you face resistance today, and how did you respond?</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={userResponse2}
          onChange={e => setuserResponse2(e.target.value)}
          isInvalid={!!userResponse2 && !isValid(userResponse2)}
        />
      </Form.Group>

      {error && <Alert variant="danger">{error}</Alert>}

      <Button variant="primary" onClick={handleSubmit} disabled={!isValid(userResponse1) || !isValid(userResponse2) || loading}>
        {loading ? <Spinner size="sm" animation="border" /> : 'Submit Reflection'}
      </Button>
    </Container>
  )
}
