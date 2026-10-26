# Performance Improvement Guide: Monsoon Salon (Target: 90+ Score)

> **Document Type:** Actionable Performance Optimization Blueprint  
> **Target Project:** `monsoon-app` (`d:\Work\newmonsoon`)  
> **Current Score:** **< 30** ➔ **Target Score:** **90+ (Mobile) / 98+ (Desktop)**

---

## Performance Roadmap & Score Milestones

```
Current State (<30)
       │
       ▼  [Phase 1: Quick Wins — HTML, Fonts, LCP Lazy Removal, Helmet Purge]
Score: 65 – 75
       │
       ▼  [Phase 2: Asset Compression — WebP/AVIF, Image Sizing, Logo SVG]
Score: 78 – 86
       │
       ▼  [Phase 3: JS Cleanup — Uninstall Unused Packages, Skeleton Loader]
Score: 88 – 94
       │
       ▼  [Phase 4: Architectural Upgrade — Vite / Next.js SSG Pre-rendering]
Score: 95 – 100
```

---

## Phase 1: Critical Immediate Wins (Expected Boost: +35 to +45 Points)

### 1. Fix the LCP Hero Banner in `Banner.jsx`

**Problem:** The hero image uses `loading="lazy"`, which forces the browser to intentionally delay fetching the Largest Contentful Paint element.

