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
      <link rel="preload" as="image" href={LOCAL_IMAGES.gallery2} />

      </Helmet>
      <div className=" max-w-full overflow-x-hidden">
        <div className="mb-10">
          <Banner image={LOCAL_IMAGES.gallery2} />
        </div>
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
