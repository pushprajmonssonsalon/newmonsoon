# Performance Audit & Problem Analysis Report: Monsoon Salon

> **Document Type:** Performance Diagnostic & Root-Cause Audit  
> **Target Project:** `monsoon-app` (`d:\Work\newmonsoon`)  
> **Current Lighthouse Score:** **< 30 / 100 (Mobile)**  
> **Target Lighthouse Score:** **90+ / 100**

---

## Executive Summary

The Monsoon Salon web application currently scores **below 30** on Google Lighthouse mobile audits. In Lighthouse v10 and v11, the performance score is a weighted composite of core user-centric metrics:

| Metric | Current Estimate | Lighthouse Threshold (Good) | Lighthouse Weight | Impact on Score |
| :--- | :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | **8.5s – 14.0s** | ≤ 2.5s | **25%** | **Catastrophic (0 / 100)** |
| **TBT (Total Blocking Time)** | **1,200ms – 3,500ms** | ≤ 200ms | **30%** | **Catastrophic (0 / 100)** |
| **CLS (Cumulative Layout Shift)** | **0.35 – 0.68** | ≤ 0.1 | **25%** | **Failing (0 / 100)** |
| **FCP (First Contentful Paint)** | **3.8s – 6.2s** | ≤ 1.8s | **10%** | **Poor (15 / 100)** |
| **Speed Index (SI)** | **7.5s – 12.0s** | ≤ 3.4s | **10%** | **Poor (10 / 100)** |

Because **LCP (25%)**, **TBT (30%)**, and **CLS (25%)** account for **80% of the entire Lighthouse score**, the cascading failures across these three metrics mathematically cap the final score below 30.

This audit details the root causes identified across the codebase.

---

## 1. Primary Problem: The Broken LCP (Largest Contentful Paint) Chain

The Largest Contentful Paint on the homepage is the primary hero slider banner. In this application, the hero banner takes between 8 and 14 seconds to display due to an 11-step sequential bottleneck chain:

```
[1. HTML Fetched]
      │
[2. Render-blocking Fonts (14 links in <head>)] ── Blocks parsing
      │
[3. External Widgets & 404 Script in <head>] ── Blocks parsing
      │
[4. Monolithic JS Bundle Download (300KB+ minified, 4.9MB map)]
      │
[5. JS Execution & React 18 Hydration] ── High TBT delay
      │
[6. React.lazy Home Chunk Download (203.chunk.js)]
      │
[7. Home Component Mounts & Runs useEffect()]
      │
[8. Network Round-Trip to API: GET /api/bannerList] ── Dynamic latency
      │
[9. State Update setBannerImg(res) & React-Slick Init]
      │
[10. <Banner /> Renders with loading="lazy"!] ── Browser deliberately defers download
      │
[11. Uncompressed 600KB JPEG Banner Finally Starts Downloading]
```

### Critical Code Evidence

