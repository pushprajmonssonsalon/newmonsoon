// Visible FAQ accordion (same markup/styling as the Aesthetics FAQ). Uses native
// <details> so it also works without JavaScript and stays crawlable.
export default function FaqSection({ faqs, title = "Frequently Asked Questions", className = "py-16 px-6" }) {
  return (
    <section className={`bg-gradient-to-b from-[#efe2d6] to-[#f6efe7] ${className}`}>
      <h2 className="text-3xl md:text-5xl font-semibold text-neutral-800 text-center mb-10">
        {title}
      </h2>
      <ul className="w-full md:w-[70%] mx-auto">
        {faqs.map((item) => (
          <li key={item.title} className="bg-white/70 rounded-2xl mb-4 last:mb-0 shadow-md">
            <details className="group">
              <summary className="flex items-center gap-3 px-4 py-4 font-medium marker:content-none cursor-pointer list-none">
                <svg
                  className="w-5 h-5 min-w-[20px] text-gray-500 transition group-open:rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
                <span className="text-lg text-neutral-800">{item.title}</span>
              </summary>
              <article className="px-4 pb-4">
                <p className="text-gray-600">{item.details}</p>
              </article>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
