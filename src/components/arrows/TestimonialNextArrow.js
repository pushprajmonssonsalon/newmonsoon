import React from 'react'
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import Slider from "react-slick";

const TestimonialNextArrow = (props) => {
    const {onClick} = props
  return (
    <div className='absolute top-1/2 -right-10 cursor-pointer' onClick={onClick}>
    <IoIosArrowDropright className="text-white text-3xl font-bold"/>
    </div>
    )
}

export default  TestimonialNextArrow 
