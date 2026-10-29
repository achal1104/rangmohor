import { Link } from '../router.jsx'
import { PRODUCTS, HERO, HERO_REMOTE } from '../data.js'
import { Words, Marquee, HeroArt } from '../fx.jsx'
import { Img, CategoryCards, ProductGrid, ExploreBanner, CallBox } from '../components.jsx'

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-l">
          <div className="kicker"><i />Rang Mohor</div>
          <h1><Words text="Discover something truly special where every piece has" /> <span className="w" style={{ '--i': 8 }}><span><em>a story.</em></span></span></h1>
          <p>At RangMohor we offer a thoughtfully created collection of handcrafted products, from elegant fashion accessories and Indian wedding products to home decor and unique gifts. Every item is designed to make every moment special.</p>
          <div className="btns"><Link className="btn gold" to="/shop">Shop Our Collection</Link><a className="btn white" href="tel:+917588378883">📞 Call 75883 78883</a></div>
          <div className="stats"><div><b>Handmade</b><span>Skill & creativity</span></div><div><b>Wedding</b><span>Essentials & gifts</span></div><div><b>Tradition</b><span>Meets modern style</span></div></div>
        </div>
        <div className="hero-r">
          <div className="hero-frame">
            <div className="hero-img"><Img src={HERO} remote={HERO_REMOTE} /><HeroArt /></div>
          </div>
          <div className="hero-badge"><b>Handcrafted</b><span>Made with tradition</span></div>
        </div>
      </section>

      <Marquee />

      <section className="occ">
        <small className="eyebrow">Shop our collection</small>
        <h2>Beautiful pieces for every occasion</h2>
        <p className="sub">Celebrate, gift, decorate, cherish — a little more meaning in every purchase.</p>
        <CategoryCards />
      </section>

      <section className="coll">
        <div className="coll-head">
          <div><small className="eyebrow l">Bestsellers</small><h2>Pieces our customers love most</h2><p className="sub l">Discover the pieces our customers love most.</p></div>
          <Link className="btn brown" to="/shop/bestsellers">View all bestsellers</Link>
        </div>
        <ProductGrid items={PRODUCTS.filter(p => p.best).slice(0, 3)} />
      </section>

      <section className="why">
        <div className="why-l"><small className="eyebrow l">About</small><h2>Why RangMohor</h2>
          <p>We celebrate the skill and creativity behind handmade products. Every product is carefully created for quality, beauty & uniqueness. Made to be loved.</p>
          <Link className="btn gold" to="/about">Read our story</Link></div>
        <div className="why-r"><div><b>Tradition meets modern style</b><span>A place where tradition meets modern style.</span></div><div><b>Made to be cherished</b><span>Our products are more than things — they are pieces you can enjoy, use, gift & cherish.</span></div></div>
      </section>

      <ExploreBanner />
      <CallBox />
    </>
  )
}
