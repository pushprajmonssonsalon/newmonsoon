import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { aestheticServices } from "./data";
import NotFound from "../notfound";

export default function AestheticDetail() {
  const { slug } = useParams();
  const service = aestheticServices.find((s) => s.slug === slug);

  if (!service) return <NotFound />;

  const others = aestheticServices.filter((s) => s.slug !== slug);

  return (
    <>
      <Helmet>
        <title>{`${service.machine.replace(/^\d+\.\s*/, "")} - ${service.category} | Monsoon Aesthetics`}</title>
        <meta name="description" content={service.description} />
        <link
          rel="canonical"
          href={`https://monsoonsalon.com/aesthetics/${service.slug}`}
        />
      </Helmet>

      <div className="max-w-[100vw] overflow-x-hidden">
        <section className="bg-[#FFF5EB] py-12 md:py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/aesthetics"
              className="text-amber-600 font-jaldi font-semibold hover:underline"
            >
              ← Back to Aesthetics
            </Link>
            <div className="grid md:grid-cols-2 gap-10 items-center mt-6">
              <img
                src={service.img}
                alt={service.machine}
                width="600"
                height="450"
                className="w-full h-[260px] md:h-[420px] object-cover rounded-[28px] shadow-md"
              />
              <div className="text-center md:text-left">
                <p className="text-xl font-kotta tracking-[0.3em] text-amber-600 uppercase">
                  {service.category}
                </p>
                <h1 className="text-3xl md:text-5xl font-kotta font-semibold text-neutral-800 mt-3">
                  {service.machine}
                </h1>
                <p className="text-neutral-600 font-jaldi text-base md:text-lg mt-5">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#f6efe7] to-[#efe2d6] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-kotta font-semibold text-neutral-800 text-center mb-10">
              More Treatments
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-8">
              {others.slice(0, 4).map((o) => (
                <Link
                  key={o.slug}
                  to={`/aesthetics/${o.slug}`}
                  className="group text-left bg-white/60 backdrop-blur rounded-[28px] overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      width="284"
                      height="224"
                      style={{ aspectRatio: "284 / 224" }}
                      src={o.img}
                      alt={o.category}
                      loading="lazy"
                      className="w-full group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-6 text-center">
                    <h3 className="text-xl font-jaldi font-semibold text-neutral-800 mb-2">
                      {o.category}
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
      </div>
    </>
  );
}
