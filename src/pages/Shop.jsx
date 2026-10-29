import { useState } from 'react'
import { PRODUCTS } from '../data.js'
import { PageHead, CategoryCards, ProductGrid } from '../components.jsx'

const budgets = [['All prices', 0, Infinity], ['Under ₹2,500', 0, 2500], ['₹2,500 – ₹5,000', 2500, 5000], ['Above ₹5,000', 5000, Infinity]]

export default function Shop() {
  const [b, setB] = useState(0)
  const [, lo, hi] = budgets[b]
  const items = PRODUCTS.filter(p => p.p >= lo && p.p < hi || (b === 0))
  return (
    <>
      <PageHead crumbs={[['Home', '/'], ['Shop']]} eyebrow="Shop our collection" title="Shop Our Collection" text="Celebrate, gift, decorate, cherish — a little more meaning in every purchase." />
      <section className="occ occ-flat"><CategoryCards /></section>
      <section className="coll">
        <div className="coll-head">
          <div><small className="eyebrow l">All products</small><h2>Browse by budget</h2></div>
          <div className="tabs">{budgets.map(([l], i) => <button key={l} className={i === b ? 'on' : ''} onClick={() => setB(i)}>{l}</button>)}</div>
        </div>
        <ProductGrid items={items} />
      </section>
    </>
  )
}
