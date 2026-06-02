import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import Scene from './Scene'
import { CATEGORIES } from './data'

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const move = (e) => {
      dotRef.current.style.left  = e.clientX + 'px'
      dotRef.current.style.top   = e.clientY + 'px'
      gsap.to(ringRef.current, {
        left: e.clientX, top: e.clientY,
        duration: 0.22,
        ease: 'power2.out',
      })
    }
    const enter = () => ringRef.current.classList.add('hovered')
    const leave = () => ringRef.current.classList.remove('hovered')

    window.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, .rank-card').forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div className="cursor-dot"  ref={dotRef}  />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

// ─── INTRO OVERLAY ────────────────────────────────────────────────────────────
function IntroOverlay({ visible }) {
  return (
    <div className={`intro-overlay ${visible ? '' : 'hidden'}`}>
      <div className="intro-logo">TOPTEN</div>
      <div className="intro-tagline">Discover The Best</div>
      {visible && (
        <div className="intro-scroll-hint">
          <div className="scroll-label">Scroll to explore</div>
          <div className="scroll-line" />
        </div>
      )}
    </div>
  )
}

// ─── RANKINGS PANEL ───────────────────────────────────────────────────────────
function RankingsPanel({ category, visible }) {
  const cardsRef = useRef([])

  useEffect(() => {
    cardsRef.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity = 0
      el.style.transform = 'translateX(24px)'
      if (visible) {
        setTimeout(() => {
          el.style.opacity = 1
          el.style.transform = 'translateX(0)'
        }, i * 75 + 350)
      }
    })
  }, [category, visible])

  if (!category) return null

  return (
    <div className="rankings-panel">
      {category.rankings.map((r, i) => (
        <div
          className="rank-card"
          key={i}
          ref={(el) => (cardsRef.current[i] = el)}
        >
          <div className="rank-num">0{i + 1}</div>
          <div className="rank-name">{r.name}</div>
          <div className="rank-location">{r.location}</div>
        </div>
      ))}
    </div>
  )
}

// ─── CATEGORY TEXT ────────────────────────────────────────────────────────────
function CategoryText({ category, visible }) {
  const [displayCat, setDisplayCat] = useState(category)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false)
    const t = setTimeout(() => {
      setDisplayCat(category)
      setShow(visible)
    }, visible ? 200 : 0)
    return () => clearTimeout(t)
  }, [category, visible])

  const cat = displayCat
  const idx = CATEGORIES.indexOf(cat)

  return (
    <div className="category-overlay">
      <div className="cat-center">
        <div className="cat-ghost-number">{cat?.num || '01'}</div>
        <div className={`cat-eyebrow ${show ? 'visible' : ''}`}>{cat?.eyebrow}</div>
        <div className={`cat-title   ${show ? 'visible' : ''}`}>{cat?.name}</div>
        <div className={`cat-subtitle ${show ? 'visible' : ''}`}>{cat?.subtitle}</div>
      </div>
    </div>
  )
}

// ─── PROGRESS DOTS ────────────────────────────────────────────────────────────
function ProgressDots({ activeIdx }) {
  return (
    <div className="progress-dots">
      {CATEGORIES.map((_, i) => (
        <div key={i} className={`progress-dot ${i === activeIdx ? 'active' : ''}`} />
      ))}
    </div>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [catIndex,  setCatIndex]  = useState(-1)   // -1 = intro
  const [introVisible, setIntroVisible] = useState(true)
  const [catVisible, setCatVisible]     = useState(false)
  const progressRef = useRef()
  const scrollRef   = useRef(0)
  const lenisRef    = useRef()

  // Lenis smooth scroll init
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    lenis.on('scroll', ({ scroll, limit, progress }) => {
      scrollRef.current = progress

      if (progressRef.current) {
        progressRef.current.style.width = (progress * 100) + '%'
      }

      // Intro threshold
      if (progress < 0.02) {
        setIntroVisible(true)
        setCatVisible(false)
        setCatIndex(-1)
      } else {
        if (introVisible) {
          setIntroVisible(false)
          setTimeout(() => setCatVisible(true), 400)
        }
        const raw = progress * (CATEGORIES.length + 0.5)
        const idx = Math.min(Math.floor(raw), CATEGORIES.length - 1)
        if (idx !== catIndex) setCatIndex(idx)
      }
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  const cat = catIndex >= 0 ? CATEGORIES[catIndex] : null
  const accentColor = cat?.accentColor || '#c9a84c'

  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Fixed 3D canvas */}
      <div className="canvas-wrapper">
        <Scene catIndex={Math.max(catIndex, 0)} accentColor={accentColor} />
      </div>

      {/* Vignette overlay */}
      <div className="vignette" />

      {/* Wordmark */}
      <div className="wordmark">Topten</div>

      {/* Category counter */}
      {catIndex >= 0 && (
        <div className="cat-counter">
          {String(catIndex + 1).padStart(2, '0')} / {String(CATEGORIES.length).padStart(2, '0')}
        </div>
      )}

      {/* Left accent */}
      {catIndex >= 0 && (
        <div className="left-accent">
          <div className="accent-line" />
          <div className="accent-index">{cat?.id}</div>
          <div className="accent-line" />
        </div>
      )}

      {/* Intro overlay */}
      <IntroOverlay visible={introVisible} />

      {/* Category text */}
      {catIndex >= 0 && (
        <CategoryText category={cat} visible={catVisible} />
      )}

      {/* Rankings */}
      {catIndex >= 0 && (
        <RankingsPanel category={cat} visible={catVisible} />
      )}

      {/* Progress bar */}
      <div className="progress-bar" ref={progressRef} style={{ width: '0%' }} />

      {/* Progress dots */}
      {catIndex >= 0 && <ProgressDots activeIdx={catIndex} />}

      {/* Scroll track — tall enough to drive scroll */}
      <div className="scroll-track">
        {Array.from({ length: CATEGORIES.length + 2 }).map((_, i) => (
          <div className="scroll-section" key={i} />
        ))}
      </div>
    </>
  )
}
