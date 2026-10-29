// import { useEffect, useRef, useState } from 'react'
// import { usePath } from './router.jsx'
// import { Header, Footer, ShopCtx } from './components.jsx'
// import { catBySlug } from './data.js'
// import { Preloader, ScrollFx, Toast, useRevealAll } from './fx.jsx'
// import Home from './pages/Home.jsx'
// import About from './pages/About.jsx'
// import Shop from './pages/Shop.jsx'
// import Category from './pages/Category.jsx'
// import Store from './pages/Store.jsx'
// import NotFound from './pages/NotFound.jsx'

// function resolve(path) {
//   const [a, b] = path.split('/').filter(Boolean)
//   if (!a) return { el: <Home />, title: 'RangMohor | Handcrafted gifts, wedding products & home decor' }
//   if (a === 'about') return { el: <About />, title: 'About | RangMohor' }
//   if (a === 'store' || a === 'contact') return { el: <Store />, title: 'Our Store | RangMohor' }
//   if (a === 'shop' && !b) return { el: <Shop />, title: 'Shop Our Collection | RangMohor' }
//   if (a === 'shop' && catBySlug(b)) return { el: <Category slug={b} />, title: catBySlug(b).title + ' | RangMohor' }
//   return { el: <NotFound />, title: 'Page not found | RangMohor' }
// }

// export default function App() {
//   const path = usePath()
//   const [bag, setBag] = useState([])
//   const [liked, setLiked] = useState({})
//   const [toast, setToast] = useState('')
//   const tt = useRef()
//   const ctx = {
//     bag, add: n => { setBag(b => [...b, n]); setToast(n + ' added to your bag'); clearTimeout(tt.current); tt.current = setTimeout(() => setToast(''), 2400) },
//     liked, toggleLike: n => setLiked(l => ({ ...l, [n]: !l[n] })),
//     likedCount: Object.values(liked).filter(Boolean).length,
//   }
//   const { el, title } = resolve(path)
//   useEffect(() => { document.title = title }, [title])
//   useRevealAll(path)
//   return (
//     <ShopCtx.Provider value={ctx}>
//       <Preloader />
//       <ScrollFx />
//       <Toast msg={toast} />
//       <Header path={path} />
//       <main key={path}>{el}</main>
//       <Footer />
//     </ShopCtx.Provider>
//   )
// }

import { useEffect, useRef, useState } from 'react'
import { usePath } from './router.jsx'
import { Header, Footer, ShopCtx } from './components.jsx'
import { catBySlug, PRODUCTS } from './data.js'
import { Preloader, ScrollFx, Toast, useRevealAll } from './fx.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Shop from './pages/Shop.jsx'
import Category from './pages/Category.jsx'
import Store from './pages/Store.jsx'
import Cart from './pages/Cart.jsx'
import NotFound from './pages/NotFound.jsx'

const CART_KEY = 'rangmohor-cart'

// cart item shape: { n: 'Product name', qty: 2, p?: customPrice }
const loadCart = () => {
  try {
    const a = JSON.parse(localStorage.getItem(CART_KEY))
    return Array.isArray(a) ? a.filter(i => i && i.n && i.qty > 0) : []
  } catch { return [] }
}

function resolve(path) {
  const [a, b] = path.split('/').filter(Boolean)
  if (!a) return { el: <Home />, title: 'RangMohor | Handcrafted gifts, wedding products & home decor' }
  if (a === 'about') return { el: <About />, title: 'About | RangMohor' }
  if (a === 'store' || a === 'contact') return { el: <Store />, title: 'Our Store | RangMohor' }
  if (a === 'cart') return { el: <Cart />, title: 'Your Cart | RangMohor' }
  if (a === 'shop' && !b) return { el: <Shop />, title: 'Shop Our Collection | RangMohor' }
  if (a === 'shop' && catBySlug(b)) return { el: <Category slug={b} />, title: catBySlug(b).title + ' | RangMohor' }
  return { el: <NotFound />, title: 'Page not found | RangMohor' }
}

export default function App() {
  const path = usePath()
  const [bag, setBag] = useState(loadCart)
  const [liked, setLiked] = useState({})
  const [toast, setToast] = useState('')
  const tt = useRef()

  // keep cart saved, so it stays after refresh
  useEffect(() => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(bag)) } catch { /* ignore */ }
  }, [bag])

  const showToast = msg => {
    setToast(msg)
    clearTimeout(tt.current)
    tt.current = setTimeout(() => setToast(''), 2400)
  }

  // bag items with price + product details attached
  const items = bag.map(i => {
    const prod = PRODUCTS.find(p => p.n === i.n)
    return { ...i, prod, price: i.p ?? prod?.p ?? 0 }
  })

  const ctx = {
    bag,
    items,
    count: bag.reduce((s, i) => s + i.qty, 0),
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
  useRevealAll(path)
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