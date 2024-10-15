import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./gallery.css";
import { galleryImagesData } from "../utils/dummydata";
import Banner from "../../components/banners/Banner";
import LOCAL_IMAGES from "../utils/localImages";
import { Helmet } from "react-helmet";

export default function Gallery() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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

      </Helmet>
   
    <div className="">
      <div className="mb-10">
        <Banner image={LOCAL_IMAGES.gallery} />
      </div>
      <div className=" w-[95%] my-16 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {galleryImagesData.map((elm, index) => (
          <div className="grid gap-4" key={index}>
         {elm.images.map((item,idx)=>(
          <div key={idx}>
              <img
                className="h-auto max-w-full rounded-lg"
                src={item.galleryimg}
                alt=""
              />
            </div>
         )) }
          
          </div>
        ))}
      </div>

      

   
    </div>
    </>
  );
}
