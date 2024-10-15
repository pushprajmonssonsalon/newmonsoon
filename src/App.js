import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";

import ReactGA from "react-ga";
import "animate.css/animate.min.css";
import NewFooter from "./screens/footer";
import Navbar from "./screens/navbar";
import OverLayloader from "./components/loaders/OverLayloader.js";

const Home = lazy(() => import("./screens/homepage/home"));
const About = lazy(() => import("./screens/about/About"));
const PrivacyPolicy = lazy(() => import("./screens/privacypolicy"));
const ContactUs = lazy(() => import("./screens/contactus"));
const Newfranchise = lazy(() => import("./screens/newfranchisepage"));

const Gallery = lazy(() => import("./screens/gallery"));
const NewGallery = lazy(() => import("./screens/gallery/NewGallery"));
const Locations = lazy(() => import("./screens/locations/Locations"));
const SingleLocation = lazy(() =>
  import("./screens/locations/SingleLocation.js")
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
        <div className="xl:mt-[105px]">
        
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
