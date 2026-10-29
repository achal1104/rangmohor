import { useEffect, useLayoutEffect, useState } from 'react'
import { STORE } from './data.js'

const reduced = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- Reveal on scroll: adds .rvl (hidden) then .in (visible) as elements enter the screen ----------
const SEL = '.occ>h2,.occ>.sub,.occ>.eyebrow,.coll-head,.why-l,.why-r>div,.ex-in,.consult-box,.store>*,.page-head>*,.panel,.preview,.occ-card,.grid>.card,.f-top>div,.cat-tabs'
export function useRevealAll(dep) {
  useLayoutEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return
      const el = e.target
      el.classList.add('in'); io.unobserve(el)
      setTimeout(() => el.classList.add('done'), 1400)
    }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' })
    document.querySelectorAll(SEL).forEach(el => {
      if (el.classList.contains('in')) return
      const sib = [...el.parentElement.children].filter(c => c.matches(SEL))
      el.style.setProperty('--d', (sib.indexOf(el) % 4) * 90 + 'ms')
      el.classList.add('rvl'); io.observe(el)
    })
    return () => io.disconnect()
  }, [dep])
}

// ---------- Brand intro (once per visit) ----------
const seen = () => { try { return sessionStorage.getItem('rm-intro') } catch { return null } }
export function Preloader() {
  const [s, setS] = useState(() => {
    const skip = seen() || reduced()
    document.documentElement.style.setProperty('--h0', skip ? '0s' : '1.9s')
    return skip ? 'gone' : 'on'
  })
  useEffect(() => {
    if (s !== 'on') return
    const a = setTimeout(() => setS('out'), 1500)
    const b = setTimeout(() => { setS('gone'); try { sessionStorage.setItem('rm-intro', '1') } catch { /* ignore */ } }, 2200)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])
  if (s === 'gone') return null
  return <div className={'intro ' + s} aria-hidden="true"><img src="logo.png" alt="" /><i /></div>
}

// ---------- Scroll progress, sticky-header state, parallax value, card tilt, floating buttons ----------
export function ScrollFx() {
  useEffect(() => {
    const h = document.documentElement
    const on = () => {
      const y = h.scrollTop
      h.style.setProperty('--sy', y)
      h.style.setProperty('--sp', y / Math.max(1, h.scrollHeight - h.clientHeight))
      h.classList.toggle('scrolled', y > 40)
      h.classList.toggle('show-top', y > 700)
    }
    const move = e => {
      const c = e.target.closest && e.target.closest('.card'); if (!c) return
      const r = c.getBoundingClientRect()
      c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * 7 + 'deg')
      c.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * 5 + 'deg')
    }
    const leave = e => { if (e.target.classList && e.target.classList.contains('card')) { e.target.style.setProperty('--rx', '0deg'); e.target.style.setProperty('--ry', '0deg') } }
    on()
    addEventListener('scroll', on, { passive: true })
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseout', leave)
    return () => { removeEventListener('scroll', on); document.removeEventListener('mousemove', move); document.removeEventListener('mouseout', leave) }
  }, [])
  return (
    <>
      <div className="sprog" aria-hidden="true" />
      <a className="wa-fab" href={STORE.whatsapp} aria-label="Chat on WhatsApp"><b>WhatsApp</b><span>Chat with us</span></a>
      <button className="to-top" aria-label="Back to top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  )
}

export function Toast({ msg }) {
  return <div className={'toast' + (msg ? ' on' : '')} role="status" aria-live="polite">{msg}</div>
}

// Headline whose words rise in one after another
export function Words({ text }) {
  return text.split(' ').map((w, i) => <span className="w" key={i} style={{ '--i': i }}><span>{w}</span>{' '}</span>)
}

export function Marquee() {
  const row = ['Wedding essentials', 'Handcrafted bags', 'Home decor', 'Kitchen & dining', 'Gifting', 'Bestsellers']
    .map(t => <span key={t}>{t}<i>✦</i></span>)
  return <div className="marq" aria-hidden="true"><div>{row}{row}</div></div>
}


// Calm lotus illustration for the hero arch (shows until / unless a real photo covers it)
export function HeroArt() {
  const petal = 'M0 -60 C16 -38 16 -14 0 6 C-16 -14 -16 -38 0 -60Z'
  return (
    <svg className="art" viewBox="0 0 400 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <circle cx="200" cy="300" r="150" fill="#fff" opacity=".14" />
      <circle cx="200" cy="300" r="190" fill="none" stroke="#fff" strokeWidth=".8" opacity=".35" />
      <g transform="translate(200 345) scale(2.5)" stroke="#c9a15b" strokeWidth=".5">
        {[[-72, .6], [72, .6], [-40, .8], [40, .8], [0, 1]].map(([a, o]) => <path key={a} d={petal} transform={`rotate(${a})`} fill="#fff" fillOpacity={o} />)}
        <path d={petal} transform="scale(.55) translate(0 6)" fill="#f7a6bd" fillOpacity=".5" stroke="none" />
      </g>
      <g fill="none" stroke="#fff" strokeWidth="1" opacity=".55">
        <ellipse cx="200" cy="392" rx="110" ry="12" /><ellipse cx="200" cy="392" rx="160" ry="18" /><ellipse cx="200" cy="392" rx="210" ry="24" />
      </g>
    </svg>
  )
}
