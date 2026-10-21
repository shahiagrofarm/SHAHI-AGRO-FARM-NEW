# Shahi Agro Farm — Official Web Storefront

A modern, fast, mobile-responsive e-commerce and catalog web application built from scratch for **Shahi Agro Farm**, Bangladesh.

## Brand & Business Identity

- **Brand:** Shahi Agro Farm
- **Country:** Bangladesh
- **Currency:** Bangladeshi Taka (BDT, ৳)
- **Official Phone & WhatsApp:** `01604985164`
- **Supported Payment Methods:** Cash on Delivery (COD) across 64 districts, bKash Personal Send Money (`01604985164`), and direct WhatsApp ordering.

---

## Products Catalog (Strictly 3 Options)

1. **Shahi Grass Silage**
   - Minimum order: **20 Bales** (approx. 800 kg)
   - Maximum order per consignment: **400 Bales** (truckload)
   - Order increment: Multiples of **10**
   - Editable placeholder unit price: `৳380` / bale
   - Dedicated truck freight calculated according to destination district.

2. **Shahi Pure Cow Ghee — 200g**
   - Handcrafted traditional bilona slow-simmered cow butter in glass jar
   - Editable placeholder unit price: `৳450` / jar
   - Doorstep courier delivery across Bangladesh.

3. **Shahi Pure Cow Ghee — 900g**
   - Family value pack in heavy glass container
   - Editable placeholder unit price: `৳1,850` / jar
   - Free doorstep delivery on orders ৳3,000 and above.

*(All sheep farming and sheep meat references have been completely excluded.)*

---

## Project Structure & Architecture

```
/
├── public/
│   ├── images/              # Local product and hero photography
│   │   ├── hero_shahi_farm.jpg
│   │   ├── shahi_farm_shed.jpg
│   │   ├── shahi_grass_silage.jpg
│   │   └── shahi_pure_cow_ghee.jpg
│   ├── robots.txt           # Search crawler instructions
│   └── sitemap.xml          # Canonical XML sitemap for public routes
├── src/
│   ├── assets/images/       # Generated master image assets
│   ├── components/
│   │   ├── Navbar.tsx       # Top Bar Contract (Wordmark, links, cart CTA)
│   │   ├── Footer.tsx       # Policies, contact info, and business credentials
│   │   ├── ProductCard.tsx  # Accessible cards with tabular prices & quick add
│   │   └── ImageWithFallback.tsx # Resilient image loader with SVG backup
│   ├── context/
│   │   └── CartContext.tsx  # Persistent shopping cart state & validations
│   ├── data/
│   │   ├── config.ts        # Central business, phone & district data
│   │   └── products.ts      # Central editable catalog & prices
│   ├── pages/
│   │   ├── HomePage.tsx     # Hero, catalog, nutritional story, ordering steps
│   │   ├── ShopPage.tsx     # Filterable catalog of the 3 products
│   │   ├── ProductDetailPage.tsx # Dedicated PDP with quantity bounds & WhatsApp CTA
│   │   ├── CartPage.tsx     # Quantity steppers, delivery notes, price totals
│   │   ├── CheckoutPage.tsx # Address form, BD phone validation, bKash & COD
│   │   ├── OrderConfirmationPage.tsx # Printable order receipt & WhatsApp message
│   │   ├── AboutPage.tsx    # Silage science & cow ghee craft
│   │   ├── ContactPage.tsx  # Direct phone, WhatsApp form, farm hours
│   │   ├── PolicyPages.tsx  # Privacy, Terms & Conditions, Shipping/Returns
│   │   └── NotFoundPage.tsx # Custom 404 error page
│   ├── utils/
│   │   ├── cart-rules.ts    # Pure business rules & phone validator
│   │   └── cart-rules.test.ts # Fast-feedback unit tests via node:test
│   ├── App.tsx              # Client router and page orchestration
│   ├── index.css            # Tailwind v4 configuration & theme tokens
│   └── main.tsx             # React entry point
├── .env.example             # Documented environment variables
├── package.json
└── vite.config.ts
```

---

## Local Development & Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Fast-Feedback Unit Tests
```bash
npx tsx --test src/utils/cart-rules.test.ts
```
Verifies quantity boundary conditions, multiples of 10 for silage, price totals, and Bangladeshi phone number formats.

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to preview the application.

### 4. Build for Production
```bash
npm run build
```
Generates optimized static HTML, CSS, and JS in the `/dist` directory.

---

## Free Static Deployment (e.g. Firebase Hosting)

The application is completely decoupled from any proprietary backend and builds directly into a static `/dist` directory, making it ideal for free hosting on **Firebase Hosting**, **Vercel**, **Netlify**, or **Cloudflare Pages**.

### Deploying to Firebase Hosting

1. Install the Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. Log in to Firebase:
   ```bash
   firebase login
   ```
3. Initialize Firebase Hosting in the project root:
   ```bash
   firebase init hosting
   ```
   - **Public directory:** `dist`
   - **Configure as single-page app (rewrite all urls to /index.html):** `Yes`
   - **Set up automatic builds and deploys with GitHub:** `No` (or as preferred)
4. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
5. Firebase will provide your live hosting URL (e.g., `https://shahi-agro-farm.web.app`).

---

## Custom Domain & Search Engine Verification

### 1. Connecting a Custom Domain (e.g., `shahiagrofarm.com`)
- In Firebase Hosting console (or your DNS registrar), click **Add custom domain**.
- Follow the DNS TXT and A/CNAME record instructions provided by the host.

### 2. Updating Canonical URL & Sitemap Before Search Console Submission
1. In `public/robots.txt`:
   Replace `https://YOUR-PUBLISHED-DOMAIN.example` with your real production domain.
2. In `public/sitemap.xml`:
   Replace all occurrences of `https://YOUR-PUBLISHED-DOMAIN.example` with your live canonical domain (e.g., `https://shahiagrofarm.com`).
3. In `index.html`:
   Update the Schema.org JSON-LD image URL to point to your live domain.
4. Go to **Google Search Console** (`https://search.google.com/search-console`), add your property, verify domain ownership, and submit your sitemap URL:
   ```
   https://yourdomain.com/sitemap.xml
   ```
