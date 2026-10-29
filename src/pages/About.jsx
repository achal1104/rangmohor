import { Link } from '../router.jsx'
import { PageHead, ExploreBanner, CallBox } from '../components.jsx'

export default function About() {
  return (
    <>
      <PageHead crumbs={[['Home', '/'], ['About']]} eyebrow="About" title="Why RangMohor" text="Made to be loved." />
      <section className="why">
        <div className="why-l">
          <p>We celebrate the skill and creativity behind handmade products.</p>
          <p>Every product is carefully created for quality, beauty & uniqueness. Made to be loved.</p>
          <p>Our products are more than things — they are pieces you can enjoy, use, gift & cherish.</p>
          <p>A place where tradition meets modern style.</p>
          <p>Discover our elegant collection of handmade products, wedding essentials & fashion accessories designed for both everyday elegance & special occasions.</p>
          <div className="btns"><Link className="btn gold" to="/shop">Shop Our Collection</Link><Link className="btn white" to="/store">Visit our store</Link></div>
        </div>
        <div className="why-r">
          <div><b>Skill & creativity</b><span>We celebrate the skill and creativity behind handmade products.</span></div>
          <div><b>Quality, beauty & uniqueness</b><span>Every product is carefully created, made to be loved.</span></div>
          <div><b>Tradition meets modern style</b><span>Handmade products, wedding essentials & fashion accessories for everyday elegance & special occasions.</span></div>
        </div>
      </section>
      <ExploreBanner />
      <CallBox />
    </>
  )
}
