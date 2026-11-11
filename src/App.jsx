import { useEffect, useRef, useState } from 'react'
import { usePath } from './router.jsx'
import { Header, Footer, ShopCtx } from './components.jsx'
import { catBySlug, PRODUCTS, loadCatalog } from './data.js'
import { Preloader, ScrollFx, Toast, useRevealAll } from './fx.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Shop from './pages/Shop.jsx'
import Category from './pages/Category.jsx'
import Store from './pages/Store.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'

const CART_KEY = 'Rang Mohor-cart'

// cart item shape: { n: 'Product name', qty: 2, p?: customPrice }
const loadCart = () => {
  try {
    const a = JSON.parse(localStorage.getItem(CART_KEY))
    return Array.isArray(a) ? a.filter(i => i && i.n && i.qty > 0) : []
  } catch { return [] }
}

function resolve(path) {
  const [a, b] = path.split('/').filter(Boolean)
  if (!a) return { el: <Home />, title: 'Rang Mohor | Handcrafted gifts, wedding products & home decor' }
  if (a === 'about') return { el: <About />, title: 'About | Rang Mohor' }
  if (a === 'store' || a === 'contact') return { el: <Store />, title: 'Our Store | Rang Mohor' }
  if (a === 'cart') return { el: <Cart />, title: 'Your Cart | Rang Mohor' }
  if (a === 'shop' && !b) return { el: <Shop />, title: 'Shop Our Collection | Rang Mohor' }
  if (a === 'shop' && catBySlug(b)) return { el: <Category slug={b} />, title: catBySlug(b).title + ' | Rang Mohor' }
  return { el: <NotFound />, title: 'Page not found | Rang Mohor' }
}

export default function App() {
  const path = usePath()
  const [bag, setBag] = useState(loadCart)
  const [liked, setLiked] = useState({})
  const [toast, setToast] = useState('')
  const tt = useRef()

  // products / categories / contact details come from the admin panel (Spring Boot backend)
  const [catalog, setCatalog] = useState({ v: 0, ready: false })
  useEffect(() => {
    let alive = true, last = 0
    const refresh = () => {
      last = Date.now()
      loadCatalog().then(ok => { if (alive) setCatalog(c => ({ v: c.v + 1, ready: c.ready || ok, tried: true })) })
    }
    refresh()
    // pick up new products when the visitor comes back to the tab
    const onVis = () => { if (document.visibilityState === 'visible' && Date.now() - last > 30000) refresh() }
    document.addEventListener('visibilitychange', onVis)
    return () => { alive = false; document.removeEventListener('visibilitychange', onVis) }
  }, [])

  // keep cart saved, so it stays after refresh
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(bag)) } catch { /* ignore */ }
  }, [bag])

  const showToast = msg => {
    setToast(msg)
    clearTimeout(tt.current)
    tt.current = setTimeout(() => setToast(''), 2400)
  }

  // bag items with price + product details attached (items whose product was removed in the admin are hidden)
  const items = bag
    .map(i => {
      const prod = PRODUCTS.find(p => p.n === i.n)
      return { ...i, prod, price: prod?.p ?? i.p ?? 0 }
    })
    .filter(i => !catalog.ready || i.prod || i.p != null)

  const ctx = {
    bag,
    items,
    loading: !catalog.tried,
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.price * i.qty, 0),
    add: (n, extra) => {
      setBag(b => b.some(i => i.n === n)
        ? b.map(i => (i.n === n ? { ...i, qty: i.qty + 1 } : i))
        : [...b, { n, qty: 1, ...extra }])
      showToast(n + ' added to your cart')
    },
    inc: n => setBag(b => b.map(i => (i.n === n ? { ...i, qty: i.qty + 1 } : i))),
    dec: n => setBag(b => b.map(i => (i.n === n ? { ...i, qty: i.qty - 1 } : i)).filter(i => i.qty > 0)),
    remove: n => setBag(b => b.filter(i => i.n !== n)),
    clear: () => setBag([]),
    liked,
    toggleLike: n => setLiked(l => ({ ...l, [n]: !l[n] })),
    likedCount: Object.values(liked).filter(Boolean).length,
  }

  const { el, title } = resolve(path)
  useEffect(() => { document.title = title }, [title])
  useRevealAll(path + ':' + catalog.v)
  return (
    <ShopCtx.Provider value={ctx}>
      <Preloader />
      <ScrollFx />
      <Toast msg={toast} />
      <Header path={path} />
      <main key={path}>{el}</main>
      <Footer />
    </ShopCtx.Provider>
  )
}