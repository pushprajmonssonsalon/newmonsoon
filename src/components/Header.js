import { Helmet } from "react-helmet";
import LOCAL_IMAGES from "../screens/utils/localImages";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@mui/icons-material";

const Header = () => {
  const navigate = useNavigate();
  const handleRedirection = () => {
    navigate("/franchise");
  };
  return (
    <>
    <Helmet>
    <link rel="preload" as="image" href={LOCAL_IMAGES.monsoonsalon22} />

    </Helmet>
    <div className="flex px-3 md:px-10 lg:px-6 xl:px-7 flex-col lg:flex-row  lg:gap-6 xl:gap-9 font-Cormorant justify-between items-center w-full mt-4 lg:mt-20 mb-5 lg:mb-10 roboto-regular ">
      <div className=" w-full relative py-2  mb-auto">
          <div className="w-full px-0 ">
            <div className="w-full relative ">
              <img
                src={LOCAL_IMAGES.monsoonsalon22}
                style={{aspectRatio:"1360 / 906"}}
                className="w-full my-auto   relative z-0 "
                alt={`Best monsoon salon franchise`}
                loading="lazy"
              />
              <a
                href="#"
                className="absolute w-full h-full top-0 left-0 bg-black opacity-0 z-1 transition-opacity duration-300 hover:opacity-40 "
              ></a>
            </div>
          </div>
      </div>

      <div className="w-full  h-auto    mb-auto">
          <h1 className="w-full font-bold   py-2 lg:mt-2 text-black text-start   text-xl font-roboto  md:text-[2rem] lg:text-[1.8rem]   xl:text-[2.8rem] xl:leading-[3rem]  ">
            Best Salon Franchise in India
          </h1>
        
          <p className="text-md font-normal text-gray-800 font-roboto lg:text-[0.71rem] xl:text-[0.89rem] 2xl:text-[1rem] 3xl:text-[1.2rem] 3xl:leading-8  py-1  text-balance">
          Monsoon Salon is a rising brand catering to clients who seek world-class talent with global expertise. We are dedicated to enhancing our artists’ skills through advanced education, ensuring they provide top-tier service every day. Over the next three to five years, we have a well-defined plan focused on professional training to elevate our team. In the initial phase, Monsoon will strategically establish its presence in 77 cities and 5 Union Territories. Our goal is to open 200 salons in the first two years, with another 200 locations planned for the following two years. Our strong infrastructure will support this expansion and drive our success. 
          Ready to invest in a booming industry?
                   </p>
          <p className="text-md font-normal text-gray-800 font-roboto lg:text-[0.71rem] xl:text-[0.89rem] 2xl:text-[1rem] 3xl:text-[1.2rem] 3xl:leading-8  py-1  text-balance">
         Our <strong>unisex salon franchise</strong> offers a prime
opportunity to join a leading brand and provide exceptional beauty services to both men and
women.
With our proven business model, you&#39;ll receive full training and ongoing support to ensure
growth and profitability. Expand quickly with a scalable system and become part of one of
the <strong>top salon franchises in India.</strong>
                   </p>
     
        <button
          className=" bg-black text-white font-medium border   px-5 py-2 cursor-pointer"
          onClick={handleRedirection}
        >
          Know more
        </button>
      </div>
    </div>
    </>
  );
};

export default Header;
