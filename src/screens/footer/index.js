import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaYoutube, FaTwitter, FaPinterest } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoCall, IoMail } from "react-icons/io5";
import logo from "../../assets/images/monsoonlogo.png";
const NewFooter = () => {
   return (
      <>
      
        <footer className="bg-[#1b1b1b] text-neutral-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
         <div className="">
            <img src={logo} className="h-[50px] mb-5" style={{aspectRatio:1209 / 396}}/>
          </div>
          <p className="text-sm leading-relaxed">
            Experience luxury beauty services with premium ambience and expert stylists across India.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/franchise-enquiry">Franchise</Link></li>
            <li><Link to="/about-us">About</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
            <li><Link to="/privacypolicy">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
           <li className='text-sm flex gap-2 items-center font-light text-white cursor-pointer'><IoCall size={20} />9315788084   </li>
            <li className='text-sm flex gap-2 items-center font-light text-white cursor-pointer'><IoMail size={20} />info@monsoonsalon.com</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
         <div className='flex flex-row gap-x-3 md:gap-x-5'>
               <a target="_blank" href={"https://www.instagram.com/monsoonsalon/"} ><span className='text-md font-light text-white cursor-pointer hover:scale-110'><BsInstagram /></span></a>
               <a target="_blank" href={"https://www.facebook.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaFacebook /></span></a>
               <a target="_blank" href={"https://www.youtube.com/user/monsoonsalon"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaYoutube /></span></a>
               <a target="_blank" href={"https://twitter.com/monsoonsalon"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaTwitter /></span></a>
               <a target="_blank" href={"https://in.pinterest.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaPinterest /></span></a>
            </div>
        </div>
      </div>

      <div className="border-t border-neutral-700 mt-4 pt-2 px-3 text-center text-sm text-neutral-400">
         <div className='text-sm md:text-md mb-5 font-light text-white text-center mt-3'>The Professional Hair Salon & Spa (India) Pvt. Ltd.</div>
         <div className='text-sm md:text-md font-light text-white text-center mt-3'>Address: Plot No-31 Okhla Industrial Estate, Phase – 3, South Delhi, New Delhi – 110020</div>
     
      </div>
    </footer>

      {/* <div className='px-5 py-5 md:p-20 flex flex-col bg-primary text-white w-full merriweather-bold-italic '>
      <div className='flex justify-between gap-x-3 gap-y-3 md:justify-around items-start  text-lg  flex-wrap font-normal '>
         <div className='flex flex-col'>
            <h3 className='text-xl foot-link md:text-md mb-5 mt-0 font-normal text-white '>Information</h3>
            <div className="flex flex-col gap-1">

            <Link to={"/privacypolicy"}><h4 className='text-sm btn-hover after:bg-white font-light text-white cursor-pointer'>Privacy Policy</h4></Link>
            </div>
         </div>
         <div className='flex flex-col'>
            <h3 className='text-xl foot-link md:text-md mb-5 mt-0 font-normal text-white '>Join us</h3>
            <div className="flex flex-col gap-1">

            <Link to={"/contact-us"}><h4 className='text-sm btn-hover after:bg-white font-light text-white cursor-pointer'>Contact us</h4></Link>
            <Link to={"/franchise-enquiry"}><h4 className='text-sm btn-hover after:bg-white font-light text-white cursor-pointer'>Franchise</h4></Link>
            </div>
         </div>
       
         <div className='flex flex-col'>
            <h3 className='text-xl foot-link md:text-md mb-5 mt-0 font-normal text-white  md:mt-0'>Get in touch</h3>
            <div className="flex flex-col gap-3">

            <h4 className='text-sm flex gap-2 items-center font-light text-white cursor-pointer'><IoCall size={20} />9315788084 , 8882766591   </h4>
            <h4 className='text-sm flex gap-2 items-center font-light text-white cursor-pointer'><IoMail size={20} />info@monsoonsalon.com</h4>
            </div>
         </div>
         <div className='flex flex-col'>
            <h3 className='text-xl foot-link  md:text-md mb-5 font-normal text-white  mt-0'>Our Social Media</h3>
            <div className='flex flex-row gap-x-3 md:gap-x-5'>
               <a target="_blank" href={"https://www.instagram.com/monsoonsalon/"} ><span className='text-md font-light text-white cursor-pointer hover:scale-110'><BsInstagram /></span></a>
               <a target="_blank" href={"https://www.facebook.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaFacebook /></span></a>
               <a target="_blank" href={"https://www.youtube.com/user/monsoonsalon"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaYoutube /></span></a>
               <a target="_blank" href={"https://twitter.com/monsoonsalon"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaTwitter /></span></a>
               <a target="_blank" href={"https://in.pinterest.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaPinterest /></span></a>
            </div>
         </div>
      </div>
      <div className='border-t-2 border-white mt-4 pt-2'>
         <div className='text-sm md:text-md mb-5 font-light text-white text-center mt-3'>The Professional Hair Salon & Spa (India) Pvt. Ltd.</div>
         <div className='text-sm md:text-md font-light text-white text-center mt-3'>Address: Plot No-31 Okhla Industrial Estate, Phase – 3, South Delhi, New Delhi – 110020</div>
      </div>
   </div> */}

      </>
   
   )
}

export default NewFooter