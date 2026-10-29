// ---------- Store details (edit here, shows on Store page + footer) ----------
// Photos: put files in public/images/ — see public/images/README.txt
import * as I from './images.js'
export const HERO = 'images/hero'

// ---------- Stock photos (Unsplash, hot-linked). Your own files in public/images/ always win over these. ----------
const U = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`
const D = id => `https://unsplash.com/photos/${id}/download?force=true&w=900`
export const HERO_REMOTE = I.HERO            // gift boxes with gold ribbon
const REMOTE_PRODUCT = {
  'Silver Pooja Thali Set': I.DIYA_PLATTER,          // lit diyas on a pooja platter
  'Decorated Kalash Set': U('1790808415654-7fe3692eb993'),            // decorated pots, gold trim, marigolds
  'Wedding Return Gift Set': D('ZLTlHeKbh04'),                        // wrapped gift box
  'Embroidered Potli Bag': U('1664151101806-b5ce45e37fa1'),           // purse with flower pattern
  'Handcrafted Everyday Tote': U('1660695828417-9cc2724bf656'),       // colourful bag with handle
  'Gold Finish Elephant': I.GOLD_ELEPHANT,            // gold figurine
  'Citrus Sage Candle': I.CANDLE_JAR,              // candle in glass jar
  'Brass Serving Bowl Set': I.BRASS_HOLDER,          // brass pieces
  'Hand-painted Tea Cup Set': U('1592304502437-178c9adcf9ca'),        // floral ceramic teacup set
  'Royal Champagne Hamper': I.GIFT_BOXES,          // gift hamper
  'Ivory Floral Gift Box': I.CANDLE_BOX,           // ivory gift box with flowers
  'Premium Nuts Selection': I.NUTS_BOWL,          // bowl of almonds
}
const REMOTE_CAT = {
  'indian-wedding-products': I.DIYA,         // lit diyas
  'handcrafted-bags': U('1777283316185-9eff9eac098c'),                // handmade bags on display
  'home-decor': I.GOLD_FIGURINE,                      // white & gold figurine
  'kitchen-dining-essentials': U('1721373489867-b95a7b3fe16c'),       // blue & white tea set
  'gifting': I.GIFT_BOXES,                         // gift boxes
  'bestsellers': I.CANDLE,                     // lit candle
}
const slugify = t => t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const STORE = {
  address: 'Add your store address here',
  phone: '75883 78883',
  phoneHref: 'tel:+917588378883',
  whatsapp: 'https://wa.me/917588378883',
  email: 'Rangmohor25@gmail.com',
}

// ---------- Shop categories (from the "Shop Our Collection" notebook page) ----------
export const CATEGORIES = [
  { slug: 'indian-wedding-products', title: 'Indian Wedding Products', tagline: 'Beautiful details for beautiful celebrations.', e: '💍', c: '#f0c27b,#c8872f', img: null },
  { slug: 'handcrafted-bags', title: 'Handcrafted Bags', tagline: 'Unique designs made for everyday style.', e: '👜', c: '#e8b4a0,#b5523b', img: null },
  { slug: 'home-decor', title: 'Home Decor', tagline: 'Add warmth, colour and character to your space.', e: '🏺', c: '#e9d5b8,#b98a4e', img: null },
  { slug: 'kitchen-dining-essentials', title: 'Kitchen & Dining Essentials', tagline: 'Thoughtful pieces for everyday moments & special gatherings.', e: '🍽️', c: '#cfd8c4,#6f7f5c', img: null },
  { slug: 'gifting', title: 'Gifting', tagline: 'Gifts that feel personal, meaningful.', e: '🎁', c: '#f3e6cf,#cfae7e', img: null },
  { slug: 'bestsellers', title: 'Bestsellers', tagline: 'Discover the pieces our customers love most.', e: '⭐', c: '#d9a35a,#5a3a14', img: null },
]

