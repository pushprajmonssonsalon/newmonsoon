import { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LOCAL_IMAGES from "../utils/localImages";
import { FaMailBulk, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { getApiCall } from "../../utils/services";


const salonFranchiseData = [
  {
    state: "Maharashtra",
    text: "Salon Franchise in Mumbai Near Me | Monsoon Salon",
    description:
      "Start your own salon franchise in Mumbai near me with Monsoon Salon. Get full support, training, and a trusted brand to grow your beauty business."
  },
  {
    state: "Meghalaya",
    text: "Salon Franchise in Meghalaya Near Me | Monsoon Salon",
    description:
      "Explore salon franchise opportunities in Meghalaya and start a successful beauty business with complete guidance and support."
  },
  {
    state: "Uttar Pradesh",
    text: "Salon Franchise Uttar Pradesh | Start Your Beauty Business in UP",
    description:
      "Looking for a salon franchise near me in Uttar Pradesh? Explore top salon franchise opportunities in UP and launch your successful beauty business with expert support and proven models."
  },
  {
    state: "Assam",
    text: "Salon Franchise Assam | Start Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Assam? Explore top opportunities and start your profitable beauty business with expert support."
  },
  {
    state: "Jharkhand",
    text: "Salon Franchise Jharkhand | Start Your Beauty Business",
    description:
      "Launch your beauty business in Jharkhand with trusted salon franchise opportunities and complete support for growth."
  },
  {
    state: "West Bengal",
    text: "Salon Franchise West Bengal | Start Your Beauty Business",
    description:
      "Find top salon franchise opportunities in West Bengal and start a successful beauty business with full support and training."
  },
  {
    state: "New Delhi",
    text: "Salon Franchise New Delhi | Start Your Beauty Business",
    description:
      "Find a salon franchise near me in New Delhi and launch your beauty business with top franchise opportunities and expert guidance."
  },
  {
    state: "Telangana",
    text: "Salon Franchise Telangana | Launch Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Telangana? Discover top opportunities and start your successful beauty business today."
  },
  {
    state: "Tamil Nadu",
    text: "Salon Franchise Tamil Nadu | Launch Your Beauty Business",
    description:
      "Explore salon franchise opportunities in Tamil Nadu and launch a profitable beauty business with full support."
  },
  {
    state: "Rajasthan",
    text: "Salon Franchise Rajasthan | Start Your Beauty Business",
    description:
      "Explore a salon franchise near me in Rajasthan and start a profitable beauty business with expert guidance and proven franchise models."
  },
  {
    state: "Chandigarh",
    text: "Salon Franchise Chandigarh | Start Your Beauty Business",
    description:
      "Searching for a salon franchise near me in Chandigarh? Launch your beauty business with top franchise support and expert guidance."
  },
  {
    state: "Ladakh",
    text: "Salon Franchise Ladakh | Launch Your Beauty Business",
    description:
      "Find a salon franchise near me in Ladakh and start a successful beauty business with trusted franchise opportunities and expert support."
  },
  {
    state: "Manipur",
    text: "Salon Franchise Manipur | Start Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Manipur? Explore top opportunities to launch your profitable beauty business successfully."
  },
  {
    state: "Madhya Pradesh",
    text: "Salon Franchise MP | Launch Your Beauty Business",
    description:
      "Find a salon franchise near me in Madhya Pradesh and start a successful beauty business with expert guidance and proven franchise models."
  },
  {
    state: "Arunachal Pradesh",
    text: "Salon Franchise AP | Start Your Beauty Business",
    description:
      "Explore salon franchise opportunities in Arunachal Pradesh and launch a successful beauty business with complete support."
  },
  {
    state: "Andhra Pradesh",
    text: "Salon Franchise Andhra Pradesh | Start Your Beauty Business",
    description:
      "Explore a salon franchise near me in Andhra Pradesh and launch your profitable beauty business with top franchise support and expert guidance."
  },
  {
    state: "Jammu Kashmir",
    text: "Salon Franchise Jammu Kashmir | Start Your Beauty Business",
    description:
      "Find salon franchise opportunities in Jammu & Kashmir and start your beauty business with complete training and guidance."
  },
  {
    state: "Punjab",
    text: "Salon Franchise Punjab | Start Your Beauty Business",
    description:
      "Looking for a salon franchise near me in Punjab? Discover top franchise opportunities to grow your beauty business successfully."
  },
  {
    state: "Haryana",
    text: "Salon Franchise Haryana | Launch Your Beauty Business",
    description:
      "Find a salon franchise near me in Haryana and start a successful beauty business with expert support and proven franchise models."
  }
];

const SingleLocation = () => {
  const [searchParams] = useSearchParams();
  const isScroll = searchParams.get("scroll");
  
  const [singleSalonDetail, setSingleSalonDetail] = useState({});
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [otherLocations, setOtherLocations] = useState([]);
  const params = useParams();



  useEffect(() => {
    getApiCall(
      `getSingleSalonDetail?id=${params?.id}`,
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

  useEffect(() => {
    getApiCall(
      "salons",
      (res) => {
        setOtherLocations(res?.filter((elm) => elm._id !== params?.id) || []);
      },
      (err) => {}
    );
  }, [params.id]);

  const nearbyLocations = [
    ...otherLocations.filter((elm) => elm.stateName === singleSalonDetail?.stateName),
    ...otherLocations.filter((elm) => elm.stateName !== singleSalonDetail?.stateName),
  ].slice(0, 5);
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
  
  const obj={
    text: `Salon Franchise  ${singleSalonDetail?.stateName || ""} | Start Your Beauty Business`,
    description:`Looking for a salon franchise near me in ${singleSalonDetail?.stateName || ""}? Explore top opportunities and start your profitable beauty business with expert support.`
  }
  const salonData =salonFranchiseData?.find((elm)=>elm.state===singleSalonDetail?.stateName)||obj
  const metaTitle =salonData?.text;
  const metaDescription =salonData?.description;
  return (
    <>
      <Helmet>
        <title>
          {metaTitle}
        </title>
        <meta
          name="description"
          content={metaDescription}
        />
        <link rel="canonical" href={`https://monsoonsalon.com/salon-location-near-me/${params?.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={`https://monsoonsalon.com/salon-location-near-me/${params?.id}`} />
        <meta
          property="og:image"
          content={singleSalonDetail?.images?.length > 0 ? singleSalonDetail.images[0] : "https://monsoonsalon.com/logo1024.png"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta
          name="twitter:image"
          content={singleSalonDetail?.images?.length > 0 ? singleSalonDetail.images[0] : "https://monsoonsalon.com/logo1024.png"}
        />
        {singleSalonDetail?.stateName && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              name: `Monsoon Salon - ${singleSalonDetail?.stateName}`,
              image: singleSalonDetail?.images?.length > 0 ? singleSalonDetail.images[0] : "https://monsoonsalon.com/logo1024.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: singleSalonDetail?.address || "",
                addressRegion: singleSalonDetail?.stateName || "",
                addressCountry: "IN",
              },
              ...(latitude && longitude
                ? { geo: { "@type": "GeoCoordinates", latitude, longitude } }
                : {}),
              url: `https://monsoonsalon.com/salon-location-near-me/${params?.id}`,
            })}
          </script>
        )}
        {singleSalonDetail?.stateName && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://monsoonsalon.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Salon Locations",
                  item: "https://monsoonsalon.com/salon-location-near-me",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: singleSalonDetail?.stateName,
                  item: `https://monsoonsalon.com/salon-location-near-me/${params?.id}`,
                },
              ],
            })}
          </script>
        )}
      </Helmet>

      <div className="flex flex-col items-center">
        {/* <h1 className="text-center my-4 md:my-9 px-3 font-bold font-[Montserrat]   text-xl md:text-3xl ">
          {singleSalonDetail?.address}{" "}
          <span className="font-medium">{singleSalonDetail?.stateName}</span>
        </h1> */}

        <div className="flex flex-col md:flex-row mt-4 md:mt-8 space-y-4 md:space-y-0 md:space-x-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex-1">
            <h1 className="font-bold text-lg  md:text-2xl">
              Best Salon in {singleSalonDetail?.stateName}{" "}
            </h1>
            <p className="mt-4 text-sm md:text-base">
              {`Looking for a rejuvenating salon experience in the heart of `}
              <span className="font-bold">{singleSalonDetail?.stateName} </span>
              {`? Look no further! Monsoon Salon is your go-to destination for top-notch beauty and grooming services that will leave you feeling and looking your best. We’re proud to be the premier salon in `}
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
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop if fallback also fails
              e.target.src = LOCAL_IMAGES.IMAGE1; // Use your local fallback image
            }}
            alt={`${singleSalonDetail?.name} ${singleSalonDetail?.stateName}`}
            style={{ objectFit: "cover" }}
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

        {nearbyLocations.length > 0 && (
          <div className="mt-12 w-full">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Other Salon Locations
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {nearbyLocations.map((elm) => (
                <Link
                  key={elm._id}
                  to={`/salon-location-near-me/${elm._id}`}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium text-gray-800"
                >
                  Salon Franchise in {elm.stateName}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleLocation;
