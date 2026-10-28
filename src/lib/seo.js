export const SITE_URL = "https://monsoonsalon.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo1024.png`;

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
    alternates: { canonical: url },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "website",
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
