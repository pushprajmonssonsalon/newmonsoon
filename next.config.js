const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set NEXT_DIST_DIR to build/run somewhere else so a prod build doesn't overwrite a running `next dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  reactStrictMode: false,
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: [
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/bs",
      "react-icons/io5",
      "react-icons/md",
      "@mui/material",
      "@mui/icons-material",
    ],
  },
  async redirects() {
    return [
      { source: "/franchise-enquiry/:path+", destination: "/franchise-enquiry", permanent: true },
      { source: "/franchise-d", destination: "/franchise-enquiry", permanent: false },
    ];
  },
  webpack(config) {
    // Keep the existing code working unchanged: router + helmet shims.
    config.resolve.alias["react-router-dom"] = path.resolve(__dirname, "src/shims/react-router-dom.js");
    config.resolve.alias["react-helmet"] = path.resolve(__dirname, "src/shims/react-helmet.js");

    // CRA behaviour: importing an image gives its URL string (not a next/image object).
    config.module.rules.forEach((rule) => {
      if (rule.loader === "next-image-loader") {
        delete rule.loader;
        delete rule.options;
        delete rule.issuer;
        delete rule.dependency;
        rule.type = "asset/resource";
        rule.generator = { filename: "static/media/[name].[hash:8][ext]" };
      }
    });
    return config;
  },
};

module.exports = nextConfig;
