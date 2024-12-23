import { useRef } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const InstaSlider = () => {
    const sliderRef = useRef();

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };
    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    
        speed: 1000,
    
      
        // arrows: false,
       }
  const images = [
    "https://images.unsplash.com/photo-1660732421012-83b2c4eb49ff?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1721323960623-fdae1ec6c644?q=80&w=1622&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <>
      <div style={{}} className="relative ">
        <Slider ref={sliderRef} {...settings} >
          {images.map((image, index) => (
            <>
              {" "}
              <Link to={`/`} className="h-full" >
                <div
                  key={index}
                  className="md:w-full  h-full md:h-full box-border block overflow-hidden  bg-none opacity-100 border-0 m-0 p-0 relative"
                  style={{
                    width: "initial",
                  }}
                >
                  {/* Apply the className here */}

                  <span
                    className="box-border h block bg-none opacity-100 border-0 m-0  pt-[110%]"
                    style={{
                      width: "initial",
                      height: "initial",

                      // padding: "55.75% 0px 0px",
                    }}
                  />
                  <img
                    loading="lazy"
                    sizes="100vw"
                    src={image}
                    alt={`Monsoon Salon`}
                    decoding="async"
                    data-nimg="responsive"
                    className="absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0"
                    style={{
                      aspectRatio: "auto",
                      minWidth: "100%",
                      maxWidth: "100%",
                      minHeight: "100%",
                      maxHeight: "100%",
                    }}
                  />

                </div>
              </Link>
            </>
          ))}
        </Slider>

        <div className="arrow-containerbrand">
          <button
            className="text-2xl md:text-3xl absolute top-1/2 left-1"
            onClick={goToPrev}
          >
            <IoIosArrowDropleftCircle className="text-white" />
          </button>
          <button
            className="text-2xl md:text-3xl absolute top-1/2 right-1"
            onClick={goToNext}
          >
            <IoIosArrowDroprightCircle className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default InstaSlider;
