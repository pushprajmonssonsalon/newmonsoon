import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import LOCAL_IMAGES from "../utils/localImages";
import { FaMailBulk, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { getApiCall } from "../../utils/services";

const SingleLocation = () => {
  const [searchParams] = useSearchParams();
  const isScroll = searchParams.get("scroll");

  const [singleSalonDetail, setSingleSalonDetail] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const params = useParams();



  useEffect(() => {
    getApiCall(
      `/getSingleSalonDetail?id=${params?.id}`,
      (response) => {
        const data = response;
        setSingleSalonDetail(data);
        setLatitude(data?.latitude);
        setLongitude(data?.longitude);
      },
      (err) => {
        console.error("Error fetching salon details:", err);
      }
    );
  }, [params.id]);
  const scrollToDivWithOffset = useCallback(() => {
    const element = document.getElementById("map");
    if (element) {
      const offset = 100; // Offset of 100px
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Smooth scroll
      });
    }
  }, [isScroll]);

  useEffect(() => {
    if (isScroll) {
      scrollToDivWithOffset(isScroll);
    }
  }, [isScroll]);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <>
      <Helmet></Helmet>

      <div className="flex flex-col items-center">
        {/* <h1 className="text-center my-4 md:my-9 px-3 font-bold font-[Montserrat]   text-xl md:text-3xl ">
          {singleSalonDetail?.address}{" "}
          <span className="font-medium">{singleSalonDetail?.stateName}</span>
        </h1> */}

        <div className="flex flex-col md:flex-row mt-4 md:mt-8 space-y-4 md:space-y-0 md:space-x-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex-1">
            <p className="font-bold text-lg  md:text-2xl">
              Best Salon in {singleSalonDetail?.stateName}{" "}
            </p>
            <p className="mt-4 text-sm md:text-base">
              {`Looking for a rejuvenating salon experience in the heart of `}
              <span className="font-bold">{singleSalonDetail?.stateName} </span>
              {`? Look no further! Smart salon Salon is your go-to destination for top-notch beauty and grooming services that will leave you feeling and looking your best. We’re proud to be the premier salon in `}
              <span className="font-bold">{singleSalonDetail.stateName}</span>
              {`, and we’re conveniently located to serve you, whether you’re a local resident or just passing through.`}
            </p>
            <p className="mt-4 text-sm md:text-base">
              <span className="font-bold">Expert Stylists:</span>
              {` Our highly skilled and experienced stylists are dedicated to making your salon visit in `}
              <span className="font-bold">{singleSalonDetail?.stateName}</span>
              {` a memorable one. They stay updated with the latest trends in hair, skincare, and beauty to provide you with cutting-edge services.`}
            </p>
            <p className="mt-4 text-sm md:text-base">
              <span className="font-bold">Premium Products:</span>
              {` We use only the finest, salon-quality products to ensure that your hair and skin receive the care they deserve. Our product range includes some of the most trusted names in the beauty industry. Best salon in `}
              <span className="font-bold">{singleSalonDetail?.stateName}</span>
            </p>
          </div>

          <img
            src={
              singleSalonDetail?.images?.length > 0
                ? singleSalonDetail?.images[0]
                : LOCAL_IMAGES.IMAGE1
            }
            className="w-full rounded-md md:w-1/2 aspect-[16/9] object-cover"
            loading="lazy"
            alt="Monsoon Salon"
          />
        </div>

        <div
          id="map"
          className="flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
        >
          {/* <div className="flex-1">
            {latitude && longitude && (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}`}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
          </div> */}

          <div className="flex-1 ">
            <p className="text-lg md:text-2xl font-bold">
              {`Hair Salon in `}
              <span className="font-bold">{singleSalonDetail?.stateName}</span>
            </p>
            <p className="mt-4 text-sm md:text-base">
              {` Discover the difference of a salon that cares about your beauty and well-being. Schedule an appointment with us today and experience the excellence that has made us the top choice for those seeking a `}
              <span className="font-bold">{singleSalonDetail?.stateName}</span>
              {`. Let us enhance your natural beauty and provide you with a refreshing escape from the hustle and bustle of daily life`}
            </p>
            <p className="mt-4 text-sm md:text-base">
              {`We understand that convenience is key, which is why we’re proud to be the salon that’s “near me” for many residents and visitors in  `}
              <span className="font-bold">{singleSalonDetail?.stateName}</span>
              {`. Our central location makes it easy for you to stop by for a quick touch-up or a full day of pampering.`}
            </p>
          </div>
        </div>
        {/* Enhanced Contact Section */}
      <div className="mt-12 w-full bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Ready to Transform Your Look?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a 
            href="mailto:enquiry@theprofessionalworld.com"
            className="group flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <FaMailBulk className="text-blue-500 group-hover:text-blue-600 mb-3" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 text-center text-sm">
              enquiry@theprofessionalworld.com
            </p>
          </a>
          
          <a 
            href="tel:+919315743367"
            className="group flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <FaPhone className="text-green-500 group-hover:text-green-600 mb-3" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Now</h3>
            <p className="text-gray-600 text-center text-sm">
              +91 9315743367
            </p>
          </a>
          
          <a 
            href="https://wa.me/+919315743367"
            className="group flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            <FaWhatsapp className="text-green-500 group-hover:text-green-600 mb-3" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 text-center text-sm">
              Click to Chat
            </p>
          </a>
        </div>
      </div>
      </div>
    </>
  );
};

export default SingleLocation;
