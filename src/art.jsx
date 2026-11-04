// Hand-built vector illustrations used until real product photos are added to public/images/.
// A real photo (public/images/products/<name>.jpg) automatically covers the illustration.
import { useId } from 'react'

// [backdrop from, backdrop to] — each product gets a palette that makes its object pop
const PAL = {
  thali: ['#5e1233', '#a02a57'], kalash: ['#fff2e0', '#f5d3a2'], returnset: ['#fde6ec', '#f4b6c8'],
  potli: ['#fff4e8', '#f3d5b8'], tote: ['#e8efe3', '#c3d4bb'], elephant: ['#4d1230', '#8a2852'],
  candle: ['#fcf2e8', '#efd7c0'], bowls: ['#f1e3f0', '#d6b5d3'], teacups: ['#ffe8dc', '#f5bfa6'],
  hamper: ['#fde6ec', '#f0aabf'], giftbox: ['#ecc3cc', '#c97a8d'], nuts: ['#fff2d9', '#efcb88'],
  lotus: ['#7d1d42', '#d94573'], hero: ['#f6b8c8', '#c2456f'],
}

const Bow = ({ x, y, s = 1, c }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 C-34 -34 -52 -4 -14 6Z" fill={c} /><path d="M0 0 C34 -34 52 -4 14 6Z" fill={c} />
    <path d="M0 0 C-22 20 -30 34 -22 40 L-6 6Z" fill={c} opacity=".85" /><path d="M0 0 C22 20 30 34 22 40 L6 6Z" fill={c} opacity=".85" />
    <circle r="6" fill={c} /><circle r="6" fill="#000" opacity=".12" />
  </g>
)
const Box = ({ x, y, w, h, body, rib, bow = true, bs = 1 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={body} />
    <rect x={x - 5} y={y - 12} width={w + 10} height="16" rx="4" fill={body} /><rect x={x - 5} y={y - 12} width={w + 10} height="16" rx="4" fill="#000" opacity=".07" />
    <rect x={x + w / 2 - 7} y={y - 12} width="14" height={h + 12} fill={rib} />
    <rect x={x - 5} y={y - 6} width={w + 10} height="4" fill={rib} opacity=".0" />
    {bow && <Bow x={x + w / 2} y={y - 12} s={bs} c={rib} />}
  </g>
)
const Lotus = ({ x, y, s = 1, light = false }) => {
  const petal = 'M0 -60 C16 -38 16 -14 0 6 C-16 -14 -16 -38 0 -60Z'
  const f = light ? '#fff' : '#f7a6bd'
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-72, 72].map(a => <path key={a} d={petal} transform={`rotate(${a})`} fill={f} opacity=".7" />)}
      {[-40, 40].map(a => <path key={a} d={petal} transform={`rotate(${a})`} fill={f} opacity=".88" />)}
      <path d={petal} fill={f} /><path d={petal} fill="#fff" opacity=".35" transform="scale(.55) translate(0 6)" />
      <path d="M-46 14 Q0 38 46 14" fill="none" stroke={f} strokeWidth="5" strokeLinecap="round" opacity=".9" />
    </g>
  )
}
const Flame = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -26 C-10 -12 -9 -2 0 2 C9 -2 10 -12 0 -26Z" fill="#ffb938" /><path d="M0 -14 C-5 -7 -4 -1 0 1 C4 -1 5 -7 0 -14Z" fill="#fff3b0" />
  </g>
)

