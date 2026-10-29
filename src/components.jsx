import { createContext, useContext, useEffect, useState } from 'react'
import { Link } from './router.jsx'
import Art from './art.jsx'
import { CATEGORIES, STORE, HERO, HERO_REMOTE, inr } from './data.js'

// ---------- shared bag / wishlist state ----------
export const ShopCtx = createContext(null)
export const useShop = () => useContext(ShopCtx)

// Order: your own file (public/images/..jpg/.png/.webp) -> stock photo URL -> illustration underneath.
const EXTS = ['jpg', 'jpeg', 'png', 'webp']
export function Img({ src, remote }) {
  const list = [...(src ? EXTS.map(e => `${src}.${e}`) : []), ...(remote ? [remote] : [])]
  const [i, setI] = useState(0)
  useEffect(() => setI(0), [src, remote])
  if (i >= list.length) return null
  return <img className="ph" src={list[i]} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setI(n => n + 1)} />
}

// ---------- Logo (inline SVG, same on every device — no emoji) ----------
export function LogoMark({ size = 40 }) {
  const petal = 'M24 9 C29.5 15 29.5 23 24 31 C18.5 23 18.5 15 24 9Z'
  return (
    <svg className="logo-svg" width={size} height={size} viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="22.5" fill="#fffaf8" stroke="#d94573" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.6" fill="none" stroke="#ea7a96" strokeWidth=".7" strokeDasharray="1.2 2.2" />
      <g fill="#d94573">
        <path d={petal} transform="rotate(-58 24 32)" opacity=".55" />
        <path d={petal} transform="rotate(58 24 32)" opacity=".55" />
        <path d={petal} transform="rotate(-29 24 32)" opacity=".8" />
        <path d={petal} transform="rotate(29 24 32)" opacity=".8" />
        <path d={petal} />
      </g>
      <path d="M13.5 35.5 Q24 41 34.5 35.5" fill="none" stroke="#7d1d42" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="RangMohor – home">
      <img className="logo-img" src="logo.png" alt="RangMohor" width="465" height="216" />
    </Link>
  )
}

// ---------- Header / navigation ----------
export function Header({ path }) {
  const { bag, likedCount } = useShop()
  const [menu, setMenu] = useState(false)
  useEffect(() => setMenu(false), [path])
  const on = (p) => (p === '/' ? path === '/' : path === p || path.startsWith(p + '/')) ? 'on' : ''
  return (
    <>
      <div className="topbar">Handcrafted with tradition. Chosen with love. Call or WhatsApp {STORE.phone}</div>
      <header className="nav">
        <Logo />
        <button className={'burger' + (menu ? ' open' : '')} aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(m => !m)}><span /><span /><span /></button>
        <nav className={menu ? 'open' : ''} aria-label="Main">
          <Link to="/" className={on('/')}>Home</Link>
          <div className="has-sub">
            <Link to="/shop" className={on('/shop')}>Shop <i className="caret" aria-hidden="true">▾</i></Link>
            <div className="drop">
              {CATEGORIES.map(c => <Link key={c.slug} to={'/shop/' + c.slug} className={path === '/shop/' + c.slug ? 'on' : ''}>{c.title}</Link>)}
            </div>
          </div>
          <Link to="/about" className={on('/about')}>About</Link>
          <Link to="/store" className={on('/store')}>Contact</Link>
          <div className="nav-cta"><a className="btn gold" href={STORE.phoneHref}>Call us</a><a className="btn white" href={STORE.whatsapp}>WhatsApp</a></div>
        </nav>
        <div className="nav-r">
          <span key={'w' + likedCount} className="icon bump" title="Wishlist">♡{likedCount > 0 && <b>{likedCount}</b>}</span>
          <span key={'b' + bag.length} className="icon bag bump" title="Bag">👜{bag.length > 0 && <b>{bag.length}</b>}</span>
        </div>
      </header>
    </>
  )
}

// ---------- Footer ----------
export function Footer() {
  return (
    <footer>
      <div className="f-top">
        <div className="f-brand">
          <Logo />
          <p>Thoughtfully created handcrafted products — Indian wedding essentials, fashion accessories, home decor and unique gifts.</p>
          <small>Join our newsletter</small>
          <div className="sub-row"><input placeholder="Enter your email" aria-label="Email" /><button className="btn gold sm">Subscribe</button></div>
        </div>
        <div><h4>Shop</h4>{CATEGORIES.map(c => <Link key={c.slug} to={'/shop/' + c.slug}>{c.title}</Link>)}</div>
        <div><h4>RangMohor</h4><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/store">Our Store</Link></div>
        <div><h4>Contact</h4><p className="sm">Call / WhatsApp<br /><a href={STORE.phoneHref}>{STORE.phone}</a><br /><a href={'mailto:' + STORE.email}>{STORE.email}</a></p><small>{STORE.address}</small></div>
      </div>
      <div className="f-bot"><span>© {new Date().getFullYear()} RangMohor. All rights reserved.</span><span>Made with tradition. Chosen with love.</span></div>
    </footer>
  )
}

// ---------- Building blocks ----------
export function PageHead({ eyebrow, title, text, crumbs }) {
  return (
    <section className="page-head">
      {crumbs && <nav className="crumbs" aria-label="Breadcrumb">{crumbs.map(([l, to], i) => to ? <span key={l}><Link to={to}>{l}</Link> / </span> : <span key={l}>{l}</span>)}</nav>}
      {eyebrow && <small className="eyebrow">{eyebrow}</small>}
      <h1>{title}</h1>
      {text && <p className="sub">{text}</p>}
    </section>
  )
}

