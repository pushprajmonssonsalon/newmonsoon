import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./newfranchise.css";
import { Helmet } from "react-helmet";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MainText from "../../components/mainTextcomponent";
import { brandsImg, franchiseBestData } from "../utils/dummydata";
import { FaCircle, FaRegHourglassHalf } from "react-icons/fa6";
import { FaLocationArrow, FaRegCheckCircle } from "react-icons/fa";
import { FaPersonBooth } from "react-icons/fa6";
import { FaCity } from "react-icons/fa6";
import { states } from "../../utils/states";
import toast from "react-hot-toast";
import CustomInput from "../../components/customInputs/CustomInput";
import CustomSelect from "../../components/customInputs/CustomSelect";
import CustomTextArea from "../../components/customInputs/CustomTextArea";
import { postApiData } from "../../utils/services";
import monsoonsalon from "../../assets/images/monsoon_logo.png"
import monsoonsalonpro from "../../assets/images/monsoon_pro_logo.png"
import monsoonsalonproplus from "../../assets/images/monsoon_proplus_logo.png"
const initialData = {
  firstName: "",
  lastName: "",
  description: "",
  email: "",
  phoneNumber: "",
  salonType: "",
  salonBudget: "",
  state: "",
  city: "",
};
 const salonData = [
    {
      name: "Monsoon",
    },

    {
      name: "Monsoon Pro",
    },
    {
      name: "Smart Salon",
    },
  ];
  const images =[
    {
      img:monsoonsalon
    },
    {
      img:monsoonsalonpro
    },
    {
      img:monsoonsalonproplus

    },
  ]
