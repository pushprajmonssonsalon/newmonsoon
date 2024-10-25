import "./Aboutus.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LOCAL_IMAGES from "../utils/localImages";
import { Helmet } from "react-helmet";
import { brandsImg } from "../utils/dummydata";
import Banner from "../../components/banners/Banner";

const About = () => {
  const settings = {
    dots: false,
    // infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // lazyLoad: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          //   dots: true
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <Helmet>
        <title>
          Salon Franchise in India, Fastest Growing Salon Chain India
        </title>
        {brandsImg.map((elm) => (
            <link rel="preload" as="image" href={elm.brandUrl} />
          ))}
          <link rel="preload" as="image" href={LOCAL_IMAGES.aboutuspage} />
          <link rel="preload" as="image" href={LOCAL_IMAGES.about} />

        <meta
          name="description"
          content="The Monsoon Salon is a young brand for the refined consumer that is after International experience with exceptional talent that is on a continuous journey."
        />
        <meta
          name="keywords"
          content="about Monsoon Salon, Monsoon Salon information, Monsoon Salon about us, Monsoon Salon profile"
        />
      </Helmet>
      <div className="maincontainer">
        <div className="">
          <Banner image={LOCAL_IMAGES.aboutuspage} />
        </div>

        <div className=" mt-6 flex items-center justify-center flex-col lg:flex-row">
          <img
            src={LOCAL_IMAGES.about}
            alt="aboutus"
            className="aboutroundimg"
            loading="lazy"
          />

          <div className="mx-6 lg:ml-[50px] lg:mb-[80px] ">
            <Typography
              variant="h2"
              sx={{
                fontSize: 42,
                fontWeight: "500",
                color: "#000000",
                fontFamily: "Poppins",
              }}
            >
              About Us
            </Typography>


            <p className="salondiscriptionText mt-3 lg:mt-auto">
              The Monsoon Salon is a young brand for the refined consumer that
              is after International experience with exceptional talent that is
              on a continuous journey to refine and develop there skills. We are
              a brand that does not just do what you say, we are a brand and
              team that will give you what you need through education.
            </p>
            <p className="salondiscriptionText mt-3 lg:mt-auto">
              There comes a time when growth and opportunity meets, we have had
              to look at the brand and evolve it in order to be able to maintain
              our connect with the audience. The Hairdressing Industry is
              evolving so rapidly in India and with our growth plans we want to
              ensure that the brand stands for more than one thing or reliant on
              one person. We want to ensure we are setting up a Team of able
              people that will have the same opportunities to succeed and
              flourish in the Industry here in India. We have invested and will
              continue to invest a large amount of time and money into training
              of our people as we believe that is with the right people anything
              is possible.
            </p>
          </div>
        </div>

        <div className="mx-6 lg:w-[80%] lg:mx-auto  mt-3 lg:mt-0">
          <p className="salondiscriptionText">
            A name or brand means different things to different people, however
            the brand Monsoon for me means renew, rejuvenation and coming to
            life with a fresh new approach and that is exactly what we are
            about. It is a the fresh breeze after a long dry spell, it is
            romantic, sexy, colorful and fun. We approach things with energy and
            passion and backed up with the support and international experience
            to ensure that Monsoon Salon is the leader in the Indian market but
            also admired internationally with skills comparable to any top Salon
            in the World.
          </p>
          <p className="salondiscriptionText mt-3 lg:mt-0">
            We have a very specific plan, detailed and concise that will be
            executed with precision and finesse over the next 3-5 years with
            expert detailed training being our primary focus. The brand Monsoon
            will be market leader and strategically placed throughout Delhi/NCR
            in our first phase. In the next 3 years we will have 30+ salons
            adding selected sites furthering to 50 in the last 2 years of our
            expansion. With a very strong info structure in place that supports
            such expansion we will only multiply when all key areas of our
            business is adequately aligned.
          </p>
        </div>

        <h2 className="text-[2rem] md:text-[3rem] w-fit my-6 font-medium font-poppins mx-auto ">
          Partner Brands
        </h2>
        <div className="">
        <Slider {...settings}>
          {brandsImg.map((item, index) => {
            return (
              <div key={index} className="">
                <img
                  src={item.brandUrl}
                  className="h-[60%] w-[50%]"
                  alt="galleryimages"
                  loading="lazy"
                />
              </div>
            );
          })}
        </Slider>
        </div>
      </div>
    </>
  );
};
export default About;
