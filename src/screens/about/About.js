import "./Aboutus.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LOCAL_IMAGES from "../utils/localImages";
import { Helmet } from "react-helmet";
import { brandsImg } from "../utils/dummydata";
import Banner from "../../components/banners/Banner";
import { FaAward, FaGlobe, FaHandSparkles, FaLocationPin, FaUser } from "react-icons/fa6";
import { IoIosTrendingUp } from "react-icons/io";
import { Link } from "react-router-dom";

const About = () => {
  const settings = {
    dots: false,
    // infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // lazyLoad: true,

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
          Monsoon Salon Franchise - About us | Trusted Monsoon Salon
        </title>
        <meta
          name="description"
          content="About Us - Monsoon Salon Franchise is a premier name in India’s beauty industry, offering luxurious salon services and a reliable franchise model. Visit us today and experience the difference."
        />
        <meta
          name="keywords"
          content="about monsoon salon, monsoon salon information, monsoon about us, monsoon salon profile"
        />
        <link rel="canonical" href="https://monsoonsalon.com/about-us" />

        {brandsImg.map((elm) => (
          <link rel="preload" as="image" href={elm.brandUrl} />
        ))}
        <link rel="preload" as="image" href={LOCAL_IMAGES.aboutuspage} />
        <link rel="preload" as="image" href={LOCAL_IMAGES.about} />

        <meta
          name="description"
          content="The Monsoon Salon is a young brand for the refined consumer that is after International experience with exceptional talent that is on a continuous journey."
        />
        <meta
          name="keywords"
          content="about Monsoon Salon, Monsoon Salon information, Monsoon Salon about us, Monsoon Salon profile"
        />
      </Helmet>
      <div className="maincontainer">
        <div className="relative">
          <Banner image={LOCAL_IMAGES.aboutuspage} />
             <div className="absolute top-0 left-0 bottom-0 w-full h-full  overflow-hidden bg-black/10 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-4">
              Refresh. Rejuvenate. Rediscover You.
            </p>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>
        </div>
      </div>
        </div>
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
   

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <FaHandSparkles className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Monsoon Salon: Where Global Expertise Meets Local Passion</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              At <strong>Monsoon Salon</strong>, we are more than just a salon—we are a movement redefining beauty and hairdressing in India. Born as a young, dynamic brand, we cater to the refined consumer seeking <strong>international-level experiences</strong> delivered by exceptional talent. Our team is on a constant journey of growth, skill development, and refinement, ensuring we bring you not just what you ask for, but what you truly need—empowered by education and expertise.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <IoIosTrendingUp className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Our Philosophy: Growth, Evolution, and Opportunity</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              In a salon industry that's evolving rapidly in India, we believe that standing still is not an option. Our brand has consciously evolved to stay deeply connected with our audience while building a team-centric structure. We are committed to creating opportunities for our people—developing skilled professionals who can thrive and succeed independently in this fast-paced industry. At Monsoon, <strong>growth is shared</strong>; we invest significant time and resources into the continuous training and upskilling of our team because we believe that with the right people, anything is possible.
            </p>
          </div>
        </section>

        {/* Meaning of Monsoon */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <FaAward className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">The Meaning of Monsoon</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              The name <strong>Monsoon</strong> represents <strong>renewal, rejuvenation, and a fresh perspective.</strong> Just like the refreshing rains after a long dry spell, our approach is vibrant, romantic, colorful, and full of life. We bring energy, passion, and world-class standards to everything we do. Our goal is to ensure Monsoon Salon is not only a leader in the Indian market but also admired globally for skills and service that stand alongside the world's best salons.
            </p>
          </div>
        </section>

        {/* Growth Story */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <FaLocationPin className="w-8 h-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Our Growth Story</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              With <strong>over 212+ salons across 95+ cities and 4 Union Territories</strong>, Monsoon Salon is already a well-established name with ambitious plans for the future. Over the next 3-5 years, we are set to <strong>expand strategically with precision and finesse.</strong>
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">Phase 1</div>
                <p className="text-gray-600">Solidify presence as market leaders across key cities in India</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
                <p className="text-gray-600">New salons within three years</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-600">Additional locations in the following two years</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              We have built a robust infrastructure to support this expansion and will grow thoughtfully, ensuring all aspects of our business are aligned and fully prepared for scale.
            </p>
          </div>
        </section>

        {/* Global Experience for Locals */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <FaUser className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Giving Locals a Global Experience</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              While Monsoon Salon has made its mark across metropolitan cities, our real triumph lies in creating access to <strong>premium beauty services in emerging Tier 2 and Tier 3 markets</strong>. Cities like Indore, Bhopal, Lucknow, Ludhiana, Jalandhar, Ranchi, Dehradun, and Chandigarh are becoming hotbeds of economic activity, and with that comes a growing demand for quality grooming and wellness services.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our goal is to <strong>bridge that gap by introducing Monsoon Salon's signature blend of style, professionalism, and personal care</strong> into these regions. With each new salon, we're not just opening doors, we're creating jobs, upskilling beauty professionals, and setting benchmarks in service excellence.
            </p>
          </div>
        </section>

        {/* International Foundations */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              <FaGlobe className="w-8 h-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Laying International Foundations</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              While India continues to be our primary market, Monsoon Salon's vision doesn't stop at national borders. With a franchise model that has proven successful in diverse Indian markets, we are now setting our sights on international waters.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Countries with a strong South Asian presence—such as the UAE, Nepal, Bhutan are ideal launchpads for our global journey. <strong>This is not just an expansion; it's a cultural export</strong>—of Indian hospitality, beauty expertise, and entrepreneurial vision.
            </p>
          </div>
        </section>

        {/* Franchise Ecosystem */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Franchise Ecosystem for the Future</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              At the heart of this expansion lies our robust franchise ecosystem. <strong>Built on transparency, profitability, and consistent support, our model is designed for scale.</strong> Each franchisee is given access to advanced software systems for customer management, marketing support, HR training modules, inventory controls, and real-time analytics.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our in-house Monsoon Academy offers structured programs in hair, skin, nails, and makeup, producing a steady stream of salon-ready professionals who are up-to-date with the latest global trends and techniques.
            </p>
          </div>
        </section>

        {/* Looking Ahead */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Looking Ahead</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Monsoon Salon's journey so far has been one of agility, innovation, and deep customer connection. But what truly sets us apart is our ability to scale while maintaining a boutique-like attention to detail. Our vision for the next five years is crystal clear: <strong>to democratize high-quality salon services across India and beyond.</strong> We're not just building a brand—we're shaping the future of beauty and wellness, one salon at a time.
            </p>
          </div>
        </section>

        {/* The Monsoon Difference */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Monsoon Difference</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Monsoon Salon, we don't just follow trends—we set them. We combine international level of <strong>education, exposure, and a deep understanding of the Indian consumer</strong> to offer unmatched experiences. Driven by passion, committed to excellence, and focused on building a legacy that inspires beauty professionals across the country, <strong>we craft confidence, one style at a time</strong>.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Own Salon Success Story?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join the Monsoon Salon family and become part of India's fastest-growing beauty and wellness brand. With a proven franchise model, comprehensive training, strong brand support, and unmatched ROI, your journey to building a thriving salon business starts here.
            </p>
            <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-6">
              <p className="text-xl font-semibold">
                Own a Monsoon Salon franchise today — where beauty meets business.
              </p>
            </div>
            <Link to="/franchise-enquiry" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg">
              Get in touch with us today
            </Link>
          </div>
        </section>
      </div>
    </div>


        <h2 className="text-[2rem] md:text-[3rem] w-fit my-6 font-medium font-poppins mx-auto ">
          Partner Brands
        </h2>
        <div className="overflow-hidden">
          <Slider {...settings}>
            {brandsImg.map((item, index) => {
              return (
                <div key={index} className="">
                  <img
                    src={item.brandUrl}
                    className="h-[60%] w-[50%]"
                    alt="Monsoon Salon"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default About;