export default function Newfranchise() {
  const navigate = useNavigate();
  const salonBudgetdata = [
    {
      name: "15 lac  to 30 lac",
    },
    {
      name: "30 lac  to 45 lac",
    },
    {
      name: "55 lac  to 1cr",
    },
    {
      name: "1 cr  to 2 cr",
    },
    {
      name: "2 cr  to 3 cr",
    },
  ];
  const salonFranchiseDiscription = [
    {
      image: <FaLocationArrow className="text-black text-[2.5rem]  " />,
      heading: "212+ locations",
      subHeading: "Two unique business solutions: Salon & Studio",
    },
    {
      image: <FaPersonBooth className="text-black text-[2.5rem]  " />,
      heading: "3000+ Artists & Technicians",
      subHeading: "Globally recognised products and services",
    },
    {
      image: <FaCity className="text-black text-[2.5rem]  " />,
      heading: "95+ Cities 05 Union Territories",
      subHeading: "Continued Business Support Operations, HR, Marketing",
    },
    {
      image: <FaRegHourglassHalf className="text-black text-[2.5rem]" />,
      heading: "8 millions people served till date ",
      subHeading: "A legacy of trust and quality service",
    },
  ];

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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [isSubmited, setIsSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    salonType: "",

    state: "",
    city: "",
  });
  const [formValues, setFormValues] = useState(initialData);
  const validateForm = () => {
    const Regex = /^[6-9][0-9]{9}$/;

    const emailRgx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const errors = {};

    if (!formValues.firstName || formValues.firstName.trim() === "") {
      errors.firstName = "First Name is required";
    }
    if (!formValues.lastName || formValues.lastName.trim() === "") {
      errors.lastName = "Last Name is required";
    }
    if (!formValues.email || !emailRgx.test(formValues?.email)) {
      errors.email = "Email is required";
    }
    if (!formValues.phoneNumber || !Regex.test(formValues?.phoneNumber)) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!formValues.state || formValues.state.trim() === "") {
      errors.state = "State is required";
    }
    if (!formValues.city || formValues.city.trim() === "") {
      errors.city = "City is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePostapiCall = () => {
    // alert("inside sucess");
    setLoading(true);
    postApiData(
      "formFilling",
      formValues,
      (res) => {
        toast.success("form submited successfully ");
        setFormValues(initialData);
        setIsSubmited(true);
        setLoading(false);

        sessionStorage.setItem("isSubmitted", true);
        navigate("/thank-you");
      },
      (err) => {
        setLoading(false);

        toast.error("error submitting response");
      }
    );
    // setTimeout(()=>{
    //     setLoading(false)
    // },1000)
  };
  const submithandle = () => {
    const isValid = validateForm();
    if (!isValid) {
      toast.error("Enter all Fields");
      return;
    }

    handlePostapiCall();


    // // Mock API call with timeout
    //   setLoading(true);
    //   setTimeout(() => {
    //     toast.success("form submited successfully ");
    //     setFormValues(initialData);
    //     setIsSubmited(true);
    //     setLoading(false);

    //     sessionStorage.setItem("isSubmitted", true);
    //     navigate("/thank-you");
    //   }, 1000);
  };

  // Cleanup timeout on component unmount

  const inputFields = [
    {
      name: "firstName",
      label: "First Name",
      value: formValues?.firstName,
      type: "text",
      placeholder: "Enter First Name",
      required: true,
      error: !!formErrors.firstName,
      helperText: formErrors.firstName,
    },
    {
      name: "lastName",
      label: "Last Name",
      value: formValues?.lastName,
      type: "text",
      placeholder: "Enter Last Name",
      required: true,
      error: !!formErrors.lastName,
      helperText: formErrors.lastName,
    },
    {
      name: "email",
      label: "Email",
      value: formValues?.email,
      type: "email",
      placeholder: "Enter Email",
      required: true,
      error: !!formErrors.email,
      helperText: formErrors.email,
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      value: formValues?.phoneNumber,
      type: "tel",
      placeholder: "Enter Phone Number",
      required: true,
      error: !!formErrors.phoneNumber,
      helperText: formErrors.phoneNumber,
    },
  ];
  const selectFields = [
    {
      name: "state",
      label: "Select State*",
      value: formValues?.state,
      options: Object.keys(states)?.map((elm) => ({ name: elm, value: elm })),
      error: !!formErrors.state,
      helperText: formErrors.state,
    },
    {
      name: "city",
      label: "Select City*",
      value: formValues?.city,
      options:
        states[formValues?.state]?.map((elm) => ({ name: elm, value: elm })) ||
        [],
      error: !!formErrors.city,
      helperText: formErrors.city,
    },
     {
      name: "salonType",
      label: "Salon Type*",
      value: formValues?.salonType,
      options: salonData?.map((item) => ({
        name: item.name,
        value: item.name,
      })),
      error: !!formErrors.salonType,
      helperText: formErrors.salonType,
    },

    {
      name: "salonBudget",
      label: "Budget",
      value: formValues?.salonBudget,
      options: salonBudgetdata?.map((item) => ({
        name: item.name,
        value: item.name,
      })),
      error: !!formErrors.salonBudget,
      helperText: formErrors.salonBudget,
    },
  ];

  const descFields = {
    name: "description",
    label: "Comments or Message",
    value: formValues?.description,
    type: "textarea",
    placeholder: "Enter your message",
    required: true,
    multiline: true,
    rows: 3,
  };
  const scrollToDivWithOffset = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 200; // Offset of 100px
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Smooth scroll
      });
    }
  };
  const videoUrl = "https://cdn.salon-kart.com/franchiseVideo2.mp4";

  useEffect(() => {
    const isSubmited = sessionStorage.getItem("isSubmitted");
    if (isSubmited === "true") {
      setIsSubmited(true);
    }
  }, []);
  const brands = [
  {
    id: 1,
    name: "PRO PLUS Smart Salon",
    image: monsoonsalonproplus, // update path
    description:
      "Premium smart salon model ideal for metro & high-street locations.",
  },
  {
    id: 2,
    name: "Monsoon Pro Salon",
    image: monsoonsalonpro,
    description:
      "Mid-range professional salon model with strong ROI & brand support.",
  },
  {
    id: 3,
    name: "Monsoon Salon",
    image:monsoonsalon,
    description:
      "Affordable entry model with trusted brand presence across India.",
  },
];
  console.log(formValues,"formvalues")
  return (
    <>
      <Box>
        <div className="max-w-[100vw] overflow-x-hidden">
          <Helmet>
            <title>
              Best & Low Cost Beauty Salon Franchise in India | Monsoon Salon
            </title>
            <meta
              name="description"
              content="Start your business with Monsoon Salon – the best beauty salon franchise in India. Own a top, low-cost salon franchise with trusted brand support."
            />
            <meta
              name="keywords"
              content="monsoon salon franchise, beauty salon franchise, affordable salon franchise, salon franchise opportunity, franchise for salon"
            />
            <link
              rel="canonical"
              href="https://monsoonsalon.com/franchise-enquiry"
            />

            <link rel="preload" as="video" href={videoUrl} />


            {/* End Google Tag Manager (noscript) */}
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=AW-870359358"
            ></script>
            <script>
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-870359358');
          `}
            </script>
          </Helmet>
          <div className="bg-neutral-100 p-3 relative h-[40vh] sm:h-[60vh] xl:h-[80vh] flex flex-col xl:flex-row items-center gap-12 justify-center">
            <div className="  text-white relative z-[9] drop-shadow-2xl text-center text-[1.9rem] sm:text-[2.7rem] lg:text-[3rem] 2xl:text-[3.8rem] font-extrabold">
              FRANCHISE WITH US
            </div>

            <button
              onClick={() => scrollToDivWithOffset("franchise")}
              className="btn-anim  bg-[#191918]  z-[9] h-[45px] xl:h-[50px] text-white  rounded-[10px] w-[150px] font-poppins overflow-hidden"
            >
              Apply Here
            </button>


            <div className="absolute  z-[2]  w-full top-0 left-0  h-full">
              <video
                className="w-full h-full object-cover"
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                controlsList="nodownload"
              />
              {/* <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/vVxTlq2jMaU?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen>
              </iframe> */}
            </div>
          </div>
          <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
          Our Franchise Brands
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Choose the right franchise model that aligns with your investment
          capacity and city potential.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="h-14 mx-auto object-contain mb-6"
              />

              <h3 className="text-xl font-semibold text-gray-900">
                {brand.name}
              </h3>

            
            </div>
          ))}
        </div>
      </div>
    </section>

          <div id="franchise" className="" style={{ bgcolor: "white" }}>
            <div className="my-6  w-[90%] md:w-[70%] mx-auto  md:mt-9 md:mb-16 text-center text-[1rem] sm:text-[1.5rem] 2xl:text-[1.5rem] text-pretty font-bold">
              Join the elite circle of beauty pioneers by opening a Monsoon
              franchise in India. Elevate your business with a brand that reshapes
              trends, inspires confidence, and sets the gold standard in salon
              excellence worldwide.
            </div>
            <div className="bg-white ">
                <div className="w-[90%] xl:w-[60%] mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inputFields.map((input, index) => {
                      const {
                        placeholder,
                        value,
                        name,
                        label,
                        type,
                        required,
                        error,
                        helperText,
                      } = input;
                      return (
                        <div className="mb-5">
                          <CustomInput
                            key={index}
                            type={type}
                            label={label}
                            value={value}
                            placeholder={placeholder}
                            required={required}
                            name={name}
                            error={error} // Red border if error
                            helperText={helperText}
                            onChange={handleChange}
                          />
                        </div>
                      );
                    })}
                    {selectFields.map((input, index) => {
                      const {
                        value,
                        name,
                        label,
                        required,
                        error,
                        helperText,
                        options,
                      } = input;

                      return (
                        <div
                          className={`mb-5 w-full bg-white`}
                        >
                          <CustomSelect
                            key={index}
                            options={options}
                            label={label}
                            value={value}
                            required={required}
                            name={name}
                            error={error} // Red border if error
                            helperText={helperText}
                            onChange={handleChange}
                          />
                        </div>
                      );
                    })}
                    <div className="mb-5 col-span-full ">
                      <CustomTextArea
                        type={descFields.type}
                        label={descFields.label}
                        value={descFields.value}
                        placeholder={descFields.placeholder}
                        name={descFields.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="" style={{ display: "flex" }}>
                    {!loading ? (
                      <button
                        onClick={submithandle}
                        className="inline-flex mt-5  w-[150px] h-[45px] items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap drop-shadow-md border border-transparent rounded-md shadow-sm bg-black  "
                      >
                        Submit
                      </button>
                    ) : (
                      <button className="inline-flex mt-5 h-[45px] w-[150px] items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap drop-shadow-md border border-transparent rounded-md shadow-sm bg-black  ">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
             

              <div className="mt-9">
                <MainText textdata={"Partner Brands"} />
                <div
                  className="my-6 overflow-hidden"
                // style={{ marginTop: 10, marginBottom: '10px', height: '100px', backgroundColor: '', justifyContent: 'center', alignItems: 'center' }}
                >
                  <Slider {...settings}>
                    {brandsImg?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            height: "50px",
                            width: "50px",
                            backgroundColor: "green",
                          }}
                        >
                          <img
                            src={item.brandUrl}
                            style={{ height: "60%", width: "50%" }}
                            alt="Monsoon Salon"
                            loading="lazy"
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-9 text-center w-[95%] md:w-[80%] mx-auto">
            <h1 className="font-bold text-xl  px-6  md:text-[2.5rem] mb-4">
              Looking For Salon Franchise In India ?
            </h1>

            <p className="discriptionText ">
              Choose Monsoon Salon is a business that is always changing. We are
              a company of salons that use technology to run their businesses
              more efficiently and earn 30% more money. Our ecosystem works with
              both online and offline systems, which gives us an edge over our
              competitors. There are more than 212 Monsoon Salon franchises and
              more than 1,000 beauty and makeup experts all over India. It is
              the fastest-growing salon and the best salon franchise in India.
              Also on the list of the best salon franchises in India is Monsoon
              Salon.
            </p>
            <p className="discriptionText ">
              As one of the <strong>best beauty salon franchises in India</strong>, we provide comprehensive support
              from training to marketing, ensuring your salon operates smoothly and attracts a loyal
              customer base. Our franchise program is designed to suit both experienced entrepreneurs and
              newcomers, offering flexibility and scalability to match your goals.
              Why choose us? Our <strong>low-cost franchise</strong> model combines quality with affordability, giving
              you access to premium beauty products, expert guidance, and a recognized brand name.
              Whether you&#39;re looking to open a single salon or expand across multiple locations, we offer a
              franchise model that adapts to your needs.
              Join one of the most trusted beauty salon franchises in India and become part of an ever-
              growing industry. Start your journey toward success today with the <strong> best salon franchise in
                India</strong>, and turn your passion for beauty into a thriving business.
            </p>
                
          </div>
         
          <div className="px-6 my-8 md:my-9  text-center">
            <h2 className="font-bold text-xl mb-5   md:text-[2rem]">
              Why is Monsoon Salon Franchise the Best?
            </h2>

            {franchiseBestData?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="my-3 flex items-center gap-2 last:mt-3 last:mb-0"
                >
                  <FaCircle size={15} className="text-black min-w-[25px] " />
                  <p className="text-[16px]  text-description">
                    {item.discrption}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="overflow-x-hidden flex flex-col items-center py-3 px-3 mb-8">
          <div>
            <h4 className="text-center text-[1.8rem] md:text-[2.5rem] font-semibold mb-3">
              Top Benefits of Opening a Monsoon Salon Franchise
            </h4>

            <p className="text-center font-medium text-lg  mb-3">
              India’s most stable, growing salon chain
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center ">
            {salonFranchiseDiscription?.map((item, index) => (
              <div
                key={index}
                className="flex text-black flex-col items-center justify-center mt-6 mx-4"
              >
                {item.image}
                <p className="text-center mt-4 text-[1.5rem] font-extrabold">
                  {item.heading}
                </p>

                <p className="text-center  mt-2 w-[70%] mx-auto  text-[16px] ">
                  {item.subHeading}
                </p>
              </div>
            ))}
          </div>
        </div>


        {/* <Footer/> */}
      </Box>
    </>
  );
}
