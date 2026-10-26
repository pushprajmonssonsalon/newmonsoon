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
        <title>
          Monsoon Salon | Beauty Salon & Spa Franchise in India
        </title>
        <meta
          name="description"
          content="Monsoon Salon offers the best beauty salon franchise in India. Start your own salon and spa franchise in India with expert support and high profit potential."
        />
        <meta
          name="keywords"
          content="monsoon salon , explore salon"
        />
        <link
          rel="canonical"
          href="https://monsoonsalon.com/gallery"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Monsoon Salon | Beauty Salon & Spa Franchise in India" />
        <meta
          property="og:description"
          content="Monsoon Salon offers the best beauty salon franchise in India. Start your own salon and spa franchise in India with expert support and high profit potential."
        />
        <meta property="og:url" content="https://monsoonsalon.com/gallery" />
        <meta property="og:image" content="https://monsoonsalon.com/logo1024.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Monsoon Salon | Beauty Salon & Spa Franchise in India" />
        <meta
          name="twitter:description"
          content="Monsoon Salon offers the best beauty salon franchise in India. Start your own salon and spa franchise in India with expert support and high profit potential."
        />
        <meta name="twitter:image" content="https://monsoonsalon.com/logo1024.png" />
        {galleryImagesData?.map((elm) => (
          <link rel="preload" as="image" href={elm.galleryimg} />
        ))}
        <link rel="preload" as="image" href={LOCAL_IMAGES.gallery} />
      </Helmet>

      <div className="">
        <div className="mb-10">
          <Banner image={LOCAL_IMAGES.gallery} />
        </div>
        <div className="mt-8 md:mt-16 text-center w-[95%] md:w-[80%] mx-auto">
          <h1 className="font-bold text-xl leading-2xl  px-6  md:text-[2.5rem] md:leading-[3rem] mb-4">
            Monsoon Beauty Salon Franchise in India
          </h1>
          <p className="text-lg py-6  text-center w-[80%] mx-auto  text-regel-gray">

            Welcome to the Monsoon Salon Gallery! Here, you can explore the vibrant world of our
            <strong> beauty salon franchise</strong> and get a closer look at the stunning salons we’ve established across
            India. Our franchises blend style, comfort, and top-tier beauty services to create an
            unforgettable experience for every client. Whether you&#39;re looking for inspiration or
            considering joining our growing network, this gallery offers a glimpse into what makes our
            salons stand out.

          </p>
          <p className="text-lg py-1  text-center w-[80%] mx-auto  text-regel-gray">

            As one of the leading <strong>beauty salon franchises in India</strong>, Monsoon Salon is committed to
            delivering excellence. Each franchise location is designed with the latest trends, state-of-the-
            art equipment, and a welcoming atmosphere that enhances the customer experience. Our
            salons reflect our commitment to both quality and luxury, providing the best services in the
            industry.

          </p>

          <p className="text-lg py-1  text-center w-[80%] mx-auto  text-regel-gray">Our <strong>salon and spa franchise in India</strong> model combines innovation, scalability, and
            affordability, making it easier for entrepreneurs to run their own beauty business. In this
            gallery, you’ll see examples of how our salons are equipped to offer an extensive range of
            services, from haircuts and styling to luxurious spa treatments all under one roof.</p>
          <p className="text-lg py-6 text-center w-[80%] mx-auto  text-regel-gray">
            Ready to start your own beauty salon franchise with us? Browse through our gallery to see
            how Monsoon Salon locations are designed for success. From interior aesthetics to customer
            satisfaction, our franchises set the standard for beauty and wellness in India.
          </p>
        </div>


        <div className=" w-[95%] my-16 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImagesData.map((elm, index) => (
            <div className="grid gap-4" key={index}>
              {elm.images.map((item, idx) => (
                <div key={idx}>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={item.galleryimg}
                    alt={item.name}
                    
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
