import { useEffect, useState } from "react";
import LOCAL_IMAGES from "../utils/localImages";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallNavbar from "./SmallNavbar";
import "./index.css";
const Navbar = () => {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };
  useEffect(() => {
    // Update isSmallScreen state on window resize
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1280);
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 500); // Set isScrolled based on scroll position
      if (scrollTop > 500) {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);
  const handleFinder = () => {
    navigate("/salonfinder");
  };
  const navLinks = [
    { label: "Home", to: "/", type: "internal" },
    { label: "Franchise", to: "/franchise-enquiry", type: "internal" },
    
    { label: "Gallery", to: "/gallery", type: "internal" },
    { label: "Media", to: "/media", type: "internal" },
    { label: "About us", to: "/about-us", type: "internal" },
    { label: "Locations", to: "/salon-location-near-me", type: "internal" },
    { label: "Eshop", to: "https://prosaloncart.com", type: "external" },
  ];
  return (
    <>
      {isSmallScreen ? (
        <SmallNavbar />
      ) : (
        <>
        <div className="relative">
          <div
            className={` ${
              isScrolled ? " z-[20] " : ""
            }  w-full bg-primary  h-auto absolute -top-[105px] z-[10]   roboto-medium-italic    flex gap-[15%] items-center px-6 py-5  transition-all ease-in-out duration-500`}
          >
            <div>
              <Link to="/">
                <img
                  src={LOCAL_IMAGES.monsoonlogo}
                  className="w-[200px] h-16"
                  alt="logo"
                  loading="lazy"
                />
              </Link>
            </div>
            <div className="hidden xl:flex justify-end items-center gap-x-6">
              {navLinks.map((link, index) =>
                link.type === "internal" ? (
                  <Link
                    key={index}
                    to={link.to}
                    className={`btn-hover ${
                      activeTab === link.to ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(link.to)}
                  >
                    <h1 className="text-white font-medium link-text cursor-pointer">
                      {link.label}
                    </h1>
                  </Link>
                ) : (
                  <a key={index} href={link.to} className="btn-hover">
                    <h1 className="text-white font-medium link-text cursor-pointer">
                      {link.label}
                    </h1>
                  </a>
                )
              )}
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