const SCENES = {
  thali: g => (<>
    <ellipse cx="200" cy="222" rx="146" ry="32" fill={g('silver')} /><ellipse cx="200" cy="214" rx="132" ry="26" fill="#eceef4" />
    <ellipse cx="200" cy="213" rx="112" ry="20" fill={g('silver')} stroke="#c3c7d3" strokeWidth="1.5" />
    {Array.from({ length: 24 }).map((_, i) => <circle key={i} cx={200 + 122 * Math.cos(i / 24 * 6.283)} cy={214 + 23 * Math.sin(i / 24 * 6.283)} r="2.2" fill="#fff" opacity=".9" />)}
    <path d="M128 206 Q150 232 172 206Z" fill={g('gold')} /><ellipse cx="150" cy="206" rx="22" ry="5" fill="#a87420" opacity=".5" /><Flame x="150" y="202" s="1.3" />
    <ellipse cx="206" cy="212" rx="22" ry="7" fill="#fffdf6" /><ellipse cx="206" cy="209" rx="14" ry="5" fill="#d3223f" />
    <path d="M238 214 C230 196 233 180 246 176 H258 C271 180 274 196 266 214Z" fill={g('gold')} /><rect x="244" y="166" width="16" height="12" fill={g('gold')} /><ellipse cx="252" cy="165" rx="12" ry="4" fill="#e9c26a" />
    {[-14, 0, 14].map((d, i) => <ellipse key={i} cx={252 + d} cy={158 - Math.abs(d) / 4} rx="5" ry="13" fill="#4f8a4a" transform={`rotate(${d * 2.2} ${252 + d} 166)`} />)}
    <circle cx="252" cy="152" r="9" fill="#8a5a2b" />
    {[[176, 222], [184, 226], [168, 227], [192, 221], [160, 222]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6.5" fill={['#f6a21b', '#ff7a1a', '#f6a21b', '#ffb43a', '#ff7a1a'][i]} />)}
  </>),
  kalash: g => (<>
    <path d="M148 238 C126 196 138 158 168 148 H232 C262 158 274 196 252 238Z" fill={g('gold')} />
    <path d="M144 214 Q200 236 256 214 L252 238 H148Z" fill="#000" opacity=".07" />
    <path d="M137 190 Q200 214 263 190" fill="none" stroke="#a52a58" strokeWidth="9" /><path d="M137 190 Q200 214 263 190" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" />
    <rect x="174" y="124" width="52" height="26" fill={g('gold')} /><ellipse cx="200" cy="124" rx="34" ry="8" fill="#e9c26a" /><ellipse cx="200" cy="124" rx="25" ry="5" fill="#8a5a1f" />
    {[-52, -26, 0, 26, 52].map((a, i) => <path key={i} d="M0 0 C-14 -14 -12 -44 0 -64 C12 -44 14 -14 0 0Z" fill={['#3f7a42', '#4f8a4a', '#5a9a52', '#4f8a4a', '#3f7a42'][i]} transform={`translate(200 124) rotate(${a})`} />)}
    <circle cx="200" cy="82" r="24" fill="#7a4a24" /><circle cx="200" cy="82" r="24" fill={g('wood')} /><circle cx="192" cy="78" r="3.2" fill="#3b2412" /><circle cx="208" cy="78" r="3.2" fill="#3b2412" /><circle cx="200" cy="90" r="3.2" fill="#3b2412" />
    <circle cx="200" cy="82" r="24" fill="none" stroke="#d94573" strokeWidth="3" strokeDasharray="3 5" opacity=".0" />
  </>),
  returnset: g => (<>
    <Box x={92} y={168} w={78} h={66} body={g('berry')} rib="#f1cf84" bs={1.05} />
    <Box x={226} y={176} w={74} h={58} body="#fffaf2" rib="#d94573" bs={1} />
    <Box x={160} y={140} w={84} h={94} body={g('gold')} rib="#7d1d42" bs={1.2} />
    <g opacity=".8">{[[134, 205], [262, 210], [202, 190]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill="#fff" />)}</g>
  </>),
  potli: g => (<>
    <path d="M200 112 C150 126 112 170 124 220 C132 248 268 248 276 220 C288 170 250 126 200 112Z" fill={g('berry')} />
    <path d="M160 128 Q200 150 240 128 L236 118 Q200 134 164 118Z" fill="#7d1d42" />
    <path d="M168 120 C150 96 170 84 200 100 C230 84 250 96 232 120" fill="none" stroke="#f1cf84" strokeWidth="5" strokeLinecap="round" />
    <path d="M200 100 C196 80 186 72 178 76" fill="none" stroke="#f1cf84" strokeWidth="4" strokeLinecap="round" />
    {[[200, 192], [168, 204], [232, 204], [184, 226], [216, 226]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="0" cy="-6" rx="3.4" ry="6" fill="#f1cf84" transform={`rotate(${a})`} />)}<circle r="2.6" fill="#fff4e0" /></g>)}
    <path d="M200 192 L200 166 M168 204 L156 186 M232 204 L244 186" stroke="#f1cf84" strokeWidth="1.5" opacity=".7" />
    <g><line x1="236" y1="118" x2="262" y2="150" stroke="#f1cf84" strokeWidth="3" /><ellipse cx="264" cy="164" rx="7" ry="14" fill="#d94573" /><ellipse cx="264" cy="164" rx="3" ry="14" fill="#f1cf84" opacity=".6" /></g>
  </>),
  tote: g => (<>
    <path d="M140 124 C140 70 260 70 260 124" fill="none" stroke="#9a6f46" strokeWidth="9" strokeLinecap="round" />
    <path d="M128 126 H272 L286 244 H114Z" fill={g('ivory')} />
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x={118 + i * 28} y="126" width="10" height="118" fill={i % 2 ? '#e7a3b6' : '#d94573'} opacity=".55" transform="skewX(-2.3)" />)}
    <path d="M128 126 H272 L274 150 H126Z" fill="#000" opacity=".05" />
    <g transform="translate(200 196)"><Lotus x={0} y={14} s={.55} /></g>
    <path d="M114 244 H286" stroke="#9a6f46" strokeWidth="5" />
  </>),
  elephant: g => (<>
    {[[158, 206], [178, 212], [224, 212], [244, 206]].map(([x, y], i) => <rect key={i} x={x - 9} y={y} width="19" height={46 - (i % 3 ? 0 : 6)} rx="7" fill={g('gold')} />)}
    <ellipse cx="200" cy="184" rx="86" ry="52" fill={g('gold')} />
    <path d="M118 176 Q200 120 282 176 L276 196 Q200 150 124 196Z" fill={g('berry')} /><path d="M120 190 Q200 144 280 190" fill="none" stroke="#f6dc9a" strokeWidth="3" strokeDasharray="3 6" />
    {[134, 156, 178, 200, 222, 244, 266].map((x, i) => <circle key={i} cx={x} cy={196 - 24 * Math.sin((x - 118) / 164 * 3.14)} r="3.4" fill="#f6dc9a" />)}
    <circle cx="288" cy="150" r="42" fill={g('gold')} /><ellipse cx="262" cy="156" rx="21" ry="33" fill="#c99a3c" /><ellipse cx="262" cy="158" rx="14" ry="25" fill="#e9c26a" />
    <path d="M316 160 C334 176 332 214 316 232 C310 238 300 236 304 228 C316 212 316 190 304 180Z" fill={g('gold')} />
    <path d="M308 166 C322 160 332 172 326 182" fill="none" stroke="#fff7dd" strokeWidth="4" strokeLinecap="round" />
    <circle cx="304" cy="142" r="3.6" fill="#2c1608" /><path d="M296 118 Q288 100 300 96 Q312 100 308 118Z" fill="#d94573" /><circle cx="298" cy="108" r="3" fill="#f6dc9a" />
    <path d="M118 166 Q108 180 112 200" fill="none" stroke="#c99a3c" strokeWidth="6" strokeLinecap="round" />
  </>),
  candle: g => (<>
    {[-40, -20, 0, 20, 40].map((a, i) => <path key={i} d="M0 0 C-16 -20 -12 -62 0 -86 C12 -62 16 -20 0 0Z" fill={['#8fae86', '#a6c09c', '#7c9c73', '#a6c09c', '#8fae86'][i]} transform={`translate(${[130, 150, 170, 244, 268][i] + (i === 2 ? 0 : 0)} 232) rotate(${a})`} opacity=".9" />)}
    <rect x="148" y="132" width="104" height="104" rx="16" fill="#fff" opacity=".55" /><rect x="154" y="152" width="92" height="78" rx="12" fill={g('sage')} />
    <rect x="148" y="132" width="104" height="104" rx="16" fill="none" stroke="#fff" strokeWidth="3" opacity=".9" />
    <rect x="168" y="182" width="64" height="34" rx="4" fill="#fffaf2" /><text x="200" y="198" textAnchor="middle" fontFamily="Georgia,serif" fontSize="7.5" fill="#7d1d42" letterSpacing=".8">RANGMOHOR</text><text x="200" y="210" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" fill="#d94573" letterSpacing=".6">CITRUS · SAGE</text>
    <rect x="198" y="136" width="4" height="18" rx="2" fill="#4a3a2a" /><Flame x="200" y="140" s="1.5" />
    <rect x="150" y="126" width="100" height="10" rx="4" fill={g('gold')} />
  </>),
  bowls: g => {
    const bowl = (cx, y, w, h) => (<g key={cx}>
      <path d={`M${cx - w} ${y} H${cx + w} Q${cx + w * .86} ${y + h} ${cx} ${y + h} Q${cx - w * .86} ${y + h} ${cx - w} ${y}Z`} fill={g('gold')} />
      <ellipse cx={cx} cy={y} rx={w} ry={h * .22} fill="#e9c26a" /><ellipse cx={cx} cy={y + 1} rx={w * .88} ry={h * .17} fill="#7d1d42" />
      <path d={`M${cx - w * .7} ${y + h * .4} Q${cx} ${y + h * .62} ${cx + w * .7} ${y + h * .4}`} fill="none" stroke="#fff7dd" strokeWidth="2" opacity=".7" />
      <ellipse cx={cx} cy={y + h + 4} rx={w * .4} ry="5" fill="#a87420" /></g>)
    return (<>{bowl(120, 168, 56, 62)}{bowl(280, 168, 56, 62)}{bowl(200, 150, 70, 84)}<ellipse cx="200" cy="159" rx="52" ry="9" fill="#f6a21b" opacity=".0" />
      {[[184, 148], [200, 142], [216, 148]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="8" fill={['#f6a21b', '#d94573', '#f6a21b'][i]} />)}</>)
  },
  teacups: g => {
    const cup = (cx, y, s) => (<g transform={`translate(${cx} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="62" rx="64" ry="13" fill={g('ivory')} stroke="#e4cfae" /><ellipse cx="0" cy="58" rx="40" ry="8" fill="#ecdcc4" />
      <path d="M-46 0 H46 C46 40 26 62 0 62 C-26 62 -46 40 -46 0Z" fill={g('ivory')} /><ellipse cx="0" cy="0" rx="46" ry="10" fill="#fffdf8" /><ellipse cx="0" cy="1" rx="39" ry="7" fill="#9b5a3c" />
      <path d="M44 14 C74 10 74 46 38 44" fill="none" stroke="#fffaf2" strokeWidth="9" strokeLinecap="round" /><path d="M44 14 C74 10 74 46 38 44" fill="none" stroke="#e4cfae" strokeWidth="1.5" />
      {[-22, 0, 22].map((x, i) => <g key={i} transform={`translate(${x} ${26 + (i === 1 ? 6 : 0)})`}><circle r="6" fill="#d94573" /><circle r="2.4" fill="#f1cf84" /><ellipse cx="9" cy="3" rx="6" ry="2.6" fill="#5a9a52" transform="rotate(20 9 3)" /></g>)}
      <path d="M-38 12 Q0 22 38 12" fill="none" stroke="#f1cf84" strokeWidth="2.5" /></g>)
    return (<>{cup(138, 150, .9)}{cup(268, 168, .72)}</>)
  },
  hamper: g => (<>
    <rect x="236" y="96" width="30" height="92" rx="9" fill={g('gold')} /><rect x="244" y="80" width="14" height="22" rx="3" fill={g('gold')} /><rect x="238" y="122" width="26" height="36" rx="3" fill="#fffaf2" /><rect x="236" y="76" width="30" height="10" rx="3" fill="#7d1d42" />
    <Box x={134} y={132} w={60} h={50} body={g('berry')} rib="#f1cf84" bs={.8} />
    {[[176, 118, '#d94573'], [196, 108, '#f7a6bd'], [162, 104, '#f6dc9a']].map(([x, y, c], i) => <g key={i}><circle cx={x + 10} cy={y} r="12" fill={c} /><circle cx={x + 10} cy={y} r="4.5" fill="#fff" opacity=".6" /></g>)}
    <path d="M110 178 H290 L270 246 H130Z" fill={g('wood')} />
    {[0, 1, 2, 3].map(i => <line key={i} x1={116 + i * 5} y1={188 + i * 15} x2={284 - i * 5} y2={188 + i * 15} stroke="#e8c79a" strokeWidth="3" opacity=".7" />)}
    {[0, 1, 2, 3, 4, 5, 6].map(i => <line key={i} x1={130 + i * 24} y1="180" x2={134 + i * 21} y2="244" stroke="#5a3418" strokeWidth="2" opacity=".35" />)}
    <path d="M110 178 H290" stroke="#e8c79a" strokeWidth="9" strokeLinecap="round" />
    <Bow x={200} y={176} s={1.25} c="#d94573" />
  </>),
  giftbox: g => (<>
    <rect x="112" y="150" width="176" height="96" rx="8" fill={g('ivory')} />
    <rect x="102" y="128" width="196" height="34" rx="8" fill="#fffdf8" /><rect x="102" y="150" width="196" height="12" rx="4" fill="#000" opacity=".06" />
    <rect x="186" y="128" width="28" height="118" fill={g('gold')} /><rect x="102" y="138" width="196" height="12" fill={g('gold')} opacity=".0" />
    <Bow x={200} y={128} s={1.7} c="#c99a3c" />
    <circle cx="200" cy="190" r="17" fill={g('berry')} /><circle cx="200" cy="190" r="12" fill="none" stroke="#f6dc9a" strokeWidth="1.5" /><text x="200" y="195" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#f6dc9a">R</text>
    {[[134, 188], [150, 212], [250, 196], [268, 220], [138, 230]].map(([x, y, ], i) => <g key={i} transform={`translate(${x} ${y})`}>{[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="0" cy="-5" rx="2.8" ry="5.4" fill="#e7a3b6" transform={`rotate(${a})`} />)}<circle r="2.4" fill="#d94573" /></g>)}
  </>),
  nuts: g => (<>
    <path d="M96 176 H304 C304 232 260 258 200 258 C140 258 96 232 96 176Z" fill={g('wood')} /><ellipse cx="200" cy="176" rx="104" ry="22" fill="#c28a52" /><ellipse cx="200" cy="178" rx="92" ry="16" fill="#8a5428" />
    {Array.from({ length: 46 }).map((_, i) => { const a = i * 2.4, r = 14 + (i * 7.3 % 70); const x = 200 + r * 1.15 * Math.cos(a), y = 160 - (i % 5) * 3 + 10 * Math.sin(a) * (r / 84) - r * .1; const t = i % 4; return <ellipse key={i} cx={x} cy={y} rx={t === 2 ? 5 : 6.5} ry={t === 2 ? 5 : 4.2} fill={['#c99461', '#e9cf9b', '#9bb574', '#a46d3c'][t]} transform={`rotate(${i * 37} ${x} ${y})`} /> })}
    <path d="M96 176 Q200 206 304 176" fill="none" stroke="#e0b985" strokeWidth="3" opacity=".6" />
    <ellipse cx="108" cy="232" rx="20" ry="5" fill="#000" opacity="0" />
    <g transform="translate(302 210) rotate(-14)"><ellipse rx="22" ry="13" fill="#e9cf9b" /><path d="M-18 0 Q0 -10 18 0" fill="none" stroke="#c99461" strokeWidth="2" /></g>
  </>),
  lotus: g => (<><Lotus x={200} y={196} s={1.55} /><circle cx="200" cy="140" r="6" fill="#f6dc9a" opacity=".0" /></>),
  hero: g => (<g transform="translate(0 -18)">
    <Lotus x={110} y={236} s={1.15} light />
    <Box x={168} y={150} w={110} h={92} body="#fffaf2" rib="#c99a3c" bs={1.5} />
    <circle cx="223" cy="196" r="16" fill={g('berry')} /><text x="223" y="201" textAnchor="middle" fontFamily="Georgia,serif" fontSize="13" fill="#f6dc9a">R</text>
    <rect x="296" y="168" width="64" height="74" rx="10" fill="#fff" opacity=".55" /><rect x="301" y="188" width="54" height="48" rx="8" fill={g('gold')} /><rect x="327" y="172" width="3" height="14" fill="#4a3a2a" /><Flame x="328.5" y="176" s="1.3" />
    {[[64, 80], [342, 60], [290, 108], [60, 150]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={[3, 2.4, 2, 2.6][i]} fill="#fff" opacity=".7" />)}
  </g>),
}

export default function Art({ kind = 'lotus' }) {
  const id = useId().replace(/:/g, '')
  const [c1, c2] = PAL[kind] || PAL.lotus
  const g = n => `url(#${id}${n})`
  const Scene = SCENES[kind] || SCENES.lotus
  const grad = (n, a, b) => <linearGradient id={id + n} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
  return (
    <svg className="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        {grad('bg', c1, c2)}{grad('gold', '#f8e2a4', '#c8963a')}{grad('silver', '#fdfdff', '#aab0bf')}{grad('berry', '#cf3f73', '#7d1d42')}
        {grad('ivory', '#fffbf3', '#eddcc2')}{grad('sage', '#c4d6bb', '#86a27e')}{grad('wood', '#bd844f', '#7a4a24')}
      </defs>
      <rect width="400" height="300" fill={g('bg')} />
      <path d="M92 300 V138 A108 108 0 0 1 308 138 V300Z" fill="#fff" opacity=".14" />
      <path d="M112 300 V140 A88 88 0 0 1 288 140 V300Z" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".35" />
      <ellipse cx="200" cy="254" rx="118" ry="11" fill="#000" opacity=".16" />
      {Scene(g)}
    </svg>
  )
}
