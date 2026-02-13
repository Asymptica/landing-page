import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

/**
 * Split text into words and animate them in with stagger.
 */
export function SplitText({ children, className, delay = 0, stagger = 0.04, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  const words = children.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ paddingBottom: '0.25em', marginBottom: '-0.25em' }}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </span>
  )
}

/**
 * Animated SVG asymptotic curve with a glowing tracer dot.
 */
export function AsymptoticCurve({ className, color = 'currentColor', delay = 0.8 }) {
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const containerRef = useRef(null)
  const inView = useInView(containerRef, { once: true })
  const progress = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(progress, 1, {
      duration: 2.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
    })
    return controls.stop
  }, [inView, progress, delay])

  useEffect(() => {
    const path = pathRef.current
    const dot = dotRef.current
    if (!path || !dot) return

    const length = path.getTotalLength()

    // Set up dash for draw-on effect
    path.style.strokeDasharray = length
    path.style.strokeDashoffset = length

    const unsubscribe = progress.on('change', (v) => {
      path.style.strokeDashoffset = length * (1 - v)
      const point = path.getPointAtLength(length * v)
      dot.setAttribute('cx', point.x)
      dot.setAttribute('cy', point.y)
      dot.setAttribute('opacity', v > 0.01 ? 1 : 0)
    })

    return unsubscribe
  }, [progress])

  const curvePath = 'M 0 375 C 118 370, 222 360, 312 335 C 375 310, 408 255, 428 175 C 436 135, 442 75, 445 12'
  const fillPath = curvePath + ' L 445 375 L 0 375 Z'

  return (
    <div ref={containerRef} className={className}>
      <svg viewBox="0 0 460 400" fill="none" className="w-full h-full" preserveAspectRatio="xMinYMid meet">
        {/* Horizontal grid lines */}
        {[95, 190, 285].map((y) => (
          <motion.line
            key={y}
            x1="0" y1={y} x2="445" y2={y}
            stroke={color}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.08 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.1 }}
          />
        ))}

        {/* Vertical grid lines */}
        {[150, 300].map((x) => (
          <motion.line
            key={x}
            x1={x} y1="0" x2={x} y2="375"
            stroke={color}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.08 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.1 }}
          />
        ))}

        {/* X-axis */}
        <motion.line
          x1="0" y1="375" x2="460" y2="375"
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.25 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.1 }}
        />

        {/* Y-axis */}
        <motion.line
          x1="0" y1="0" x2="0" y2="375"
          stroke={color}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.1 }}
        />

        {/* Vertical asymptote — the limit */}
        <motion.line
          x1="445" y1="0" x2="445" y2="375"
          stroke={color}
          strokeWidth="2.5"
          strokeDasharray="8 5"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.35 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
        />

        {/* Filled area under curve */}
        <motion.path
          d={fillPath}
          fill="var(--color-accent)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: delay + 1.5 }}
        />

        {/* Main curve — thick */}
        <path
          ref={pathRef}
          d={curvePath}
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />

        {/* Tracer dot — bigger with glow ring */}
        <circle
          ref={dotRef}
          r="7"
          fill={color}
          opacity="0"
        />

        {/* Tick marks on x-axis */}
        {[150, 300].map((x) => (
          <motion.line
            key={`tx${x}`}
            x1={x} y1="375" x2={x} y2="383"
            stroke={color}
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.2 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.3 }}
          />
        ))}

        {/* Limit label */}
        <motion.text
          x="445" y="396" fontSize="11" fill={color} opacity="0"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 2.2 }}
        >
          L
        </motion.text>

        {/* Y-axis label */}
        <motion.text
          x="4" y="12" fontSize="9" fill={color} opacity="0"
          fontFamily="var(--font-mono)"
          animate={inView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 2.2 }}
        >
          f(x)
        </motion.text>
      </svg>
    </div>
  )
}

/**
 * Counter that animates from 0 to target when in view.
 */
export function Counter({ target, suffix = '', className, delay = 0, duration = 1.5 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      delay,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [inView, target, duration, delay])

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}

/**
 * Reveal element with a sliding mask/clip effect.
 */
export function RevealBlock({ children, className, delay = 0, direction = 'up' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const initial = direction === 'up'
    ? { y: 60, opacity: 0 }
    : direction === 'left'
    ? { x: 60, opacity: 0 }
    : { x: -60, opacity: 0 }

  const target = { x: 0, y: 0, opacity: 1 }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div
        initial={initial}
        animate={inView ? target : initial}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * Stagger children animation container.
 */
export function StaggerContainer({ children, className, stagger = 0.06, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

/**
 * Horizontal line that draws itself.
 */
export function DrawLine({ className, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      style={{ transformOrigin: 'left' }}
    />
  )
}

/**
 * Parallax wrapper - moves children at a different rate than scroll.
 */
export function Parallax({ children, className, speed = 0.3 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100])

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