// ---------- Sample products (replace names / prices / photos with your real ones) ----------
// cat = category slug · best:true also lists the product under "Bestsellers" · img = photo URL or null
export const PRODUCTS = [
  { n: 'Silver Pooja Thali Set', d: '925-silver plated thali with diya, kalash and accessories.', p: 3499, tag: 'Bestseller', cat: 'indian-wedding-products', best: true, st: '-24%', e: '🪔', c: '#efe3cf,#c9a56a', img: null },
  { n: 'Decorated Kalash Set', d: 'Hand-decorated kalash set for pooja and wedding rituals.', p: 1899, tag: 'Handcrafted', cat: 'indian-wedding-products', st: '-20%', e: '🏺', c: '#f0c27b,#c8872f', img: null },
  { n: 'Wedding Return Gift Set', d: 'Beautifully packed return gifts for your guests.', p: 899, tag: 'New', cat: 'indian-wedding-products', st: '-18%', e: '🎀', c: '#f2c9a5,#d9762b', img: null },

  { n: 'Embroidered Potli Bag', d: 'Hand-embroidered potli with a drawstring closure.', p: 1299, tag: 'Bestseller', cat: 'handcrafted-bags', best: true, st: '-22%', e: '👛', c: '#e8b4a0,#b5523b', img: null },
  { n: 'Handcrafted Everyday Tote', d: 'Roomy handmade tote with a unique design for everyday style.', p: 1799, tag: 'Handcrafted', cat: 'handcrafted-bags', st: '-25%', e: '👜', c: '#d9c3a3,#8c6a3d', img: null },

  { n: 'Gold Finish Elephant', d: 'Brass elephant with 24k gold wash finish for your home.', p: 1599, tag: 'Bestseller', cat: 'home-decor', best: true, st: '-27%', e: '🐘', c: '#4a3a14,#d9a521', img: null },
  { n: 'Citrus Sage Candle', d: 'Hand-poured soy wax candle in a reusable glass jar.', p: 1299, tag: 'Handcrafted', cat: 'home-decor', st: '-24%', e: '🕯️', c: '#cfd8c4,#6f7f5c', img: null },

  { n: 'Brass Serving Bowl Set', d: 'Set of three brass bowls for everyday meals and festive gatherings.', p: 2199, tag: 'New', cat: 'kitchen-dining-essentials', st: '-21%', e: '🥣', c: '#e9d5b8,#b98a4e', img: null },
  { n: 'Hand-painted Tea Cup Set', d: 'Colourful hand-painted cups for special gatherings.', p: 1499, tag: 'Handcrafted', cat: 'kitchen-dining-essentials', st: '-20%', e: '☕', c: '#f3e6cf,#cfae7e', img: null },

  { n: 'Royal Champagne Hamper', d: 'Champagne-toned hamper with curated festive treats and gold ribbon.', p: 4899, tag: 'Bestseller', cat: 'gifting', best: true, st: '-25%', e: '🎁', c: '#f2c9a5,#d9762b', img: null },
  { n: 'Ivory Floral Gift Box', d: 'Pressed florals and ivory linen keepsake box with wax seal.', p: 2299, tag: 'New', cat: 'gifting', st: '-23%', e: '💮', c: '#e9e6df,#b9b4a8', img: null },
  { n: 'Premium Nuts Selection', d: 'Six-cell walnut box with California almonds, pistachios and more.', p: 1899, tag: 'Gift Box', cat: 'gifting', st: '-21%', e: '🌰', c: '#f0a070,#c8541b', img: null },
]

const ART = {
  'Silver Pooja Thali Set': 'thali', 'Decorated Kalash Set': 'kalash', 'Wedding Return Gift Set': 'returnset',
  'Embroidered Potli Bag': 'potli', 'Handcrafted Everyday Tote': 'tote', 'Gold Finish Elephant': 'elephant',
  'Citrus Sage Candle': 'candle', 'Brass Serving Bowl Set': 'bowls', 'Hand-painted Tea Cup Set': 'teacups',
  'Royal Champagne Hamper': 'hamper', 'Ivory Floral Gift Box': 'giftbox', 'Premium Nuts Selection': 'nuts',
}
const CAT_ART = { 'indian-wedding-products': 'kalash', 'handcrafted-bags': 'potli', 'home-decor': 'elephant', 'kitchen-dining-essentials': 'bowls', 'gifting': 'giftbox', 'bestsellers': 'hamper' }
CATEGORIES.forEach(c => { c.art = CAT_ART[c.slug] })
PRODUCTS.forEach(p => { p.art = ART[p.n] })
CATEGORIES.forEach(c => { c.img = 'images/categories/' + c.slug; c.remote = REMOTE_CAT[c.slug] })
PRODUCTS.forEach(p => { p.img = 'images/products/' + slugify(p.n); p.remote = REMOTE_PRODUCT[p.n] })

export const catBySlug = slug => CATEGORIES.find(c => c.slug === slug)
export const productsFor = slug => slug === 'bestsellers' ? PRODUCTS.filter(p => p.best) : PRODUCTS.filter(p => p.cat === slug)
export const inr = n => '₹' + n.toLocaleString('en-IN')
