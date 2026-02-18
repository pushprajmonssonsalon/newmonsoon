import { Helmet } from "react-helmet";
import LOCAL_IMAGES from "../screens/utils/localImages";
import { Link, useNavigate } from "react-router-dom";
import { AspectRatio } from "@mui/icons-material";
import ReadMoreMobile from "./mainTextcomponent/ReadMoreMobile";
import { useIsSmallScreen } from "../utils/hooks/useSmallScreen";
import { AnimatedNumber } from "./mainTextcomponent/AnimatedNumber";
const Text = () => {
  return (
    <>

      <div className="clear-both md:hidden z-2 relative"></div>

      <p className="relative z-2 font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
        Our <strong className="">unisex salon franchise</strong> offers a prime opportunity to join a leading brand and provide exceptional beauty services to both men and women.
        With our proven business model, you&#39;ll receive full training and ongoing support to ensure growth and profitability. Expand quickly with a scalable system and become part of one of the <strong className="">top salon franchises in India.</strong>
      </p>

      <p className="relative z-2 font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
        Partner with Monsoon Salon today and turn your passion for beauty into a profitable, future-ready
        <Link to="/salon-franchise"><strong className=""> Salon Franchise</strong></Link> business backed by expertise, trust, and rapid national growth. Benefit from a proven business model, comprehensive training, and continuous operational support designed for long-term success. Join a trusted brand that empowers entrepreneurs to grow confidently in India’s fast-expanding beauty and wellness industry.
      </p>
    </>
  )
}
const Header = () => {
  const navigate = useNavigate();
  const handleRedirection = () => {
    navigate("/franchise");
  };
  const isSmallScreen = useIsSmallScreen();
  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={LOCAL_IMAGES.monsoonsalon22} />

      </Helmet>
      <div className="font-roboto roboto-regular">
        <article className="relative z-2 text-pretty">
          <div className="float-right my-auto  ml-2 md:ml-[50px] relative">
            <img
              src={LOCAL_IMAGES.monsoonsalon28}
              style={{ aspectRatio: "1164 / 1479" }}
              className=" float-right relative z-0 object-cover lg:h-[493px] lg:w-[388px] w-[100px] sm:w-auto sm:h-[190.58px] md:h-auto md:w-[196.75px]  transition-transform duration-500 "
              alt="Best monsoon salon franchise"
              loading="lazy"
            />
          </div>
          <h1 className="w-full relative   mb-2 xl:mb-[40px] underline underline-offset-4 text-black text-start text-md font-kotta  md:text-[1.5rem] xl:text-[2.8rem] xl:leading-[3rem]">
            Best Salon Franchise in India
          </h1>
          <p className="relative  font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
            Monsoon Salon is a rising brand catering to clients who seek world-class talent with global expertise. We are dedicated to enhancing our artists’ skills through advanced education, ensuring they provide top-tier service every day. Over the next three to five years, we have a well-defined plan focused on professional training to elevate our team. In the initial phase, Monsoon will strategically establish its presence in 77 cities and 5 Union Territories. Our goal is to open 200 salons in the first two years, with another 200 locations planned for the following two years. Our strong infrastructure will support this expansion and drive our success. Ready to invest in a booming industry?

          </p>
          <div className="absolute  top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center">

            <img src={LOCAL_IMAGES.phool2} className="h-[80%] relative z-0 aspect-square" />
          </div>


          {isSmallScreen ? <ReadMoreMobile>
            <Text />
          </ReadMoreMobile> : <Text />}



          {/* CONTENT */}
          <div className="w-full md:w-[calc(100%-220px)] lg:w-[calc(100%-480px)] h-auto mb-auto">


            {/* <button
      className="bg-black text-white font-medium border px-5 py-2 cursor-pointer mt-4"
      onClick={handleRedirection}
    >
      Know more
    </button> */}
          </div>
        </article>


      </div>
      <div className="h-[40px] clear-both" />
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between my-5">
        <Link to="/franchase-enquiry" className="bg-[#c9a961] flex items-center justify-center w-full sm:w-[300px] text-white px-8 py-3 rounded-lg font-body font-semibold hover:bg-[#b89851] transition-all duration-300 shadow-md hover:shadow-lg">
          Book Appointment
        </Link>
        <div className="flex w-full items-center justify-around">

          {/* Statistics Cards */}
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-display font-bold text-gray-900 mb-1">
              <AnimatedNumber value="212" suffix="+" duration={2000} />

            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-body">Locations in 95+ Cities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-display font-bold text-gray-900 mb-1">
              <AnimatedNumber value="200,000" suffix="+" duration={2000} />

            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-body">Satisfied Clients Annually</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-4xl font-display font-bold text-gray-900 mb-1">
              <AnimatedNumber value="10" suffix="+" duration={2000} />

            </div>
            <div className="text-xs sm:text-sm text-gray-600 font-body">Years of Excellence</div>
          </div>
        </div>

      </div>

    </>
  );
};

export default Header;
