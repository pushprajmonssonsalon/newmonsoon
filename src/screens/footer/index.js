import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaYoutube, FaTwitter, FaPinterest } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoCall, IoMail } from "react-icons/io5";

const NewFooter = () => {
   return (
      <div className='px-5 py-5 md:p-20 flex flex-col bg-primary text-white w-full merriweather-bold-italic '>
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

            <h4 className='text-sm flex gap-2 items-center font-light text-white cursor-pointer'><IoCall size={20} />9315788084   </h4>
            <h4 className='text-sm flex gap-2 items-center font-light text-white cursor-pointer'><IoMail size={20} />info@theprofessionalworld.com</h4>
            </div>
         </div>
         <div className='flex flex-col'>
            <h3 className='text-xl foot-link  md:text-md mb-5 font-normal text-white  mt-0'>Our Social Media</h3>
            <div className='flex flex-row gap-x-3 md:gap-x-5'>
               <a href={"https://www.instagram.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><BsInstagram /></span></a>
               <a href={"https://www.facebook.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaFacebook /></span></a>
               <a href={"https://www.youtube.com/user/monsoonsalon"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaYoutube /></span></a>
               <a href={"https://twitter.com/monsoonsalon"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaTwitter /></span></a>
               <a href={"https://in.pinterest.com/monsoonsalon/"}><span className='text-md font-light text-white cursor-pointer hover:scale-110'><FaPinterest /></span></a>
            </div>
         </div>
      </div>
      <div className='border-t-2 border-white mt-4 pt-2'>
         <div className='text-sm md:text-md mb-5 font-light text-white text-center mt-3'>The Professional Hair Salon & Spa (India) Pvt. Ltd.</div>
         <div className='text-sm md:text-md font-light text-white text-center mt-3'>Address: Plot No-31 Okhla Industrial Estate, Phase – 3, South Delhi, New Delhi – 110020</div>
      </div>
   </div>
   
   )
}

export default NewFooter