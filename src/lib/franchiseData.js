// Shared copy for the franchise landing pages (/franchise/cost,
// /best-salon-franchise-in-india, /affordable-salon-franchise).
//
// RULE: never publish exact fees, royalty % or margins. The only investment
// figure used anywhere (pages, FAQs, schema) is INVESTMENT_BAND.

export const INVESTMENT_BAND = "about ₹15 lakh to ₹3 crore";
export const LAST_UPDATED = "October 2026";
export const LAST_UPDATED_ISO = "2026-10";

// TODO: confirm these splits (and the area column) against the bands in the
// franchise enquiry form before relying on them.
export const MODELS = [
  { model: "Compact", band: "₹15–40 lakh", area: "Small format" },
  { model: "Standard", band: "₹40 lakh–₹1 crore", area: "Medium format" },
  { model: "Premium / Flagship", band: "₹1–3 crore", area: "Large format" },
];

export const INCLUDED = [
  ["Training", "Hands-on training for owners, artists and technicians."],
  ["Setup support", "Help with layout, interiors, equipment and the opening."],
  ["Marketing", "Brand marketing and launch support through the Monsoon network."],
  ["Operations support", "Ongoing guidance on operations, HR and day-to-day running."],
];

// TODO: add real, sourced competitor data. Entries with todo: true are NOT shown
// on the page (and not in schema) until you replace the placeholders and remove the flag.
export const COMPETITORS = [
  { name: "Competitor 1", locations: "TODO", years: "TODO", investment: "TODO", support: "TODO", todo: true },
  { name: "Competitor 2", locations: "TODO", years: "TODO", investment: "TODO", support: "TODO", todo: true },
  { name: "Competitor 3", locations: "TODO", years: "TODO", investment: "TODO", support: "TODO", todo: true },
  { name: "Competitor 4", locations: "TODO", years: "TODO", investment: "TODO", support: "TODO", todo: true },
  { name: "Competitor 5", locations: "TODO", years: "TODO", investment: "TODO", support: "TODO", todo: true },
];

export const MONSOON_ROW = {
  name: "Monsoon Salon",
  locations: "212+",
  years: "10+",
  investment: INVESTMENT_BAND.replace("about ", "About "),
  support: "Training, setup, marketing and operations support",
};

export const costFaqs = [
  {
    title: "How much does a Monsoon Salon franchise cost?",
    details: `Investment ranges from ${INVESTMENT_BAND}, depending on the salon model, size and city. The franchise team shares exact figures for your location after you enquire.`,
  },
  {
    title: "Why isn't the exact fee listed?",
    details:
      "Costs vary by city, location and salon size. Our team shares a personalised cost sheet after understanding your requirements.",
  },
  {
    title: "What area is needed for a Monsoon Salon franchise?",
    details:
      "The area depends on the model. Compact formats suit smaller spaces, while Standard and Premium / Flagship formats need larger floor areas. The team confirms the requirement for your location.",
  },
  {
    title: "What support do franchise partners get?",
    details:
      "Franchise partners get training, setup support, marketing and operations support from the Monsoon Salon team.",
  },
];

export const bestFaqs = [
  {
    title: "Which is the best salon franchise in India?",
    details: `The best salon franchise depends on your budget, city and goals. Monsoon Salon is a strong option with 212+ locations, 95+ cities, 10+ years of operation and full training, setup, marketing and operations support, starting from ${INVESTMENT_BAND.split(" to ")[0]}.`,
  },
  {
    title: "What is the investment for a salon franchise in India?",
    details: `It varies by brand and format. For Monsoon Salon, investment ranges from ${INVESTMENT_BAND}, depending on the salon model, size and city.`,
  },
  {
    title: "Is a salon franchise profitable?",
    details:
      "Profitability depends on location, salon size, management and local demand. We do not publish margins; the franchise team discusses what to expect for your city when you enquire.",
  },
];

export const affordableFaqs = [
  {
    title: "What is the lowest investment salon franchise?",
    details: `Monsoon Salon franchise models start from ${INVESTMENT_BAND.split(" to ")[0]}, with the Compact model as the entry point.`,
  },
  {
    title: "Can first-time investors start a salon franchise?",
    details:
      "Yes. Franchise partners get training, setup support, marketing and operations support, so prior salon experience is not required.",
  },
  {
    title: "What does the starting model include?",
    details:
      "The starting model includes training, setup support, marketing and operations support. The team confirms exact inclusions in the personalised cost sheet.",
  },
];

export const CHOOSE_CRITERIA = [
  ["Investment", "Compare the full investment range and what each model includes, not just the headline figure."],
  ["Brand reach", "A brand with many outlets and cities brings walk-in trust and easier hiring."],
  ["Training", "Look for structured training for owners, artists and technicians."],
  ["Support", "Check setup, marketing and operations support after the launch day."],
  ["Payback", "Ask the brand how payback is estimated for your city and format, and on what assumptions."],
];
