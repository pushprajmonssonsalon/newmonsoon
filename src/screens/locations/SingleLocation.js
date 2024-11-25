import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import LOCAL_IMAGES from "../utils/localImages";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Helmet } from "react-helmet";
import { getApiCall } from "../../utils/services";

const SingleLocation = () => {
  const [searchParams] = useSearchParams();
  const isScroll = searchParams.get("scroll");

  const [singleSalonDetail, setSingleSalonDetail] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const apiKey = process.env.REACT_APP_MAP_API_KEY;

  console.log("singleSalonDetail", singleSalonDetail.name);

  useEffect(() => {
    getApiCall(
      `/getSingleSalonDetail?id=${params?.id}`,
      (response) => {
        const data = response;
        setSingleSalonDetail(data);
        setLatitude(data?.latitude);
        setLongitude(data?.longitude);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching salon details:", err);
        setIsLoading(false);
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
        <h1 className="text-center my-4 md:my-9 px-3 font-bold font-[Montserrat]   text-xl md:text-3xl ">
          {singleSalonDetail?.address}{" "}
          <span className="font-medium">{singleSalonDetail?.address2}</span>
        </h1>

        <div className="flex flex-col md:flex-row mt-4 md:mt-8 space-y-4 md:space-y-0 md:space-x-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex-1">
            <p className="font-bold text-lg  md:text-2xl">
              Best Salon in {singleSalonDetail?.address2}{" "}
            </p>
            <p className="mt-4 text-sm md:text-base">
              {`Looking for a rejuvenating salon experience in the heart of `}
              <span className="font-bold">{singleSalonDetail?.address2} </span>
              {`? Look no further! Smart salon Salon is your go-to destination for top-notch beauty and grooming services that will leave you feeling and looking your best. We’re proud to be the premier salon in `}
              <span className="font-bold">{singleSalonDetail.address2}</span>
              {`, and we’re conveniently located to serve you, whether you’re a local resident or just passing through.`}
            </p>
            <p className="mt-4 text-sm md:text-base">
              <span className="font-bold">Expert Stylists:</span>
              {` Our highly skilled and experienced stylists are dedicated to making your salon visit in `}
              <span className="font-bold">{singleSalonDetail?.address2}</span>
              {` a memorable one. They stay updated with the latest trends in hair, skincare, and beauty to provide you with cutting-edge services.`}
            </p>
            <p className="mt-4 text-sm md:text-base">
              <span className="font-bold">Premium Products:</span>
              {` We use only the finest, salon-quality products to ensure that your hair and skin receive the care they deserve. Our product range includes some of the most trusted names in the beauty industry. Best salon in `}
              <span className="font-bold">{singleSalonDetail?.address2}</span>
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
            alt="Salon Detail"
          />
        </div>

        <div
          id="map"
          className="flex flex-col md:flex-row mt-8 space-y-4 md:space-y-0 md:space-x-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
        >
          <div className="flex-1">
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
          </div>

          <div className="flex-1 ">
            <p className="text-lg md:text-2xl font-bold">
              {`Hair Salon in `}
              <span className="font-bold">{singleSalonDetail?.address2}</span>
            </p>
            <p className="mt-4 text-sm md:text-base">
              {` Discover the difference of a salon that cares about your beauty and well-being. Schedule an appointment with us today and experience the excellence that has made us the top choice for those seeking a `}
              <span className="font-bold">{singleSalonDetail?.address2}</span>
              {`. Let us enhance your natural beauty and provide you with a refreshing escape from the hustle and bustle of daily life`}
            </p>
            <p className="mt-4 text-sm md:text-base">
              {`We understand that convenience is key, which is why we’re proud to be the salon that’s “near me” for many residents and visitors in  `}
              <span className="font-bold">{singleSalonDetail?.address2}</span>
              {`. Our central location makes it easy for you to stop by for a quick touch-up or a full day of pampering.`}
            </p>
          </div>
        </div>
        <div className="my-6 md:my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            <div className="flex flex-col p-4 items-center justify-center bg-gray-100 border shadow-md py-12 px-3">
              <IoMdMail className="text-[25px] md:text-[30px]" />
              <h2 className="text-2xl font-bold mt-3 mb-1">Email</h2>

              <span>
                <a
                  href="mailto:enquiry@theprofessionalworld.com"
                  className="text-gray-600 ml-1"
                >
                  enquiry@theprofessionalworld.com
                </a>
              </span>
            </div>
            <div className="flex flex-col p-4 items-center justify-center bg-gray-100 border shadow-md py-12 px-3">
              <FaPhoneAlt className="text-[25px] md:text-[30px]" />
              <h2 className="text-2xl font-bold mt-3 mb-1">Phone</h2>
              <span className="text-base font-normal">
                <a
                  href={`tel:${singleSalonDetail?.phoneNumber}`}
                  className="text-gray-600 ml-1"
                >
                  {singleSalonDetail?.phoneNumber}
                </a>
              </span>
            </div>
            <div className="flex flex-col p-4 items-center justify-center bg-gray-100 border shadow-md py-12 px-3 ">
              <FaWhatsapp className="text-[25px] md:text-[30px]" />
              <h2 className="text-2xl font-bold mt-3 mb-1">Whatsapp</h2>

              <span>
                <a
                  href={`https://wa.me/${singleSalonDetail?.phoneNumber}`}
                  className="text-gray-600 ml-1 "
                  style={{ textAlign: "center", alignItems: "center" }}
                >
                  Click Here to Chat
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLocation;