export function CategoryCards({ limit }) {
  return (
    <div className="occ-grid">{CATEGORIES.slice(0, limit).map(c => (
      <Link key={c.slug} to={'/shop/' + c.slug} className="occ-card">
        <div className="occ-img" style={{ background: `linear-gradient(135deg,${c.c.split(',')[0]},${c.c.split(',')[1]})` }}><Art kind={c.art} /><Img src={c.img} remote={c.remote} /></div>
        <div className="occ-body"><small>Collection</small><h3>{c.title}</h3><p>{c.tagline}</p><span className="more">Shop now →</span></div>
      </Link>))}
    </div>
  )
}

export function ProductGrid({ items }) {
  const { add, liked, toggleLike } = useShop()
  if (!items.length) return <p className="empty">New pieces are coming soon.</p>
  return (
    <div className="grid">{items.map(p => (
      <article className="card" key={p.n}>
        <div className="card-img" style={{ background: `linear-gradient(145deg,${p.c.split(',')[0]},${p.c.split(',')[1]})` }}>
          <span className="tag">{p.tag}</span>
          <button className={'heart' + (liked[p.n] ? ' on' : '')} aria-label="Wishlist" onClick={() => toggleLike(p.n)}>{liked[p.n] ? '♥' : '♡'}</button>
          <Art kind={p.art} /><Img src={p.img} remote={p.remote} />
        </div>
        <div className="meta"><span>{p.cat.replace(/-/g, ' ')}</span><span>{p.st}</span></div>
        <h3>{p.n}</h3><p>{p.d}</p>
        <div className="buy"><b>{inr(p.p)} <s className="mrp">{inr(Math.round(p.p / (1 - parseInt(p.st.slice(1)) / 100)))}</s></b><button className="btn gold sm" onClick={() => add(p.n)}>👜 Add to Bag</button></div>
      </article>))}
    </div>
  )
}

export function ExploreBanner() {
  return (
    <section className="explore"><Img src={HERO} remote={HERO_REMOTE} />
      <div className="ex-in">
        <h2>Celebrate · Gift · Decorate · Cherish</h2>
        <p>A little more meaning in every purchase. At RangMohor, we want shopping to feel personal. Whether you are preparing for a celebration, refreshing your home, searching for the perfect gift or simply treating yourself — we hope you find something that speaks to you.</p>
        <Link className="btn gold" to="/shop">Explore RangMohor</Link>
      </div>
    </section>
  )
}

export function CallBox() {
  return (
    <section className="consult"><div className="consult-box">
      <div><small className="eyebrow l">Custom orders</small><h2>Planning a wedding or special occasion?</h2>
        <p>Call or message us for wedding gifting, return gifts and custom handcrafted pieces made just for you.</p>
        <div className="btns"><a className="btn brown" href={STORE.phoneHref}>Call Us Now</a><a className="btn white" href={STORE.whatsapp}>WhatsApp us</a><span className="phone">📞 {STORE.phone}</span></div></div>
      <div className="mini">{[['💍', 'Wedding gifting'], ['🎁', 'Return gifts'], ['✨', 'Custom handcrafted pieces'], ['🏠', 'Home & kitchen']].map(([i, t]) => <div key={t}><span>{i}</span><b>{t}</b></div>)}</div>
    </div></section>
  )
}

// Gift hamper designer (shown on the Gifting page)
export function Studio() {
  const { add } = useShop()
  const ribbons = { 'Champagne Gold': '#b98f3f', 'Ivory Silk': '#efe6d6', 'Palace Sage': '#9bab8c' }
  const [ribbon, setRibbon] = useState('Champagne Gold')
  const [mono, setMono] = useState('R & M')
  const [note, setNote] = useState('With the divine blessings of our elders, welcoming you to share the auspicious union of Ananya & Devraj.')
  return (
    <section className="design">
      <div className="panel">
        <small className="eyebrow l">✎ Make it personal</small>
        <h2>Design Your Gift Hamper</h2>
        <p className="sub l">Customize ribbons, golden foil typography, and ceremony notes for a gift that feels personal and meaningful.</p>
        <label>1. Select handcrafted ribbon tone</label>
        <div className="chips">{Object.keys(ribbons).map(r => <button key={r} className={r === ribbon ? 'on' : ''} onClick={() => setRibbon(r)}>{r}</button>)}</div>
        <label>2. Foil engraved couple monogram (2 initials)</label>
        <div className="mono-row"><input maxLength={5} value={mono} onChange={e => setMono(e.target.value.toUpperCase())} /><span>Hot-stamped in gold foil</span></div>
        <label>3. Wedding card dedication</label>
        <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} />
        <div className="panel-foot"><div><small>Delivery</small><br /><strong>3–4 Days</strong></div><button className="btn brown" onClick={() => add('Custom Gift Hamper')}>Add Custom Hamper • ₹16,500</button></div>
      </div>
      <div className="preview">
        <div className="gift" style={{ '--rb': ribbons[ribbon] }}><div className="rv" /><div className="rh" /><div className="seal"><span>👑</span><b>{mono || 'R & M'}</b></div></div>
        <div className="insert"><small>Parchment insert</small><p>“{note}”</p><small className="ft">Hand-assembled with care</small></div>
      </div>
    </section>
  )
}
