import { Helmet } from "react-helmet";
import LOCAL_IMAGES from "../../screens/utils/localImages";
import "./LatestWork.css";
const LatestWork = () => {
  return (
    <>
    <Helmet>
    <link rel="preload" as="image" href={LOCAL_IMAGES.monsoonsalon23} />

    </Helmet>
      <div className="font-Cormorant px-3 md:px-10">
        <h2 className="text-[3.5vmax] font-bold  text-center ">
          Our Latest Work
        </h2>
        <div className="flex flex-col lg:flex-row  w-full my-9">
          <div className="w-full    lg:w-1/2">
            <img className="w-full" style={{aspectRatio:"1080 / 917"}} src={LOCAL_IMAGES.monsoonsalon23} alt="Unisex monsoon salon franchise" loading="lazy"/>
          </div>

          <div className="w-full flex items-center justify-center   lg:w-1/2 relative  text-white p-6 lg:p-8 2xl:p-16   bg-[#c1816c]/50">
           <div>
            <p className="relative text-base  md:text-md lg:text-md xl:text-xl 2xl:text-2xl 4xl:text-3xl 4xl:leading-[3rem]   font-semibold text-[#242424]  font-Cormorant italic">
              At Monsoon Salon, we pride ourselves on delivering exceptional
              hair and beauty services that transform your look and boost your
              confidence. Our team of expert stylists and beauty professionals
              stay ahead of the latest trends to ensure you always leave looking
              and feeling your best. From chic haircuts to stunning color
              transformations, bridal makeovers to skin and hair treatments, our
              recent work speaks for itself. 
          
            </p>
            <p  className="relative mt-4 text-base  md:text-md lg:text-md xl:text-xl 2xl:text-2xl 4xl:text-3xl 4xl:leading-[3rem]   font-semibold text-[#242424]  font-Cormorant italic">
              Our portfolio of recent work speaks for itself, showcasing our commitment to quality and
              excellence in every treatment. At Monsoon, we believe that beauty is personal, and we’re
              here to help you achieve your desired look with precision and care. From consultation to the final touch, we ensure a personalized experience that leaves you looking fabulous and feeling
              confident.
          
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestWork;