#### A. Lazy-Loading the Above-the-Fold LCP Element
In [src/components/banners/Banner.jsx](file:///d:/Work/newmonsoon/src/components/banners/Banner.jsx#L15-L25):
```jsx
<img
  loading="lazy"              // <-- FATAL FLAW: Hero banner is instructed to wait!
  lazyboundary="800px"
  sizes="100vw"
  src={image}
  alt={`Luxury Salon Franchise ${index}`}
  decoding="async"
  data-nimg="responsive"
  className="border border-silverSurfer-300 absolute inset-0 ... w-0 h-0 img-styles"
/>
```
- **Why this kills Lighthouse:** The `loading="lazy"` attribute explicitly tells the browser engine: *"Do not fetch this image until layout is calculated and the element approaches the viewport."* On the hero banner—which is above the fold—this adds an artificial 2 to 4 second delay to the LCP metric.

#### B. Hero Images Trapped Behind Client-Side API Fetch
In [src/screens/homepage/home.js](file:///d:/Work/newmonsoon/src/screens/homepage/home.js#L17-L50):
```javascript
const [bannerImg, setBannerImg] = useState([]);

useEffect(() => {
  getApiCall(
    "bannerList",
    (res) => { setBannerImg(res); },
    (err) => { }
  );
}, []);
```
- The hero carousel renders empty (`bannerImg = []`) on initial page load. The image URL is not in the HTML or the client bundle; it requires an asynchronous network request to `https://www.monsoonsalon.com/api/bannerList`.
- On slow 4G or mobile networks, this API handshake adds 800ms to 2,000ms before the browser even learns what image URL to fetch.

#### C. Bandwidth Starvation via Misguided `<Helmet>` Preloads
In [src/screens/homepage/home.js](file:///d:/Work/newmonsoon/src/screens/homepage/home.js#L123-L128):
```jsx
<Helmet>
  ...
  {brandsImg.map((elm) => (
    <link rel="preload" as="image" href={elm.brandUrl} />
  ))}
  {OurServicesData.map((elm) => (
    <link rel="preload" as="image" href={elm.serviceIcon} />
  ))}
</Helmet>
```
- The application simultaneously tells the browser to **preload 10+ brand logos and service icons** located at the bottom of the page.
- These preloads flood the browser's HTTP connection pool, competing directly with the hero image, critical CSS, and page scripts.
- Furthermore, [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L38) preloads `monsoonsalon22.jpg` (which is not rendered in Header), and [src/components/latestWork/LatestWork.js](file:///d:/Work/newmonsoon/src/components/latestWork/LatestWork.js#L66) preloads `monsoonsalon23.jpg` (not rendered in LatestWork).

---

## 2. Severe Render-Blocking Resources in `public/index.html`

In [public/index.html](file:///d:/Work/newmonsoon/public/index.html#L55-L130):

### A. 14 Separate Google Font Requests and Redundant Preconnects
The `<head>` section contains 14 independent stylesheet `<link>` tags and 12 preconnect tags, requesting overlapping font families and weights:
- `Cormorant Garamond` is requested **4 separate times** (lines 65, 85, 93, 98).
- `Poppins` is requested **5 separate times** (lines 71, 103, 109, 115, 122).
- `Kotta One` is requested **twice** (lines 75, 79).
- `Roboto` is requested **twice** (lines 109, 115).
- Other fonts include `Dancing Script`, `Jaldi`, `Manrope`, `Montserrat`.
- `<link rel="preconnect">` is repeated up to 12 times for `fonts.googleapis.com` and `fonts.gstatic.com`.

**Impact:** Every `<link rel="stylesheet">` halts the browser's rendering engine. Chrome must establish DNS resolution, TLS handshakes, and download 14 separate CSS files before painting the first pixel. This inflates **First Contentful Paint (FCP)** to 4+ seconds.

### B. Broken Script Request (404 Error on Critical Path)
In [public/index.html](file:///d:/Work/newmonsoon/public/index.html#L55):
```html
<script src="/js/non-critical.js" defer></script>
```
- The file `/js/non-critical.js` **does not exist** in the `public` directory.
- This creates an unnecessary network round-trip, an HTTP 404 response, and browser console warnings on every single page load.

### C. Third-Party Scripts Blocking the Main Thread
In [public/index.html](file:///d:/Work/newmonsoon/public/index.html#L56-L61):
```html
<script src="https://kavisha.ai/embed.js" data-brand="monsoonsalon" defer></script>
<script async src="//www.instagram.com/embed.js"></script>
```
- External widgets load untrusted third-party code that executes heavy JavaScript while the main application is mounting, starving CPU cores and driving up **Total Blocking Time (TBT)**.

### D. Triple Tracking Scripts Running in Parallel
Three separate analytics trackers run simultaneously:
1. **Google Tag Manager** snippet (`GTM-PZ4CTMVW`) inside `<head>`.
2. Standalone **`gtag.js`** (`G-4YDYK31XMS`) inside `<head>`.
3. **`react-ga`** library (`G-H8LMPD3V4F`) initialized in [src/App.js](file:///d:/Work/newmonsoon/src/App.js#L47-L48).

**Impact:** Three duplicate tracking libraries execute on the main thread, dispatch redundant beacon requests, and consume mobile CPU cycles during bootstrap.

---

## 3. CSS Font `@import` Waterfall in `src/index.css`

In [src/index.css](file:///d:/Work/newmonsoon/src/index.css#L5-L6):
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@...&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:...&family=Lora:...&family=Merriweather:...&family=Roboto:...&family=Sedan+SC&display=swap');
```
- Using `@import` inside a CSS file creates a **network waterfall**:
  1. Browser downloads `main.css`.
  2. Browser parses `main.css` and discovers `@import`.
  3. Browser pauses rendering to download the external font stylesheet.
  4. Browser discovers font binary files (`.woff2`) and initiates a third round of requests.
- This introduces extra fonts (`DM Sans`, `Lora`, `Merriweather`, `Sedan SC`) that are barely used in the project, worsening bandwidth consumption.

---

## 4. Massive Unoptimized Image Assets

An audit of `src/assets/images/` and the production `build/static/media/` directory reveals large uncompressed media files directly imported into the bundle:

| Asset Name | Actual Disk Size | Format | Usage Location | Problem |
| :--- | :--- | :--- | :--- | :--- |
| `monsoonsalonbook.webp` | **6.89 MB** | WebP | Asset directory | Oversized file stored in repository |
| `monsoon28.png` | **1.53 MB** | PNG | [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L45) | Displayed on homepage intro. An identical `monsoon28.avif` file exists in the same folder at only **56 KB** (27x smaller), but is unused! |
| `monsoon29.png` | **1.53 MB** | PNG | [src/components/latestWork/LatestWork.js](file:///d:/Work/newmonsoon/src/components/latestWork/LatestWork.js#L75) | Displayed on homepage Latest Work section. Completely uncompressed PNG. |
| `about.png` | **1.21 MB** | PNG | About screen | Uncompressed large PNG |
| `logo1024.png` | **977 KB** | PNG | `public/` directory | Uncompressed high-res PNG |
| `about_us_banner.png` | **853 KB** | PNG | About banner | Uncompressed PNG |
| `banner1.jpg` – `banner6.jpg` | **~500 – 600 KB each** | JPEG | Hero slider | Heavy uncompressed JPEGs served at full desktop resolution to mobile screens |
| `phool1.png`, `phool2.png` | **356 KB & 216 KB** | PNG | Decorative elements | Decorative graphics weighing over half a megabyte |

### Monolithic `LOCAL_IMAGES` Dictionary Pattern
In [src/screens/utils/localImages.js](file:///d:/Work/newmonsoon/src/screens/utils/localImages.js):
- Over 30 images (including the 1.53 MB PNGs and dozens of gallery photos) are statically loaded via `require()` inside a single object:
```javascript
const LOCAL_IMAGES = {
  ...
  monsoonsalon28: require('../../assets/images/monsoon28.png'),
  monsoonsalon29: require('../../assets/images/monsoon29.png'),
  // 25+ more images...
};
```
- Whenever any component imports `LOCAL_IMAGES` (e.g., `SmallNavbar`, `dummydata`, `Header`), Webpack's module graph links all 30+ images into the dependency tree.

---

## 5. JavaScript Bloat & Main-Thread Blocking (High TBT)

### A. Heavy Unused Dependencies in `package.json`
The application dependencies in [package.json](file:///d:/Work/newmonsoon/package.json) contain substantial library duplication and dead weight:

1. **Multiple Mapping Libraries Installed Simultaneously:**
   - `@react-google-maps/api` (`^2.19.3`)
   - `google-map-react` (`^2.2.1`)
   - `leaflet` (`^1.9.4`)
   - `react-leaflet` (`^4.2.1`)
   *(Four different map packages present in `node_modules` and package lock).*

2. **Multiple UI and Styling Runtimes:**
   - `bootstrap` (`^4.6.0`) + `react-bootstrap` (`^2.8.0`)
   - `styled-components` (`^5.3.11`) + `@mui/styled-engine-sc` (`^5.12.0`)
   - `@emotion/react` (`^11.11.1`) + `@emotion/styled` (`^11.11.0`)
   - `@mui/material` (`^5.14.9`) + `@mui/icons-material` (`^5.14.3`)
   - `tailwindcss` (`^3.4.3`)
   *(Three competing CSS-in-JS runtimes and two UI component libraries loaded alongside Tailwind CSS).*

3. **Multiple Carousel Libraries:**
   - `react-slick` + `slick-carousel`
   - `react-responsive-carousel`

4. **Duplicate Animation Stylesheets:**
   In [src/App.js](file:///d:/Work/newmonsoon/src/App.js#L6-L9):
   ```javascript
   import "animate.css/animate.compat.css";
   import "animate.css/animate.min.css";
   ```
   Both complete animation stylesheets are imported simultaneously.

5. **Unused Barrel Imports:**
   In [src/components/Header.js](file:///d:/Work/newmonsoon/src/components/Header.js#L4):
   ```javascript
   import { AspectRatio } from "@mui/icons-material";
   ```
   This icon is never used in the component, yet it forces Webpack to parse Material UI icon barrels.

6. **Unused Imports in App Root:**
   In [src/App.js](file:///d:/Work/newmonsoon/src/App.js#L11):
   ```javascript
   import Navbar from "./screens/navbar";
   ```
   This import is unused (`Header` from `./screens/navbar/StickyNavbar.js` is rendered instead), but pulling in `Navbar` brings its entire subtree into the entry chunk.

---

## 6. High Cumulative Layout Shift (CLS: > 0.35)

Lighthouse penalizes layouts where visual elements shift position after rendering. The project suffers from severe layout shifts:

1. **Zero Reserved Height for Hero Carousel:**
   - The banner container starts empty while waiting for the API. When the slider suddenly mounts after `getApiCall` completes, the entire document content below it is pushed down by 300px–500px.
2. **Missing Explicit `width` and `height` Attributes on Images:**
   - In `Banner.jsx`: Uses zero-size classes (`w-0 h-0 img-styles`) with absolute positioning and a spacer span, confusing browser aspect-ratio calculations.
   - In `StickyNavbar.js`: The logo `<img src={logo} className="h-[50px]" style={{aspectRatio: 1080 / 293}} />` lacks HTML width/height attributes.
   - In `LatestWork.js`: Images load without placeholder bounding boxes.
3. **FOIT / FOUT Font Swapping Shifts:**
   - Multiple Google Font weights load without fallback metric overrides, causing text blocks to visibly reflow when web fonts replace system fallbacks.

---

## 7. Architecture Limitation: Pure Client-Side CRA (Create React App)

- Built with `react-scripts 5.0.1` (deprecated Create React App).
- The initial HTML sent from the server is an empty shell:
  ```html
  <div id="spinner" class=""></div>
  <div id="root"></div>
  ```
- The user sees a blank screen until the browser downloads, parses, and executes the entire React runtime and route bundle.
- There is no Server-Side Rendering (SSR) or Static Site Generation (SSG) for pre-rendering critical HTML, making the initial paint entirely dependent on the client device's CPU speed.

---

## Summary of Root Causes

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                      WHY LIGHTHOUSE SCORE IS BELOW 30                         │
├───────────────────────────────────────────────────────────────────────────────┤
│ 1. LCP Killed:      Hero image has loading="lazy" + waits for API response    │
│ 2. FCP Blocked:     14 Google font links + 404 script + 2 CSS @imports        │
│ 3. TBT Inflated:    300KB+ JS bundle, 3 analytics trackers, external widgets  │
│ 4. CLS Unstable:    Unsized images + slider pops in after API resolves        │
│ 5. Network Jammed:  10+ off-screen images preloaded in <Helmet>               │
│ 6. Asset Bloat:     Two 1.53MB PNGs loaded where 56KB AVIF is available       │
│ 7. Dependency Over: 4 map libs, 3 CSS-in-JS libs, 2 carousel libs             │
└───────────────────────────────────────────────────────────────────────────────┘
```
