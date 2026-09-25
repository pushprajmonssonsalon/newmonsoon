import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Monsoon Salon</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-primary text-white font-medium"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}
