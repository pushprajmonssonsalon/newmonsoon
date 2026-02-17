import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/monsoonlogo1.png"
import { IoCall } from "react-icons/io5";
export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate= useNavigate();

  const NavLinks = ({ onClick }) => (
    <>
      <Link to="/" onClick={onClick} className="hover:text-amber-600 transition">Home</Link>
      <Link to="/franchise-enquiry" onClick={onClick} className="hover:text-amber-600 transition">Franchise</Link>
      <Link to="/salon-location-near-me" onClick={onClick} className="hover:text-amber-600 transition">Locations</Link>
      <Link to="/gallery" onClick={onClick} className="hover:text-amber-600 transition">Gallery</Link>
      <Link to="/contact-us" onClick={onClick} className="hover:text-amber-600 transition">Contact</Link>
      <Link to="/about-us" onClick={onClick} className="hover:text-amber-600 transition">About</Link>
      <Link to="https://prosaloncart.com/" onClick={onClick} className="hover:text-amber-600 transition">Eshop</Link>
    </>
  );
  const handleNavigate=()=>{
    setOpen(false);
  navigate("/franchise-enquiry")
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="">
            <img src={logo} className="h-[50px]" style={{aspectRatio:1080 / 293}}/>
          </div>
        
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 md:gap-8 text-xs lg:text-sm font-medium">
          <NavLinks />
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          
        <Link
            to="/booking"
            onClick={() => setOpen(false)}
className="w-full bg-[#c9a961] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#b89851] transition-all duration-300 shadow-md"          >
            Book Appointment
          </Link>
         
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 pb-6 pt-4 space-y-5">
          <nav className="flex flex-col gap-4 font-medium">
            <NavLinks onClick={() => setOpen(false)} />
          </nav>

          <div className="flex items-center gap-2  text-sm text-neutral-600">
            <span className="text-lg"><IoCall size={20} /></span>
            <span>+91 9315788084 ,+91 8882766591</span>
          </div>

           <button
            className="w-full bg-[#c9a961] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#b89851] transition-all duration-300 shadow-md"
            onClick={handleNavigate}
            >
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}
