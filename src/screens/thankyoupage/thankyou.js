import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import Slider from "react-slick";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import MainText from "../../components/mainTextcomponent";
import { brandsImg } from "../../screens/utils/dummydata";
import "./thankyou.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function FranchiseThankYou() {
  const navigate = useNavigate();

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
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const nextSteps = [
    "Our franchise team will review your submission",
    "You’ll receive a call/email with detailed information",
    "We’ll help you explore the best opportunities tailored to you",
  ];

  return (
    <Box>
      <Helmet>
        <title>Thank You for Connecting with Monsoon | Franchise Enquiry</title>
        <meta
          name="description"
          content="Thank you for connecting with Monsoon Salon. Our franchise team will review your details and contact you shortly."
        />
        <link rel="canonical" href="https://monsoonsalon.com/thank-you" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Thank You for Connecting with Monsoon | Franchise Enquiry" />
        <meta
          property="og:description"
          content="Thank you for connecting with Monsoon Salon. Our franchise team will review your details and contact you shortly."
        />
        <meta property="og:url" content="https://monsoonsalon.com/thank-you" />
        <meta property="og:image" content="https://monsoonsalon.com/logo1024.png" />
      </Helmet>

      <main className="thankyou-page">
        <section className="thankyou-hero">
          <div className="thankyou-content">
            <p className="thankyou-kicker">Franchise Enquiry Received</p>
            <h1>Thank You for Connecting with Monsoon!</h1>
            <p className="thankyou-lead">
              You’ve just taken the first step toward joining the elite circle
              of beauty pioneers.
            </p>
            <p>
              Our team has received your details and will get in touch with you
              shortly to guide you through the process of opening a Monsoon
              franchise in India.
            </p>
            <p>
              At Monsoon, we don’t just build salons—we create experiences that
              reshape trends, inspire confidence, and set the gold standard in
              salon excellence.
            </p>
          </div>
        </section>

        <section className="thankyou-next">
          <div className="thankyou-inner">
            <h2>What Happens Next?</h2>
            <div className="thankyou-steps">
              {nextSteps.map((step) => (
                <div className="thankyou-step" key={step}>
                  <span>
                    <FaCheck />
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="thankyou-brands">
          <div className="thankyou-inner">
            <h2>Meanwhile…</h2>
            <p>
              Discover the power behind Monsoon’s success through our trusted
              Partner Brands, and get ready to elevate your business to the next
              level.
            </p>
            <button
              type="button"
              className="thankyou-home-button"
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
            <div className="thankyou-slider">
              <MainText textdata={"Partner Brands"} />
              <Slider {...settings}>
                {brandsImg?.map((item, index) => (
                  <div key={index} className="thankyou-brand-slide">
                    <img
                      src={item.brandUrl}
                      width="290"
                      height="166"
                      alt="Monsoon Salon Partner Brand"
                      loading="lazy"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </main>
    </Box>
  );
}
