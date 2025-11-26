import { Helmet } from "react-helmet";
import InstaCard from "../../components/Cards/InstaCard";
import Banner from "../../components/banners/Banner";
import LOCAL_IMAGES from "../utils/localImages";
import "./gallery.css";
const NewGallery = () => {
  const urls = [
    "https://www.instagram.com/reel/C4fp6NZpCCs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C-PBKBEyTDA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C-pTZqVyuO4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C62uWqBJYvR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/reel/C4mhzkOteie/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C-XD1T_S6qO/?utm_source=ig_embed&amp;utm_campaign=loading",
    "https://www.instagram.com/p/C9_mDR1gsjq/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C9T2EEStR19/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C7gH71mphaA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/reel/C7BHugyJ66F/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C6p7uHRJeGO/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/reel/C6gZ6wBJu9D/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C6DVoTQJ_E4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/reel/C1tbQcvpvv5/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",

    "https://www.instagram.com/reel/C37p5UdJkCr/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/reel/Csc5vq0IrbA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/reel/Ce1LodtuPVt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    "https://www.instagram.com/p/C-90lRwpcFZ/",
  ];

  return (
    <>
      <Helmet>
        <title>
         Monsoon Salon | Ladies Beauty Parlour, Beauty Clinic & Salon Franchise
        </title>
        <meta
          name="description"
          content="Monsoon Salon – a leading ladies beauty parlour franchise, beauty clinic franchise & ladies salon franchise with premium beauty services and proven success."
        />
        <meta
          name="keywords"
          content="monsoon salon media, salon franchise news, media coverage, franchise success stories, beauty industry news, salon updates"
        />
        <link rel="canonical" href="https://monsoonsalon.com/media" />

        <link rel="preload" as="image" href={LOCAL_IMAGES.gallery2} />
      </Helmet>
      <div className=" max-w-full overflow-x-hidden">
        <div className="mb-10">
          <Banner image={LOCAL_IMAGES.gallery2} />
        </div>
           <div className="mt-8 md:mt-16 text-center w-[95%] md:w-[80%] mx-auto">
            <h1 className="font-bold text-xl leading-2xl  px-6  md:text-[2.5rem] md:leading-[3rem] mb-4">
             Monsoon Salon: Media Coverage and Highlights of Our Premium Beauty
          Services and Franchise Success
            </h1>
            </div>

        <p className="text-lg py-6 text-balance md:text-center w-[80%] mx-auto  text-regel-gray">

          Monsoon Salon is proud to be a leader in the beauty and wellness industry, offering a
          premium range of services that cater to every beauty need. Our commitment to excellence
          and customer satisfaction has earned us widespread recognition in the media, with features in
          top beauty and lifestyle publications. From haircuts and styling to facials, manicures,
          pedicures, and advanced skincare treatments, Monsoon Salon combines luxury with the latest
          beauty trends to give our clients an exceptional salon experience.
          Our franchise success is a testament to the quality of our services and the trust our clients
          place in us. We have expanded our footprint across the country, with multiple locations
          offering a high standard of beauty services. Each Monsoon Salon is a hub of professionalism,
          where our skilled beauty experts use only premium products and state-of-the-art equipment to
          deliver outstanding results.
          In addition to our personalized beauty services, Monsoon Salon also offers exclusive
          packages tailored to suit every client&#39;s individual needs. Our team of stylists, skincare
          specialists, and wellness experts are trained to provide treatments that leave clients feeling
          rejuvenated, confident, and looking their best.
          The growing media buzz surrounding Monsoon Salon highlights our commitment to both
          beauty excellence and business growth. Our franchise model offers aspiring entrepreneurs an
          opportunity to be part of a trusted brand that delivers both financial success and customer
          satisfaction. As we continue to grow, we aim to redefine beauty standards and provide top-
          tier services to all.

        </p>
        <div className="my-16 grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 gap-6 w-[90%] md:w-[85%] 2xl:w-[75%] mx-auto ">
          {urls.map((url, index) => (
            <div key={index} className="mx-auto w-fit">
              <InstaCard url={url} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewGallery;
