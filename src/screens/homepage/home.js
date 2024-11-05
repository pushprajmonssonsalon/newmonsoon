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
        console.log("getting error", err);
      }
    );
  }, []);
  return (
    <>
      <div className="roboto-regular ">
        <Helmet>
          <title>
            India's Leading Salon Franchise Chain - Monsoon Salon | Monsoon
            Salon Franchise
          </title>
          <meta
            name="description"
            content="Monsoon Salon is a top salon franchise in India, renowned for its premium beauty and grooming services. With locations across India, including Delhi, Monsoon offers expert hair, skincare, and bridal treatments."
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
                <Banner image={image} />
              </div>
            ))}
          </Carousel>
        </div>

        <Header />

        <LatestWork />

        <h1 className="text-xl font-medium text-center  roboto-regular opacity-80 ">
          What We Do
        </h1>
        <h1 className="text-[2.5rem] md:text-[3rem] px-3 md:px-5 text-center font-medium font-Cormorant opacity-80 mb-5">
          Your Complete Beauty Journey Starts{" "}
        </h1>

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

        <h1 className="text-2xl md:text-4xl text-center font-normal roboto-regular opacity-80 mb-5">
          Partner Brands
        </h1>
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
                  alt="galleryimages"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