**Action:** Open [src/components/banners/Banner.jsx](file:///d:/Work/newmonsoon/src/components/banners/Banner.jsx) and update the `<img>` tag:

```jsx
// Before:
<img
  loading="lazy"
  lazyboundary="800px"
  sizes="100vw"
  src={image}
  alt={`Luxury Salon Franchise ${index}`}
  decoding="async"
  data-nimg="responsive"
  className="border border-silverSurfer-300 absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 img-styles"
/>

// After:
<img
  loading={index === 0 ? "eager" : "lazy"}
  fetchPriority={index === 0 ? "high" : "low"}
  decoding={index === 0 ? "sync" : "async"}
  src={image}
  alt={`Monsoon Salon Franchise Banner ${index + 1}`}
  className="w-full h-full object-cover rounded-[25px]"
/>
```

**Why this works:**
- `fetchPriority="high"` commands the network engine to prioritize this image above all other non-critical requests.
- `loading="eager"` on slide 0 starts downloading the image immediately upon HTML discovery.
- Subsequent slides (`index > 0`) retain `loading="lazy"` to save bandwidth.

---

### 2. Provide an Instant Static Hero Fallback (Eliminate API LCP Latency)

**Problem:** In [src/screens/homepage/home.js](file:///d:/Work/newmonsoon/src/screens/homepage/home.js), `bannerImg` starts as an empty array `[]`. The slider does not render until `getApiCall("bannerList")` finishes its network round-trip.

**Action:** Set a local default banner as the initial state so the hero banner paints immediately without waiting for the API:

```jsx
import defaultBanner from "../../assets/images/banner1.jpg"; // or optimized WebP

export default function Home() {
  // Initialize with a fallback image instead of an empty array:
  const [bannerImg, setBannerImg] = useState([defaultBanner]);

  useEffect(() => {
    getApiCall(
      "bannerList",
      (res) => {
        if (res && res.length > 0) {
          setBannerImg(res);
        }
      },
      (err) => {
        console.error("Banner fetch error", err);
      }
    );
  }, []);
  ...
```

**Why this works:** The browser discovers and renders the hero banner at 0ms from the local bundle rather than waiting 1–2 seconds for the server response.

---

### 3. Consolidate Google Fonts & Clean `public/index.html`

**Problem:** `public/index.html` has 14 separate font stylesheet requests, 12 preconnects, and a missing `/js/non-critical.js` script that causes a 404 error.

**Action:** Replace lines 55 to 130 of [public/index.html](file:///d:/Work/newmonsoon/public/index.html) with a single, consolidated font request and remove the broken script:

```html
<!-- Remove the non-existent script:
     <script src="/js/non-critical.js" defer></script> -->

<!-- Consolidated, single-request Google Fonts with display=swap -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jaldi:wght@400;700&family=Kotta+One&family=Manrope:wght@400;600&family=Poppins:wght@300;400;500;600&family=Roboto:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

**Why this works:**
- Reduces **14 blocking network round-trips to just 1**.
- Drops **FCP (First Contentful Paint) by 2.0 – 3.5 seconds**.
- Eliminates the 404 network error.

---

### 4. Remove CSS `@import` Waterfall from `src/index.css`

**Problem:** In [src/index.css](file:///d:/Work/newmonsoon/src/index.css#L5-L6), `@import url(...)` forces the browser to download CSS before discovering fonts.

**Action:** Delete lines 5 and 6 from `src/index.css`:

```css
/* DELETE THESE TWO LINES:
@import url('https://fonts.googleapis.com/css2?family=Roboto:...');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:...');
*/
```

Fonts should only be loaded through the preconnected `<link>` in `index.html` or self-hosted as local `.woff2` files.

---

### 5. Remove Harmful Image Preloading in `<Helmet>`

**Problem:** [src/screens/homepage/home.js](file:///d:/Work/newmonsoon/src/screens/homepage/home.js#L123-L128) preloads 10+ off-screen brand images and service icons that are positioned below the fold:

```jsx
// DELETE THIS BLOCK FROM home.js:
{brandsImg.map((elm) => (
  <link rel="preload" as="image" href={elm.brandUrl} />
))}
{OurServicesData.map((elm) => (
  <link rel="preload" as="image" href={elm.serviceIcon} />
))}
```

Also delete unused preloads from:
- [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L38): `<link rel="preload" as="image" href={LOCAL_IMAGES.monsoonsalon22} />`
- [src/components/latestWork/LatestWork.js](file:///d:/Work/newmonsoon/src/components/latestWork/LatestWork.js#L66): `<link rel="preload" as="image" href={LOCAL_IMAGES.monsoonsalon23} />`

**Why this works:** Unblocks the network pipeline so the browser devotes 100% of initial mobile bandwidth to critical CSS, JavaScript, and the primary hero banner.

---

### 6. Defer Third-Party Widgets & Consolidate Analytics

**Problem:** `kavisha.ai`, `instagram.com/embed.js`, and three analytics libraries execute concurrently during page load.

**Action:**
1. **Defer third-party chat/embed widgets** until after window `load` or user interaction:
```html
<script>
  window.addEventListener('load', function() {
    // Load Kavisha AI widget after critical rendering is finished
    setTimeout(function() {
      var s = document.createElement('script');
      s.src = 'https://kavisha.ai/embed.js';
      s.setAttribute('data-brand', 'monsoonsalon');
      s.defer = true;
      document.body.appendChild(s);
    }, 2500);
  });
</script>
```
2. **Consolidate Analytics:**
   - Keep Google Tag Manager (`GTM-PZ4CTMVW`) inside `<head>`.
   - Remove standalone `gtag.js` (`G-4YDYK31XMS`) from `index.html`.
   - Remove `react-ga` initialization from `src/App.js` (configure GA4 events directly inside GTM).
   - This eliminates two redundant tracking runtimes and reduces main-thread blocking time by 300ms–600ms.

---

## Phase 2: Asset Optimization & Image Pipeline (Expected Boost: +15 to +20 Points)

### 7. Switch `monsoon28.png` (1.53 MB) to `monsoon28.avif` (56 KB)

**Problem:** `src/assets/images/` already contains `monsoon28.avif` (56 KB), but `src/components/Header.js` loads `monsoon28.png` (1,535 KB) via `LOCAL_IMAGES.monsoonsalon28`.

**Action:** In [src/screens/utils/localImages.js](file:///d:/Work/newmonsoon/src/screens/utils/localImages.js#L68):
```javascript
// Before:
monsoonsalon28: require('../../assets/images/monsoon28.png'),

// After:
monsoonsalon28: require('../../assets/images/monsoon28.avif'),
```
**Immediate Savings:** **1,479 KB (96.3% reduction)** on the homepage intro section.

---

### 8. Compress and Convert Large Images to WebP/AVIF

Run a batch compression script (using `sharp`, `squoosh-cli`, or an image optimizer):

| File | Original Size | Target Format | Target Size | Reduction |
| :--- | :--- | :--- | :--- | :--- |
| `monsoon29.png` | 1,532 KB | AVIF / WebP | 65 KB | **95.7%** |
| `about.png` | 1,212 KB | WebP | 85 KB | **93.0%** |
| `about_us_banner.png` | 853 KB | WebP | 75 KB | **91.2%** |
| `banner1.jpg` – `banner6.jpg` | ~550 KB each | WebP (1920px & 800px) | 80 KB (desktop) / 45 KB (mobile) | **85.0%** |
| `public/logo1024.png` | 977 KB | PNG-8 / WebP | 40 KB | **95.9%** |
| `phool1.png`, `phool2.png` | 356 KB & 216 KB | WebP | 25 KB & 18 KB | **92.5%** |
| `monsoonsalonbook.webp` | 6,893 KB | Delete if unused, or compress to 250 KB | **96.4%** |

---

### 9. Use Responsive `<picture>` Tags for Banners

Serve smaller, mobile-optimized images to smartphones rather than full-resolution desktop banners:

```jsx
<picture>
  <source media="(max-width: 640px)" srcSet={imageMobileWebp} type="image/webp" />
  <source media="(min-width: 641px)" srcSet={imageDesktopWebp} type="image/webp" />
  <img
    src={imageFallback}
    alt="Monsoon Salon Banner"
    width="1200"
    height="600"
    fetchPriority={index === 0 ? "high" : "low"}
    loading={index === 0 ? "eager" : "lazy"}
    className="w-full h-auto object-cover rounded-[25px]"
  />
</picture>
```

---

## Phase 3: JavaScript Trimming & Main-Thread Optimization (TBT < 200ms)

### 10. Uninstall Unused Packages from `package.json`

Run this command in the project root to purge unused dependencies:

```bash
npm uninstall @react-google-maps/api google-map-react leaflet react-leaflet bootstrap react-bootstrap styled-components @mui/styled-engine-sc dayjs lodash fg-loadcss react-google-recaptcha react-google-recaptcha-v3 react-responsive-carousel
```

**What this removes:**
- 4 unused mapping engines.
- Bootstrap and React-Bootstrap (Tailwind is already used for layout).
- `styled-components` (Emotion is already installed for MUI).
- Full `lodash` bundle (~70 KB minified).
- Redundant carousel libraries.

---

### 11. Clean Up Root Component Imports

In [src/App.js](file:///d:/Work/newmonsoon/src/App.js):

1. Remove duplicate animation stylesheet:
```javascript
// Remove one of these duplicates:
// import "animate.css/animate.compat.css";
import "animate.css/animate.min.css";
```

2. Remove the unused `Navbar` import:
```javascript
// DELETE:
// import Navbar from "./screens/navbar";
```

3. In [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L4):
```javascript
// DELETE unused MUI import:
// import { AspectRatio } from "@mui/icons-material";
```

---

### 12. Decouple the Monolithic `LOCAL_IMAGES` Dictionary

**Problem:** `src/screens/utils/localImages.js` requires all 30+ images in one file. Importing any one image pulls all images into the bundle.

**Action:** Import only the specific image needed in each component:
```javascript
// Instead of:
// import LOCAL_IMAGES from "../utils/localImages";
// <img src={LOCAL_IMAGES.monsoonsalon28} />

// Use direct imports:
import hairCareImg from "../../assets/images/monsoon28.avif";
<img src={hairCareImg} alt="Monsoon Salon Hair Care" />
```

---

## Phase 4: Eliminate Cumulative Layout Shift (CLS < 0.05)

### 13. Reserve Aspect Ratio on the Hero Slider

**Problem:** While the carousel is loading, its container has `0px` height. When it renders, it pushes all content down by 400px–600px.

**Action:** Add an explicit aspect ratio and skeleton placeholder to the hero container in `home.js`:

```jsx
<div className="mainsliderContainer p-2 rounded-[25px] overflow-hidden min-h-[220px] sm:min-h-[350px] md:min-h-[480px] aspect-[16/9] md:aspect-[21/9] bg-amber-50">
  {bannerImg.length > 0 ? (
    <Slider {...settings}>
      {bannerImg.map((image, index) => (
        <div key={index} className="h-full p-2">
          <Banner image={image} index={index} />
        </div>
      ))}
    </Slider>
  ) : (
    <div className="w-full h-full animate-pulse bg-neutral-200 rounded-[25px]" />
  )}
</div>
```

---

### 14. Add Explicit `width` and `height` to All Images

Always define explicit width and height attributes or CSS aspect ratios on all static images to reserve layout dimensions before the file finishes downloading:

```jsx
// Sticky Navbar Logo:
<img
  src={logo}
  width="180"
  height="49"
  alt="Monsoon Salon"
  className="h-[45px] w-auto"
/>

// Intro Section Image:
<img
  src={hairCareImg}
  width="388"
  height="493"
  alt="Best monsoon salon franchise"
  className="object-cover lg:h-[493px] lg:w-[388px] rounded-2xl"
/>
```

---

## Phase 5: Architectural Evolution (Vite or Next.js)

While Create React App (`react-scripts 5.0.1`) can achieve an 80–88 score with the optimizations above, CRA is deprecated and limited to pure client-side rendering.

### Option A: Migrate from CRA to Vite (1–2 Days Effort)
- Instant ES-module development server.
- Modern Rollup bundling with tree-shaking and dynamic import chunking.
- Reduces production JavaScript bundle size by 35%–45%.

### Option B: Migrate to Next.js SSG / ISR (1–2 Weeks Effort — Recommended for 98+ Score)
For a salon brand and franchise discovery website, **Next.js Static Site Generation (SSG)** is the industry gold standard:
1. **Pre-rendered HTML:** The hero banner, text, and structure are delivered directly in the initial HTML response. First Contentful Paint drops to under 0.8s.
2. **`next/image`:** Automatically resizes, compresses (WebP/AVIF), and lazy-loads all images with built-in layout shift prevention.
3. **`next/font`:** Automatically self-hosts and optimizes Google Fonts at build time with zero external network requests and zero layout shift.
4. **SEO Advantage:** Search engine crawlers receive fully populated HTML containing all franchise keywords and schema markup.

---

## Score Projection & Verification

### Projected Metric Improvements

| Metric | Before Optimization | After Phase 1 & 2 | After Phase 3 & 4 | Target Status |
| :--- | :--- | :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | 4.8s | 1.6s | **0.9s – 1.2s** | **Good (Green)** |
| **Largest Contentful Paint (LCP)** | 11.5s | 2.8s | **1.5s – 2.0s** | **Good (Green)** |
| **Total Blocking Time (TBT)** | 2,400ms | 450ms | **< 150ms** | **Good (Green)** |
| **Cumulative Layout Shift (CLS)** | 0.48 | 0.08 | **< 0.02** | **Good (Green)** |
| **Speed Index (SI)** | 9.2s | 3.2s | **< 2.2s** | **Good (Green)** |
| **Estimated Lighthouse Score** | **< 30** | **70 – 80** | **90 – 96** | **Grade A** |

---

## Testing & Verification Commands

To measure real production performance locally:

```bash
# 1. Build the optimized production bundle:
npm run build

# 2. Serve the production bundle with gzip/brotli simulation:
npx serve -s build -l 3000

# 3. Test using Lighthouse:
# Open Google Chrome in Incognito mode -> Inspect -> Lighthouse tab:
# - Mode: Navigation
# - Device: Mobile
# - Categories: Performance
# - Click: "Analyze page load"
```
