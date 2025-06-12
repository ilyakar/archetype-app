'use client'

import '@styles/chooseArchetypePage.scss'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const archetypesData = [
  {
    id: 'warrior',
    name: 'Warrior',
    image: '/placeholder.svg?height=400&width=300',
    description: 'I will move through resistance like fire through a fog.',
    coreValues: ['Courage', 'Honor'],
    coreRituals: ['Training', 'Combat']
  },
  {
    id: 'stoic',
    name: 'Stoic',
    image: '/placeholder.svg?height=400&width=300',
    description: '',
    coreValues: ['Secrecy', 'Devotion'],
    coreRituals: ['Early Rise', 'Meditation']
  },
  {
    id: 'strategist',
    name: 'Strategist',
    image: '/placeholder.svg?height=400&width=300',
    description: 'I will observe what others miss. I will move when others stall.',
    coreValues: ['Wisdom', 'Patience'],
    coreRituals: ['Analysis', 'Planning']
  },
  {
    id: 'shadow',
    name: 'Shadow',
    image: '/placeholder.svg?height=400&width=300',
    description: 'I will disappear to evolve. I will return unrecognizable.',
    coreValues: ['Mystery', 'Transformation'],
    coreRituals: ['Solitude', 'Reflection']
  }
]

export default function ChooseArchetypePage() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male')
  const [selectedSkinTone, setSelectedSkinTone] = useState<'light' | 'dark'>('light')
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string | null>('stoic')
  const [currentMobileIndex, setCurrentMobileIndex] = useState<number>(
    archetypesData.findIndex(arch => arch.id === 'stoic') // Start with Stoic selected
  )

  useEffect(() => {
    // Update selectedArchetypeId when mobile index changes
    setSelectedArchetypeId(archetypesData[currentMobileIndex].id)
  }, [currentMobileIndex])

  const handleNextMobile = () => {
    setCurrentMobileIndex(prevIndex => (prevIndex + 1) % archetypesData.length)
  }

  const handlePrevMobile = () => {
    setCurrentMobileIndex(prevIndex => (prevIndex - 1 + archetypesData.length) % archetypesData.length)
  }

  const currentArchetypeForMobile = archetypesData[currentMobileIndex]

  return (
    <div className="choose-archetype-page">
      {/* Header */}
      <header className="choose-archetype-header">
        <Link href="/" className="back-button">
          <ArrowLeft className="back-button__icon" />
        </Link>
        <div className="choose-archetype-header__logo">ARCHETYPE</div>
        <div></div> {/* Spacer for flexbox alignment */}
      </header>

      {/* Main Content */}
      <main className="choose-archetype-main">
        <h1 className="choose-archetype-title">Choose Your Archetype</h1>

        {/* Gender and Appearance Selection */}
        <div className="appearance-selection">
          <div className="gender-toggle">
            <button
              className={`gender-toggle__button ${selectedGender === 'male' ? 'gender-toggle__button--active' : ''}`}
              onClick={() => setSelectedGender('male')}>
              Male
            </button>
            <button
              className={`gender-toggle__button ${selectedGender === 'female' ? 'gender-toggle__button--active' : ''}`}
              onClick={() => setSelectedGender('female')}>
              Female
            </button>
          </div>

          <div className="skin-tone-selection">
            <button
              aria-label="Select light skin tone"
              className={`skin-tone-button skin-tone-button--light ${selectedSkinTone === 'light' ? 'skin-tone-button--active' : ''}`}
              onClick={() => setSelectedSkinTone('light')}
            />
            <button
              aria-label="Select dark skin tone"
              className={`skin-tone-button skin-tone-button--dark ${selectedSkinTone === 'dark' ? 'skin-tone-button--active' : ''}`}
              onClick={() => setSelectedSkinTone('dark')}
            />
          </div>
        </div>

        {/* Archetype Display Area */}
        <div className="archetype-display-area">
          {/* Mobile Carousel View */}
          <div className="archetype-carousel">
            <button onClick={handlePrevMobile} className="carousel-nav-button carousel-nav-button--prev" aria-label="Previous archetype">
              <ChevronLeft />
            </button>
            <div
              className={`archetype-card archetype-card--mobile ${selectedArchetypeId === currentArchetypeForMobile.id ? 'archetype-card--selected' : ''}`}
              onClick={() => setSelectedArchetypeId(currentArchetypeForMobile.id)}>
              <div className="archetype-card__image-wrapper">
                <Image
                  src={currentArchetypeForMobile.image || '/placeholder.svg'}
                  alt={currentArchetypeForMobile.name}
                  width={300}
                  height={400}
                  className="archetype-card__image"
                />
              </div>
              <div className="archetype-card__content">
                <h3 className="archetype-card__name">{currentArchetypeForMobile.name}</h3>
                {currentArchetypeForMobile.description && <p className="archetype-card__description">{currentArchetypeForMobile.description}</p>}
                {selectedArchetypeId === currentArchetypeForMobile.id && (
                  <div className="archetype-card__details">
                    <div className="archetype-details__section">
                      <h4 className="archetype-details__title">Core Values</h4>
                      <div className="archetype-tags">
                        {currentArchetypeForMobile.coreValues.map(value => (
                          <span key={value} className="archetype-tag">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="archetype-details__section">
                      <h4 className="archetype-details__title">Core Rituals</h4>
                      <div className="archetype-tags">
                        {currentArchetypeForMobile.coreRituals.map(ritual => (
                          <span key={ritual} className="archetype-tag">
                            {ritual}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="select-path-button">
                      <span className="select-path-button__content">
                        Select This Path
                        <span className="select-path-button__icon">
                          <ArrowRight />
                        </span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button onClick={handleNextMobile} className="carousel-nav-button carousel-nav-button--next" aria-label="Next archetype">
              <ChevronRight />
            </button>
          </div>

          {/* Desktop/Tablet Grid View */}
          <div className="archetype-grid">
            {archetypesData.map(archetype => (
              <div
                key={archetype.id}
                className={`archetype-card ${selectedArchetypeId === archetype.id ? 'archetype-card--selected' : ''}`}
                onClick={() => setSelectedArchetypeId(archetype.id)}>
                <div className="archetype-card__image-wrapper">
                  <Image
                    src={archetype.image || '/placeholder.svg'}
                    alt={archetype.name}
                    width={300}
                    height={400}
                    className="archetype-card__image"
                  />
                </div>
                <div className="archetype-card__content">
                  <h3 className="archetype-card__name">{archetype.name}</h3>
                  {archetype.description && <p className="archetype-card__description">{archetype.description}</p>}
                  {selectedArchetypeId === archetype.id && (
                    <div className="archetype-card__details">
                      <div className="archetype-details__section">
                        <h4 className="archetype-details__title">Core Values</h4>
                        <div className="archetype-tags">
                          {archetype.coreValues.map(value => (
                            <span key={value} className="archetype-tag">
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="archetype-details__section">
                        <h4 className="archetype-details__title">Core Rituals</h4>
                        <div className="archetype-tags">
                          {archetype.coreRituals.map(ritual => (
                            <span key={ritual} className="archetype-tag">
                              {ritual}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="select-path-button">
                        <span className="select-path-button__content">
                          Select This Path
                          <span className="select-path-button__icon">
                            <ArrowRight />
                          </span>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
