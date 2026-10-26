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
    
    <title>Privacy Policy | Monsoon Salon</title>
    <meta name="description" content="Read Monsoon Salon's privacy policy to understand how we collect, use, and protect your personal information across our website, app, and services."/>
    <meta name="keywords" content="privacy policy, data protection, personal information, user privacy"/>
    <link rel="canonical" href="https://monsoonsalon.com/privacypolicy" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Privacy Policy | Monsoon Salon" />
    <meta property="og:description" content="Read Monsoon Salon's privacy policy to understand how we collect, use, and protect your personal information across our website, app, and services." />
    <meta property="og:url" content="https://monsoonsalon.com/privacypolicy" />
    <meta property="og:image" content="https://monsoonsalon.com/logo1024.png" />

    </Helmet>
    <div className="py-9">
      <div className="flex items-center  justify-center">
        <h1 className="font-semibold text-3xl py-6" > Monsoon Salon - Privacy Policy</h1>
      </div>
      <div className="w-[90%] md:w-[80%] mx-auto">
        <p className=" text-gray-600 mt-4">
          At Monsoon Salon Franchise, we are committed to protecting your privacy and ensuring the
security of your personal information when you use our e-commerce platforms, including our
website, mobile app, and online services. We collect information that you provide to us
directly, such as your name, email address, phone number, billing and shipping addresses,
payment details, and account credentials. We also collect transactional information, including
your order history, service bookings, and subscription preferences. Additionally, we may
collect information automatically through your interactions with our website or app,
including IP address, browser type, device information, cookies, and usage patterns. We may
also record your marketing preferences when you consent to receive newsletters, promotional
emails, or special offers.






        </p>
        <p className=" text-gray-600 mt-4">
      We use the information we collect to process your orders and payments securely, manage
online appointments, provide personalized services and recommendations, and enhance your
overall experience on our digital platforms. Your information may also be used to
communicate updates, promotions, and marketing materials (with your consent), detect and
prevent fraudulent activity, and comply with legal and regulatory requirements.
        </p>
        <p className=" text-gray-600 mt-4">
    We do not sell your personal information to third parties. However, we may share
information with trusted service providers who help us process payments, manage IT
infrastructure, deliver products, or conduct marketing campaigns. Franchise locations may
also receive information necessary to fulfil your online orders or manage appointments.
Additionally, we may share information with legal authorities when required by law or to
protect our rights, users, or property, and in the event of business transfers, such as mergers or
acquisitions.
        </p>
        <p className=" text-gray-600 mt-4">
  We implement reasonable administrative, technical, and physical safeguards to protect your
personal information, though no method of transmission or storage over the internet can be
guaranteed to be completely secure. You have the right to access, update, or correct your
information through your account or by contacting us directly. You can also opt-out of
marketing communications and request deletion of your personal information, subject to legal
and operational requirements.
        </p>
        <p className=" text-gray-600 mt-4">
  Our website and app may use cookies and other tracking technologies to enhance your
browsing experience, analyse traffic, and deliver personalized content. You can manage your
cookie preferences through your browser settings. Our platforms may contain links to third-
party websites, but we are not responsible for the privacy practices of these sites and
encourage you to review their policies.
        </p>
        <p className=" text-gray-600 mt-4">
  We do not knowingly collect personal information from individuals under 13, and any such
information discovered will be deleted immediately. We may update this Privacy Policy
periodically, and any changes will be posted on our website with an updated effective date.
We encourage you to review this policy from time to time to stay informed about how we
protect your information.
        </p>
        <p className=" text-gray-600 mt-4">
 If you have any questions or concerns regarding this Privacy Policy or our practices, you may
contact us freely.
        </p>
      </div>
      {/* FAQ section hidden for now (placeholder content)
      <h2 className="font-semibold text-center text-2xl py-9" >Frequently Asked Questions</h2>

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
              <p className=" text-gray-600 mt-4">
                {item.details}
              </p>
            </article>
          </details>
        </li>
        )
       }) }
      </ul>
      */}
</div>
   
     
    </>
  );
}
