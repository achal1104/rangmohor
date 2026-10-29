import { useShop, PageHead, Img } from '../components.jsx'
import { Link } from '../router.jsx'
import Art from '../art.jsx'
import { STORE, inr } from '../data.js'
import '../cart.css'

export default function Cart() {
  const { items, count, total, inc, dec, remove, clear } = useShop()

  const orderText = () => {
    const lines = items.map(i => `• ${i.n} x ${i.qty} = ${inr(i.price * i.qty)}`)
    return `Hello RangMohor, I would like to order:\n${lines.join('\n')}\n\nTotal: ${inr(total)}`
  }

  return (
    <>
      <PageHead
        eyebrow="Your cart"
        title="Shopping Cart"
        text={count ? `${count} item${count > 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
        crumbs={[['Home', '/'], ['Cart']]}
      />
      <section className="cart-wrap">
        {!items.length ? (
          <div className="cart-empty">
            <span>👜</span>
            <h3>Your cart is empty</h3>
            <p>Add something you love from our collection.</p>
            <Link className="btn gold" to="/shop">Continue shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-list">
              {items.map(i => {
                const [c1, c2] = (i.prod?.c || '#f3e6cf,#cfae7e').split(',')
                return (
                  <article className="cart-item" key={i.n}>
                    <div className="cart-img" style={{ background: `linear-gradient(145deg,${c1},${c2})` }}>
                      <Art kind={i.prod?.art || 'hamper'} />
                      {i.prod && <Img src={i.prod.img} remote={i.prod.remote} />}
                    </div>
                    <div className="cart-info">
                      <h3>{i.n}</h3>
                      {i.prod && <small>{i.prod.cat.replace(/-/g, ' ')}</small>}
                      <b>{inr(i.price)}</b>
                      <div className="qty">
                        <button aria-label="Decrease" onClick={() => dec(i.n)}>−</button>
                        <span>{i.qty}</span>
                        <button aria-label="Increase" onClick={() => inc(i.n)}>+</button>
                      </div>
                    </div>
                    <div className="cart-line">
                      <b>{inr(i.price * i.qty)}</b>
                      <button className="rm" onClick={() => remove(i.n)}>Remove</button>
                    </div>
                  </article>
                )
              })}
              <button className="cart-clear" onClick={clear}>Clear cart</button>
            </div>

            <aside className="cart-sum">
              <h3>Order summary</h3>
              <div className="row"><span>Items ({count})</span><span>{inr(total)}</span></div>
              <div className="row"><span>Delivery</span><span>Confirmed on order</span></div>
              <div className="row tot"><span>Total</span><span>{inr(total)}</span></div>
              <a className="btn gold" target="_blank" rel="noreferrer"
                href={`${STORE.whatsapp}?text=${encodeURIComponent(orderText())}`}>Order on WhatsApp</a>
              <a className="btn white" href={STORE.phoneHref}>Call {STORE.phone}</a>
              <Link className="cart-more" to="/shop">← Continue shopping</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}