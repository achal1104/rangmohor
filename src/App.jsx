import { useEffect, useRef, useState } from 'react'
import { usePath } from './router.jsx'
import { Header, Footer, ShopCtx } from './components.jsx'
import { catBySlug } from './data.js'
import { Preloader, ScrollFx, Toast, useRevealAll } from './fx.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Shop from './pages/Shop.jsx'
import Category from './pages/Category.jsx'
import Store from './pages/Store.jsx'
import NotFound from './pages/NotFound.jsx'

function resolve(path) {
  const [a, b] = path.split('/').filter(Boolean)
  if (!a) return { el: <Home />, title: 'RangMohor | Handcrafted gifts, wedding products & home decor' }
  if (a === 'about') return { el: <About />, title: 'About | RangMohor' }
  if (a === 'store' || a === 'contact') return { el: <Store />, title: 'Our Store | RangMohor' }
  if (a === 'shop' && !b) return { el: <Shop />, title: 'Shop Our Collection | RangMohor' }
  if (a === 'shop' && catBySlug(b)) return { el: <Category slug={b} />, title: catBySlug(b).title + ' | RangMohor' }
  return { el: <NotFound />, title: 'Page not found | RangMohor' }
}

export default function App() {
  const path = usePath()
  const [bag, setBag] = useState([])
  const [liked, setLiked] = useState({})
  const [toast, setToast] = useState('')
  const tt = useRef()
  const ctx = {
    bag, add: n => { setBag(b => [...b, n]); setToast(n + ' added to your bag'); clearTimeout(tt.current); tt.current = setTimeout(() => setToast(''), 2400) },
    liked, toggleLike: n => setLiked(l => ({ ...l, [n]: !l[n] })),
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
