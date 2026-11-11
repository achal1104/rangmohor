// import { STORE } from '../data.js'
// import { PageHead, CallBox } from '../components.jsx'

// export default function Store() {
//   return (
//     <>
//       <PageHead crumbs={[['Home', '/'], ['Our Store']]} eyebrow="Our store" title="Made with tradition. Chosen with love." />
//       <section className="store">
//         <div>
//           <p>We believe the best things are not mass produced — they carry a story.</p>
//           <p style={{ marginTop: 12 }}>Every piece is chosen to bring beauty, character & a personal touch into your life.</p>
//         </div>
//         <div className="addr"><h4>Store Address</h4><p>{STORE.address}</p><h4>Contact</h4><p>📞 <a href={STORE.phoneHref}>{STORE.phone}</a><br />✉️ <a href={'mailto:' + STORE.email}>{STORE.email}</a></p><a className="btn gold sm" href={STORE.whatsapp}>WhatsApp us</a></div>
//       </section>
//       <CallBox />
//     </>
//   )
// }

import { STORE } from '../data.js'
import { PageHead, CallBox } from '../components.jsx'

export default function Store() {
  return (
    <>
      <PageHead crumbs={[['Home', '/'], ['Our Store']]} eyebrow="Our store" title="Made with tradition. Chosen with love." />
      <section className="store store-photo-layout">
        <figure className="store-photo">
          <img
            src="/images/store.jpg"
            alt="Rang Mohor store – paisley feature wall with folded fabrics on shelves"
            loading="lazy"
            width="1200"
            height="1600"
          />
        </figure>

        <div className="store-text">
          <p>We believe the best things are not mass produced — they carry a story.</p>
          <p style={{ marginTop: 12 }}>Every piece is chosen to bring beauty, character & a personal touch into your life.</p>
        </div>

        <div className="addr">
          <h4>Store Address</h4>
          <p>{STORE.address}</p>
          <h4>Contact</h4>
          <p>
            📞 <a href={STORE.phoneHref}>{STORE.phone}</a>
            <br />
            ✉️ <a href={'mailto:' + STORE.email}>{STORE.email}</a>
          </p>
          <a className="btn gold sm" href={STORE.whatsapp}>WhatsApp us</a>
        </div>
      </section>
      <CallBox />
    </>
  )
}