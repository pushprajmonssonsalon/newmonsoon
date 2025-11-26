import { useState } from "react";
import "./contactus.css";
import CustomInput from "../../components/customInputs/CustomInput";
import CustomTextArea from "../../components/customInputs/CustomTextArea";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCall, IoMdMail } from "react-icons/io";
import { postApiData } from "../../utils/services";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    description: "",
  });

  const validateForm = () => {
    const Regex = /^[6-9][0-9]{9}$/;

    const emailRgx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const errors = {};

    if (!formData.firstName || formData.firstName.trim() === "") {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName || formData.lastName.trim() === "") {
      errors.lastName = "Last Name is required";
    }
    if (!formData.email || !emailRgx.test(formData?.email)) {
      errors.email = "Email is required";
    }
    if (!formData.phoneNumber || !Regex.test(formData?.phoneNumber)) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!formData.description || formData.description.trim() === "") {
      errors.description = "comment is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmitPress = () => {
    if (!validateForm()) {
      return;
    }
    const { description, ...rest } = formData;
    const data = {
      ...rest,
      comment: description,
    };
    postApiData(
      "/contactUsForm",
      data,
      (res) => {
        toast.success("Form Sumbited");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          description: "",
        });
      },
      (err) => {
        
      }
    );
  };

  const formFields = [
    {
      type: "TextField",
      id: "outlined-basic",
      label: "First Name",
      name: "firstName",
      value: formData?.firstName,
      error: !!formErrors.firstName,
      helperText: formErrors.firstName,
      required: true,
    },
    {
      type: "TextField",
      id: "outlined-basic",
      label: "Last Name",
      name: "lastName",
      value: formData?.lastName,
      error: !!formErrors.lastName,
      helperText: formErrors.lastName,
      required: true,
    },
    {
      type: "TextField",
      id: "outlined-basic",
      label: "Email",
      name: "email",
      value: formData?.email,
      error: !!formErrors.email,
      helperText: formErrors.email,
      required: true,
    },
    {
      type: "TextField",
      id: "outlined-basic",
      label: "Phone no",
      name: "phoneNumber",
      value: formData?.phoneNumber,
      error: !!formErrors.phoneNumber,
      helperText: formErrors.phoneNumber,
      required: true,
    },
  ];
  const textAreaFields = {
    type: "TextArea",
    label: "Comments or Message",
    name: "description",
    value: formData?.description,
    multiline: true,
    error: !!formErrors.description,
    helperText: formErrors.description,
    rows: 3,
    required: true,
  };
  return (
    <>
      <Helmet>
        <title>
          Contact Us | Monsoon Salon Franchise Team
        </title>
        <meta
          name="description"
          content="Reach out to Monsoon Salon today and explore exciting opportunities to join our growing saloon franchise business network in India."
        />
        <meta
          name="keywords"
          content="monsoon salon contact details, monsoon salon address, monsoon salon phone number, monsoon salon email"
        />
        <link rel="canonical" href="https://monsoonsalon.com/contact-us" />
      </Helmet>
      <div className="mb-20">
        <div className="w-[90%] md:w-[80%] mx-auto h-full my-10 gap-9 md:gap-0  flex items-center justify-center">
          <div className="flex flex-col gap-9 md:gap-0 md:flex-row relative z-0 w-full items-center justify-between">
            <div className="w-full text-center md:text-left md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] relative z-2">
              <h1 className="text-5xl  font-medium  mb-9">Contact Us</h1>
              <p className="text-[#323232]">
                Need to get in touch with us? Either fill out the form with your
                or find the official email you'd like to contact below
              </p>
            </div>
            <div className="w-auto md:w-[330px] rounded-md  lg:w-[370px] border px-6 py-9  shadow-md relative z-2">
              <div className=" h-fit grid grid-cols-2 gap-5 ">
                {formFields.map((input, idx) => {
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
                    <div
                      className={`mb-4 ${
                        name === "email" || name === "phoneNumber"
                          ? "col-span-full"
                          : ""
                      }`}
                    >
                      <CustomInput
                        key={idx}
                        fullSpan={name === "email" || name === "phoneNumber"}
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
                <div className="mb-2 col-span-full">
                  <CustomTextArea
                    type={textAreaFields.type}
                    label={textAreaFields.label}
                    value={textAreaFields.value}
                    placeholder={textAreaFields.placeholder}
                    required={textAreaFields.required}
                    name={textAreaFields.name}
                    error={textAreaFields.error} // Red border if error
                    helperText={textAreaFields.helperText}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                onClick={handleSubmitPress}
                className="inline-flex mt-5 h-fit items-center justify-center px-6 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap drop-shadow-md bg-neutral-400 border border-transparent rounded-md shadow-sm hover:bg-black  "
              >
                Submit
              </button>
            </div>
            <div className="graphic-background-grey top-0 absolute h-[20%] md:h-[50%]  w-[100%] md:w-[30%] lg:w-[50%] -left-5 z-[-1]"></div>
          </div>
        </div>
        <div className="w-[90%] md:w-[80%]  mx-auto  ">
          <h2 className="text-2xl md:text-3xl underline decoration-black underline-offset-8 font-bold text-[#323232] my-6 text-center">
            Get In Touch With Us
          </h2>
          <div className="w-full flex flex-col items-center justify-between ">
            <div className="w-full h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3504.6701034106613!2d77.267363!3d28.549634!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce24a702d1c55%3A0x9a5500a8d4eee992!2sMonsoon%20Salon%20Head%20Office!5e0!3m2!1sen!2sin!4v1695618174537!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="grid  mt-6  h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4">
              <div className="flex h-full py-6 px-3 items-center border shadow-md bg-gray-100 mb-auto justify-center flex-col">
                <IoMdCall className="text-3xl md:text-[40px]" />
                <h2 className="font-medium text-lg md:text-xl mt-3 mb-1">
                  Phone
                </h2>
                <a
                  href="tel:+91-9315788084"
                  className="text-regel-gray text-sm md:text-base"
                >
                  +91-9315788084
                </a>
                <a
                  href="tel:+91-8882766591"
                  className="text-regel-gray text-sm md:text-base"
                >
                  +91-8882766591
                </a>
              </div>
              <div className="flex h-full py-6 px-3 items-center border shadow-md bg-gray-100 mb-auto justify-center flex-col">
                <IoMdMail className="text-3xl md:text-[40px]" />
                <h2 className="font-medium text-lg md:text-xl mt-3 mb-1">
                  Email
                </h2>
                <a
                  href="mailto:info@theprofessionalworld.com"
                  className="text-regel-gray text-sm md:text-base"
                >
                  info@theprofessionalworld.com
                </a>
              </div>
              <div className="flex h-full py-6 px-3 items-center border shadow-md bg-gray-100  mb-auto text-center justify-center flex-col">
                <FaLocationDot className="text-3xl md:text-[40px]" />
                <h2 className="font-medium text-lg md:text-xl mt-3 mb-1">
                  Address
                </h2>
                <a
                  href="https://www.google.com/maps?q=28.549634,77.267363"
                  className="text-regel-gray text-sm md:text-base"
                >
                  {" "}
                  The Professional Hair Salon & Spa (India) Pvt. Ltd., Plot No -
                  31, Okhla Industrial Estate,hase - 3, New Delhi - 110020
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
     
    </>
  );
}
