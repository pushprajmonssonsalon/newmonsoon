// Small decorative icons share one accessible SVG wrapper.
function Icon({ children }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}
export const ArrowUpRight = () => <Icon><path d="M7 17 17 7M7 7h10v10" /></Icon>;
export const MapPin = () => <Icon><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>;
export const Clock3 = () => <Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></Icon>;
export const BookOpen = () => <Icon><path d="M12 5v15M12 5C8 2 3 3 3 3v16s5-1 9 1c4-2 9-1 9-1V3s-5-1-9 2Z" /></Icon>;
export const Award = () => <Icon><circle cx="12" cy="8" r="5" /><path d="m8 12-2 9 6-3 6 3-2-9" /></Icon>;
export const BriefcaseBusiness = () => <Icon><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12a20 20 0 0 0 18 0M12 12v3" /></Icon>;
export const Sparkles = () => <Icon><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /></Icon>;
export const Scissors = () => <Icon><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8 8 13 13M8 16 21 3M12 12l3-3" /></Icon>;
