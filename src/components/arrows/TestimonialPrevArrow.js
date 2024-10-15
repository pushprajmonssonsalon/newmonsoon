import React from 'react'
import Slider from "react-slick";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";

const TestimonialPrevArrow = (props) => {
    const {onClick} = props;
  return (
    <div className='absolute top-1/2 -left-10 cursor-pointer' onClick={onClick}>
    <IoIosArrowDropleft className="text-white text-3xl font-bold"/>
    </div>
  )
}

export default TestimonialPrevArrow