import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'

const HomePage = () => {
  return (
    <>
      <header className="site-header">
        <div className="site-header__logo">ARCHETYPE</div>
      </header>

      <section className="hero-section">
        <div className="hero-section__content">
          <Image className="hero-section__image" src="/home-hero-characters.png" alt="Four Archetypes" width="500" height="500" />
          <div className="hero-section__text-content">
            <h1 className="hero-section__title">Meet your version who never breaks a promise</h1>
            <Link href="/choose-archetype" className="gradient-button">
              <span className="gradient-button__content">
                Begin My Initiation
                <span className="gradient-button__icon-wrapper">
                  <ArrowRight />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>
      {/* Social Proof Section */}
      <section className="social-proof section-padding">
        <div className="container">
          <div className="social-proof__heading">
            <span className="social-proof__heading-main">70,000+ </span>
            <span className="social-proof__heading-accent">Heroes</span>
          </div>
          <p className="social-proof__subheading">Have already begun their path.</p>
          <p className="social-proof__subheading-bottom">Don't fall behind.</p>

          <div className="social-proof__grid">
            {/* Testimonial Cards - Example for one, repeat for others */}
            <Testimonial
              name="Amanda Tapping"
              image="/placeholder.svg?height=60&width=60"
              quote="This is a life-changing app. I have become a much better person after 4 weeks."
            />
            <Testimonial
              name="Joe Dispenza"
              image="/placeholder.svg?height=60&width=60"
              quote="This is motivation at a whole new level. It's my go-to first practice every day."
            />
            <Testimonial
              name="Leonard Nimoy"
              image="/placeholder.svg?height=60&width=60"
              quote="Such gamification for a life coach I've said. So rewarding. Wow."
            />
            <Testimonial
              name="Jim Carrey"
              image="/placeholder.svg?height=60&width=60"
              quote="I needed this so much but I am very glad it has made me."
            />
          </div>
        </div>
      </section>
      {/* Main Product Section */}
      <section className="product-section section-padding">
        <div className="container">
          <div className="product-section__grid">
            <div className="product-section__image-wrapper">
              <Image src="/placeholder.svg?height=300&width=250" alt="Hooded figure" width={250} height={300} />
            </div>
            <div className="product-section__text-content">
              <p className="text-label">BECOME THE PERSON YOU SWORE TO BE</p>
              <h2 className="heading-xl">ARCHETYPE</h2>
              <p className="paragraph paragraph--large">
                An AI-powered system that holds you ruthlessly accountable to your future self and connects you with others on the same path.
              </p>
              <Link href="/choose-archetype" className="gradient-button">
                <span className="gradient-button__content">
                  Begin My Initiation
                  <span className="gradient-button__icon-wrapper">
                    <ArrowRight />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Features Grid */}
      <section className="features-grid-section section-padding container">
        <div className="features-grid">
          {/* Feature Item - Example for one, repeat for others */}
          <div className="features-grid__item">
            <p className="text-label">IDENTITY RITUAL</p>
            <h3 className="heading-lg">Create your Archetype</h3>
            <p className="paragraph">Define your unique values, rituals, and rules. Select the template. Forge your ideal future self.</p>
          </div>
          <div className="features-grid__item">
            <p className="text-label">DAILY TRUTH</p>
            <h3 className="heading-lg">Track your Alignment</h3>
            <p className="paragraph">A number that rises with discipline and drops with deviation. No excuses. Just evidence.</p>
          </div>
          <div className="features-grid__item">
            <p className="text-label">FUTURE SELF</p>
            <h3 className="heading-lg">Talk to your future self</h3>
            <p className="paragraph">
              Use advanced AI to have conversations with your accountable, future self. You choose, and predicts regret. It answers. What would the
              person I swore to become do?
            </p>
          </div>
          <div className="features-grid__item">
            <p className="text-label">ASCENSION</p>
            <h3 className="heading-lg">Unlock deeper versions</h3>
            <p className="paragraph">
              As your alignment score rises and crosses each discipline threshold, you unlock stricter rituals, deeper rules, and Archetype
              transformation.
            </p>
          </div>
          <div className="features-grid__item">
            <p className="text-label">PUBLIC PROOF</p>
            <h3 className="heading-lg">Prove alignment</h3>
            <p className="paragraph">Share your Discipline Profile. No followers, no clout, no easy dopamine. Just your values, visible.</p>
          </div>
          <div className="features-grid__item">
            <p className="text-label">SOCIAL LAYER</p>
            <h3 className="heading-lg">Connect by value</h3>
            <p className="paragraph">Later, connect with others, not by who they know, but by the standards they live by.</p>
          </div>
        </div>
      </section>
      {/* Identity Recode Section */}
      <section className="identity-recode section-padding">
        <div className="container">
          <div className="identity-recode__grid">
            <div className="identity-recode__image-wrapper">
              <Image src="/placeholder.svg?height=500&width=400" alt="People walking toward light with network pattern" width={400} height={500} />
            </div>
            <div className="identity-recode__text-content">
              <p className="text-label">IDENTITY RECODE</p>
              <h2 className="heading-xl">A New Social Network</h2>
              <p className="identity-recode__subheading">Built on character. Not Clout.</p>
              <div className="identity-recode__text-block">
                <p>Soon, Archetype will become a global graph of discipline, alignment, and spiritual integrity.</p>
                <p>No likes. No followers. No vanity metrics.</p>
                <p>You won't follow influencers.</p>
                <p>You'll meet Archetypes: real people, living by their values.</p>
              </div>
              <div className="identity-recode__button-wrapper">
                <Link href="/choose-archetype" className="gradient-button">
                  <span className="gradient-button__content">
                    Begin My Initiation
                    <span className="gradient-button__icon-wrapper">
                      <ArrowRight />
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Future Vision & Invest Section */}
      <section className="future-vision-section section-padding">
        <div className="future-vision container">
          <div className="future-vision__block">
            <p className="text-label">FATE</p>
            <h2 className="heading-xl">Future Vision</h2>
            <div className="future-vision__text-block">
              <p>The first Archetypes are being forged now.</p>
              <p>The first rituals. The first code enforcements.</p>
              <p>Only those on this waitlist will enter before the gates close. You'll be part of the founding class.</p>
            </div>
          </div>
          <div className="future-vision__block">
            <p className="text-label">INVEST</p>
            <h2 className="heading-xl">Invest in yourself</h2>
            <div className="future-vision__text-block">
              <p>This isn't a product drop.</p>
              <p>It's a promise to your future self.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="final-cta section-padding">
        <div className="container">
          <Link href="/choose-archetype" className="gradient-button gradient-button--large">
            <span className="gradient-button__content">
              Begin My Initiation
              <span className="gradient-button__icon-wrapper">
                <ArrowRight />
              </span>
            </span>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer__content container">
          <p>Archetype. Meet your version who never breaks a promise.</p>
          <p>Copyright © 2025</p>
        </div>
      </footer>
    </>
  )
}

interface TestimonialProps {
  name: string
  image: string
  quote: string
  imageWidth?: number
  imageHeight?: number
}

const Testimonial = ({ name, image, quote, imageWidth = 60, imageHeight = 60 }: TestimonialProps) => {
  return (
    <div className="testimonial-card">
      <Image src={image || '/placeholder.svg'} alt={name} width={imageWidth} height={imageHeight} className="testimonial-card__avatar" />
      <h3 className="testimonial-card__name">{name}</h3>
      <div className="testimonial-card__stars">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <p className="testimonial-card__quote">{quote}</p>
    </div>
  )
}

export default HomePage
