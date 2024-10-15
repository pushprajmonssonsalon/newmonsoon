import Slider from "react-slick";
import TestimonialPrevArrow from "./arrows/TestimonialPrevArrow";
import TestimonialNextArrow from "./arrows/TestimonialNextArrow";
import Message from "./Message";

function TestimonalSlider() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: "linear",
    prevArrow: <TestimonialPrevArrow />,
    nextArrow: <TestimonialNextArrow />,
  };
  const testimonials = [
    {
      name: "Arpita Solanki",
      desc: "Walking into Monsoon Salon was a game-changer for my beauty routine. From the welcoming ambiance to the professional approach of the stylists, every detail was impeccable. I was impressed by how well the team understood my hair's unique needs. After the session, my hair looked vibrant and healthy, exactly how I had envisioned it. Monsoon Salon has truly set a high standard in beauty services, offering more than just haircuts—they deliver confidence and satisfaction with every visit.",
    },
    {
      name: "Roshini Panchal",
      desc: "Walking into Monsoon Salon was a game-changer for my beauty routine. From the welcoming ambiance to the professional approach of the stylists, every detail was impeccable. I was impressed by how well the team understood my hair's unique needs. After the session, my hair looked vibrant and healthy, exactly how I had envisioned it. Monsoon Salon has truly set a high standard in beauty services, offering more than just haircuts—they deliver confidence and satisfaction with every visit.",
    },
    {
      name: "Arpita Solanki",
      desc: "My experience at Monsoon Salon was nothing short of amazing. From the moment I walked in, I was treated with exceptional care. The stylist listened closely to my needs and gave my hair a fresh, lively look that I absolutely loved. The atmosphere was relaxing, and the service was top-notch. Monsoon Salon isn't just about great haircuts; it's about making you feel your absolute best when you walk out the door.",
    },
  ];
  return (
    <div className=" relative my-10 md:my-10 lg:my-6 w-full max-w-full overflow-x-hidden h-full ">
      <Slider {...settings}>
       
        {testimonials.map((testimonial, idx) => {
          const { name, desc } = testimonial;
          return <Message key={idx} name={name} desc={desc} />;
        })}

      </Slider>
    </div>
  );
}

export default TestimonalSlider;
