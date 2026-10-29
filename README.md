# RangMohor – Handcrafted gifts, wedding products & home decor (React + Vite)

    npm install
    npm run dev      # local preview
    npm run build    # production build in /dist

## Pages (hash URLs, work on any static host)
- `/#/`                      Home
- `/#/shop`                  Shop – all categories + budget filter
- `/#/shop/<category>`       indian-wedding-products, handcrafted-bags, home-decor, kitchen-dining-essentials, gifting, bestsellers
- `/#/about`                 About / Why RangMohor
- `/#/store`                 Our Store + contact

## Where to edit
- `src/data.js`        store address / phone, categories, products (sample products – replace with real ones)
- `public/images/`    your real photos (see README.txt inside)
- `public/logo.png`  navbar/footer logo (transparent PNG)
- `src/components.jsx` header, footer; logo, header, footer
- `src/pages/*`        page content
- `src/router.jsx`     small built-in router (no extra package needed)
