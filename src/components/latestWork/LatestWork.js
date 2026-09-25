import LOCAL_IMAGES from "../../screens/utils/localImages";
import "./LatestWork.css";
import { useIsSmallScreen } from "../../utils/hooks/useSmallScreen";
import ReadMoreMobile from "../mainTextcomponent/ReadMoreMobile";
 const Text = () => {
    return (
      <>
  
        {/* <div className="clear-both md:hidden"></div> */}
  
      <p className=" font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
            Our portfolio of recent work speaks for itself, showcasing our commitment to quality and
            excellence in every treatment. At Monsoon, we believe that beauty is personal, and we’re
            here to help you achieve your desired look with precision and care. From consultation to the final touch, we ensure a personalized experience that leaves you looking fabulous and feeling
            confident.

          </p>
      <p className=" font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
            Driven by innovation and a passion for excellence, Monsoon Salon delivers premium hair and beauty
            services designed to enhance your natural charm. Our experienced professionals carefully craft
            every look using modern techniques and trusted products to match your lifestyle and preferences.
            From routine grooming to complete transformations, we focus on comfort, hygiene, and quality at
            every step, ensuring you leave refreshed, confident, and truly satisfied with your experience.

          </p>

      </>
    )
  }
const LatestWork = () => {

 const isSmallScreen =useIsSmallScreen();
 const galleryImagesData = [
  
  
      //        {
      //    galleryimg: LOCAL_IMAGES.monsoonsalon25,
      //  },
     
      
       {
         galleryimg: LOCAL_IMAGES.monsoonsalon20,
       },
        {
         galleryimg: LOCAL_IMAGES.monsoonsalon24,
       },
        {
         galleryimg: LOCAL_IMAGES.monsoonsalon25,
       },
        {
         galleryimg: LOCAL_IMAGES.monsoonsalon26,
       },
       {
         galleryimg: LOCAL_IMAGES.monsoonsalon27,
       },
    
 
   // {
   //   galleryimg: LOCAL_IMAGES.monsoonsalon27,
   // },
 ];
  return (
    <>
      <div className="font-roboto ">
     
        <div className="relative">
        <div className="relative float-left">
         <img
            width="1164"
            height="1479"
            style={{ aspectRatio: "1164 / 1479" }}
            src={LOCAL_IMAGES.monsoonsalon29}
            className="my-auto  relative z-0   mr-2 sm:mr-[30px] md:mr-[50px] xl:mr-[90px] object-cover lg:h-[493px] lg:w-[388px] w-[100px] sm:w-[150px] md:w-[196.75px] transition-transform duration-500 "
            alt="Unisex monsoon salon franchise" loading="lazy" />
 <div className="absolute top-0 right-0 translate-x-[50%] sm:translate-x-[40%] xl:translate-x-[70%] 2xl:translate-x-[140px]">

                      {/* <img src={LOCAL_IMAGES.phool1} className="h-[127.06px] sm:h-[190.59px] md:h-[249.99px] lg:h-[400px] relative  aspect-square"/> */}
          </div>
        </div>
         

          <h2 className="w-full  mb-2 xl:mb-[40px] underline underline-offset-4 text-black text-start text-md font-kotta  md:text-[1.5rem] xl:text-[2.8rem] xl:leading-[3rem]">
          Our Latest Work
        </h2>
        
      <p className=" font-normal text-gray-800 font-jaldi text-[0.89rem] xl:text-[20px] 2xl:text-[20px]  3xl:leading-8 py-1">
            At Monsoon Salon, we pride ourselves on delivering exceptional
            hair and beauty services that transform your look and boost your
            confidence. Our team of expert stylists and beauty professionals
            stay ahead of the latest trends to ensure you always leave looking
            and feeling your best. From chic haircuts to stunning color
            transformations, bridal makeovers to skin and hair treatments, our
            recent work speaks for itself.

          </p>
          {
            isSmallScreen?<ReadMoreMobile>
              <Text/>
            </ReadMoreMobile>:<Text/>
          }
    
        </div>
      </div>
      <div className="h-[40px] clear-both"/>

      <div className="grid grid-cols-3 sm:flex gap-4">
           {galleryImagesData.map((elm, index) => (
                    <div className="" key={index}>
                   
                        <div key={index}>
                          <img
                            width="120"
                            height="60"
                            className="h-[60px] w-[120px] md:h-[100px] md:w-[200px] xl:h-[190px] xl:w-[400px] object-cover rounded-lg"
                            src={elm.galleryimg}
                            alt={elm.name}

                            loading="lazy"
                          />
                        </div>
                    
                    </div>
                  ))}
      </div>
    </>
  );
};

export default LatestWork;
