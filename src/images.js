// Unsplash image slots. Change a URL here and it updates everywhere on the site.
// How: open a photo on unsplash.com > right-click the image > "Copy image address" > paste below.
// Your own photos in public/images/ always win over these (see public/images/README.txt).
const img = id => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`

export const GIFT_BOXES = img('1764650909534-ebe7b1206466')    // gift boxes with gold ribbon
export const NUTS_BOWL = img('1642337241968-48094a7709ea')     // bowl of almonds
export const CASHEWS = img('1579282940319-c483172dd0f2')       // cashew nuts
export const BRASS_HOLDER = img('1761295908436-89f850764209')  // decorative brass candle holder / diya
export const DIYA = img('1572798089532-487718bc9d26')          // lighted diya lamps
export const DIYA_PLATTER = img('1760630004439-18b3bbd826be')  // many lit diyas on a platter (thali)
export const CANDLE = img('1574266742257-41460b7992ee')        // lit scented candle
export const CANDLE_JAR = img('1596568840418-5f4db2029de0')    // candle in glass jar
export const CANDLE_BOX = img('1720788810305-85fe22e6c3a2')    // box of candles with flowers (gift box)
export const GOLD_FIGURINE = img('1630567397049-39d9a45d3d4a') // white & gold figurine (home decor)
export const GOLD_ELEPHANT = img('1567878673047-0451c851056e') // gold Ganesha figurine

export const HERO = GIFT_BOXES
