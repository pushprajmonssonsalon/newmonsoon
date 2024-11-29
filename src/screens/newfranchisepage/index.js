import { Box } from "@mui/material";
import { useEffect, useState } from "react";
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

export default function Newfranchise() {
  const salonBudgetdata = [
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
      heading: "200+ locations",
      subHeading: "Two unique business solutions: Salon & Studio",
    },
    {
      image: <FaPersonBooth className="text-black text-[2.5rem]  " />,
      heading: "3000+ Artists & Technicians",
      subHeading: "Globally recognised products and services",
    },
    {
      image: <FaCity className="text-black text-[2.5rem]  " />,
      heading: "77+ Cities 04 Union Territories",
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
  const videoUrl ="https://d16a6xzchwrohg.cloudfront.net/franchiseVideo.mp4";

  useEffect(() => {
    const isSubmited = sessionStorage.getItem("isSubmitted");
    if (isSubmited === "true") {
      setIsSubmited(true);
    }
  }, []);
  return (
    <>
      <Box>
        <div className="max-w-[100vw] overflow-x-hidden">
          <Helmet>
            <title>
              Monsoon Salon Franchise Opportunity in India - Join the Monsoon
              Salon Network
            </title>
            <meta
              name="description"
              content="Monsoon Salon offers a lucrative franchise opportunity across India. Become part of our trusted network, known for premium beauty services, expert professionals, and a strong brand reputation. Start your journey in the beauty industry with Monsoon Salon today."
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

            <meta
              name="description"
              content="Monsoon Salon is the Fastest Growing Salon and Best Salon Franchise in India with 77+ Salon Franchise and 1000+ Beauty and Makeup Experts All Over India."
            />
            <meta
              name="keywords"
              content="Monsoon Salon franchise, Monsoon Salon franchise in India, affordable salon franchise in india, top salon franchise opportunities in india, franchise for salon"
            />
          </Helmet>
          <div className="bg-[#fafafa] p-3 relative h-[40vh] flex flex-col xl:flex-row items-center gap-12 justify-center">
            <div className="md:text-[#191918] text-white z-[3] drop-shadow-2xl text-center text-[1.9rem] sm:text-[2rem] 2xl:text-[3.8rem] font-extrabold">
              FRANCHISE WITH US
            </div>
            <button
              onClick={() => scrollToDivWithOffset("franchise")}
              className="bg-[#191918] z-[3] h-[45px] text-white border-2 border-white rounded-[10px] w-[150px] font-bold"
            >
              Apply here
            </button>
            <div className="absolute md:hidden z-[2]  w-full top-0 left-0  h-full">
                <video
                  className="w-full h-full object-cover"
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controlsList="nodownload"
                />
              </div>
          </div>
          <div className="bg-[#191918]   hidden py-16 2xl:py-28 md:flex md:flex-col md:items-center md:justify-center">
            <div className=" xl:w-[60vw]  md:h-[60vh] border-2 border-gray-200 md:rounded-[12px] overflow-hidden">
              <div className="relative  h  h-full">
                <video
                  className="w-full h-full object-cover"
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controlsList="nodownload"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-16 text-center w-[95%] md:w-[80%] mx-auto">
            <h1 className="font-bold text-xl  px-6  md:text-[2.5rem] mb-4">
              Looking For Salon Franchise In India ?
            </h1>

            <p className="discriptionText ">
              Choose Monsoon Salon is a business that is always changing. We are
              a company of salons that use technology to run their businesses
              more efficiently and earn 30% more money. Our ecosystem works with
              both online and offline systems, which gives us an edge over our
              competitors. There are more than 115 Monsoon Salon franchises and
              more than 1,000 beauty and makeup experts all over India. It is
              the fastest-growing salon and the best salon franchise in India.
              Also on the list of the best salon franchises in India is Monsoon
              Salon.
            </p>
          </div>
          <div className="px-6 my-8 md:my-16  text-center">
            <h1 className="font-bold text-xl mb-5   md:text-[2rem]">
              Why is Monsoon Salon Franchise the Best?
            </h1>

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
        <div className=" flex flex-col items-center py-9 px-3 mb-8">
          <div>
            <h2 className="text-center text-[1.8rem] md:text-[2.5rem] font-semibold mb-9">
              Top Benefits of Opening a Monsoon Salon Franchise
            </h2>

            <p className="text-center font-medium text-lg mt-3 mb-6">
              India’s most stable, growing salon chain
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center ">
            {salonFranchiseDiscription?.map((item, index) => (
              <div
                key={index}
                className="flex text-black flex-col items-center justify-center mt-12 mx-4"
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
        <div id="franchise" className="" style={{ bgcolor: "white" }}>
          <div className="my-6  w-[90%] md:w-[70%] mx-auto  md:mt-9 md:mb-16 text-center text-[1.5rem] md:text-[2.3rem] text-pretty font-extrabold">
            Join the elite circle of beauty pioneers by opening a Monsoon
            franchise in India. Elevate your business with a brand that reshapes
            trends, inspires confidence, and sets the gold standard in salon
            excellence worldwide.
          </div>
          <div className="bg-white ">
            {!isSubmited ? (
              <div className="w-[90%] xl:w-[80%] mx-auto">
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
                        className={`mb-5 w-full bg-white ${
                          label === "Budget" ? "col-span-full" : ""
                        }`}
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
            ) : (
              <div className="flex w-full items-center justify-between">
                <FaRegCheckCircle className="w-[100px] mx-auto h-[100px] text-green-600 " />
              </div>
            )}

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
                          alt="galleryimages"
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

        {/* <Footer/> */}
      </Box>
    </>
  );
}
