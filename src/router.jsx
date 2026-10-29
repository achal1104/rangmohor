// Tiny dependency-free router (hash based: /#/about, /#/shop/home-decor).
// Hash URLs work on any static host (Netlify, GitHub Pages, cPanel...) without extra server config.
import { useEffect, useState } from 'react'

const readPath = () => {
  const p = (window.location.hash.replace(/^#/, '') || '/').split('?')[0]
  return p.length > 1 ? p.replace(/\/+$/, '') : '/'
}

export function usePath() {
  const [path, setPath] = useState(readPath)
  useEffect(() => {
    const onChange = () => { setPath(readPath()); window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return path
}

export function Link({ to, children, ...rest }) {
  return <a href={'#' + to} {...rest}>{children}</a>
}
