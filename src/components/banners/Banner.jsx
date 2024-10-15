import "./Banner.css";
const Banner = ({image}) => {
  return (
    <>
      <div
        className="md:w-full  h-auto md:h-full box-border block overflow-hidden  bg-none opacity-100 border-0 m-0 p-0 relative"
       
      >
        {/* Apply the className here */}

        <span
          className="box-border block bg-none opacity-100 border-0 m-0  pt-[55.75%] md:pt-[35.75%] "
        
        />
        <img
          loading="lazy"
          lazyboundary="800px"
          sizes="100vw"
          src={image}
          alt={`image`}
          decoding="async"
          data-nimg="responsive"
          className="border border-silverSurfer-300  absolute inset-0 box-border p-0 border-none m-auto block w-0 h-0 img-styles"
          
        />

        {/* <img src={image.image_link} alt={`Slide ${index}`} className='w-full h-full object-cover'/> */}
      </div>
    </>
  );
};

export default Banner;
