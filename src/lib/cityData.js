// Shared data for the /salons/[city] pages.

// Same timings the Locations page already shows for every salon.
export const SALON_TIMINGS = "10:00 AM - 10:00 PM, all days";
export const OPENING_HOURS_SCHEMA = "Mo-Su 10:00-22:00";

// TODO: fill `price` (e.g. "₹499") with real starting prices. While null, the
// table shows "Contact the salon" - no prices are invented.
export const SERVICE_PRICES = [
  { service: "Haircut & styling", price: null },
  { service: "Hair colour", price: null },
  { service: "Hair spa & treatments", price: null },
  { service: "Facial & skin care", price: null },
  { service: "Manicure & pedicure", price: null },
  { service: "Makeup (party & bridal)", price: null },
];

export const salonDisplayName = (salon) =>
  !salon?.name || salon.name === "Monsoon" ? "Monsoon Salon" : `Monsoon Salon – ${salon.name}`;

export const salonPhone = (salon) => {
  const digits = String(salon?.phone || salon?.phoneNumber || salon?.contactNumber || "").replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : null;
};

export const salonAddress = (salon) => [salon?.address, salon?.address2].filter(Boolean).join(", ");

export const mapLink = (salon) =>
  salon?.latitude && salon?.longitude
    ? `https://www.google.com/maps?q=${salon.latitude},${salon.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salonAddress(salon))}`;

export const cityFaqs = (city, count) => [
  {
    title: `Which is the best salon in ${city}?`,
    details: `Monsoon Salon has ${count} ${count === 1 ? "outlet" : "outlets"} in ${city}, offering hair, skin and beauty, makeup and nail services by trained artists. Open the outlet pages for addresses, timings and contact numbers.`,
  },
  {
    title: `What are the salon prices in ${city}?`,
    details: `Prices depend on the service and the outlet. Please call the Monsoon Salon outlet in ${city} for current prices and offers.`,
  },
  {
    title: `Where is the nearest Monsoon Salon in ${city}?`,
    details: `The outlet addresses, map links and phone numbers for ${city} are listed on this page. You can also use the Locations page to find the salon closest to you.`,
  },
];
