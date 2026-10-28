// Server-side helpers for the Monsoon API (used by generateMetadata / sitemap / JSON-LD).
const BASE_URL = "https://www.monsoonsalon.com/api/";

async function apiGet(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}

export const getSalons = async () => (await apiGet("salons")) || [];
export const getSalonById = (id) => apiGet(`getSingleSalonDetail?id=${encodeURIComponent(id)}`);
