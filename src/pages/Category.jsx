import { Link } from '../router.jsx'
import { CATEGORIES, catBySlug, productsFor } from '../data.js'
import { PageHead, ProductGrid, Studio, ExploreBanner } from '../components.jsx'
import NotFound from './NotFound.jsx'

export default function Category({ slug }) {
  const cat = catBySlug(slug)
  if (!cat) return <NotFound />
  return (
    <>
      <PageHead crumbs={[['Home', '/'], ['Shop', '/shop'], [cat.title]]} eyebrow="Collection" title={cat.title} text={cat.tagline} />
      <section className="coll cat-tabs">
        <div className="tabs">{CATEGORIES.map(c => <Link key={c.slug} to={'/shop/' + c.slug} className={c.slug === slug ? 'tab on' : 'tab'}>{c.title}</Link>)}</div>
      </section>
      <section className="coll"><ProductGrid items={productsFor(slug)} /></section>
      {slug === 'gifting' && <Studio />}
      <ExploreBanner />
    </>
  )
}
