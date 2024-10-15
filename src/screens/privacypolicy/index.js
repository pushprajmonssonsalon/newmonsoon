import "./privacypolicy.css";
import { Helmet } from "react-helmet";

export default function PrivacyPolicy() {
  const accordionData = [
    {
      title: "What kind of data do we gather?",
      details:
        "You provide information to us when you complete a form. You might be prompted to submit your name or email address while placing a purchase or registering on our website, as appropriate. But you are welcome to browse our website anonymously.",
    },
    {
      title: "Why do we utilize the information you provide?",
      details:
        "We may use any information we get from you for any of the following purposes: To enhance customer service (your information enables us to address your support needs and requests more efficiently).",
    },
    {
      title: "How is your information safeguarded by us?",
      details:
        "Whenever you enter, submit, or access your personal information, we put a number of security measures in place to keep it safe.",
    },
    {
      title: "Are cookies used by us?",
      details:
        "Yes, cookies are little files that websites or their service providers upload to your computer's hard drive via your web browser (if you permit them to do so). Cookies help these websites or their systems identify your browser and remember certain information. In order to provide better site experiences and tools in the future, we utilize cookies to gather aggregate data on site traffic and site activity.",
    },
    {
      title:
        "Unless specified below, we won't share your personal information:",
      details:
        "Regular business purposes allow our Merchants to access your information. Licensed third-party service providers may obtain your data...",
    },
    {
      title: "Unrelated Privacy Concerns?",
      details:
        "Kids. Under-18s are not permitted to use this website. No element of the website is intended to attract anyone under the age of 18, and we do not gather or retain information from anyone known to be under that age.",
    },
    {
      title: "Public Areas.",
      details:
        "On our website, there might be sections dedicated to allowing you to openly share personal information, interact with others, provide product reviews, and upload media. This information could be read, gathered, and utilized by others since it might be available to other customers and businesses.",
    },
    {
      title: "Changes to Privacy Policy",
      details:
        "This Privacy Policy is subject to change at any moment, and any updates will be posted in the website's 'Privacy Policy' section.",
    },
    {
      title: "Contacting Us",
      details:
        "You can get in touch with us using the details provided below if you have any queries about our privacy statement. info@monsoonsalon.com",
    },
  ];

  return (
    <>
    <Helmet>
    
     
    </Helmet>
    <div className="py-9">
      <div className="flex items-center  justify-center">
        <h4 className="font-semibold text-3xl" > Privacy Policy</h4>
      </div>

      <ul className=" w-[90%] md:w-[60%] my-9 mx-auto   rounded-md">
       {accordionData.map((item,index)=>{
        return(
          <li key={index} className="border mb-5 last:mb-0 shadow-md">
          <details className="group">
            <summary className="flex items-center gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer">
              <svg
                className="w-5 h-5 text-gray-500 transition group-open:rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                ></path>
              </svg>
              <span className="font-medium text-xl">{item.title}</span>
            </summary>
            <article className="px-4 pb-4">
              <p>
                {item.details}
              </p>
            </article>
          </details>
        </li>
        )
       }) }
      </ul>
</div>
   
     
    </>
  );
}
