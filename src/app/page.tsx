'use client'

import { useState, useRef, useEffect } from 'react'
import { Container, Button, Form, Alert, Spinner, Card } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@styles/reflectionPage.scss'
import { updateUser, resetUser } from '@redux/reducers/User'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@redux/stores'
import moment from 'moment'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const dispatch = useDispatch()
  const personalValues = useSelector((state: RootState) => state.User.personalValues)
  const dailyReflectionResponse1 = useSelector((state: RootState) => state.User.dailyReflectionResponse1)
  const dailyReflectionResponse2 = useSelector((state: RootState) => state.User.dailyReflectionResponse2)
  const dailyReflectionData = useSelector((state: RootState) => state.User.dailyReflectionData)
  const dailyReflectionSubmittedDate = useSelector((state: RootState) => state.User.dailyReflectionSubmittedDate)

  const isValidLength = (text: string) => text.trim().split(/\s+/).length >= 20

  // Auto-hide the error alert
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError('')
      }, 10000)

      return () => clearTimeout(timeout)
    }
  }, [error])

  const _onPersonalValuesChange = (personalValues: string) => {
    dispatch(updateUser({ personalValues: personalValues }))
  }

  const _onDailyReflectionResponse1Change = (response1: string) => {
    dispatch(updateUser({ dailyReflectionResponse1: response1 }))
  }

  const _onDailyReflectionResponse2Change = (response2: string) => {
    dispatch(updateUser({ dailyReflectionResponse2: response2 }))
  }

  const _onResetDailyReflectionPress = () => {
    dispatch(
      updateUser({
        dailyReflectionResponse1: '',
        dailyReflectionResponse2: '',
        dailyReflectionSubmittedDate: undefined,
        dailyReflectionData: undefined
      })
    )

    setActiveIndex(0)
  }

  const shouldShowDailyReflectionSummary = () => {
    const hasValidOpenAiReflectionData =
      dailyReflectionData && typeof dailyReflectionData.score === 'number' && typeof dailyReflectionData.summary === 'string'
    const lastReflectionSubmittedInPast24Hours = moment().diff(dailyReflectionSubmittedDate, 'hours') < 24

    // We have valid openAi reflection data + we submitted last reflection in the past day
    if (hasValidOpenAiReflectionData && lastReflectionSubmittedInPast24Hours) {
      return true
    }

    // Nope. So show the daily reflection forms
    else {
      return false
    }
  }

  const isAnswerGood = ({ question, answer }: { question: string; answer: string }): Promise<boolean> => {
    setLoading(true)
    setError('')

    return fetch('/api/isGoodAnswerAnalysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: question,
        userResponse: answer,
        personalValues: personalValues
      })
    })
      .then(res => res.json())
      .then(openAiIsGoodAnswerAnalysis => {
        console.log('OPENAI got isGoodAnswerAnalysis:', openAiIsGoodAnswerAnalysis)
        // Answer passed, great!
        if (openAiIsGoodAnswerAnalysis?.questionPassed) {
          return true
        }
        // Answer didn't pass. Explain why in error
        else {
          setError(openAiIsGoodAnswerAnalysis?.questionFailedSummary)
          return false
        }
      })
      .catch((error: { message: string }) => {
        setError(`Oops. Got an error: ${error.message}`)
        return false
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const _onDailyResponse1NextPress = () => {
    // If personal values text is too short
    if (!isValidLength(personalValues)) {
      return setError('Your personal values should be 20 words or more')
    }
    // If dailyReflection1 response is too short
    else if (!isValidLength(dailyReflectionResponse1)) {
      return setError('Your daily reflection response should be 20 words or more')
    }

    isAnswerGood({
      question: 'Describe one decision you made today that reflects your personal values',
      answer: dailyReflectionResponse1
    }).then((passed: boolean) => {
      if (passed) {
        swiperRef.current?.slideNext()
      }
    })
  }

  const _onSubmitReflectionPress = () => {
    // If personal values text is too short
    if (!isValidLength(personalValues)) {
      return setError('Your personal values should be 20 words or more')
    }
    // If dailyReflection1 response is too short
    else if (!isValidLength(dailyReflectionResponse1)) {
      return setError('Your daily reflection response #1 should be 20 words or more')
    }
    // If dailyReflection2 response is too short
    else if (!isValidLength(dailyReflectionResponse2)) {
      return setError('Your daily reflection response #2 should be 20 words or more')
    }

    isAnswerGood({
      question: 'Where did you face resistance today, and how did you respond',
      answer: dailyReflectionResponse2
    }).then((passed: boolean) => {
      if (passed) {
        submitAllDataToOpenAIForReflectionAnalysis()
      }
    })
  }

  const submitAllDataToOpenAIForReflectionAnalysis = () => {
    setLoading(true)
    setError('')

    fetch('/api/reflectionAnalysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ personalValues, dailyReflectionResponse1, dailyReflectionResponse2 })
    })
      .then(res => res.json())
      .then(openAiReflectionData => {
        dispatch(
          updateUser({
            dailyReflectionData: openAiReflectionData,
            dailyReflectionSubmittedDate: new Date()
          })
        )
      })
      .catch((error: { message: string }) => {
        setError(`Oops. Got an error: ${error.message}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {error && (
        <Alert variant="danger" className="error-alert shadow-sm text-white" onClick={() => setError('')} style={{ cursor: 'pointer' }}>
          {error}
        </Alert>
      )}
      <Button variant="outline-warning" className="reset-daily-reflection-button" onClick={_onResetDailyReflectionPress}>
        Reset Daily Reflection
      </Button>
      <div className="hero">
        <Container className="py-5" style={{ maxWidth: '600px' }}>
          <h2 className="mb-3">Profile 😎</h2>
          <Card className="card-plain mb-5">
            <h5>What are your personal values?</h5>
            <Form.Group className="input-group input-group-outline">
              <Form.Control
                as="textarea"
                placeholder="Please describe in 2-3 sentences"
                rows={4}
                value={personalValues}
                onChange={e => _onPersonalValuesChange(e.target.value)}
                isInvalid={!isValidLength(personalValues)}
              />
            </Form.Group>
          </Card>
        </Container>
      </div>

      <Container className="py-5" style={{ maxWidth: '600px' }}>
        <h2 className="mb-5">Daily Reflection 🧐</h2>

        {!shouldShowDailyReflectionSummary() && (
          <>
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
                        value={dailyReflectionResponse1}
                        onChange={e => _onDailyReflectionResponse1Change(e.target.value)}
                        isInvalid={!isValidLength(dailyReflectionResponse1)}
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
                        value={dailyReflectionResponse2}
                        onChange={e => _onDailyReflectionResponse2Change(e.target.value)}
                        isInvalid={!isValidLength(dailyReflectionResponse2)}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </SwiperSlide>
            </Swiper>

            {activeIndex === 0 && (
              <div className="d-flex justify-content-end mt-4">
                <Button variant="primary" onClick={_onDailyResponse1NextPress}>
                  {loading ? (
                    <Spinner size="sm" animation="border" variant="light" style={{ marginTop: 2 }} />
                  ) : (
                    <>
                      Next <i className="bi bi-chevron-right" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {activeIndex === 1 && (
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-secondary" onClick={() => swiperRef.current?.slidePrev()}>
                  <i className="bi bi-chevron-left" /> Back
                </Button>

                <Button variant="success" onClick={_onSubmitReflectionPress}>
                  {loading ? (
                    <Spinner size="sm" animation="border" variant="light" style={{ marginTop: 2 }} />
                  ) : (
                    <>
                      Submit Reflection <i className="bi bi-chevron-right" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {shouldShowDailyReflectionSummary() && (
          <>
            <p>
              <strong>Alignment Score:</strong> {dailyReflectionData!.score}/100
            </p>
            <p>
              <strong>Summary:</strong> {dailyReflectionData!.summary}
            </p>
            <p>
              <strong>Flag:</strong> {dailyReflectionData!.flag || 'None'}
            </p>
          </>
        )}
      </Container>
    </>
  )
}
