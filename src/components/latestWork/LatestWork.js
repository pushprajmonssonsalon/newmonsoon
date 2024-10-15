import LOCAL_IMAGES from "../../screens/utils/localImages";
import "./LatestWork.css";
const LatestWork = () => {
  return (
    <>
      <div className="font-Cormorant px-3 md:px-10">
        <h2 className="text-[3.5vmax]  text-center ">
          Our Latest Work
        </h2>
        <div className="flex flex-col lg:flex-row  my-9">
          <div className="w-full h-[35vh] md:h-[50vh] lg:h-[55vh]   lg:w-1/2">
            <img className="h-full w-full" src={LOCAL_IMAGES.monsoonsalon23} />
          </div>

          <div className="w-full  lg:h-[55vh] lg:w-1/2 relative flex items-center text-white justify-center p-9 lg:px-16 bg-[#c1816c]/50">
           
            <p className="relative text-lg  md:text-2xl leading-[1.6] font-semibold text-[#242424]  font-Cormorant italic">
              At Monsoon Salon, we pride ourselves on delivering exceptional
              hair and beauty services that transform your look and boost your
              confidence. Our team of expert stylists and beauty professionals
              stay ahead of the latest trends to ensure you always leave looking
              and feeling your best. From chic haircuts to stunning color
              transformations, bridal makeovers to skin and hair treatments, our
              recent work speaks for itself. 
          
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LatestWork;
