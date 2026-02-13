import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { SplitText, AsymptoticCurve, StaggerContainer, staggerItem, RevealBlock, DrawLine } from '../components/Animations'

const researchAreas = [
  { label: 'Learning Theory', desc: 'More generalization from less data. Finding the theoretical floor of sample efficiency.' },
  { label: 'Optimization Dynamics', desc: 'Smarter convergence, not just faster. Elegant paths through the loss landscape.' },
  { label: 'Scaling Laws', desc: 'More capability per flop. Understanding why some approaches get more from less.' },
  { label: 'Emergence', desc: 'Making capability breakthroughs predictable, not accidental. Fewer parameters, bigger leaps.' },
  { label: 'Representation Theory', desc: 'Richer world models from leaner architectures. Maximum insight from minimum structure.' },
  { label: 'Alignment & Safety', desc: 'Safety and capability advancing together. Efficiency means both, not either.' },
]

function FadeUp({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export default function V1() {
  return (
    <div className="min-h-dvh bg-white text-navy">
      {/* Nav */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 inset-x-0 z-40 bg-white border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/1" className="font-display font-bold text-xl tracking-tight">
            asymptica
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
            <a href="#research" className="hover:text-navy transition-colors duration-150">Research</a>
            <a href="#philosophy" className="hover:text-navy transition-colors duration-150">Philosophy</a>
            <a href="#contact" className="hover:text-navy transition-colors duration-150">Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="h-dvh flex flex-col pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col justify-center sm:flex-row sm:items-center sm:gap-8 md:gap-16">
          {/* Text */}
          <div className="sm:w-1/2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-mono text-xs sm:text-xs md:text-sm text-muted mb-3 sm:mb-4 md:mb-8 uppercase"
            >
              We're a Research Lab
            </motion.p>

            <h1 className="font-display font-extrabold text-5xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl leading-[0.88] text-balance sm:mb-4 md:mb-10">
              <SplitText delay={0.4} stagger={0.05}>
                Pushing intelligence to the
              </SplitText>
              <br />
              <span className="relative inline-block">
                <SplitText delay={0.9} stagger={0.05}>absolute</SplitText>
                <motion.span
                  className="absolute inset-0 bg-accent/15 -skew-x-2 rounded-sm"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  aria-hidden="true"
                />
              </span>{' '}
              <SplitText delay={1.0} stagger={0.05}>limit</SplitText>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-sm sm:text-sm md:text-lg lg:text-xl text-muted max-w-xl leading-relaxed text-pretty hidden sm:block sm:mt-4 md:mt-10"
            >
              We reach the absolute limits of intelligence — not through brute force,
              but through radical efficiency. More capability from less compute, less data, less waste.
            </motion.p>
          </div>

          {/* Graph */}
          <div className="mt-16 h-[32vh] sm:mt-0 sm:w-1/2 sm:h-auto sm:flex sm:items-center">
            <AsymptoticCurve className="w-full h-full" delay={1.6} />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="pb-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: 3, ease: 'easeInOut' }}
          >
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="text-muted/60">
              <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section className="py-32 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 gap-8 md:gap-16 items-start">
            <div>
              <FadeUp>
                <p className="font-mono text-sm text-muted mb-4 uppercase">What we do</p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-display font-bold text-3xl sm:text-4xl leading-tight text-balance">
                  The brute-force path is obvious. We find the{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10">elegant</span>
                    <motion.span
                      className="absolute inset-0 bg-accent/15 -skew-x-2 rounded-sm"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                      style={{ transformOrigin: 'left' }}
                      aria-hidden="true"
                    />
                  </span>{' '}
                  one
                </h2>
              </FadeUp>
            </div>
            <div>
              <RevealBlock delay={0.2}>
                <p className="text-muted leading-relaxed text-pretty mb-6">
                  Data, architecture, optimization, compute — the answer isn't
                  always "use more." Sometimes the answer is to understand better.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.3}>
                <p className="text-muted leading-relaxed text-pretty mb-6">
                  We reach the absolute limits of what intelligence can achieve —
                  not by outspending, but by out-thinking. Every insight compounds.
                  Every shortcut is earned through understanding.
                </p>
              </RevealBlock>
              <RevealBlock delay={0.4}>
                <p className="text-muted leading-relaxed text-pretty">
                  How do we get frontier capability from a fraction of the resources?
                  Where is the elegant solution hiding? What's the minimum path to maximum intelligence?
                </p>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <p className="font-mono text-sm text-muted mb-4 uppercase">Research Areas</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-balance mb-16">
              Six frontiers we're pushing
            </h2>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border" stagger={0.08}>
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.label}
                variants={staggerItem}
                className="bg-white p-8 group"
              >
                <p className="font-mono text-xs text-muted mb-4 group-hover:text-accent transition-colors duration-150">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display font-semibold text-lg mb-3">{area.label}</h3>
                <p className="text-sm text-muted leading-relaxed text-pretty">{area.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Questions */}
      <section className="py-32 bg-navy text-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <p className="font-mono text-sm text-white/40 mb-8 uppercase">Core Questions</p>
          </FadeUp>
          <StaggerContainer className="space-y-0" stagger={0.1} delay={0.1}>
            {[
              'How do we get frontier capability from a fraction of the compute?',
              'What if the best architecture is the leanest one?',
              'Where is the elegant solution hiding inside the brute-force one?',
              'How do we reach the absolute limit — without wasting a single flop?',
            ].map((q, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex gap-6 items-baseline border-b border-white/10 pb-6 pt-6"
              >
                <span className="font-mono text-sm text-accent/60 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display font-medium text-xl sm:text-2xl text-balance min-w-0">{q}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.1] text-balance">
              <SplitText delay={0} stagger={0.04}>Do more with</SplitText>{' '}
              <span className="relative inline-block">
                <SplitText delay={0.2} stagger={0.04}>less.</SplitText>
                <motion.span
                  className="absolute inset-0 bg-accent/15 -skew-x-2 rounded-sm"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  aria-hidden="true"
                />
              </span>
              <br />
              <SplitText delay={0.4} stagger={0.04}>Reach the absolute limit.</SplitText>
              <br />
              <SplitText delay={0.7} stagger={0.04}>That's the only path that matters.</SplitText>
            </h2>
          </div>
          <FadeUp delay={1.0}>
            <p className="text-lg text-muted text-pretty max-w-xl mx-auto">
              Rigorous science. Relentless efficiency.
              Every breakthrough compounds.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CTA / Footer */}
      <section id="contact" className="py-32 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <DrawLine className="h-px bg-navy/10 mb-16" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-mono text-sm text-muted mb-4 uppercase">Get in touch</p>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-balance">
                Ready to push the frontier?
              </h2>
              <a
                href="mailto:hello@asymptica.com"
                className="inline-flex items-center gap-2 bg-navy text-white px-8 py-4 rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-transform duration-150 shrink-0 self-start sm:self-auto"
              >
                hello@asymptica.com
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sm text-muted">
          <span className="font-display font-semibold">asymptica</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>

    </div>
  )
}
