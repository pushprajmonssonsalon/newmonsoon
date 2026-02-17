import "./home.css";
import { Helmet } from "react-helmet";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { brandsImg, OurServicesData } from "../utils/dummydata";
import Header from "../../components/Header";
import LatestWork from "../../components/latestWork/LatestWork";
import Banner from "../../components/banners/Banner";
import { getApiCall } from "../../utils/services";
import { useEffect, useState } from "react";
import hair from "../../assets/images/hair2.png";
import beauty from "../../assets/images/beauty2.png";
import makeup from "../../assets/images/beauty1.png";
import nail from "../../assets/images/nail1.png";
export default function Home() {
  const [bannerImg, setBannerImg] = useState([]);
  const services = [
    {
      title: "Hair",
      desc: "Professional cuts, styling and treatments for every hair type.",
      img: hair,
    },
    {
      title: "Beauty",
      desc: "Glow facials, skin care and rejuvenation therapies.",
      img: beauty,
    },
    {
      title: "Makeup",
      desc: "Party & bridal makeup by certified professionals.",
      img: makeup ,
    },
    {
      title: "Nail",
      desc: "Luxury manicure and nail art services.",
      img: nail,
    },
  ];
  useEffect(() => {
    getApiCall(
      "https://smartsalon.in/api/bannerList",
      (res) => {
        setBannerImg(res);
      },
      (err) => {

      }
    );
  }, []);
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
 const brands = [
    "ARGATIN",
    "SPRINGTIOL",
    "skin co.",
    "KÉRASTASE",
    "THALGO",
    "L'ORÉAL",
  ];
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    pauseOnHover: true,

    autoplaySpeed: 50,
  };
  return (
    <>
      <div className="roboto-regular bg-[#FFF5EB]">
        <Helmet>
          <title>
            Monsoon Salon | India’s Leading Salon Franchise Chain
          </title>
          <meta
            name="description"
            content="Join Monsoon Salon – the best unisex salon franchise in India. Explore top salon brands, compare the top 10 salon franchises, and start your business today!"
          />
          <meta
            name="keywords"
            content="salon franchise, best salon franchise, affordable salon franchise, salon franchise booking portal, unisex salon franchise"
          />
          <link rel="canonical" href="https://monsoonsalon.com/" />
          {brandsImg.map((elm) => (
            <link rel="preload" as="image" href={elm.brandUrl} />
          ))}
          {OurServicesData.map((elm) => (
            <link rel="preload" as="image" href={elm.serviceIcon} />
          ))}
         
       
        </Helmet>


        <div className="mainsliderContainer p-2 rounded-[25px] overflow-hidden">
           <Slider {...settings}>
            {bannerImg?.reverse()?.map((image, index) => (
              <div key={index} className="h-full p-2">
                <Banner image={image} key={index} index={index} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="relative z-[40px] mx-3 sm:mx-9   overflow-hidden">
          {/* <div
            className="absolute h-full top-0 bottom-0 left-0 right-0 bg-clip-circle inset-0 bg-[#FFF5EB] shadow-sm"
          /> */}
          {/* Content layer */}
          <div className="relative bg-[#FFF5EB] px-4 pt-4 sm:px-6 sm:pt-6 md:px-9 md:pt-9">



            <Header />

            <div className="h-[70px] md:h-[100px]" />

            <LatestWork />
            {/* <div className="h-[70px] md:h-[100px]" /> */}

          </div>
          {/* <div className="custom-shape-divider-bottom-1770896521 bg-[#FFF5EB]">
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
                  className="shape-fill"
                />
              </svg>
            </div> */}
        </div>
        <section className="bg-gradient-to-b from-[#f6efe7] to-[#efe2d6] py-20">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading */}
            <div className="text-center mb-14">
              <p className="text-xl font-kotta tracking-[0.3em] text-amber-600 uppercase">Our Services</p>
              <h2 className="text-3xl md:text-5xl font-kotta font-semibold text-neutral-800 mt-3">
                Premium Care For Every Style
              </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-8">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group bg-white/60 backdrop-blur rounded-[28px] overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className=" overflow-hidden">
                    <img
                    style={{aspectRatio: "284 / 224"}}
                      src={service.img}
                      alt={service.title}
                      className="w-full  group-hover:scale-110 transition duration-500"
                    />
                  </div>

                  <div className=" p-3 sm:p-6 text-center">
                    <h3 className="text-xl font-jaldi font-semibold text-neutral-800 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-neutral-600 font-jaldi text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </section>
         <section className="bg-gradient-to-b from-[#efe2d6] to-[#f6efe7] py-3">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-kotta md:text-5xl font-semibold text-neutral-800 mb-14">
          Client Testimonials
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </div>
    </section>

        <section className="bg-gradient-to-b from-[#f6efe7] to-[#efe2d6] py-9 md:py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-kotta md:text-5xl font-semibold text-neutral-800 mb-12">
          Partner Brands
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {brandsImg.map((item, i) => (
            <div
              key={i}
              className="bg-white backdrop-blur rounded-2xl py-6 font-semibold tracking-widest text-neutral-700 shadow hover:shadow-lg transition"
            >
                <img
                style={{aspectRatio:290 / 166}}
                  src={item.brandUrl}
                  className="h-[60px] sm:h-[100px] mx-auto"
                  alt={item.name}
                />
            </div>
          ))}
        </div>
      </div>
    </section>
        {/* <div className="my-5">
          <h2 className="w-full text-center mb-2 xl:mb-[40px] underline underline-offset-4 text-black  text-md font-kotta  md:text-[1.5rem] xl:text-[2.8rem] xl:leading-[3rem]">
            Our Services
          </h2>
          <p className=" font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
            We believe that every beauty journey is uniquely yours, and it all starts with you. From the
            moment you walk through our doors, we focus on enhancing your natural beauty with
            personalized services tailored to your specific needs. Whether you’re looking for a fresh
            haircut, a bold color transformation, a refreshing skin treatment, or a flawless bridal
            makeover, our expert team is here to turn your vision into reality. We are committed to
            making you look and feel your absolute best, guiding you every step of the way. Let us take
            you on a transformative journey that leaves you feeling confident, radiant, and renewed.    </p>
        </div> */}


        {/* <h4 className="text-xl font-medium text-center  roboto-regular opacity-80 ">
          What We Do
        </h4> */}
        {/* <h5 className="text-[2.5rem] md:text-[3rem] px-3 md:px-5 text-center font-medium font-Cormorant opacity-80 mb-5">
          Your Complete Beauty Journey Starts{" "}
        </h5> */}
        {/* <div className="px-5 sm:w-[90%] 2xl:w-[70%] mx-auto ">

          <p className="w-full text-xl md:text-2xl  p-3 md:px-6 font-Cormorant text-regel-gray ">
            We believe that every beauty journey is uniquely yours, and it all starts with you. From the
            moment you walk through our doors, we focus on enhancing your natural beauty with
            personalized services tailored to your specific needs. Whether you’re looking for a fresh
            haircut, a bold color transformation, a refreshing skin treatment, or a flawless bridal
            makeover, our expert team is here to turn your vision into reality. We are committed to
            making you look and feel your absolute best, guiding you every step of the way. Let us take
            you on a transformative journey that leaves you feeling confident, radiant, and renewed.
          </p>
        </div>
        <div className="px-3 sm:w-[90%] 2xl:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 place-items-center justify-items-center   md:mb-10">
          {OurServicesData.map((item, index) => (
            <ServiceCart
              index={index}
              img={item.serviceIcon}
              name={item.serviceName}
              desc={item.serviceDiscipton}
            />
          ))}
        </div> */}

        {/* <Testimonial /> */}

        {/* <h5 className="text-2xl md:text-4xl text-center font-normal roboto-regular opacity-80 mb-5">
          Partner Brands
        </h5>
        <div className="mb-16 grid gap-4  grid-cols-2 md:grid-cols-3 w-[90%] md:w-[80%] 2xl:w-[70%] mx-auto">
          {brandsImg?.map((item, index) => {
            return (
              <div
                key={index}
                className={` border flex items-center justify-center`}
              >
                <img
                  src={item.brandUrl}
                  className="h-[70%] w-[70%]"
                  alt={item.name}
                />
              </div>
            );
          })}
        </div> */}
      </div>
    </>
  );
}
