import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ClientTestimonials from "../../components/ClientTestimonials";
import { aestheticServices, aestheticFaqs } from "./data";
import heroImg from "../../assets/images/banner1.webp";

export default function Aesthetics() {
  return (
    <>
      <Helmet>
        <title>Aesthetics & Advanced Skin Treatments | Monsoon Salon</title>
        <meta
          name="description"
          content="Advanced aesthetic treatments at Monsoon Salon - laser hair reduction, HydraFacial, HIFU, skin rejuvenation and more."
        />
        <link rel="canonical" href="https://monsoonsalon.com/aesthetics" />
      </Helmet>

      <div className="max-w-[100vw] overflow-x-hidden">
        {/* Hero */}
        <section className="bg-[#FFF5EB] py-12 md:py-20 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <p className="text-xl font-kotta tracking-[0.3em] text-amber-600 uppercase">
                Monsoon Aesthetics
              </p>
              <h1 className="text-3xl md:text-5xl font-kotta font-semibold text-neutral-800 mt-3">
                Advanced Aesthetic & Skin Treatments
              </h1>
              <p className="text-neutral-600 font-jaldi text-base md:text-lg mt-5">
                Step into a space dedicated to your transformation. Advanced
                technology, a personalised touch and renewed confidence.
              </p>
            </div>
            {/* Dummy hero image - replace with the real aesthetics photo */}
            <img
              src={heroImg}
              alt="Monsoon Aesthetics"
              width="600"
              height="450"
              className="w-full h-[260px] md:h-[420px] object-cover rounded-[28px] shadow-md"
            />
          </div>
        </section>

        {/* Services */}
        <section className="bg-gradient-to-b from-[#f6efe7] to-[#efe2d6] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <p className="text-xl font-kotta tracking-[0.3em] text-amber-600 uppercase">
                Our Services
              </p>
              <h2 className="text-3xl md:text-5xl font-kotta font-semibold text-neutral-800 mt-3">
                Treatments Tailored For You
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-8">
              {aestheticServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/aesthetics/${service.slug}`}
                  className="group text-left bg-white/60 backdrop-blur rounded-[28px] overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      width="284"
                      height="224"
                      style={{ aspectRatio: "284 / 224" }}
                      src={service.img}
                      alt={service.category}
                      loading="lazy"
                      className="w-full group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-6 text-center">
                    <h3 className="text-xl font-jaldi font-semibold text-neutral-800 mb-2">
                      {service.category}
                    </h3>
                    <span className="text-amber-600 font-jaldi text-sm font-semibold">
                      Know More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ClientTestimonials className="py-16" />

        {/* FAQ */}
        <section className="bg-gradient-to-b from-[#efe2d6] to-[#f6efe7] py-16 px-6">
          <h2 className="text-3xl md:text-5xl font-kotta font-semibold text-neutral-800 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <ul className="w-full md:w-[70%] mx-auto">
            {aestheticFaqs.map((item) => (
              <li
                key={item.title}
                className="bg-white/70 rounded-2xl mb-4 last:mb-0 shadow-md"
              >
                <details className="group">
                  <summary className="flex items-center gap-3 px-4 py-4 font-medium marker:content-none cursor-pointer list-none">
                    <svg
                      className="w-5 h-5 min-w-[20px] text-gray-500 transition group-open:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                    <span className="text-lg font-jaldi text-neutral-800">
                      {item.title}
                    </span>
                  </summary>
                  <article className="px-4 pb-4">
                    <p className="text-gray-600 font-jaldi">{item.details}</p>
                  </article>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </div>

    </>
  );
}
