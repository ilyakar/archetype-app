import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Star } from 'lucide-react'

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-tertiary">
      {/* Header */}
      <header className="flex justify-center pt-8 pb-16">
        <div className="text-accent-blue text-sm font-medium tracking-[0.2em]">ARCHETYPE</div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image src="/placeholder.svg?height=400&width=500" alt="Four hooded figures" width={500} height={400} className="w-full h-auto" />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight font-serif">
                Meet your version who never breaks a promise
              </h1>
              <button className="relative inline-flex items-center justify-center p-0.5 rounded-full group">
                <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-green rounded-full transition-all duration-300 group-hover:opacity-75" />
                <span className="relative flex items-center bg-bg-primary text-text-accent hover:text-primary px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
                  Begin My Initiation
                  <span className="ml-3 flex items-center justify-center bg-accent-green rounded-full h-7 w-7">
                    <ArrowRight className="h-4 w-4 text-bg-primary" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-bg-secondary to-accent-purple/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-4">
            <span className="text-4xl lg:text-5xl font-bold text-primary">70,000+ </span>
            <span className="text-4xl lg:text-5xl font-bold text-accent-purple">Heroes</span>
          </div>
          <p className="text-text-secondary mb-4">Have already begun their path.</p>
          <p className="text-text-secondary mb-12">Don't fall behind.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-bg-tertiary/50 border-accent-blue/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Image src="/placeholder.svg?height=60&width=60" alt="Amanda Tapping" width={60} height={60} className="rounded-full mx-auto mb-4" />
                <h3 className="text-primary font-medium mb-2">Amanda Tapping</h3>
                <div className="flex justify-center mb-3">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  This is a life-changing app. I have become a much better person after 4 weeks.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bg-tertiary/50 border-accent-blue/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Image src="/placeholder.svg?height=60&width=60" alt="Joe Dispenza" width={60} height={60} className="rounded-full mx-auto mb-4" />
                <h3 className="text-primary font-medium mb-2">Joe Dispenza</h3>
                <div className="flex justify-center mb-3">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  This is motivation at a whole new level. It's my go-to first practice every day.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-bg-tertiary/50 border-accent-blue/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Image src="/placeholder.svg?height=60&width=60" alt="Leonard Nimoy" width={60} height={60} className="rounded-full mx-auto mb-4" />
                <h3 className="text-primary font-medium mb-2">Leonard Nimoy</h3>
                <div className="flex justify-center mb-3">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">Such gamification for a life coach I've said. So rewarding. Wow.</p>
              </CardContent>
            </Card>

            <Card className="bg-bg-tertiary/50 border-accent-blue/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Image src="/placeholder.svg?height=60&width=60" alt="Jim Carrey" width={60} height={60} className="rounded-full mx-auto mb-4" />
                <h3 className="text-primary font-medium mb-2">Jim Carrey</h3>
                <div className="flex justify-center mb-3">
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                  <Star className="h-4 w-4 fill-star text-star" />
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">I needed this so much but I am very glad it has made me.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Product Section */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-bg-secondary to-accent-purple/30 rounded-2xl p-8 backdrop-blur-sm border-accent-blue/20 border-[] px-0 py-[0]">
                <Image
                  src="/placeholder.svg?height=300&width=250"
                  alt="Hooded figure"
                  width={250}
                  height={300}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div>
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em] mb-4">BECOME THE PERSON YOU SWORE TO BE</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">ARCHETYPE</h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                An AI-powered system that holds you ruthlessly accountable to your future self and connects you with others on the same path.
              </p>
              <button className="relative inline-flex items-center justify-center p-0.5 rounded-full group">
                <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-green rounded-full transition-all duration-300 group-hover:opacity-75" />
                <span className="relative flex items-center bg-bg-primary text-text-accent hover:text-primary px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
                  Begin My Initiation
                  <span className="ml-3 flex items-center justify-center bg-accent-green rounded-full h-7 w-7">
                    <ArrowRight className="h-4 w-4 text-bg-primary" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em]">IDENTITY RITUAL</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">Create your Archetype</h3>
              <p className="text-text-secondary leading-relaxed">
                Define your unique values, rituals, and rules. Select the template. Forge your ideal future self.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em]">DAILY TRUTH</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">Track your Alignment</h3>
              <p className="text-text-secondary leading-relaxed">
                A number that rises with discipline and drops with deviation. No excuses. Just evidence.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em]">FUTURE SELF</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">Talk to your future self</h3>
              <p className="text-text-secondary leading-relaxed">
                Use advanced AI to have conversations with your accountable, future self. You choose, and predicts regret. It answers. What would the
                person I swore to become do?
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em]">ASCENSION</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">Unlock deeper versions</h3>
              <p className="text-text-secondary leading-relaxed">
                As your alignment score rises and crosses each discipline threshold, you unlock stricter rituals, deeper rules, and Archetype
                transformation.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em]">PUBLIC PROOF</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">Prove alignment</h3>
              <p className="text-text-secondary leading-relaxed">
                Share your Discipline Profile. No followers, no clout, no easy dopamine. Just your values, visible.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em]">SOCIAL LAYER</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-primary">Connect by value</h3>
              <p className="text-text-secondary leading-relaxed">
                Later, connect with others, not by who they know, but by the standards they live by.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Identity Recode Section */}
      <section className="px-4 py-20 bg-gradient-to-br from-bg-primary via-bg-secondary to-accent-purple/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="People walking toward light with network pattern"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div>
              <p className="text-accent-blue text-sm font-medium tracking-[0.2em] mb-4">IDENTITY RECODE</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">A New Social Network</h2>
              <p className="text-primary text-xl mb-6 font-medium">Built on character. Not Clout.</p>

              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>Soon, Archetype will become a global graph of discipline, alignment, and spiritual integrity.</p>
                <p>No likes. No followers. No vanity metrics.</p>
                <p>You won't follow influencers.</p>
                <p>You'll meet Archetypes: real people, living by their values.</p>
              </div>

              <div className="mt-8">
                <Button className="bg-transparent border-2 border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-primary px-8 py-3 rounded-full text-lg font-medium transition-all duration-300">
                  Begin My Initiation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision & Invest Section */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-16">
          <div>
            <p className="text-accent-blue text-sm font-medium tracking-[0.2em] mb-4">FATE</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Future Vision</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
              <p>The first Archetypes are being forged now.</p>
              <p>The first rituals. The first code enforcements.</p>
              <p>Only those on this waitlist will enter before the gates close. You'll be part of the founding class.</p>
            </div>
          </div>

          <div>
            <p className="text-accent-blue text-sm font-medium tracking-[0.2em] mb-4">INVEST</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">Invest in yourself</h2>
            <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
              <p>This isn't a product drop.</p>
              <p>It's a promise to your future self.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <button className="relative inline-flex items-center justify-center p-0.5 rounded-full group">
            <span className="absolute inset-0 bg-gradient-to-r from-accent-blue to-accent-green rounded-full transition-all duration-300 group-hover:opacity-75" />
            <span className="relative flex items-center bg-bg-primary text-text-accent hover:text-primary px-12 py-4 rounded-full text-xl font-medium transition-all duration-300">
              Begin My Initiation
              <span className="ml-3 flex items-center justify-center bg-accent-green rounded-full h-8 w-8">
                <ArrowRight className="h-5 w-5 text-bg-primary" />
              </span>
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-bg-tertiary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-text-secondary text-sm">
          <p>Archetype. Meet your version who never breaks a promise.</p>
          <p>Copyright © 2025</p>
        </div>
      </footer>
    </div>
  )
}
