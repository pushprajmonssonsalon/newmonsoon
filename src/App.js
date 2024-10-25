
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";


import ReactGA from "react-ga";
import "animate.css/animate.min.css";
import NewFooter from "./screens/footer";
import Navbar from "./screens/navbar";
import OverLayloader from "./components/loaders/OverLayloader.js";
const lazyRetry = function (componentImport) {
  return new Promise((resolve, reject) => {
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem("retry-lazy-refreshed") || "false"
    );

    componentImport()
      .then((component) => {
        window.sessionStorage.setItem("retry-lazy-refreshed", "false");
        resolve(component);
      })
      .catch((error) => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem("retry-lazy-refreshed", "true");
          return window.location.reload(); // refresh the page
        }
        reject(error);
      });
  });
};

const Home = lazy(() => lazyRetry(()=>import("./screens/homepage/home")));
const About = lazy(() => lazyRetry(()=>import("./screens/about/About")));
const PrivacyPolicy = lazy(() => lazyRetry(()=>import("./screens/privacypolicy")));
const ContactUs = lazy(() => lazyRetry(()=>import("./screens/contactus")));
const Newfranchise = lazy(() => lazyRetry(()=>import("./screens/newfranchisepage")));

const Gallery = lazy(() => lazyRetry(()=>import("./screens/gallery")));
const NewGallery = lazy(() => lazyRetry(()=>import("./screens/gallery/NewGallery")));
const Locations = lazy(() => lazyRetry(()=>import("./screens/locations/Locations")));
const SingleLocation = lazy(() =>
 lazyRetry(()=> import("./screens/locations/SingleLocation.js"))
);
const TRACKING_ID = "G-H8LMPD3V4F"; // Replace with your tracking ID
ReactGA.initialize(TRACKING_ID);

export default function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="roboto-regular relative">
      <Toaster />

      <BrowserRouter>
        {window.location.pathname !== "/customSalon" && <Navbar />}
        <ScrollToTop />
        <Suspense fallback={<OverLayloader/>}>
        <div className="xl:mt-[104px]">
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />

            <Route path="/salon-location-near-me" element={<Locations />} />
            <Route
              path="/salon-location-near-me/:id"
              element={<SingleLocation />}
            />

            <Route path="/franchise-enquiry" element={<Newfranchise />} />
            <Route path="/franchise-d" element={<Newfranchise />} />
            <Route path="/franchise-enquiry*" element={<Newfranchise />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/media" element={<NewGallery />} />
            <Route path="*" element={<Newfranchise />} />
          </Routes>
        </div>
        </Suspense>
        {window.location.pathname !== "/customSalon" && <NewFooter />}

        {/* */}
        {/* <FloatingButton/> */}
      </BrowserRouter>
    </div>
  );
}
