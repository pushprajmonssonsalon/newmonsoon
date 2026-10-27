const testimonials = [
{
  name: "Aarav Sharma",
  review:
    "Amazing experience! The stylists understood exactly what I wanted and the results were perfect. Premium ambience and very professional staff.",
},
{
  name: "Riya Patel",
  review:
    "Best salon visit I’ve ever had. My hair feels healthier and the service was extremely relaxing. Highly recommended!",
},
{
  name: "Karan Mehta",
  review:
    "Great grooming services and very hygienic environment. The staff is polite and skilled.",
},
{
  name: "Sneha Verma",
  review:
    "Loved my bridal makeup! It lasted all day and looked flawless in photos. Thank you Monsoon team!",
},
{
  name: "Rahul Gupta",
  review:
    "Professional haircut and beard styling. The ambience itself feels luxurious and calming.",
},
{
  name: "Ananya Iyer",
  review:
    "Skin treatment worked wonders. My face feels refreshed and glowing. Definitely coming back again!",
},
];

export default function ClientTestimonials({ className = "py-3", homeFonts = true }) {
  return (
    <section
      className={`bg-gradient-to-b from-[#efe2d6] to-[#f6efe7] ${className}`}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className={`text-3xl ${homeFonts ? "font-kotta" : ""} md:text-5xl font-semibold text-neutral-800 mb-14`}>
          Client Testimonials
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur rounded-[28px] p-8 shadow-md hover:shadow-xl transition"
            >
              <div className="text-amber-500 text-xl mb-4">★★★★★</div>
              <p className={`text-neutral-600 ${homeFonts ? "font-jaldi" : ""} text-sm leading-relaxed mb-6`}>
                {t.review}
              </p>
              <p className={`font-semibold ${homeFonts ? "font-jaldi" : ""} text-neutral-800 tracking-wide`}>
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
