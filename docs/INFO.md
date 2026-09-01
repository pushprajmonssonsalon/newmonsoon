# Monsoon Salon Web Application — Project Documentation & Performance Audit

---

## 1. Project Overview

- **Application Name:** `monsoon-app`
- **Current Version:** `0.1.0`
- **Application Type:** Single Page Application (SPA)
- **Primary Domain:** [Monsoon Salon](https://monsoonsalon.com) — Leading luxury salon franchise chain in India (hair, beauty, makeup, nail, franchise discovery).
- **Core Technology Stack:**
  - **Framework / Runtime:** React 18.2.0 (`create-react-app` / `react-scripts` 5.0.1)
  - **Routing:** `react-router-dom` v6.15.0 with code splitting (`React.lazy` + `Suspense`)
  - **Styling:** Tailwind CSS 3.4.3 + custom CSS (`home.css`, `index.css`, `newfranchise.css`, etc.)
  - **Carousel / Sliders:** `react-slick` (1.8.1)
  - **Network / API Layer:** `axios` 1.5.0 with centralized API helpers (`src/utils/services.js`)
  - **Meta / Head Management:** `react-helmet` 6.1.0
  - **Analytics & Tracking:** Google Tag Manager (GTM), Google Analytics 4 (gtag.js), and `react-ga`

---

## 2. Architecture & Directory Structure

```
newmonsoon/
├── public/
│   ├── favicon.ico
│   ├── index.html            # Main HTML template (contains critical render-blocking issues)
│   ├── manifest.json
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.js                # App root, route declarations, ReactGA initialization
│   ├── index.js              # React 18 root mounting
│   ├── index.css             # Tailwind base & global CSS font imports
│   ├── assets/
│   │   └── images/           # Local static images, banners, icons, brand logos
│   ├── components/
│   │   ├── banners/          # Hero slider banner component (Banner.jsx)
│   │   ├── Header.js         # Homepage intro section & animated stats
│   │   ├── latestWork/       # Homepage latest work showcase
│   │   ├── loaders/          # Overlay loader for Suspense fallback
│   │   └── sidebar/          # Mobile navigation & sidebar
│   ├── screens/
│   │   ├── homepage/         # Homepage screen & slider logic
│   │   ├── about/            # About Us page
│   │   ├── locations/        # Salon directory & single location pages
│   │   ├── newfranchisepage/ # Franchise lead generation form & info
│   │   ├── gallery/          # Media & gallery page
│   │   ├── contactus/        # Contact us form & Google Maps embed
│   │   ├── privacypolicy/    # Privacy policy
│   │   ├── thankyoupage/     # Lead submission thank-you page
│   │   ├── navbar/           # Sticky top navbar with mobile drawer
│   │   └── footer/           # Global footer
│   └── utils/
│       ├── services.js       # Axios base config & API callers
│       └── hooks/            # Custom hooks (screen size, countdown, etc.)
├── package.json
└── tailwind.config.js
```

### Route Map
| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home` | Hero banner slider, franchise intro, services, testimonials, brand partners |
| `/about-us` | `About` | Brand history, mission, leadership, achievements |
| `/salon-location-near-me` | `Locations` | Pan-India salon directory with state/city filtering |
| `/salon-location-near-me/:id` | `SingleLocation`| Detailed view of an individual salon branch |
| `/franchise-enquiry` | `Newfranchise` | Franchise information, brochure download, inquiry form |
| `/contact-us` | `ContactUs` | Contact details, inquiry form, map embed |
| `/gallery` & `/media` | `Gallery` / `NewGallery` | Photo showcase of salon branches & transformations |
| `/privacypolicy` | `PrivacyPolicy` | Legal & privacy disclosures |
| `/thank-you` | `ThankYou` | Post-form submission confirmation |

---

## 3. Why Lighthouse Performance Is Below 40 (Deep-Dive Root Causes)

A Lighthouse score under 40 points on mobile/desktop indicates severe bottlenecks across **FCP (First Contentful Paint)**, **LCP (Largest Contentful Paint)**, **TBT (Total Blocking Time)**, and **CLS (Cumulative Layout Shift)**.

Here is the exact technical breakdown of why the score is so low:

---

### Issue #1: Severe Render-Blocking Resources in `public/index.html`

In [public/index.html](file:///d:/Work/newmonsoon/public/index.html):

1. **14 Separate `<link rel="stylesheet">` Google Font Requests:**
   - The `<head>` contains multiple duplicate font calls:
     - `Cormorant Garamond` is requested **3 separate times** with different weights.
     - `Poppins` is requested **4 separate times** with redundant parameters.
     - Multiple Google Fonts domains are preconnected up to **8 times**.
   - **Impact:** Each `<link rel="stylesheet">` blocks the browser's render pipeline until DNS, SSL, and CSS download finish. This pushes **First Contentful Paint (FCP)** back by 2–3+ seconds on 4G/mobile.

2. **Missing Script Triggering 404:**
   - Line 55: `<script src="/js/non-critical.js" defer></script>`
   - The file `/js/non-critical.js` does not exist in `public/`. This wastes an HTTP round-trip and generates an unhandled 404 network failure on every page load.

3. **Heavy Third-Party Blocking Widgets Loaded in `<head>`:**
   - Line 57: `<script src="https://kavisha.ai/embed.js" ...></script>`
   - Line 61: `<script async src="//www.instagram.com/embed.js"></script>`
   - External widgets execute third-party JavaScript that hijacks the main browser thread during initial page load, inflating **Total Blocking Time (TBT)**.

4. **Triple Analytics Scripts Executed Concurrently:**
   - Google Tag Manager snippet (`GTM-PZ4CTMVW`) is in `<head>`.
   - Standalone `gtag.js` (`G-4YDYK31XMS`) is loaded in `<head>`.
   - `react-ga` (`G-H8LMPD3V4F`) is initialized in `src/App.js`.
   - Running three distinct analytics runtimes in parallel multiplies network overhead and JS execution delays.

---

### Issue #2: Font Loading Waterfall via CSS `@import` in `src/index.css`

In [src/index.css](file:///d:/Work/newmonsoon/src/index.css#L5-L6):
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@...&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:...&family=Lora:...&family=Merriweather:...&family=Roboto:...&family=Sedan+SC&display=swap');
```
- **The Problem:** CSS `@import` creates a **network waterfall**. The browser must download and parse `index.css` *before* it even discovers the font URLs.
- Furthermore, `Roboto` is imported here twice, while also being linked inside `index.html`. Fonts like `DM Sans`, `Lora`, `Merriweather`, and `Sedan SC` are loaded even though they are scarcely used.

---

### Issue #3: LCP (Largest Contentful Paint) Destruction

The Largest Contentful Paint (LCP) element on the homepage is the primary hero banner image inside the carousel.

1. **`loading="lazy"` Applied to the LCP Element:**
   - In [src/components/banners/Banner.jsx](file:///d:/Work/newmonsoon/src/components/banners/Banner.jsx#L16):
     ```jsx
     <img loading="lazy" lazyboundary="800px" ... />
     ```
   - **Why this kills Lighthouse:** The browser will deliberately **delay** loading any image marked `loading="lazy"` until after layout and viewport intersection checks are complete. Never lazy-load the above-the-fold hero image!

2. **Misdirected Preloads in `<Helmet>`:**
   - In [src/screens/homepage/home.js](file:///d:/Work/newmonsoon/src/screens/homepage/home.js#L123-L128):
     ```jsx
     {brandsImg.map((elm) => (
       <link rel="preload" as="image" href={elm.brandUrl} />
     ))}
     {OurServicesData.map((elm) => (
       <link rel="preload" as="image" href={elm.serviceIcon} />
     ))}
     ```
   - In [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L38):
     Preloads `monsoonsalon22.jpg` (which isn't even displayed on this section).
   - In [src/components/latestWork/LatestWork.js](file:///d:/Work/newmonsoon/src/components/latestWork/LatestWork.js#L66):
     Preloads `monsoonsalon23.jpg` (which isn't displayed here).
   - **Why this kills Lighthouse:** Preloading dozens of below-the-fold logos, icons, and unused images forces high-priority downloads that saturate network bandwidth, starving the actual hero banner and critical scripts.

3. **Massive Uncompressed Images:**
   - In `Header.js`, `LOCAL_IMAGES.monsoonsalon28` loads `monsoon28.png`, which is **1.53 MB**! In the same folder, `monsoon28.avif` is only **56 KB** (27x smaller), but is unused!
   - In `LatestWork.js`, `LOCAL_IMAGES.monsoonsalon29` is **1.53 MB** (`monsoon29.png`).
   - `monsoonsalonbook.webp` is **6.89 MB**!
   - Hero slider banners (`banner1.jpg` – `banner6.jpg`) are ~500–600 KB each as uncompressed JPEGs.

---

### Issue #4: Total Blocking Time (TBT) & Redundant JavaScript Execution

1. **Unused Heavy Modules Imported into Critical Chunks:**
   - In [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L4):
     `import { AspectRatio } from "@mui/icons-material";`
     This unused barrel import drags Material UI dependencies into the critical bundle.
2. **Duplicate Animation Libraries:**
   - In [src/App.js](file:///d:/Work/newmonsoon/src/App.js#L6-L9):
     ```javascript
     import "animate.css/animate.compat.css";
     import "animate.css/animate.min.css";
     ```
     Both stylesheets are imported simultaneously, injecting hundreds of redundant CSS animation keyframes.
3. **Unused Dependencies in `package.json`:**
   - Redundant map libraries: `@react-google-maps/api`, `google-map-react`, `leaflet`, `react-leaflet` (None of these are imported in `src/`!).
   - Redundant UI/styling frameworks: `bootstrap`, `react-bootstrap`, `styled-components`.
   - Redundant carousels: `react-responsive-carousel` (only its CSS is imported in one file, while `react-slick` is used everywhere).
   - Unused utilities: `dayjs`, `lodash`, `fg-loadcss`, `react-google-recaptcha`, `react-google-recaptcha-v3`.

---

### Issue #5: Cumulative Layout Shift (CLS)

1. **Images Missing Explicit Dimensions / Responsive Placeholders:**
   - Banners and logos render with CSS classes like `w-0 h-0 img-styles` or dynamic percentages, causing drastic layout shifts once images load and render.
2. **Dynamic API Data Shift:**
   - The homepage banner (`getApiCall("bannerList", ...)`) starts with an empty array `[]` and does not reserve container height with a skeleton loader. When banners load, the whole content below shifts down by 400px–600px.
3. **Font Swapping Layout Shifts (FOIT/FOUT):**
   - Several Google Fonts in `index.html` lack `display=swap`, causing flashes of invisible text and subsequent text reflow.

---

## 4. Performance Optimization Action Plan (Target: 85+ to 95+ Score)

### Step 1: Clean Up `public/index.html` (Expected Boost: +25 to +35 points)
- Consolidate all font links into a single, optimized Google Fonts request:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jaldi:wght@400;700&family=Kotta+One&family=Manrope:wght@400;600&family=Poppins:wght@300;400;500;600&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
  ```
- Remove the non-existent `<script src="/js/non-critical.js"></script>`.
- Defer or lazy-load external third-party widgets (`kavisha.ai`, `instagram.com`) only after user interaction or on idle (`requestIdleCallback`).
- Remove duplicate analytics tags. Keep either GTM or GA4.

### Step 2: Remove Font `@import` from `src/index.css`
- Delete lines 5 and 6 in `src/index.css` so fonts are only requested once directly via HTML `<link>`.

### Step 3: Fix LCP & Image Loading in `Banner.jsx` and Screens (Expected Boost: +20 points)
- In `Banner.jsx`:
  ```jsx
  <img
    loading={index === 0 ? "eager" : "lazy"}
    fetchPriority={index === 0 ? "high" : "low"}
    src={image}
    alt={`Monsoon Salon Banner ${index + 1}`}
    ...
  />
  ```
- Remove bulk preloads in `<Helmet>` for off-screen brand images and service icons.
- Switch `monsoon28.png` (1.53 MB) to `monsoon28.avif` (56 KB) in `src/screens/utils/localImages.js`.
- Compress `monsoon29.png` to modern WebP/AVIF.
- Compress hero banner images from 600 KB to ~80–120 KB WebP format.

### Step 4: Eliminate Cumulative Layout Shift (CLS)
- Provide a fixed aspect-ratio skeleton placeholder for the hero banner slider before API responses arrive.
- Add `alt` attributes and explicit aspect ratios to all images.

### Step 5: Clean Up Dependencies & Bundle Size
- Remove unused packages from `package.json`:
  - `npm uninstall @react-google-maps/api google-map-react leaflet react-leaflet bootstrap react-bootstrap styled-components dayjs lodash fg-loadcss react-google-recaptcha react-google-recaptcha-v3 react-responsive-carousel`
- Remove unused `@mui/icons-material` import from `Header.js`.
- Remove duplicate `"animate.css/animate.compat.css"` from `src/App.js`.

---

## 5. Development & Build Commands

| Command | Action |
| :--- | :--- |
| `npm start` | Starts local development server on `http://localhost:3000` |
| `npm run build` | Compiles an optimized production build in `/build` |
| `npx serve -s build` | Serves the production build locally to test performance |
| `npm test` | Runs Jest unit tests |
