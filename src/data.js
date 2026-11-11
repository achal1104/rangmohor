// ---------- Store data ----------
// Categories, products, images and contact details now come from the admin panel (Spring Boot backend).
// This file keeps the shape the pages already use, and fills it by calling loadCatalog() once on start-up.
import * as I from './images.js'
import { API_URL } from './config.js'

export const HERO = 'images/hero'
export const HERO_REMOTE = I.HERO            // gift boxes with gold ribbon

const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`

// ---------- Store details (admin → Settings overrides these when filled in) ----------
export const STORE = {
  address: 'Rang Mohor, Trilok House, 61 Shukrawar Peth, Raja Ram Mohan Roy Marg, Satara -415002',
  phone: '75883 78883',
  phoneHref: 'tel:+917588378883',
  whatsapp: 'https://wa.me/917588378883',
  email: 'rangmohor25@gmail.com',
}
const DEFAULT_STORE = { ...STORE }

// ---------- The 4 website categories (fixed) ----------
// Look of each category (colours / illustration / stock photo used until a cover image is uploaded in the admin).
const LOOK = {
  'wedding-essentials': { e: '💍', c: '#f0c27b,#c8872f', art: 'kalash', stock: I.DIYA },
  'home-decor': { e: '🏺', c: '#e9d5b8,#b98a4e', art: 'elephant', stock: I.GOLD_FIGURINE },
  'handcrafted-bags': { e: '👜', c: '#e8b4a0,#b5523b', art: 'potli', stock: U('1777283316185-9eff9eac098c') },
  'gifting': { e: '🎁', c: '#f3e6cf,#cfae7e', art: 'giftbox', stock: I.GIFT_BOXES },
}
const ORDER = ['wedding-essentials', 'home-decor', 'handcrafted-bags', 'gifting']

const FALLBACK = [
  { slug: 'wedding-essentials', title: 'Wedding Essentials', tagline: 'Beautiful details for beautiful celebrations.' },
  { slug: 'home-decor', title: 'Home Decor', tagline: 'Add warmth, colour and character to your space.' },
  { slug: 'handcrafted-bags', title: 'Handcrafted Bags', tagline: 'Unique designs made for everyday style.' },
  { slug: 'gifting', title: 'Gifting', tagline: 'Gifts that feel personal, meaningful.' },
]

const makeCategory = ({ slug, title, tagline, image, id }) => {
  const look = LOOK[slug] || LOOK.gifting
  return {
    id, slug, title, tagline,
    e: look.e, c: look.c, art: look.art,
    // admin cover image first, then your own file in public/images/categories/, then a stock photo
    img: image ? null : 'images/categories/' + slug,
    remote: [image, look.stock].filter(Boolean),
  }
}

// These arrays are filled in place by loadCatalog(), so every page that imports them sees the live data.
export const CATEGORIES = FALLBACK.map(makeCategory)
export const PRODUCTS = []


const toProduct = p => {
  const look = LOOK[p.categorySlug] || LOOK.gifting
  const price = Number(p.discountPrice) > 0 ? Number(p.discountPrice) : Number(p.price)
  const mrp = Number(p.discountPrice) > 0 ? Number(p.price) : 0
  const off = mrp > price ? Math.round((1 - price / mrp) * 100) : 0
  const urls = (p.images || []).map(i => i.url).filter(Boolean)
  return {
    id: p.id,
    n: p.name,
    d: p.description || '',
    p: price,
    mrp,
    st: off ? '-' + off + '%' : '',
    tag: !p.inStock ? 'Sold out' : (p.tags && p.tags[0]) ? p.tags[0] : (off ? 'Sale' : 'New'),
    inStock: p.inStock !== false,
    cat: p.categorySlug,
    best: !!p.featured,
    order: p.featuredOrder || 0,
    e: look.e, c: look.c, art: look.art,
    img: null,
    remote: urls[0] || null,
    alt: urls[1] || null,
  }
}

/** Loads categories, products and contact details from the backend. Resolves true when data was loaded. */
export async function loadCatalog() {
  try {
    const res = await fetch(`${API_URL}/api/public/catalog`, { cache: 'no-store' })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const data = await res.json()

    const cats = (data.categories || [])
      .filter(c => ORDER.includes(c.slug))                       // only the 4 official categories
      .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug))
      .map(c => makeCategory({ id: c.id, slug: c.slug, title: c.name, tagline: c.description || '', image: c.image }))
    CATEGORIES.splice(0, CATEGORIES.length, ...cats)

    const visible = new Set(cats.map(c => c.slug))
    PRODUCTS.splice(0, PRODUCTS.length, ...(data.products || []).map(toProduct).filter(p => visible.has(p.cat)))

    const s = data.settings || {}
    STORE.phone = s.phone || DEFAULT_STORE.phone
    STORE.email = s.email || DEFAULT_STORE.email
    STORE.address = s.address || DEFAULT_STORE.address
    const digits = (STORE.phone || '').replace(/\D/g, '')
    if (digits.length >= 10) {
      const intl = digits.length === 10 ? '91' + digits : digits
      STORE.phoneHref = 'tel:+' + intl
      STORE.whatsapp = 'https://wa.me/' + intl
    }
    return true
  } catch (err) {
    console.warn('Rang Mohor: could not load products from the server', err)
    return false
  }
}

export const catBySlug = slug => CATEGORIES.find(c => c.slug === slug)
export const productsFor = slug => PRODUCTS.filter(p => p.cat === slug)
export const featuredProducts = () => PRODUCTS.filter(p => p.best).sort((a, b) => a.order - b.order)
export const inr = n => '₹' + Number(n).toLocaleString('en-IN')
