// <Helmet> is a no-op: page metadata now comes from Next.js `metadata` / `generateMetadata`
// in src/app/**/page.js (rendered on the server, so crawlers see it without JS).
export function Helmet() {
  return null;
}

export default { Helmet };
