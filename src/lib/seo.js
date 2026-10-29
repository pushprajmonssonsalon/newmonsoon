export const SITE_URL = "https://monsoonsalon.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo1024.png`;

export const ORG = {
  name: "Monsoon Salon",
  legalName: "The Professional Hair Salon & Spa (India) Pvt. Ltd.",
  phone: "+91-9315788084",
  email: "info@monsoonsalon.com",
  address: {
    streetAddress: "Plot No-31 Okhla Industrial Estate, Phase 3",
    addressLocality: "South Delhi",
    addressRegion: "Delhi",
    postalCode: "110020",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.instagram.com/monsoonsalon/",
    "https://www.facebook.com/monsoonsalon/",
    "https://www.youtube.com/user/monsoonsalon",
    "https://twitter.com/monsoonsalon",
    "https://in.pinterest.com/monsoonsalon/",
  ],
};

// Builds the same title/description/canonical/OG/Twitter set every page used to declare via <Helmet>.
export function buildMetadata({
  title,
  description,
  keywords,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noindex = false,
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { "en-IN": url, "x-default": url },
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: ORG.name,
      title,
      description,
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Renders a JSON-LD <script> for server components.
export function jsonLd(data) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}

// ---- schema.org builders -------------------------------------------------

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  legalName: ORG.legalName,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo1024.png`,
  email: ORG.email,
  telephone: ORG.phone,
  address: { "@type": "PostalAddress", ...ORG.address },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: ORG.phone,
      email: ORG.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  sameAs: ORG.sameAs,
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: ORG.name,
  url: `${SITE_URL}/`,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: `${SITE_URL}${path}`,
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.title,
    acceptedAnswer: { "@type": "Answer", text: f.details },
  })),
});

// Generic page schema (WebPage / AboutPage / ContactPage / CollectionPage ...)
export const pageSchema = ({ type = "WebPage", name, description, path }) => ({
  "@context": "https://schema.org",
  "@type": type,
  name,
  description,
  url: `${SITE_URL}${path}`,
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
});

export const itemListSchema = ({ name, items }) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: it.url,
  })),
});
