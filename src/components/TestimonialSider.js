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
    name: "Aarav Sharma",
    review:
      "Amazing experience! The stylists understood exactly what I wanted and the results were perfect. Premium ambience and very professional staff.",
  },
  {
    name: "Riya Patel",
    review:
      "Best salon visit I’ve ever had. My hair feels healthier and the service was extremely relaxing. Highly recommended!",
  },
  {
    name: "Karan Mehta",
    review:
      "Great grooming services and very hygienic environment. The staff is polite and skilled.",
  },
  {
    name: "Sneha Verma",
    review:
      "Loved my bridal makeup! It lasted all day and looked flawless in photos. Thank you Monsoon team!",
  },
  {
    name: "Rahul Gupta",
    review:
      "Professional haircut and beard styling. The ambience itself feels luxurious and calming.",
  },
  {
    name: "Ananya Iyer",
    review:
      "Skin treatment worked wonders. My face feels refreshed and glowing. Definitely coming back again!",
  },
];
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-kotta md:text-5xl font-semibold text-neutral-800 mb-14">
          Client Testimonials
        </h2>
        <div className="">
          <Slider {...settings}>

            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur rounded-[28px] p-8 shadow-md hover:shadow-xl transition"
              >
                <div className="text-amber-500 text-xl mb-4">★★★★★</div>
                <p className="text-neutral-600 font-jaldi text-sm leading-relaxed mb-6">
                  {t.review}
                </p>
                <p className="font-semibold font-jaldi text-neutral-800 tracking-wide">
                  {t.name}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* <div className=" relative my-10 md:my-10 lg:my-6 w-full max-w-full overflow-x-hidden h-full ">
        <Slider {...settings}>

          {testimonials.map((testimonial, idx) => {
            const { name, desc } = testimonial;
            return <Message key={idx} name={name} desc={desc} />;
          })}

        </Slider>
      </div> */}
    </>
  );
}

export default TestimonalSlider;
