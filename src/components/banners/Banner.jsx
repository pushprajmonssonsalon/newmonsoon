import Image from "next/image";
import "./Banner.css";
const Banner = ({image,index=0}) => {
  return (
    <>
      <div
        className="md:w-full rounded-[25px]  h-auto md:h-full box-border block overflow-hidden  bg-none opacity-100 border-0 m-0 p-0 relative"
       
      >
        {/* Apply the className here */}

        <span
          className="box-border block bg-none opacity-100 border-0 m-0  pt-[55.75%] md:pt-[35.75%] "
        
        />
        <Image
          fill
          priority={index === 0}
          fetchPriority={index === 0 ? "high" : "low"}
          sizes="(max-width: 768px) 100vw, 1200px"
          src={image}
          alt={`Luxury Salon Franchise ${index + 1}`}
          className="border border-silverSurfer-300 absolute inset-0 box-border p-0 border-none m-auto block w-full h-full object-cover img-styles"
        />

      </div>
    </>
  );
};

export default Banner;
