import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./home.css";
import { Helmet } from "react-helmet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { brandsImg, OurServicesData } from "../utils/dummydata";
import Testimonial from "../../components/Testimonial";
import Header from "../../components/Header";
import ServiceCart from "../../components/ServiceCart";
import LatestWork from "../../components/latestWork/LatestWork";
import Banner from "../../components/banners/Banner";
import { getApiCall } from "../../utils/services";
import { useEffect, useState } from "react";

export default function Home() {
  const [bannerImg, setBannerImg] = useState([]);

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
  return (
    <>
      <div className="roboto-regular ">
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
          <meta
            name="description"
            content="In our initial phase, Monsoon will be the market leader with smart placement across top 100 cities. We want to have over 100 salons within the next two years, ...
"
          />
          <meta
            name="keywords"
            content="salon franchise, salon chain in india, salon franchise portal, affordable salon chain in india"
          />
        </Helmet>
        <div className="mainsliderContainer">
          <Carousel
            showArrows={false}
            showStatus={false}
            showIndicators={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={2000}
            pauseOnHover={false}
            showThumbs={false}
          >
            {bannerImg?.reverse()?.map((image, index) => (
              <div key={index} className="h-full ">
                <Banner image={image} key={index} index={index} />
              </div>
            ))}
          </Carousel>
        </div>

        <Header />

        <LatestWork />

        <h4 className="text-xl font-medium text-center  roboto-regular opacity-80 ">
          What We Do
        </h4>
        <h5 className="text-[2.5rem] md:text-[3rem] px-3 md:px-5 text-center font-medium font-Cormorant opacity-80 mb-5">
          Your Complete Beauty Journey Starts{" "}
        </h5>
                <div className="px-5 sm:w-[90%] 2xl:w-[70%] mx-auto ">

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
        </div>

        <Testimonial />

        <h5 className="text-2xl md:text-4xl text-center font-normal roboto-regular opacity-80 mb-5">
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
        </div>
      </div>
    </>
  );
}
